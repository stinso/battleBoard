import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Container, makeStyles } from '@material-ui/core';
import * as Sentry from '@sentry/react';
import { getEventsService } from '../../service/battleServerService';
import { getTournamentsService } from '../../service/tournaments.service.js';
import {
  getTimeFromEpoch,
  getDateFromEpoch,
  calculateTotalPrizePool,
  getDuration
} from '../../utils/helpers';
import Chat from '../chat/index';
import Events from './Events';
import Tournaments from './Tournaments';

const AllBetAmount = 'All Bet Amount';
const AllDates = 'All Dates';

const font = "'Saira', sans-serif";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    minWidth: '100%',
    paddingBottom: theme.spacing(3)
  },
  image: {
    width: '100vw'
  },
  free: {
    color: theme.palette.secondary.main
  },
  priceCell: {
    color: theme.palette.success.main
  },
  title: {
    fontFamily: font,
    fontSize: 40,
    position: 'relative',
    '&:before': {
      position: 'absolute',
      bottom: 8,
      left: -16,
      content: '" "',
      height: 40,
      width: 6,
      backgroundColor: theme.palette.secondary.main,
      marginRight: '20px'
    }
  }
}));

const TabEnums = {
  Events: 'Events',
  Tournaments: 'Tournaments'
};

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const LobbyView = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [allBetAmounts, setAllBetAmounts] = useState([]);
  const [betAmounts, setBetAmounts] = useState([]);
  const [selectedBetAmount, setSelectedBetAmount] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedTab, setSelectedTab] = useState(TabEnums.Events);

  const [events, setEvents] = useState([]);
  const [tournaments, setTournaments] = useState([]);

  const location = useLocation();
  const game = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  );

  async function getLobbyData(selectedTab) {
    setIsLoading(true);
    try {
      let gameID = 0;
      //TODO remove gameID hard coded below and send gameID of appropriate game like GameID for COD is 1
      switch (game) {
        case 'cod':
          gameID = 1;
          break;
        case 'madden2021':
          gameID = 2;
          break;
        case 'fifa':
          gameID = 3;
          break;
        default:
          gameID = 1;
          break;
      }

      let service = getEventsService;

      if (selectedTab === TabEnums.Tournaments) {
        service = getTournamentsService;
      }

      const { data } = await service({ gameID });
      if (data.success === true && data.events?.length > 0) {
        const editedData = data.events.map((row) => {
          return {
            ...row,
            date: getDateFromEpoch(row.startTime),
            time: getTimeFromEpoch(row.startTime),
            noOfUsersEnrolled:
              row.noOfUsersEnrolled > row.maxUsers
                ? row.maxUsers
                : row.noOfUsersEnrolled,
            duration: getDuration(row.startTime, row.endTime),
            betAmount: row.sponsored ? 'Free' : `$${row.betAmount.toFixed(2)}`,
            prizePool: `$${calculateTotalPrizePool(
              row.betAmount,
              row.maxUsers
            )}`
          };
        });
        editedData.sort((firstRow, secondRow) => {
          if (
            firstRow.date === secondRow.date &&
            firstRow.time === secondRow.time
          ) {
            if (firstRow.betAmount === 'Free') {
              return -1;
            } else if (secondRow.betAmount === 'Free') {
              return 1;
            } else {
              return (
                parseInt(firstRow.betAmount.substring(1), 10) -
                parseInt(secondRow.betAmount.substring(1), 10)
              );
            }
          }
          return 0;
        });
        if (selectedTab === TabEnums.Events) {
          setEvents(editedData);
        } else {
          setTournaments(editedData);
        }
        setSelectedBetAmount(AllBetAmount);
        setSelectedDate(AllDates);
        const allPossibleBetAmount = editedData.map((row) => row.betAmount);
        allPossibleBetAmount.sort(function (a, b) {
          if (a === 'Free') {
            return -1;
          } else if (b === 'Free') {
            return 1;
          } else {
            return parseInt(a.substring(1), 10) - parseInt(b.substring(1), 10);
          }
        });
        setAllBetAmounts([AllBetAmount, ...new Set(allPossibleBetAmount)]);
        setBetAmounts([AllBetAmount, ...new Set(allPossibleBetAmount)]);
        const allPossibleDates = editedData.map((row) => row.date);
        setAllDates([AllDates, ...new Set(allPossibleDates)]);
        setDates([AllDates, ...new Set(allPossibleDates)]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(
        '🚀 ~ file: GameLobby.jsx ~ line 111 ~ getLobbyData ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  }
  const onBetAmountDropdownClick = (row) => {
    setSelectedBetAmount(row.label);
    if (row.label === AllBetAmount) {
      setBetAmounts([...allBetAmounts]);
    } else {
      setBetAmounts([row.label]);
    }
  };
  const onDateDropdownClick = (row) => {
    setSelectedDate(row.label);
    if (row.label === AllDates) {
      setDates([...allDates]);
    } else {
      setDates([row.label]);
    }
  };

  useEffect(() => {
    getLobbyData(selectedTab);
  }, [selectedTab]);

  return (
    <>
      <Chat roomType={1} typeId={game} />
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" mt={2}>
          <Box mr={2}>
            <Button
              size="large"
              variant={
                selectedTab === TabEnums.Events ? 'contained' : 'outlined'
              }
              color="secondary"
              onClick={() => setSelectedTab(TabEnums.Events)}
            >
              Upcoming Events
            </Button>
          </Box>
          <Button
            size="large"
            variant={selectedTab === TabEnums.Events ? 'outlined' : 'contained'}
            color="secondary"
            onClick={() => setSelectedTab(TabEnums.Tournaments)}
          >
            Upcoming Tournaments
          </Button>
        </Box>
        {selectedTab === TabEnums.Events ? (
          <Events events={events} isLoading={isLoading} />
        ) : (
          <Tournaments tournaments={tournaments} isLoading={isLoading} />
        )}
      </Container>
    </>
  );
};

export default LobbyView;
