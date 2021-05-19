import React, { useEffect, useState, useCallback } from 'react';
import { 
  NavLink as RouterLink,
  useLocation
 } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { THEMES } from 'src/constants';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { axios } from 'src/utils/axiosHook';
import { useDispatch, useSelector } from 'src/store';
import Carousel from 'react-material-ui-carousel'
import Example from 'src/components/Example'
import { findLastIndex } from 'lodash';
import { getEventsService } from '../../../service/node.service';
import * as Sentry from "@sentry/react";
import { 
  getTimeFromEpoch, 
  getDateFromEpoch, 
  getGameFormatFromIndex,
  calculateTotalPrizePool,
  getDuration
} from "../../../utils/helpers";

const font = "'Saira', sans-serif";

/* const events = [
  {
    id: "MW Warzone Kill Race FREE 0",
    format: "Warzone - Max Kills",
    participants: "16 of 30",
    startTime: "27th Mar 21:00 CET",
    entry: "Free",
    duration: "60 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/cod.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE 1",
    format: "Warzone - Max Kills",
    participants: "11 of 30",
    startTime: "27th Mar 19:00 CET",
    entry: "$1.00",
    duration: "120 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/cod.jpg"
  },
  {
    id: "MW Warzone Headshots 2",
    format: "Apex - Most Headshots",
    participants: "7 of 30",
    startTime: "27th Mar 20:00 CET",
    entry: "$1.00",
    duration: "60 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/apex.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE 3",
    format: "Fifa - Winner",
    participants: "1 of 2",
    startTime: "28th Mar 21:00 CET",
    entry: "Free",
    duration: "15 Min.",
    prizePool: "$20",
    image: "/static/images/gameIcons/fifa.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE 4",
    format: "Fifa - Winner",
    participants: "1 of 2",
    startTime: "28th Mar 21:00 CET",
    entry: "$10.00",
    duration: "15 Min.",
    prizePool: "$20",
    image: "/static/images/gameIcons/fifa.jpg"
  },
  {
    id: "MW Warzone Headshots 5",
    format: "Warzone - Most Headshots",
    participants: "0 of 30",
    startTime: "28th Mar 21:00 CET",
    entry: "$1.00",
    duration: "60 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/cod.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE 6",
    format: "Fifa - Winner",
    participants: "1 of 2",
    startTime: "28th Mar 21:00 CET",
    entry: "Free",
    duration: "15 Min.",
    prizePool: "$20",
    image: "/static/images/gameIcons/fifa.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE 7",
    format: "Apex - Max Kills",
    participants: "1 of 30",
    startTime: "29th Mar 21:00 CET",
    entry: "$1.00",
    duration: "60 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/apex.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE 8",
    format: "Warzone - Max Kills",
    participants: "5 of 30",
    startTime: "29th Mar 19:00 CET",
    entry: "$1.00",
    duration: "120 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/cod.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE 9",
    format: "Fifa - Winner",
    participants: "1 of 2",
    startTime: "28th Mar 21:00 CET",
    entry: "Free",
    duration: "15 Min.",
    prizePool: "$20",
    image: "/static/images/gameIcons/fifa.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE 10",
    format: "Fifa - Winner",
    participants: "1 of 2",
    startTime: "28th Mar 21:00 CET",
    entry: "Free",
    duration: "15 Min.",
    prizePool: "$20",
    image: "/static/images/gameIcons/fifa.jpg"
  }
] */


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: 200,
    minHeight: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      paddingBottom: 60
    },
    margin: 0
  },
  button: {
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%'
  },
  card: {
    width: '100%',
    height: 320,
    backgroundColor: '#00008B',
    color: '#fff',
    margin: '0 15px'
  },
  image: {
    height: 320,
    backgroundColor: theme.palette.background.dark
  },
  title: {
    position: 'relative',
    '&:before': {
      position: 'absolute',
      bottom: -2,
      left: -16,
      content: '" "',
      height: 62,
      width: 6,
      backgroundColor: theme.palette.secondary.main,
      marginRight: '20px'
    }
  },
  cardLeft: {
    width: '100%',
    height: 502,
    backgroundColor: '#00008B',
    color: '#fff',
    margin: '0 15px',
    position: 'relative'
  },
  cardRight: {
    width: '100%',
    height: 248,
    backgroundColor: '#00008B',
    color: '#fff',
    margin: '0 15px',
    position: 'relative'
  },
  pricePool: {
    position: 'absolute',
    top: 0,
    right: 0,

    paddingRight: '15px',
    paddingBottom: '10px',
    color: 'white',
    fontFamily: font,
    fontSize: 60,
    '&:before': {
      position: 'absolute',
      bottom: -2,
      right: 0,
      paddingRight: '18px',
      content: '"PRICE"',
      fontSize: 20
    }
  },
  pricePoolRight: {
    position: 'absolute',
    top: 0,
    right: 0,

    paddingRight: '15px',
    paddingBottom: '10px',
    color: 'white',
    fontFamily: font,
    fontSize: 40,
    '&:before': {
      position: 'absolute',
      bottom: 2,
      right: 0,
      paddingRight: '18px',
      content: '"PRICE"',
      fontSize: 16
    }
  },
  mediaLeft: {
    height: '100%'
  },
  mediaRight: {
    height: '100%'
  },
  tournamentBox: {
    width: '100%',
    display: "flex"
  },
  paper: {
    paddingTop: 20,
    paddingRight: 60,
    paddingLeft: 40,
    paddingBottom: 20,
    marginBottom: 60
  },
  MediaCaption: {
    position: 'absolute',
    bottom: 0,

    paddingLeft: '15px',
    paddingBottom: '10px',
    paddingTop: '10px',

    backgroundColor: 'black',
    color: 'white',
    opacity: 0.8,

    width: '100%',
    height: '30%'    
  },
  MediaCaptionLeft: {
    position: 'absolute',
    bottom: 0,

    paddingLeft: '30px',
    paddingBottom: '10px',
    paddingTop: '36px',

    backgroundColor: 'black',
    color: 'white',
    opacity: 0.8,

    width: '100%',
    height: '24%'    
  },
  viewButtonRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: theme.palette.secondary.main
  },
  viewButtonLeft: {
    position: 'absolute',
    bottom: 16,
    right: 16
  },
  gamesTitle: {
    fontFamily: font,
    fontSize: 40
  },
  priceCell: {
    color: theme.palette.success.main
  },
  avatar: {
    height: 100,
    width: 100
  },
  rowImage: {
    height: '60px',
    width: '60px',
    margin: 0,
    padding: 0,
    verticalAlign: 'top'
  },
  imageCell: {
    height: '60px',
    width: '60px',
    padding: 0
  },
  tableRow: {
    height: '60px',
    padding: 0
  },
  entry: {
    fontFamily: font,
    fontSize: 20,
    color: theme.palette.secondary.main
  }
}));

