import { useEffect, useState, useContext, useCallback, Fragment } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  calculateTotalPrizePool,
  calIndividualPrize,
  getTimeFromEpoch
} from '../../utils/helpers.js';
import Countdown, { zeroPad } from 'react-countdown';
import useInterval from '../../hooks/useInterval';
import defaultAvatar from '../../assets/img/placeholder.jpg';
import moment from 'moment';
import {
  getLiveStatsFromID,
  getEventDetailsFromId
} from '../../service/battleServerService';
import * as Sentry from '@sentry/react';
import Chat from '../chat/index';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import LoadingScreen from 'src/components/LoadingScreen';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Page from 'src/components/Page';

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
  fetching: {
    fontSize: 20
  },
  gridItem: {
    marginTop: 5
  },
  title: {
    fontSize: 40,
    marginBottom: theme.spacing(2)
  }
}));

const PollingMinutes = 5;

const EVENT_STATUS_ENUM = {
  NOT_STARTED: 'Not Started',
  ONGOING: 'ongoing',
  ENDED_WINNER_DECLARED_SOON: `Event has ended. We're collecting stats from the warzone matches that are still running. Winners will be declared at approximately`,
  ENDED: 'ended'
};

const LiveStats = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [timeObject, setTimeObject] = useState({
    showTimer: false,
    showUpdating: false
  });
  const [data, setData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [eventStatus, setEventStatus] = useState(EVENT_STATUS_ENUM.ONGOING);
  const [errMsg, setErrMsg] = useState('');
  const [showWhichStats, setShowWhichStats] = useState('KDRatio');
  const [isLoading, setIsLoading] = useState(true);

  const getEventStatus = (startTime, endTime) => {
    let temporaryEventStatus = '';
    if (startTime <= moment().unix() && endTime >= moment().unix()) {
      temporaryEventStatus = EVENT_STATUS_ENUM.ONGOING;
    } else if (startTime > moment().unix()) {
      temporaryEventStatus = EVENT_STATUS_ENUM.NOT_STARTED;
    } else if (endTime < moment().unix() && endTime + 3600 > moment().unix()) {
      temporaryEventStatus = EVENT_STATUS_ENUM.ENDED_WINNER_DECLARED_SOON;
    } else if (endTime < moment().unix()) {
      temporaryEventStatus = EVENT_STATUS_ENUM.ENDED;
    }
    setEventStatus(temporaryEventStatus);
    return temporaryEventStatus;
  };

  const getStatsKey = (gameFormat) => {
    switch (gameFormat) {
      case 0:
        setShowWhichStats('kills');
        return;
      case 1:
        setShowWhichStats('score');
        return;
      case 2:
        setShowWhichStats('headshots');
        return;
      case 4:
        setShowWhichStats('KDRatio');
        return;
    }
  };

  const getEventDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await getEventDetailsFromId({ eventID: parseInt(id) });
      if (data.success === true) {
        const { betAmount, playersEnrolled } = data.events;
        const totalPrize = playersEnrolled
          ? calculateTotalPrizePool(betAmount, playersEnrolled.length)
          : 0;
        setEventData({ ...data.events, totalPrize: totalPrize });
        getStatsKey(data?.events.gameFormat);
        await callEventStatsAPI({ ...data?.events, totalPrize: totalPrize });
        const status = getEventStatus(
          data?.events.startTime,
          data?.events.endTime
        );
        if (
          status === EVENT_STATUS_ENUM.ONGOING ||
          status === EVENT_STATUS_ENUM.ENDED_WINNER_DECLARED_SOON
        ) {
          setTimeObject({
            showTimer: true,
            time: Date.now() + PollingMinutes * 60 * 1000,
            showUpdating: false
          });
        } else if (status === EVENT_STATUS_ENUM.ENDED) {
          setTimeObject({ showTimer: false, showUpdating: false });
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: index.js ~ line 115 ~ getEventDetails ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
    setIsLoading(false);
  };
  const callEventStatsAPI = async ({
    maxWinners,
    betAmount,
    sponsored,
    totalPrize
  }) => {
    setErrMsg('');
    try {
      const { data } = await getLiveStatsFromID({ eventID: parseInt(id) });
      if (data.success === true) {
        let rank = 1;
        let totalPrizePool = 0;
        if (!sponsored) {
          totalPrizePool = totalPrize;
        } else {
          totalPrizePool = calculateTotalPrizePool(
            betAmount,
            data.eligible.length
          );
        }
        let { rewardsDistribution } = data;
        if (!rewardsDistribution) {
          rewardsDistribution = [];
        }
        setData([
          ...data.eligible.map((row, index) => {
            const { kills, deaths } = row.stats;
            const kd = deaths > 0 ? kills / deaths : kills;
            let data = {
              ...row,
              rank: rank > maxWinners ? '--' : rank,
              stats: {
                ...row.stats,
                KDRatio: kd.toFixed(4)
              },
              winnings: rewardsDistribution[index]
                ? calIndividualPrize(rewardsDistribution[index], totalPrizePool)
                : 0.0
            };
            if (row.username === user.user?.session?.username) {
              data = { ...data, isLoggedInUser: true };
            }
            rank++;
            return data;
          }),
          ...data.nonEligible.map((row) => {
            const { kills, deaths } = row.stats;
            const kd = deaths > 0 ? kills / deaths : kills;
            let data = {
              ...row,
              rank: '--',
              stats: {
                ...row.stats,
                KDRatio: kd.toFixed(4)
              }
            };
            if (row.username === user.user?.session?.username) {
              data = { ...data, isLoggedInUser: true };
            }
            return data;
          })
        ]);
      }
    } catch (error) {
      console.log('🚀 ~ file: index.js ~ line 188 ~ LiveStats ~ error', error);
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
      setTimeObject({
        showTimer: false,
        showUpdating: false
      });
      if (error.response) {
        setErrMsg(error.response.data.error);
      }
    }
    return;
  };

  const eventStatsPolling = async () => {
    setTimeObject({
      showTimer: false,
      showUpdating: true
    });
    await callEventStatsAPI(eventData);
    setTimeObject({
      showTimer: true,
      time: Date.now() + PollingMinutes * 60 * 1000,
      showUpdating: false
    });
  };

  useEffect(() => {
    async function getData() {
      await getEventDetails();
    }
    if (id) {
      getData();
    }
  }, []);

  useInterval(() => {
    if (
      [
        EVENT_STATUS_ENUM.ONGOING,
        EVENT_STATUS_ENUM.ENDED_WINNER_DECLARED_SOON
      ].includes(getEventStatus(eventData.startTime, eventData.endTime))
    ) {
      eventStatsPolling();
    } else if (
      getEventStatus(eventData.startTime, eventData.endTime) ===
      EVENT_STATUS_ENUM.NOT_STARTED
    ) {
      getEventDetails();
      setTimeObject({ showTimer: false, showUpdating: false });
    } else {
      setTimeObject({ showTimer: false, showUpdating: false });
    }
  }, PollingMinutes * 60 * 1000);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setTimeObject({
        showTimer: true,
        showUpdating: false,
        time: Date.now() + PollingMinutes * 60 * 1000
      });
      return null;
    } else {
      return (
        <Box>
          <Typography variant="body2">Updating</Typography>
          <br />
          <Box display="flex" justifyContent="center">
            <Typography variant="body2">
              {zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}
            </Typography>
          </Box>
        </Box>
      );
    }
  };

  const timeDisplay = () => {
    if (timeObject.showUpdating) {
      return (
        <>
          <Box display="flex" justifyContent="center">
            <Typography variant="h5" className={classes.fetching}>
              Updating
            </Typography>
          </Box>
          <Box>
            <LoadingScreen width={200} />
          </Box>
        </>
      );
    } else if (timeObject.showTimer) {
      return (
        <Countdown
          date={timeObject.time}
          key={timeObject.time}
          renderer={renderer}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <PerfectScrollbar>
      <Page className={classes.root} title="Live Stats">
        <Container maxWidth="lg">
          <Chat roomType={2} typeId={id} />
          <Typography
            className={classes.title}
            variant="h5"
            color="textPrimary"
          >
            Live Stats
          </Typography>

          <Grid container justify="center">
            <Grid item md={12} className={classes.gridItem}>
              <Card>
                <CardHeader>
                  <Typography variant="h2">Event Live Stats</Typography>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <>
                      <Box display="flex" justifyContent="center">
                        <Typography variant="h5" className={classes.fetching}>
                          Updating
                        </Typography>
                      </Box>
                      <Box>
                        <LoadingScreen width={200} />
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box display="flex" justifyContent="center">
                        <Typography
                          variant="body1"
                          color="secondary"
                          component="div"
                        >
                          <Box fontWeight="fontWeightBold">
                            EVENT STATUS:&nbsp;
                          </Box>
                        </Typography>
                        <Typography variant="body1" color="secondary">
                          {eventStatus}{' '}
                          {` ${
                            EVENT_STATUS_ENUM.ENDED_WINNER_DECLARED_SOON ===
                            eventStatus
                              ? getTimeFromEpoch(eventData.endTime + 3600)
                              : ''
                          }`}
                        </Typography>
                      </Box>
                      {errMsg !== '' && (
                        <Box display="flex" justifyContent="center">
                          <Typography variant="body1" color="error">
                            {errMsg}
                          </Typography>
                        </Box>
                      )}
                      {data.length > 0 ? (
                        <Box
                          minWidth={300}
                          display="flex"
                          justifyContent="center"
                        >
                          {(timeObject.showTimer || timeObject.showUpdating) &&
                            timeDisplay(timeObject)}
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Avatar</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>{showWhichStats}</TableCell>
                                <TableCell>Rank</TableCell>
                                <TableCell>
                                  {`${
                                    [
                                      EVENT_STATUS_ENUM.ONGOING,
                                      EVENT_STATUS_ENUM.ENDED_WINNER_DECLARED_SOON
                                    ].includes(eventStatus)
                                      ? 'Projected  '
                                      : ''
                                  }` + `Winnings`}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data.map((row, index) => (
                                <TableRow
                                  key={row.username}
                                  onClick={() => {
                                    history.push(`/profile/${row.username}`);
                                  }}
                                >
                                  <TableCell>
                                    <Avatar
                                      alt="profile image"
                                      src={
                                        row.dpHigh ? row.dpHigh : defaultAvatar
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>{row.username}</TableCell>
                                  <TableCell>
                                    {row.stats[showWhichStats]}
                                  </TableCell>
                                  <TableCell>{row.rank}</TableCell>
                                  <TableCell>
                                    {row.winnings ? row.winnings : '0.00'}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          <Box display="flex" justifyContent="center" mt={2}>
                            <Typography>
                              Note: Ranked players are eligible to win CHAIN
                              tokens
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Box display="flex" justifyContent="center" mt={2}>
                          <Typography>No Data Found</Typography>
                        </Box>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </PerfectScrollbar>
  );
};

export default LiveStats;
