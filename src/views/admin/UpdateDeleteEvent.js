import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  Tab,
  Tabs,
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
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { AllSupportedGamesNames } from '../../config/constants.js';
import AddEvent from './AddEvent';
import {
  getTimeFromEpoch,
  getDateFromEpoch,
  getGameFormatFromIndex
} from '../../utils/helpers';
import {
  getEventsService,
  getRecurringEventsService,
  adminDeleteEventService,
  adminDeleteRecurringEventService
} from '../../service/battleServerService';
import * as Sentry from '@sentry/react';
import {
  getRecurringTournamentsService,
  getTournamentsService
} from '../../service/tournaments.service.js';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: 200,
    paddingTop: 100,
    minHeight: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      paddingBottom: 60
    },
    margin: 0
  },
  success: {
    color: '#00e676'
  },
  warning: {
    color: '#ff1744'
  }
}));

const UpdateDeleteEvent = ({ isRecurringEvent }) => {
  const classes = useStyles();
  const location = useLocation();
  const [showMoreInfo, setShowMoreInfoModal] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [initialValues, setInitialValues] = useState();
  const [events, setEvents] = useState([]);
  const [recurringEvents, setRecurringEvents] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [recurringTournaments, setRecurringTournaments] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [games, setGames] = useState(['All Games', ...AllSupportedGamesNames]);
  const [selectedGame, setSelectedGame] = useState('All Games');
  const allSupportedGames = ['All Games', ...AllSupportedGamesNames];
  const [currentTab, setCurrentTab] = useState('events');

  const tabs = [
    { value: 'events', label: 'Events' },
    { value: 'tournaments', label: 'Tournaments' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getEvents = async () => {
    try {
      const { data } = await getEventsService({ allGames: true });
      if (data.success === true && data.events?.length > 0) {
        setEvents(
          data.events.map((row) => {
            return {
              ...row,
              gameFormat: getGameFormatFromIndex(row.game, row.gameFormat)
            };
          })
        );
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: UpdateDeleteEvent.js ~ line 53 ~ getEvents ~ error',
        error
      );
    }
  };

  const getRecurringEvents = async () => {
    try {
      const { data } = await getRecurringEventsService({});
      if (data.success === true && data.recurringEvents?.length > 0) {
        setRecurringEvents(
          data.recurringEvents.map((row) => {
            return {
              ...row,
              gameFormat: getGameFormatFromIndex(row.game, row.gameFormat)
            };
          })
        );
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: UpdateDeleteEvent.js ~ line 87 ~ getRecurringEvents ~ error',
        error
      );
    }
  };

  const getTournaments = async () => {
    try {
      const { data } = await getTournamentsService({ allGames: true });
      if (data.success === true && data.events?.length > 0) {
        setTournaments(
          data.events.map((row) => {
            return {
              ...row,
              gameFormat: getGameFormatFromIndex(row.game, row.gameFormat)
            };
          })
        );
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: UpdateDeleteEvent.js ~ line 130 ~ getTournaments ~ error',
        error
      );
    }
  };

  const getRecurringTournaments = async () => {
    try {
      const { data } = await getRecurringTournamentsService({});
      if (data.success === true && data.recurringEvents?.length > 0) {
        setRecurringTournaments(
          data.recurringEvents.map((row) => {
            return {
              ...row,
              gameFormat: getGameFormatFromIndex(row.game, row.gameFormat)
            };
          })
        );
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: UpdateDeleteEvent.js ~ line 137 ~ getRecurringTournaments ~ error',
        error
      );
    }
  };

  useEffect(() => {
    async function getData() {
      if (showAddEvent === false) {
        if (isRecurringEvent) {
          if (currentTab === 'events') {
            await getRecurringEvents();
          } else {
            await getRecurringTournaments();
          }
        } else {
          if (currentTab === 'events') {
            await getEvents();
          } else {
            await getTournaments();
          }
        }
        setGames([...allSupportedGames]);
      }
    }
    getData();
  }, [showAddEvent, isRecurringEvent, currentTab]);

  const onDropdownClick = (event) => {
    event.preventDefault();
    setSelectedGame(event.currentTarget.textContent);
    if (event.currentTarget.textContent === 'All Games') {
      setGames([...allSupportedGames]);
    } else {
      setGames([event.currentTarget.textContent]);
    }
  };

  async function onDeleteClick(e) {
    e.preventDefault();
    setErrMsg('');
    try {
      if (isRecurringEvent) {
        const { id } = selectedRow;
        const response = await adminDeleteRecurringEventService({
          eventID: id
        });
        if (response.data.success === true) {
          if (currentTab === 'events') {
            setRecurringEvents((prevValue) => {
              return prevValue.filter((row, index) => row.id !== id);
            });
          } else {
            setRecurringTournaments((prevValue) => {
              return prevValue.filter((row, index) => row.id !== id);
            });
          }
        }
      } else {
        const { id } = selectedRow;
        const response = await adminDeleteEventService({ eventID: id });
        if (response.data.success === true) {
          if (currentTab === 'events') {
            setEvents((prevValue) => {
              return prevValue.filter((row, index) => row.id !== id);
            });
          } else {
            setTournaments((prevValue) => {
              return prevValue.filter((row, index) => row.id !== id);
            });
          }
        }
      }
      setShowMoreInfoModal(false);
    } catch (error) {
      console.log(
        '🚀 ~ file: UpdateDeleteEvent.jsx ~ line 130 ~ onDeleteClick ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
      if (error.response) {
        setErrMsg(error.response.data.error);
      }
    }
  }

  const generateMoreInfoModal = () => {
    return (
      <Dialog
        open={showMoreInfo}
        onClose={() => setShowMoreInfoModal(false)}
        minWidth="md"
      >
        <DialogTitle>Event Info</DialogTitle>
        <DialogContent>
          {Object.keys(selectedRow).map(function (key, index) {
            if (
              key === 'startTime' ||
              key === 'endTime' ||
              key === 'dontScheduleAfter' ||
              key === 'dontScheduleBefore'
            ) {
              return (
                <div key={index + 1}>
                  <p>{key}</p>
                  <p>
                    {getDateFromEpoch(selectedRow[key])}
                    {'  '}
                    {getTimeFromEpoch(selectedRow[key])}
                  </p>
                </div>
              );
            } else {
              return (
                <div key={index + 1}>
                  <p>{key}</p>
                  <p>{selectedRow[key].toString()}</p>
                </div>
              );
            }
          })}
          {errMsg !== '' && <p>{errMsg}</p>}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            type="button"
            onClick={(e) => {
              onDeleteClick(e);
            }}
          >
            Delete
          </Button>
          <Button
            color="warning"
            variant="contained"
            data-dismiss="modal"
            type="button"
            onClick={() => setShowMoreInfoModal(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div>
      <Typography className={classes.title} variant="h6" color="textPrimary">
        {!showAddEvent
          ? isRecurringEvent
            ? 'Update or Delete Recurring Event'
            : 'Update or Delete an Event'
          : isRecurringEvent
          ? 'Add Recurring Event'
          : 'Add Event'}
      </Typography>
      <Box mt={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            setShowAddEvent((prevValue) => {
              setInitialValues();
              return !prevValue;
            });
          }}
        >
          {!showAddEvent ? 'Add Event' : 'Go Back'}
        </Button>
      </Box>
      {!showAddEvent ? (
        <>
          <Box mt={3}>
            <Tabs
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="secondary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box mt={3} minWidth={300}>
            {currentTab === 'events' && (
              <GenericTable
                isEvent={true}
                data={isRecurringEvent ? recurringEvents : events}
                isRecurringEvent={isRecurringEvent}
                games={games}
                setErrMsg={setErrMsg}
                setShowMoreInfoModal={setShowMoreInfoModal}
                setSelectedRow={setSelectedRow}
                classes={classes}
              />
            )}
            {currentTab === 'tournaments' && (
              <GenericTable
                isEvent={false}
                data={isRecurringEvent ? recurringTournaments : tournaments}
                isRecurringEvent={isRecurringEvent}
                games={games}
                setErrMsg={setErrMsg}
                setShowMoreInfoModal={setShowMoreInfoModal}
                setSelectedRow={setSelectedRow}
                classes={classes}
              />
            )}
          </Box>

          {showMoreInfo && generateMoreInfoModal()}
        </>
      ) : (
        <>
          <AddEvent
            isRecurringEvent={isRecurringEvent}
            initialValues={initialValues}
            setEvents={setEvents}
            showAddEvent={setShowAddEvent}
            setRecurringEvents={setRecurringEvents}
          />
        </>
      )}
    </div>
  );
};

const GenericTable = ({
  isRecurringEvent,
  isEvent,
  data,
  games,
  setErrMsg,
  setShowMoreInfoModal,
  setSelectedRow,
  classes
}) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {isRecurringEvent && 'Recurring '}
              {` ${isEvent ? 'Event' : 'Tournament'}`} ID
            </TableCell>
            <TableCell>{`${isEvent ? 'Event' : 'Tournament'}`} Name</TableCell>
            <TableCell>Game</TableCell>
            <TableCell>Game Format</TableCell>
            <TableCell>Bet Amount</TableCell>
            {!isRecurringEvent ? (
              <>
                <TableCell>Start Time</TableCell>
                <TableCell>Event Status</TableCell>
                <TableCell>Users Enrolled</TableCell>
              </>
            ) : (
              <>
                <TableCell>CRON</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Don't Schedule After</TableCell>
              </>
            )}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .filter((row) => games.includes(row.game))
            .map((row, index) => {
              return (
                <TableRow spacing={0} hover key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.game}</TableCell>
                  <TableCell>{row.gameFormat}</TableCell>
                  <TableCell>{row.betAmount}</TableCell>
                  {isRecurringEvent ? (
                    <>
                      <TableCell>{row.cronSpec}</TableCell>
                      <TableCell>{row.duration}</TableCell>
                      <TableCell>
                        {getDateFromEpoch(row.dontScheduleAfter)}
                        <TableCell />
                        {getTimeFromEpoch(row.dontScheduleAfter)}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        {getDateFromEpoch(row.startTime)}
                        <br />
                        {getTimeFromEpoch(row.startTime)}
                      </TableCell>
                      <TableCell
                        className={`${
                          row.eventStatus === 'Waiting'
                            ? classes.success
                            : classes.warning
                        }`}
                      >
                        {row.eventStatus}
                      </TableCell>
                      <TableCell>{row.noOfUsersEnrolled}</TableCell>
                    </>
                  )}
                  <TableCell>
                    <Tooltip title="Info">
                      <IconButton
                        color="secondary"
                        aria-label="info"
                        component="span"
                        key={index + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedRow(row);
                          setErrMsg('');
                          setShowMoreInfoModal(true);
                        }}
                      >
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};

UpdateDeleteEvent.propTypes = {
  className: PropTypes.string
};

export default UpdateDeleteEvent;
