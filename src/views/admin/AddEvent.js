import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { DateTimePicker } from '@material-ui/pickers';
import moment, { unix } from 'moment';
import {
  AllSupportedGamesNames,
  Styles,
  GameFormat,
  BetAmount,
  MaxWinners,
  Devices
} from '../../config/constants';
import {
  adminAddEventService,
  adminAddRecurringEventService
} from '../../service/battleServerService';
import * as Sentry from '@sentry/react';
import { checkGameRequiresManualResult } from '../../utils/helpers.js';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  Typography,
  makeStyles
} from '@material-ui/core';
import LoadingScreen from 'src/components/LoadingScreen';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1)
  },
  formControlCheckboxes: {
    marginTop: theme.spacing(2)
  },
  noEventsText: {
    fontSize: 24
  }
}));

const games = AllSupportedGamesNames.map((row, index) => {
  return { name: row, index: index + 1 };
});

const defaultGameFormat = GameFormat[games[0].name][0].name;

const AddEvent = ({
  initialValues = {
    gameName: games[0].name,
    style: Styles[2].name,
    eventName: '',
    gameFormat: defaultGameFormat,
    betAmount: BetAmount[0],
    maxWinners: MaxWinners[0],
    description: '{"fb_sponsorship_hashtag": "#chaingames" }',
    isUpdate: false,
    maxPlayers: 2,
    minPlayers: 2,
    duration: 3600
  },
  isRecurringEvent,
  showAddEvent
}) => {
  const startDateTimeInitialValue = moment(new Date()).add(30, 'm');
  const endDateTimeInitialValue = moment(new Date()).add(60, 'm');
  const classes = useStyles();
  const [errMsg, setErrMsg] = useState('');
  const [startDateTime, setStartDateTime] = useState(startDateTimeInitialValue);
  const [endDateTime, setEndDateTime] = useState(endDateTimeInitialValue);
  const [isSponsoredEvent, setIsSponsoredEvent] = useState(false);
  const [networkIds, setNetworkIds] = useState([]);
  const location = useLocation();

  const startDateTimeValid = useCallback(
    (current) => {
      const yesterday = moment().subtract(1, 'day');
      return current.isAfter(yesterday);
    },
    [endDateTime, startDateTime]
  );

  const checkTimings = (startTime, endTime, shouldCheckWithEndTime = true) => {
    setErrMsg('');
    if (
      shouldCheckWithEndTime &&
      moment(startTime).add(1, 'm').unix() >= moment(endTime).unix()
    ) {
      setErrMsg('StartDateTime should be 60 minutes greater than EndDateTime');
    } else if (moment().add(30, 'm').unix() >= moment(startTime).unix()) {
      setErrMsg(
        'StartDateTime should be atleast 30 minutes ahead of current time'
      );
    }
  };

  const checkValidJSON = (json) => {
    if (!json) {
      return true;
    }
    try {
      JSON.parse(json);
      return true;
    } catch (error) {
      return false;
    }
  };

  let schema = yup.object({
    eventName: yup
      .string()
      .max(256, 'Too Long!!')
      .min(1, 'Too Short!!')
      .required('Event Name is a required field'),
    gameName: yup.string().required('This field is required'),
    style: yup.string().required('This field is required'),
    description: yup
      .string()
      .test('valid', `This value is not valid`, (value) => {
        return checkValidJSON(value);
      }),
    gameFormat: yup.string().required('This field is required'),
    maxWinners: yup.number().required('This field is required'),
    minPlayers: yup
      .number()
      .required('This field is required')
      .integer('This field should be integer')
      .positive('Only positive integer are allowed')
      .max(yup.ref('maxPlayers'), 'Value must be less than max players')
      .moreThan(0, 'Value must be greater than 0')
      .test('valid', `This value is not valid`, (value) => {
        console.log(yup.ref('style').getter());
        return checkValidJSON(value);
      }),
    maxPlayers: yup
      .number()
      .required('This field is required')
      .integer('This field should be integer')
      .positive('Only positive integer are allowed')
      .lessThan(100, 'Value must be less than 100')
      .min(yup.ref('minPlayers'), 'Value must be greater than min players'),
    betAmount: yup.number().required('This field is required'),
    duration: yup
      .number()
      .required('This field is required')
      .integer('This field should be integer')
      .positive('Only positive integer are allowed')
      .moreThan(0, 'Value must be greater than 0')
  });

  if (isRecurringEvent) {
    schema = yup.object({
      eventName: yup
        .string()
        .max(256, 'Too Long!!')
        .min(1, 'Too Short!!')
        .required('Event Name is a required field'),
      gameName: yup.string().required('This field is required'),
      description: yup.string().required('This field is required'),
      style: yup.string().required('This field is required'),
      gameFormat: yup.string().required('This field is required'),
      maxWinners: yup.number().required('This field is required'),
      minPlayers: yup
        .number()
        .required('This field is required')
        .integer('This field should be integer')
        .positive('Only positive integer are allowed')
        .max(yup.ref('maxPlayers'), 'Value must be less than max players')
        .moreThan(0, 'Value must be greater than 0'),
      maxPlayers: yup
        .number()
        .required('This field is required')
        .integer('This field should be integer')
        .positive('Only positive integer are allowed')
        .lessThan(100, 'Value must be less than 100')
        .min(yup.ref('minPlayers'), 'Value must be greater than min players'),
      betAmount: yup.number().required('This field is required'),
      cronString: yup.string().required('This field is required'),
      duration: yup
        .number()
        .required('This field is required')
        .integer('This field should be integer')
        .positive('Only positive integer are allowed')
        .moreThan(0, 'Value must be greater than 0')
    });
  }

  const handleNetworkCheckBoxChange = (checked, networkId) => {
    if (checked) {
      setNetworkIds((prevState) => {
        return [...prevState, networkId];
      });
    } else {
      setNetworkIds((prevState) => {
        return prevState.filter((id) => id !== networkId);
      });
    }
  };

  const submitForm = async (values) => {
    if (values.gameName === 'Madden NFL 21' && networkIds.length <= 0) {
      return setErrMsg(`Please select a console.`);
    }

    if (values.style === 'Bracket' && values.minPlayers < 4) {
      return setErrMsg(`Min Players should be at least 4`);
    }

    setErrMsg(``);
    try {
      const game = games.find((row) => {
        if (row.name === values.gameName) {
          return row;
        }
      });
      const style = Styles.find((row) => {
        if (row.name === values.style) {
          return row;
        }
      });
      const gameFormat = GameFormat[values.gameName].find((row) => {
        if (row.name === values.gameFormat) {
          return row;
        }
      });

      let body = {
        name: values.eventName,
        game: game.index,
        style: style.index,
        description: values.description,
        gameFormat: gameFormat.index,
        maxWinners: Number(values.maxWinners),
        maxPlayers: values.maxPlayers,
        minPlayers: values.minPlayers,
        duration: values.duration,
        betAmount: Number(values.betAmount),
        sponsored: isSponsoredEvent,
        bracketChildStyle: 1
      };
      let response;
      let serviceToBeCalled;
      let success = false;

      if (isRecurringEvent) {
        body = {
          ...body,
          cronSpec: values.cronString,
          dontScheduleBefore: startDateTime.set('second', 0).unix(),
          dontScheduleAfter: endDateTime.set('second', 0).unix()
        };
        serviceToBeCalled = adminAddRecurringEventService;
      } else {
        body = {
          ...body,
          startDate: startDateTime.set('second', 0).unix(),
          endDate: endDateTime.set('second', 0).unix()
        };
        serviceToBeCalled = adminAddEventService;
      }

      if (networkIds.length > 0) {
        response = await Promise.all(
          networkIds.map((networkID) => {
            return serviceToBeCalled({ ...body, deviceID: networkID });
          })
        );

        response.map((res, index) => {
          if (index === 0) {
            success = res.data.success;
          } else {
            success = success && res.data.success;
          }
        });
      } else {
        response = await serviceToBeCalled(body);
        success = response.data.success;
      }
      if (success === true) {
        console.log('############## success! ##############')
        showAddEvent(false);
      } else {
        console.log('############## fail! ##############')
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: AddEvent.js ~ line 248 ~ submitForm ~ error',
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
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={submitForm}
        initialValues={initialValues}
        isInitialValid={schema.isValidSync()}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          isValid,
          errors
        }) => (
          <>
            <form noValidate onSubmit={handleSubmit}>
              <Box mt={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  id="exampleForm.ControlSelect3"
                >
                  <InputLabel htmlFor="select-game-name-label">
                    Game Name
                  </InputLabel>
                  <Select
                    labelId="select-game-name-label"
                    name="gameName"
                    value={values.gameName}
                    onChange={(e) => {
                      if (checkGameRequiresManualResult(e.target.value)) {
                        setFieldValue('style', 'Public 1v1');
                        setFieldValue('gameFormat', 'Max Score');
                        setFieldValue('maxWinners', 1);
                        setFieldValue('minPlayers', 2);
                        setFieldValue('maxPlayers', 2);
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
                  {!!errors.gameName && (
                    <FormHelperText error>Please select a game</FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box mt={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  id="exampleForm.ControlSelect1"
                >
                  <InputLabel htmlFor="select-style-label">
                    Select Event Style
                  </InputLabel>
                  <Select
                    labelId="select-style-label"
                    name="style"
                    value={values.style}
                    onChange={(e) => {
                      checkTimings(
                        startDateTime,
                        endDateTime,
                        e.target.value === 'Bracket' ? false : true
                      );
                      handleChange(e);
                    }}
                    label="Select Event Style"
                  >
                    {Styles.map((style, index) => (
                      <MenuItem key={style.name} value={style.name}>
                        {style.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!errors.style && (
                    <FormHelperText error>Please select a style</FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box mt={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  id="exampleForm.ControlSelect2"
                >
                  <InputLabel htmlFor="select-game-format-label">
                    Select Game Format
                  </InputLabel>
                  <Select
                    labelId="select-game-format-label"
                    name="gameFormat"
                    value={values.gameFormat}
                    onChange={handleChange}
                    label="Select Game Format"
                  >
                    {GameFormat[values.gameName].map((gameFormat, index) => (
                      <MenuItem key={gameFormat.name} value={gameFormat.name}>
                        {gameFormat.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!errors.gameFormat && (
                    <FormHelperText error>
                      Please select a Game Format
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box mt={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  id="exampleForm.ControlInput7"
                  error={!!errors.eventName}
                >
                  <InputLabel htmlFor="event-name-label">Event Name</InputLabel>
                  <OutlinedInput
                    id="event-name-label"
                    type="text"
                    name="eventName"
                    value={values.eventName}
                    onChange={handleChange}
                    placeholder="COD"
                    label="Event Name"
                  />
                  {!!errors.eventName && (
                    <FormHelperText error>{errors.eventName}</FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box mt={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  id="exampleForm.ControlInput11"
                  error={!!errors.description}
                >
                  <InputLabel htmlFor="description-label">
                    Description
                  </InputLabel>
                  <OutlinedInput
                    id="description-label"
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    label="Description"
                  />
                  {!!errors.description && (
                    <FormHelperText error>{errors.description}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Box mt={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  id="exampleForm.ControlSelect6"
                  error={!!errors.maxWinners}
                >
                  <InputLabel htmlFor="select-max-winners-label">
                    Select Max Winners
                  </InputLabel>
                  <Select
                    labelId="select-max-winners-label"
                    name="maxWinners"
                    value={values.maxWinners}
                    onChange={handleChange}
                    disabled={['Public 1v1', 'Bracket'].includes(values.style)}
                    label="Select Max Winners"
                  >
                    {MaxWinners.map((amount, index) => (
                      <MenuItem key={amount} value={amount}>
                        {amount}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!errors.maxWinners && (
                    <FormHelperText error>
                      Please select Max Winners
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Box mt={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  id="exampleForm.ControlDate1"
                >
                  <DateTimePicker
                    name="startDateTime"
                    value={startDateTime}
                    required={true}
                    inputVariant="outlined"
                    onChange={(e) => {
                      setStartDateTime(e);
                      checkTimings(
                        e,
                        endDateTime,
                        values.style === 'Bracket' ? false : true
                      );
                    }}
                    label={
                      !isRecurringEvent
                        ? 'Start DateTime'
                        : "Don't Schedule before"
                    }
                  />
                  {!!errors.startDateTime && (
                    <FormHelperText error>
                      {errors.startDateTime}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>

              {(values.style !== 'Bracket' || isRecurringEvent) && (
                <Box mt={2}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    id="exampleForm.ControlDate2"
                  >
                    <DateTimePicker
                      name="endDateTime"
                      required={true}
                      value={endDateTime}
                      inputVariant="outlined"
                      onChange={(e) => {
                        setEndDateTime(e);
                        checkTimings(
                          startDateTime,
                          e,
                          values.style === 'Bracket' ? false : true
                        );
                      }}
                      label={
                        !isRecurringEvent
                          ? 'End DateTime'
                          : "Don't Schedule after"
                      }
                    />
                    {!!errors.endDateTime && (
                      <FormHelperText error>
                        {errors.endDateTime}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              )}

              <Box mt={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  id="exampleForm.ControlInput3"
                  error={!!errors.minPlayers}
                >
                  <InputLabel htmlFor="min-players-label">
                    Min Players
                  </InputLabel>
                  <OutlinedInput
                    id="min-players-label"
                    type="number"
                    name="minPlayers"
                    disabled={values.style === 'Public 1v1'}
                    value={values.minPlayers}
                    onChange={handleChange}
                    label="Min Players"
                  />
                  {!!errors.minPlayers && (
                    <FormHelperText error>{errors.minPlayers}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Box mt={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  id="exampleForm.ControlInput4"
                  error={!!errors.maxPlayers}
                >
                  <InputLabel htmlFor="max-players-label">
                    Max Players
                  </InputLabel>
                  <OutlinedInput
                    id="max-players-label"
                    type="number"
                    name="maxPlayers"
                    value={values.maxPlayers}
                    disabled={values.style === 'Public 1v1'}
                    onChange={handleChange}
                    label="Max Players"
                  />
                  {!!errors.maxPlayers && (
                    <FormHelperText error>{errors.maxPlayers}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Box mt={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  id="exampleForm.ControlSelect4"
                  error={!!errors.betAmount}
                >
                  <InputLabel htmlFor="select-bet-amount-label">
                    Select Bet Amount
                  </InputLabel>
                  <Select
                    id="select-bet-amount-label"
                    name="betAmount"
                    value={values.betAmount}
                    onChange={handleChange}
                    label="Select Bet Amount"
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

              <Box mt={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  id="exampleForm.ControlSelect5"
                >
                  <FormLabel component="legend">Is Sponsored Event?</FormLabel>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isSponsoredEvent}
                        onChange={(state) => {
                          setIsSponsoredEvent(state.target.checked);
                        }}
                      />
                    }
                    label={isSponsoredEvent ? 'Yes' : 'No'}
                  />
                </FormControl>
              </Box>

              {isRecurringEvent && (
                <>
                  <Box mt={2}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      id="exampleForm.ControlInput5"
                      error={!!errors.cronString}
                    >
                      <InputLabel htmlFor="cron-label">CRON String</InputLabel>
                      <OutlinedInput
                        id="cron-label"
                        type="text"
                        name="cronString"
                        value={values.cronString}
                        onChange={handleChange}
                        labe="CRON String"
                      />
                      {!!errors.cronString && (
                        <FormHelperText error>
                          {errors.cronString}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </>
              )}

              {(isRecurringEvent || values.style === 'Bracket') && (
                <Box mt={2}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    id="exampleForm.ControlInput6"
                    error={!!errors.duration}
                  >
                    <InputLabel htmlFor="duration-label">
                      Duration(in seconds)
                    </InputLabel>
                    <OutlinedInput
                      id="duration-label"
                      type="number"
                      name="duration"
                      value={values.duration}
                      onChange={handleChange}
                      label="Duration(in seconds)"
                    />
                    {!!errors.duration && (
                      <FormHelperText error>{errors.duration}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
              )}

              {checkGameRequiresManualResult(values.gameName) && (
                <>
                  <FormControl
                    component="fieldset"
                    className={classes.formControlCheckboxes}
                  >
                    <FormLabel component="legend">Select Consoles</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(event) => {
                              handleNetworkCheckBoxChange(
                                event.target.checked,
                                Devices.PS4.id
                              ); //PS4 network id
                            }}
                          />
                        }
                        label="PS4"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(event) => {
                              handleNetworkCheckBoxChange(
                                event.target.checked,
                                Devices.PS5.id
                              ); //PS5 network id
                            }}
                          />
                        }
                        label="PS5"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(event) => {
                              handleNetworkCheckBoxChange(
                                event.target.checked,
                                Devices.XBOX_SERIES.id
                              ); //XBOX series x/s network id
                            }}
                          />
                        }
                        label="XBOX SERIES X|S"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(event) => {
                              handleNetworkCheckBoxChange(
                                event.target.checked,
                                Devices.XBOX_ONE.id
                              ); // XBOX one
                            }}
                          />
                        }
                        label="XBOX ONE"
                      />
                    </FormGroup>
                  </FormControl>

                  {/*
                  <FormGroup check>
                    <Label check>
                      <Input
                        onChange={(event) => {
                          handleNetworkCheckBoxChange(
                            event.target.checked,
                            Devices.PS4.id
                          ); //PS4 network id
                        }}
                        type="checkbox"
                      />
                      <span className="form-check-sign" />
                      PS4
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        onChange={(event) => {
                          handleNetworkCheckBoxChange(
                            event.target.checked,
                            Devices.PS5.id
                          ); //PS5 network id
                        }}
                        type="checkbox"
                      />
                      <span className="form-check-sign" />
                      PS5
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        onChange={(event) => {
                          handleNetworkCheckBoxChange(
                            event.target.checked,
                            Devices.XBOX_SERIES.id
                          ); //XBOX series x/s network id
                        }}
                        type="checkbox"
                      />
                      <span className="form-check-sign" />
                      XBOX SERIES X|S
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        onChange={(event) => {
                          handleNetworkCheckBoxChange(
                            event.target.checked,
                            Devices.XBOX_ONE.id
                          ); // XBOX one
                        }}
                        type="checkbox"
                      />
                      <span className="form-check-sign" />
                      XBOX ONE
                    </Label>
                  </FormGroup>
                  */}
                </>
              )}

              <Box mt={2}>
                <FormControl fullWidth>
                  {errMsg !== '' && <Typography>{errMsg}</Typography>}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={!isValid}
                  >
                    ADD Event
                  </Button>
                </FormControl>
              </Box>
            </form>
          </>
        )}
      </Formik>
    </>
  );
};

export default AddEvent;
