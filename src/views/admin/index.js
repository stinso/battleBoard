import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Monitor as MatchesIcon } from 'react-feather';
import { Link2 as NetworkIcon } from 'react-feather';
import { Users as FollowersIcon } from 'react-feather';
import { UserCheck as FollowingIcon } from 'react-feather';
import UpdateDeleteEvent from './UpdateDeleteEvent';
import Dispute from './Dispute';
import BannedPlayers from './BannedPlayers';
import NetworkClaims from './NetworkClaims';
import Page from 'src/components/Page';
import PerfectScrollbar from 'react-perfect-scrollbar';

const font = "'Saira', sans-serif";

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
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0
  },
  card: {
    minHeight: '200px',
    padding: theme.spacing(4)
  },
  title: {
    fontFamily: font,
    fontSize: 32
  },
  button: {
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    marginTop: theme.spacing(1)
  },
  active: {
    color: theme.palette.secondary.main
  }
}));

const tabs = {
  Event: 1,
  RecurEvent: 2,
  Dispute: 3,
  BannedPlayers: 4,
  NetworkClaims: 5
};

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState(tabs.Event);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <PerfectScrollbar>
      <Page className={classes.root} title="Admin Panel">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
              <Card className={classes.card}>
                <Box marginTop={2}>
                  <List>
                    <ListItem className={classes.item}>
                      <Button
                        className={`${classes.button} ${
                          currentTab === tabs.Event && classes.active
                        }`}
                        size="large"
                        variant="text"
                        onClick={(e) => handleTabsChange(e, tabs.Event)}
                        startIcon={
                          <SvgIcon fontSize="small">
                            <MatchesIcon />
                          </SvgIcon>
                        }
                      >
                        Events
                      </Button>
                    </ListItem>
                    <Divider />
                    <ListItem className={classes.item}>
                      <Button
                        className={`${classes.button} ${
                          currentTab === tabs.RecurEvent && classes.active
                        }`}
                        size="large"
                        variant="text"
                        onClick={(e) => handleTabsChange(e, tabs.RecurEvent)}
                        startIcon={
                          <SvgIcon fontSize="small">
                            <NetworkIcon />
                          </SvgIcon>
                        }
                      >
                        Recuring Events
                      </Button>
                    </ListItem>
                    <Divider />
                    <ListItem className={classes.item}>
                      <Button
                        className={`${classes.button} ${
                          currentTab === tabs.Dispute && classes.active
                        }`}
                        size="large"
                        variant="text"
                        onClick={(e) => handleTabsChange(e, tabs.Dispute)}
                        startIcon={
                          <SvgIcon fontSize="small">
                            <FollowersIcon />
                          </SvgIcon>
                        }
                      >
                        Disputes
                      </Button>
                    </ListItem>
                    <Divider />
                    <ListItem className={classes.item}>
                      <Button
                        className={`${classes.button} ${
                          currentTab === tabs.BannedPlayers && classes.active
                        }`}
                        size="large"
                        variant="text"
                        onClick={(e) => handleTabsChange(e, tabs.BannedPlayers)}
                        startIcon={
                          <SvgIcon fontSize="small">
                            <FollowingIcon />
                          </SvgIcon>
                        }
                      >
                        Banned Players
                      </Button>
                    </ListItem>
                    <ListItem className={classes.item}>
                      <Button
                        className={`${classes.button} ${
                          currentTab === tabs.NetworkClaims && classes.active
                        }`}
                        size="large"
                        variant="text"
                        onClick={(e) => handleTabsChange(e, tabs.NetworkClaims)}
                        startIcon={
                          <SvgIcon fontSize="small">
                            <FollowingIcon />
                          </SvgIcon>
                        }
                      >
                        Network Claims
                      </Button>
                    </ListItem>
                  </List>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} lg={9}>
              <Card className={classes.card}>
                <Box minWidth={300}>
                  {currentTab === tabs.Event && (
                    <UpdateDeleteEvent isRecurringEvent={false} />
                  )}
                  {currentTab === tabs.RecurEvent && (
                    <UpdateDeleteEvent isRecurringEvent={true} />
                  )}
                  {currentTab === tabs.Dispute && <Dispute />}
                  {currentTab === tabs.BannedPlayers && <BannedPlayers />}
                  {currentTab === tabs.NetworkClaims && <NetworkClaims />}
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </PerfectScrollbar>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