const tournaments = [
  {
    id: 0,
    game: "Cod",
    tournamentStyle: "COMMUNITY TOURNAMENT",
    date: "MAR29, 2:00 PM PST",
    description: "$10 Free Entry 3v3 Best of 1",
    image: "/static/images/games/cod_coldWar.jpg",
    entry: "$10"
  },
  {
    id: 1,
    game: "NBA",
    tournamentStyle: "COMMUNITY TOURNAMENT",
    date: "MAR29, 2:00 PM PST",
    description: "$10 Free Entry 3v3 Best of 1",
    image: "/static/images/games/nba.jpg",
    entry: "$16"
  },
  {
    id: 2,
    game: "NBA",
    tournamentStyle: "COMMUNITY TOURNAMENT",
    date: "MAR29, 2:00 PM PST",
    description: "$10 Free Entry 3v3 Best of 1",
    image: "/static/images/games/nba.jpg",
    entry: "$10"
  },
  {
    id: 3,
    game: "Cod",
    tournamentStyle: "COMMUNITY TOURNAMENT",
    date: "MAR29, 2:00 PM PST",
    description: "$10 Free Entry 3v3 Best of 1",
    image: "/static/images/games/cod_coldWar.jpg",
    entry: "$10"
  }
]

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const Hero = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [events, setEvents] = useState([]);
  const location = useLocation();

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' }
  ];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const filterEvents = () => {
    const result = events.filter(event => {
      if (currentTab === 'free') {
        if (event.entry === 'Free') {
          return true;
        }
      } else if (currentTab === 'paid') {
        if (event.entry !== 'Free') {
          return true;
        }
      } else {
        return true;
      }
    });

    return result;
  };

  const filteredEvents = filterEvents();
  const paginatedEvents = applyPagination(filteredEvents, page, limit);

  const getEvents = async () => {
    try{
      const {data} = await getEventsService({allGames:true})
      console.log(data)
      if(data.success === true && data.events?.length > 0){
        setEvents(data.events.map((row) => {
          return {
            ...row,
            date: getDateFromEpoch(row.startTime),
            time: getTimeFromEpoch(row.startTime),
            duration: getDuration(row.startTime, row.endTime),
            gameFormat: getGameFormatFromIndex(row.game, row.gameFormat),
            noOfUsersEnrolled: row.noOfUsersEnrolled > row.maxUsers ? row.maxUsers : row.noOfUsersEnrolled, 
            betAmount: row.sponsored ? 'Free' : `$${(row.betAmount).toFixed(2)}`,
            prizePool: `$${(calculateTotalPrizePool(row.betAmount,
              row.maxUsers))}`,
          }
        }))
      }
    }
    catch(error){
      console.log("🚀 ~ file: Hero.js ~ line 432 ~ getEvents ~ error", error)
      Sentry.captureException(error, {
        tags: {
            page: location.pathname,
        },
      });
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    > 
      <Paper className={classes.paper}>
        <Box className={classes.tournamentBox}>
          <Grid container spacing={1}>
            <Grid item xs={6} >
              <Card raised className={classes.cardLeft}>
                <Typography
                  variant="h6"
                  color="secondary"
                  className={classes.pricePool}
                  fontFamily={font}
                >
                  $10
                </Typography>
                <CardMedia
                  className={classes.mediaLeft}
                  image="/static/images/games/cod_coldWar.jpg"
                  title="title"
                >
                  <Box className={classes.MediaCaptionLeft}>
                    <Grid container spacing={3}>
                      <Grid item xs={6} >
                        <Grid item xs={12} >
                          <Typography
                            variant="h4"
                            color="secondary"
                          >
                            COMMUNITY TOURNAMENT
                          </Typography>
                        </Grid>
                        <Grid item xs={12} >
                          <Typography
                            variant="h4"
                            color="textPrimary"
                          >
                            MAR 29, 2:00 PM PST
                          </Typography>
                        </Grid>
                        <Grid item xs={12} >
                          <Typography
                            variant="h3"
                            color="textPrimary"
                          >
                            $10 Free Entry 3v3 Best of 1
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Button className={classes.viewButtonLeft}
                    variant="contained"
                    size="large"
                    color="secondary"
                  >
                    VIEW TOURNAMENT
                  </Button>
                </CardMedia>
              </Card>
            </Grid>
            <Grid item container xs={6} spacing={1}>
            {
              tournaments.map((tournament) => {
                return(
                  <Grid item xs={6} key={tournament.id}>
                    <Card raised className={classes.cardRight}>
                    <Typography
                      variant="h6"
                      color="secondary"
                      className={classes.pricePoolRight}
                      fontFamily={font}
                    >
                      {tournament.entry}
                    </Typography>
                      <CardMedia
                        className={classes.mediaRight}
                        image={tournament.image}
                        title={tournament.game}
                      >
                        <Box className={classes.MediaCaption}>
                          <Grid container spacing={1}>
                            <Grid item xs={9} >
                              <Grid item xs={12} >
                                <Typography
                                  variant="body2"
                                  color="secondary"
                                >
                                  {tournament.tournamentStyle}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} >
                                <Typography
                                  variant="body2"
                                  color="textPrimary"
                                >
                                  {tournament.date}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} >
                                <Typography
                                  variant="body1"
                                  color="textPrimary"
                                >
                                  {tournament.description}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                        <Button className={classes.viewButtonRight}
                          variant="outlined"
                          size="small"
                          color="secondary"
                        >
                          VIEW
                        </Button>
                      </CardMedia>
                    </Card>
                  </Grid>
                )
              })
            }
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Container maxWidth="lg">
        <Box mb={3} ml={2}>
          <Typography
            variant="h1"
            color="textPrimary"
            className={classes.gamesTitle}
          >
            GAMES
          </Typography>
          <Typography
            className={classes.title}
            variant="h5"
            color="textPrimary"
          >
            Select a game and choose how you want to play.
          </Typography>
        </Box>
        <Example/>
      </Container>
      <Container maxWidth="lg">
        <Box ml={2} mt={10} mb={3}>
          <Typography
            display="inline"
            variant="h2"
            color="textPrimary"
            className={classes.gamesTitle}
          >
            Tournaments
          </Typography>
          <Typography
            className={classes.title}
            variant="h5"
            color="textPrimary"
          >
            Here you can find all upcoming tournaments.
          </Typography>
        </Box>
        <Box mt={1} mb={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="secondary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider />
        </Box>
        <Card>
            <Box minWidth={300} >
              <Table>
                <TableHead>
                  <TableRow >
                    <TableCell>
                      Game
                    </TableCell>
                    <TableCell>
                      Game Format
                    </TableCell>
                    <TableCell>
                      Participants
                    </TableCell>
                    <TableCell>
                      Start Time
                    </TableCell>
                    <TableCell>
                      Entry
                    </TableCell>
                    <TableCell>
                      Duration
                    </TableCell>
                    <TableCell>
                      Prize Pool
                    </TableCell>
                    <TableCell align="center">
                      Join
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedEvents.map((entry) => {
                    return (
                      <TableRow
                        spacing={0}
                        hover
                        key={entry.id}
                      >
                        <TableCell className={classes.imageCell} align='center' padding='none'>
                            <img className={classes.rowImage}
                              src={entry.image}
                            />
                        </TableCell>
                        <TableCell>
                          {/* getGameFormatFromIndex(entry.game ,entry.gameFormat) */}
                          {entry.gameFormat}
                        </TableCell>
                        <TableCell>
                          {`${entry.noOfUsersEnrolled} of ${entry.maxUsers}`} 
                        </TableCell>
                        <TableCell>
                          {`${entry.date} ${entry.time}`}
                        </TableCell>
                        <TableCell className={classes.entry}>
                          {entry.betAmount}
                        </TableCell>
                        <TableCell>
                          {`${entry.duration} min`}
                        </TableCell>
                        <TableCell className={classes.priceCell}>
                          {entry.prizePool}
                        </TableCell>
                        <TableCell className={classes.priceCell} align="center">
                          <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            component={RouterLink}
                            to={`/gameInformationPage/${entry.id}`}
                          >
                            JOIN
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={filteredEvents.length}
                labelRowsPerPage={'Rows per page'}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Box>
        </Card>
      </Container>
    </div>
  );
};

Hero.propTypes = {
  className: PropTypes.string
};

export default Hero;
