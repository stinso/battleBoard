import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import GameConsoleSelection from '../gameInfo/ConsoleSelection';
import {
  AllSupportedGamesNames,
  GameFormat,
  BetAmount,
  Devices
} from '../../config/constants';
import {
  checkGameRequiresManualResult,
  isBalanceEnough
} from '../../utils/helpers';
import { AuthContext } from '../../context/AuthContext';
import {
  createChallengeService,
  modifyChallengeService
} from '../../service/battleServerService';
import { nodeAxiosWithCredentials } from '../../config/axios.js';
import AsyncSelect from 'react-select/async';
import * as Sentry from '@sentry/react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(2),
    color: theme.palette.grey[500]
  },
  gameSelection: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    justifyContent: 'center'
  },
  title: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const games = AllSupportedGamesNames.map((row, index) => {
  return { name: row, index: index + 1 };
});

const defaultGameFormat = GameFormat[games[0].name][0].name;
const StartTimeMinutesAhead = 5;

const ChallengeModal = ({
  username,
  showChallengeModal,
  setShowChallengeModal,
  modify = false,
  initialValues = {
    gameName: games[0].name,
    gameFormat: defaultGameFormat,
    betAmount: Number(BetAmount[0]),
    duration: 30
  },
  challengeID = -1,
  setReceivedChallenges,
  startDateTimeInitialValue = moment(new Date()).add(
    StartTimeMinutesAhead + 2,
    'm'
  ),
  shouldEnterUsername,
  setFetchDataInfo,
  ChallengesEnums
}) => {
  const classes = useStyles();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [cancelToken, setCancelToken] = useState('');
  const [consoleSelectedValue, setConsoleValue] = useState('');
  const [deviceID, setDeviceID] = useState(0);
  const [startDateTime, setStartDateTime] = useState({
    valid: true,
    time: startDateTimeInitialValue
  });
  const { user } = useContext(AuthContext);
  const account = user.user?.session?.ethAddress;
  const [successNotifications, setSuccessNotifications] = useState({
    showNotification: false,
    message: ''
  });
  const [currency, setCurrency] = useState('');

  const startDateTimeValid = useCallback(
    (current) => {
      const yesterday = moment().subtract(1, 'day');
      return current.isAfter(yesterday);
    },
    [startDateTime.time]
  );

  const handleCurrencyOnChange = (value) => {
    setCurrency(value.id);
  };

  const generateSuccessNotification = () => {
    return (
      <Box mb={2}>
        <Alert
          severity="success"
          onClose={() => {
            setSuccessNotifications((prevValue) => {
              return {
                ...prevValue,
                showNotification: false
              };
            });
          }}
        >
          <AlertTitle>Congratulations!</AlertTitle>
          {successNotifications.message}
        </Alert>
      </Box>
    );
  };

  const promiseOptions = async (inputValue) => {
    try {
      if (cancelToken) {
        // Cancel the previous request before making a new request
        cancelToken.cancel();
      }

      setCancelToken(axios.CancelToken.source());
      const data = await nodeAxiosWithCredentials.post(
        `authenticated/get-usernames`,
        {
          identifier: inputValue
        },
        {
          cancelToken: cancelToken.token
        }
      );
      setCancelToken('');
      let result = data.data.usernames || [];
      result = result.map((row) => {
        return { label: row, value: row };
      });

      return result;
    } catch (error) {
      console.log(
        '🚀 ~ file: ChallengeModal.js ~ line 126 ~ //newPromise ~ error',
        error
      );

      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        console.log('Request canceled', error.message);
      } else {
        // Handle usual errors
        console.log('Something went wrong: ', error.message);
      }
    }
  };

  const resetEveryThing = () => {
    setConsoleValue('');
    setCurrency('');
    setErrMsg('');
    setDeviceID(0);
    setStartDateTime({
      valid: true,
      time: moment(new Date()).add(StartTimeMinutesAhead + 3, 'm')
    });
  };

  useEffect(() => {
    setErrMsg('');
    if (
      moment().add(StartTimeMinutesAhead, 'm').unix() >=
      moment(startDateTime.time).unix()
    ) {
      setErrMsg(
        `StartDateTime should be atleast ${StartTimeMinutesAhead} minutes ahead of current time`
      );
      setStartDateTime((prevValue) => {
        return {
          ...prevValue,
          valid: false
        };
      });
    } else {
      setStartDateTime((prevValue) => {
        return {
          ...prevValue,
          valid: true
        };
      });
    }
  }, [startDateTime.time]);

  let schema = yup.object({
    gameName: yup.string().required('This field is required'),
    gameFormat: yup.string().required('This field is required'),
    betAmount: yup.number().required('This field is required'),
    duration: yup
      .number()
      .required('This field is required')
      .integer('This field should be integer')
      .positive('Only positive integer are allowed')
      .moreThan(29, 'Value must be greater than 29')
  });

  if (shouldEnterUsername) {
    schema = yup.object({
      userName: yup.string().required('This field is required'),
      gameName: yup.string().required('This field is required'),
      gameFormat: yup.string().required('This field is required'),
      betAmount: yup.number().required('This field is required'),
      duration: yup
        .number()
        .required('This field is required')
        .integer('This field should be integer')
        .positive('Only positive integer are allowed')
        .moreThan(29, 'Value must be greater than 29')
    });
  }

  const submitForm = async (values) => {
    setIsLoading(true);
    setErrMsg('');

    const balanceCheck = await isBalanceEnough(values.betAmount, currency);
    if (balanceCheck) {
      try {
        const game = games.find((row) => {
          if (row.name === values.gameName) {
            return row;
          }
        });

        const gameFormat = GameFormat[values.gameName].find((row) => {
          if (row.name === values.gameFormat) {
            return row;
          }
        });
        const userName = shouldEnterUsername ? values.userName : username;
        const body = {
          gameID: game.index,
          gameFormat: gameFormat.index,
          betAmount: Number(values.betAmount),
          startTime: startDateTime.time.unix(),
          duration: values.duration * 60,
          opponent: userName,
          networkID: consoleSelectedValue,
          networkInfo: String(consoleSelectedValue),
          currency: currency,
          deviceID
        };
        let response = {};
        if (modify) {
          response = await modifyChallengeService({
            ...body,
            challengeID
          });
        } else {
          response = await createChallengeService({
            ...body
          });
        }

        if (response.data.success === true) {
          if (modify) {
            setReceivedChallenges((prevValue) => {
              return prevValue.filter((row) => row.id !== challengeID);
            });
          }
          if (shouldEnterUsername) {
            setFetchDataInfo({ fetch: true, state: ChallengesEnums.Sent });
          }
          setShowChallengeModal(false);
          setSuccessNotifications({
            showNotification: true,
            message: `Successfully Challenged ${userName.toUpperCase()}`
          });
          resetEveryThing();
        }
      } catch (error) {
        console.log(
          '🚀 ~ file: ChallengeModal.js ~ line 260 ~ submitForm ~ error',
          error
        );
        Sentry.captureException(error, {
          tags: {
            page: location.pathname
          }
        });
        if (error.response) {
          setErrMsg(error.response.data.error);
        } else {
          setErrMsg('Something went wrong!');
        }
      }
    } else {
      setErrMsg('Balance Not Enough. Please choose less bet amount.');
    }
    setIsLoading(false);
  };

  const handleConsoleOnChange = (value) => {
    setConsoleValue(value.id);
  };

  useEffect(() => {
    if (deviceID) {
      handleConsoleOnChange({
        id: deviceID === Devices.PS4.id || deviceID === Devices.PS5.id ? 2 : 0
      }); //4 and 5 represents PS consoles and 2 stands for PSN and 0 stands for Xbox Live
    }
  }, [deviceID]);

  return (
    <>
      {showChallengeModal && (
        <>
          <Dialog
            maxWidth="sm"
            fullWidth
            open={showChallengeModal}
            onClose={() => {
              setShowChallengeModal(false);
            }}
          >
            <DialogTitle disableTypography className={classes.dialogTitle}>
              <Typography className={classes.title} variant="h6">
                CHALLENGE {username && username}
              </Typography>
              <IconButton
                aria-hidden={true}
                data-dismiss="modal"
                className={classes.closeButton}
                onClick={() => {
                  setConsoleValue('');
                  setShowChallengeModal(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Formik
                validationSchema={schema}
                onSubmit={submitForm}
                initialValues={initialValues}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  isValid,
                  errors,
                  setFieldValue
                }) => (
                  <>
                    <form noValidate onSubmit={handleSubmit}>
                      {shouldEnterUsername && (
                        <Box mb={2}>
                          <FormControl
                            id="exampleForm.ControlInput10"
                            fullWidth
                          >
                            {/* <Autocomplete
                            id="combo-box"
                            options={options}
                            inputValue={username}
                            onChange={(event, newValue) => {
                                console.log(newValue)
                                setFieldValue("city_id", newValue);
                                return;
                            }}
                            filterOptions={x => x}
                            renderInput={params => (
                                <TextField
                                  margin="normal"
                                  label="Cities"
                                  fullWidth
                                  name="city_id"
                                  {...params}
                                />
                              )}
                            /> */}
                            <AsyncSelect
                              cacheOptions
                              loadOptions={promiseOptions}
                              placeholder="Search Opponents..."
                              onChange={(value) => {
                                setFieldValue('userName', value.value);
                                return;
                              }}
                              className="username-search-box"
                              inputValue={username}
                            />
                            <FormHelperText error>
                              {errors.userName}
                            </FormHelperText>
                          </FormControl>
                        </Box>
                      )}
                      <FormControl
                        fullWidth
                        variant="outlined"
                        disabled={modify}
                        error={!!errors.gameName}
                        color="secondary"
                      >
                        <InputLabel htmlFor="select-game-name-label">
                          Game Name
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="select-game-name-label"
                          id="select-game"
                          name="gameName"
                          value={values.gameName}
                          onChange={(e) => {
                            if (checkGameRequiresManualResult(e.target.value)) {
                              setFieldValue('gameFormat', 'Max Score');
                            }
                            handleChange(e);
                          }}
                          label="Game Name"
                        >
                          {games.map((game, index) => (
                            <MenuItem key={game.name} value={game.name}>
                              {game.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Box mt={2}>
                        <FormControl
                          fullWidth
                          variant="outlined"
                          disabled={modify}
                          error={!!errors.gameFormat}
                          color="secondary"
                        >
                          <InputLabel htmlFor="select-game-format-label">
                            Select Game Format
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="select-game-format-label"
                            id="select-game-format"
                            name="gameFormat"
                            value={values.gameFormat}
                            onChange={handleChange}
                            label="Select Game Format"
                          >
                            {GameFormat[values.gameName].map(
                              (gameFormat, index) => (
                                <MenuItem
                                  key={gameFormat.name}
                                  value={gameFormat.name}
                                >
                                  {gameFormat.name}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box mt={2}>
                        <FormControl fullWidth id="exampleForm.ControlDate1">
                          <DateTimePicker
                            required={true}
                            fullWidth
                            inputVariant="outlined"
                            label="Start Date and Time Here"
                            name="startDateTime"
                            onChange={(e) => {
                              setStartDateTime({ time: e });
                            }}
                            value={startDateTime.time}
                          />

                          {errors.startDateTime && (
                            <FormHelperText error>
                              {errors.startDateTime}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                      <Box mt={2}>
                        <FormControl
                          id="exampleForm.ControlInput4"
                          fullWidth
                          variant="outlined"
                          error={!!errors.betAmount}
                        >
                          <InputLabel
                            htmlFor="select-duration-label"
                            color="secondary"
                          >
                            Duration (in minutes)
                          </InputLabel>
                          <OutlinedInput
                            color="secondary"
                            type="number"
                            name="duration"
                            value={values.duration}
                            onChange={handleChange}
                            placeholder=""
                            label="Duration (in minutes)"
                          />
                          {errors.duration && (
                            <FormHelperText error>
                              {errors.duration}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Box>

                      <Box mt={2}>
                        <FormControl
                          fullWidth
                          variant="outlined"
                          error={!!errors.betAmount}
                        >
                          <InputLabel
                            htmlFor="select-bet-amount-label"
                            color="secondary"
                          >
                            Select Bet Amount (in USD)
                          </InputLabel>
                          <Select
                            color="secondary"
                            fullWidth
                            labelId="select-bet-amount-label"
                            id="select-bet-amount"
                            name="betAmount"
                            value={values.betAmount}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            label="Select Bet Amount (in USD)"
                          >
                            {BetAmount.map((amount, index) => (
                              <MenuItem key={amount} value={amount}>
                                {amount}
                              </MenuItem>
                            ))}
                          </Select>
                          {!!errors.betAmount && (
                            <FormHelperText error>
                              Please select Bet Amount
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                      <Box
                        className={classes.gameSelection}
                        mt={2}
                        color="secondary"
                      >
                        <GameConsoleSelection
                          consoleSelectedValue={consoleSelectedValue}
                          handleConsoleOnChange={handleConsoleOnChange}
                          setConsoleValue={setConsoleValue}
                          game={values.gameName}
                          handleCurrencyOnChange={handleCurrencyOnChange}
                          currency={currency}
                          isChallenge={true}
                          setDeviceID={setDeviceID}
                        />
                      </Box>
                      {errMsg && (
                        <Box mt={2}>
                          <FormHelperText error>{errMsg}</FormHelperText>
                        </Box>
                      )}
                      <Box mt={2} display="flex" justifyContent="center" mb={1}>
                        <Button
                          color="secondary"
                          type="submit"
                          variant="contained"
                          disabled={
                            !(
                              isValid &&
                              (values.userName || username) &&
                              consoleSelectedValue !== '' &&
                              currency !== '' &&
                              startDateTime.valid &&
                              !isLoading
                            )
                          }
                        >
                          Schedule
                        </Button>
                      </Box>
                    </form>
                  </>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </>
      )}
      {successNotifications.showNotification && generateSuccessNotification()}
    </>
  );
};

export default ChallengeModal;
