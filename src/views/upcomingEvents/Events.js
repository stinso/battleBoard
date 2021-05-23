import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  Container,
  Divider,
  Tab,
  Tabs,
  Typography,
  Paper,
  makeStyles
} from '@material-ui/core';
import Countdown from "react-countdown";
//import path4 from "../../assets/img/path4.png";
import { AuthContext } from "../../context/AuthContext";
import { getMyEventsService } from '../../service/node.service';
import {
  formatEventStatus,
  getGameFormatFromIndex,
} from "../../utils/helpers";
//import { AfterCounterEndsComponent } from '../gameComponents/GameLobby';
import { AllSupportedGamesWithOtherAttributes } from '../../config/constants';
import { getMyTournamentsService } from '../../service/tournaments.service.js';
import EventsTable from './EventsTable'
import TournamentsTable from './TournamentsTable'
import * as Sentry from "@sentry/react";

const font = "'Saira', sans-serif";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: 200,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      paddingBottom: 60
    },
    margin: 0
  },
  waiting: {
    color: '#388e3c'
  },
  title: {
    fontFamily: font,
    fontSize: 40
  }
}));

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const Events = ({ className }) => {
  const classes = useStyles();
  const location = useLocation();

  const [events, setEvents] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [currentTab, setCurrentTab] = useState('events');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const username = user.user?.session?.username;

  const tabs = [
    { value: 'events', label: 'Events' },
    { value: 'tournaments', label: 'Tournaments' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  async function getUpcomingEvents(currentTab) {
    setIsLoading(true);
      if(username){
        try {
          let service = getMyEventsService;

          if (currentTab === 'tournaments') {
            service = getMyTournamentsService;
          }
            const {data} = await service({username: username })
          if (data.success === true && data.events?.length > 0) {
            
            const editedData = data.events.map((eventInfo) => {
              const game = AllSupportedGamesWithOtherAttributes.find((row)=> 
              {
                
                if (row.name === eventInfo.game) {
              
                  return row
                }
              })
                return {...eventInfo, gameShortName: game.shortName}
            })
            
            if (currentTab === 'events') {
              setEvents(editedData.reverse());
            }
            else {
              setTournaments(editedData.reverse());
            }
            } 
          }
          catch(error){
            console.log("🚀 ~ file: index.js ~ line 117 ~ getUpcomingEvents ~ error", error)
            Sentry.captureException(error, {
              tags: {
                  page: location.pathname,
              },
            });
          }
      }
      setIsLoading(false);
  }
  
  useEffect(() => {
    getUpcomingEvents(currentTab)
  }, [username, currentTab]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Box mt={3}>
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
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'events' && <EventsTable events={events} isLoading={isLoading} />}
          {currentTab === 'tournaments' && <TournamentsTable tournaments={tournaments} isLoading={isLoading} />}
        </Box>
      </Container>
    </div>
  );
};

Events.propTypes = {
  className: PropTypes.string
};

export default Events;
