import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import {
  getDateFromEpoch,
  getFormattedUserName,
  getGameFormatFromIndex,
  getTimeFromEpoch,
  isBalanceEnough,
  getDeviceName,
  checkGameRequiresManualResult
} from '../../utils/helpers';
import { Devices } from '../../config/constants';
import moment from 'moment';
import ChallengeModal from './ChallengeModal';
import LoadingScreen from 'src/components/LoadingScreen';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: 200,
    paddingTop: theme.spacing(3),
    minHeight: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      paddingBottom: 60
    },
    margin: 0
  },
  resultWon: {
    color: '#388e3c'
  },
  resultLost: {
    color: '#f44336'
  },
  avatar: {
    height: '32px',
    width: '32px'
  },
  imageCell: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  statusesButton: {
    margin: theme.spacing(2)
  },
  noEventsText: {
    fontSize: 24
  }
}));

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const BalanceNotEnoughErrorMessage = 'Balance Not Enough.';

const ReceivedChallenges = ({
  data,
  acceptChallenge,
  rejectChallenge,
  isLoading,
  setReceivedChallenges,
  user,
  ChallengesEnums
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const account = user.user?.session?.ethAddress;
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showConsoleSelectModal, setShowConsoleSelectModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [consoleSelectedValue, setConsoleValue] = useState('');
  const [deviceID, setDeviceID] = useState(0);
  const [errMsg, setErrMsg] = useState('');
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);
  const [currency, setCurrency] = useState('');

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedChallenges = applyPagination(data, page, limit);

  useEffect(() => {
    if (deviceID) {
      handleConsoleOnChange({
        id: deviceID === Devices.PS4.id || deviceID === Devices.PS5.id ? 2 : 0
      }); //4 and 5 represents PS consoles and 2 stands for PSN and 0 stands for Xbox Live
    }
  }, [deviceID]);

  /* const consoleSelectModal = () => {
  return (
  <div>
      <Modal isOpen={showConsoleSelectModal}>
      <ModalHeader>Accept { `${selectedRow.opponent.username.toUpperCase()}'s Challenge` }</ModalHeader>
      <ModalBody>
          <GameConsoleSelection
              consoleSelectedValue={consoleSelectedValue}
              handleConsoleOnChange={handleConsoleOnChange}
              game={selectedRow.game}
              handleCurrencyOnChange={handleCurrencyOnChange}
              currency={currency}
              isChallenge={true}
              setDeviceID={setDeviceID}
          />
                  {errMsg !== '' && <p className='text-center text-danger'>
                      {errMsg}
                  </p>}
      </ModalBody>
      <ModalFooter>
                  <Button color="warning"
                      disabled={!(consoleSelectedValue !== '' && currency !== '' && !isFetchingBalance)}
                      onClick={async () => {
                          setIsFetchingBalance(true);
                          setErrMsg('');
                          if (checkGameRequiresManualResult(selectedRow.game) && deviceID !== selectedRow.deviceID) {
                              setIsFetchingBalance(false);
                              return setErrMsg(`This game can only be played with 
                              ${getDeviceName(selectedRow.deviceID)}`)
                          }
                          const balanceCheck = await isBalanceEnough(selectedRow.betAmount, currency)
                          if (balanceCheck) {
                              const response = await acceptChallenge({
                                  challengeID: selectedRow.id,
                                  networkID: consoleSelectedValue,
                                  currency: currency,
                                  deviceID,
                              },
                                  ChallengesEnums.Received,
                                  selectedRow.startTime,
                              )
                              
                              if (response) {
                                  setErrMsg(response);
                              }
                              else {
                                  setShowConsoleSelectModal(false)
                                  setConsoleValue('');
                                  setCurrency('');
                              }
                          }
                          else {
                              setErrMsg(BalanceNotEnoughErrorMessage);
                          }
                          setIsFetchingBalance(false)
                      }}
                  >
                      Accept
      </Button>{" "}
          <Button color="warning" onClick={() => {
              setShowConsoleSelectModal(false)
              setConsoleValue('')
          }}>
          Cancel
      </Button>
      </ModalFooter>
  </Modal>
  </div>
);
}; */

  const generateChallengeModal = useCallback(() => {
    return (
      <ChallengeModal
        showChallengeModal={showChallengeModal}
        username={
          selectedRow?.opponent?.username && selectedRow.opponent.username
        }
        setShowChallengeModal={setShowChallengeModal}
        challengeID={selectedRow.id && selectedRow.id}
        modify={true}
        setReceivedChallenges={setReceivedChallenges}
        initialValues={{
          gameName: selectedRow.game && selectedRow.game,
          gameFormat:
            selectedRow.game &&
            getGameFormatFromIndex(selectedRow.game, selectedRow.gameFormat),
          betAmount: selectedRow.betAmount && Number(selectedRow.betAmount),
          duration: selectedRow.duration && selectedRow.duration
        }}
        startDateTimeInitialValue={
          selectedRow.startTime && moment(selectedRow.startTime * 1000)
        }
      />
    );
  }, [showChallengeModal]);

  return (
    <>
      {showChallengeModal && generateChallengeModal()}
      {showConsoleSelectModal && consoleSelectModal()}
      <Card>
        <Box minWidth={300}>
          {paginatedChallenges.length > 0 ? (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Opponent</TableCell>
                    <TableCell>Game</TableCell>
                    <TableCell>Game Format</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Bet Amount</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedChallenges.map((entry, index) => {
                    return (
                      <TableRow spacing={0} hover key={entry.id}>
                        <TableCell className={classes.imageCell}>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              className={classes.avatar}
                              src={entry.opponent.dpHigh}
                            />
                            <Box marginLeft={1}>
                              <Typography
                                variant="body2"
                                color="textPrimary"
                                component={RouterLink}
                                to={`/profile/${entry.opponent.username}`}
                              >
                                {getFormattedUserName(
                                  entry.opponent.username,
                                  9
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{entry.gameShortName}</TableCell>
                        <TableCell>
                          {getGameFormatFromIndex(entry.game, entry.gameFormat)}
                        </TableCell>
                        <TableCell>
                          {getDateFromEpoch(entry.startTime)}
                          <br />
                          {getTimeFromEpoch(entry.startTime)}
                        </TableCell>
                        <TableCell>{entry.duration} Min.</TableCell>
                        <TableCell>${entry.betAmount}</TableCell>
                        <TableCell>
                          <Tooltip title="Accept">
                            <IconButton
                              color="secondary"
                              aria-label="accept"
                              component="span"
                              id={'Accept' + index}
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedRow(entry);
                                setErrMsg('');
                                setShowConsoleSelectModal(true);
                              }}
                            >
                              <CheckOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton
                              color="secondary"
                              aria-label="reject"
                              component="span"
                              id={'Reject' + index}
                              onClick={(e) => {
                                e.preventDefault();
                                rejectChallenge(
                                  { challengeID: entry.id },
                                  ChallengesEnums.Received,
                                  entry.startTime
                                );
                              }}
                            >
                              <CloseOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Modify">
                            <IconButton
                              color="secondary"
                              aria-label="modify"
                              component="span"
                              id={'Modify' + index}
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedRow(entry);
                                setShowChallengeModal(true);
                              }}
                            >
                              <SettingsOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={data.length}
                labelRowsPerPage={'Rows per page'}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </>
          ) : (
            <Box>
              {isLoading ? (
                <>
                  <Box display="flex" justifyContent="center" pt={2}>
                    <Typography variant="h5" className={classes.noEventsText}>
                      Fetching Challenges
                    </Typography>
                  </Box>
                  <Box>
                    <LoadingScreen width={200} />
                  </Box>
                </>
              ) : (
                <Box display="flex" justifyContent="center" pt={2} mb={2}>
                  <Typography variant="h5" className={classes.noEventsText}>
                    No Challenges found
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Card>
    </>
  );
};

ReceivedChallenges.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  user: PropTypes.object
};

export default ReceivedChallenges;
