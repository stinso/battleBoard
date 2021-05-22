import React, { useContext, useEffect, useState } from 'react';
import { 
  NavLink as RouterLink,
  useLocation
 } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Notification from './EthAddressNotLinkedNotification'
import {
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
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import Carousel from './Carousel'
import { AuthContext } from "../../../context/AuthContext";
import { getEventsService, getBalanceFromCS } from '../../../service/node.service';
import * as Sentry from "@sentry/react";
import { 
  getTimeFromEpoch, 
  getDateFromEpoch, 
  getGameFormatFromIndex,
  calculateTotalPrizePool,
  getDuration,
  formatInCHAIN
} from "../../../utils/helpers";
import { MAX_APPROVED_BALANCE } from "../../../config/constants";
import Wizard from '../../initialStepsWizard/index';

const font = "'Saira', sans-serif";

/* const events = [
    image: "/static/images/gameIcons/cod.jpg"
    image: "/static/images/gameIcons/apex.jpg"
    image: "/static/images/gameIcons/fifa.jpg"
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
    color: '#fff',
    margin: '0 15px',
    position: 'relative'
  },
  cardRight: {
    width: '100%',
    height: 248,
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
  media: {
    height: '100%',
  },
  tournamentBox: {
    width: '100%'
  },
  paper: {
    paddingTop: 20,
    paddingRight: 60,
    paddingLeft: 40,
    paddingBottom: 20,
    marginBottom: 40
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
  },
  hiddenText: {
    overflow: 'hidden'
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

const WizardEnums = {
  AccountLink: 0,
  Approve: 1,
  Deposit: 2,
  ConsoleLink: 3,
}

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const Hero = ({ className, ...rest }) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const theme = useTheme();
  const mediumDevice = useMediaQuery(theme.breakpoints.down('md'));
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  const { user } = useContext(AuthContext);
  const account = user.user?.session?.ethAddress;
  const [showNotification, setShowNotification] = useState(false);
  const [showWizardModal, setShowWizardModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(WizardEnums.AccountLink);

  useEffect(() => {
    if (!user.user.session?.ethAddress) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [user.user.session]);

  const getInfoFromAPI = async () => {
    try {
      const balanceInfo = await getBalanceFromCS({});
      if (balanceInfo.data.success) {
        const allowanceFormatInChain = formatInCHAIN(balanceInfo.data.token.allowance);
        const networkFormatInChain = formatInCHAIN(balanceInfo.data.token.total);
        
        if (account) {
          if (MAX_APPROVED_BALANCE > allowanceFormatInChain) {
            setCurrentStep(WizardEnums.Approve);
            console.log('1')
            setShowWizardModal(true);
          }
          else if (networkFormatInChain <= 0) {
            console.log('2')
            setCurrentStep(WizardEnums.Deposit);
            setShowWizardModal(true);
          }
          else {
            setCurrentStep(WizardEnums.ConsoleLink);
          }
        }
        else {
          setCurrentStep(WizardEnums.AccountLink)
          setShowWizardModal(true);
        }
      }
      
    }
    catch (error) {
      console.log("🚀 ~ file: Hero.js ~ line 331 ~ getInfoFromAPI ~ error", error)
      Sentry.captureException(error, {
        tags: {
          page: location.pathname,
        },
    });
    }
  };

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
    try {
      const {data} = await getEventsService({allGames:true});
      if (data.success === true && data.events?.length > 0) {
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
    catch(error) {
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
    getInfoFromAPI();
  }, []);

  return (
    <>
    {user.user.doNotShowWizard !== true && showWizardModal && 
      <Wizard
        showWizardModal={showWizardModal}
        setShowWizardModal={setShowWizardModal}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        WizardEnums={WizardEnums}
      />
    }
    <div
      className={clsx(classes.root, className)}
      {...rest}
    > 
      {/* Notification to register Ethereum Address */}
      {showNotification && (
        <Notification />
      )}
      {!mobileDevice &&
      <Paper className={classes.paper}>
        <Box className={classes.tournamentBox}>
          <Grid container spacing={1}>
            <Grid item xs={mediumDevice ? 12 : 6} >
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
                  className={classes.media}
                  image="/static/images/games/cod_coldWar.jpg"
                  title="cod"
                >
                  <Box className={classes.MediaCaptionLeft}>
                    <Grid container spacing={3}>
                      <Grid item xs={8} >
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
                      <Grid item xs={4} >
                        <Button className={classes.viewButtonLeft}
                          variant="contained"
                          size="large"
                          color="secondary"
                        >
                          VIEW TOURNAMENT
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardMedia>
              </Card>
            </Grid>
            {!mediumDevice &&
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
                          className={classes.media}
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
            }
          </Grid>
        </Box>
      </Paper>
      }
      <Container maxWidth="lg">
        <Box mt={3} mb={3} ml={2}>
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
        <Carousel/>
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
    </>
  );
};

Hero.propTypes = {
  className: PropTypes.string
};

export default Hero;
