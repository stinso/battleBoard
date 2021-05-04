import React, { useEffect, useState } from 'react';
import { 
  Link as RouterLink,
  useLocation
} from 'react-router-dom';
import {
  Box,
  Card,
  Container,
  Divider,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';

// new
import * as Sentry from "@sentry/react";
import { getEventsService } from '../../service/node.service';
import {
  getGameFormatFromIndex
} from "../../utils/helpers.js";
import {getMyInfoService} from '../../service/node.service';
import {
  getTimeFromEpoch,
  getDateFromEpoch,
  calculateTotalPrizePool,
  getDuration
} from "../../utils/helpers";

const AllBetAmount = 'All Bet Amount';
const AllDates = 'All Dates';

const font = "'Saira', sans-serif";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    minWidth: '100%',
    paddingBottom: theme.spacing(3),
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

const events = [
  /* {
    id: "MW Warzone Kill Race FREE",
    format: "Warzone - Max Kills",
    participants: "16 of 30",
    startTime: "27th Mar 21:00 CET",
    entry: "Free",
    duration: "60 Min.",
    prizePool: "$28.50"
  } */
]

const LobbyView = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');

  // new
  const [lobbyData, setLobbyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allBetAmounts, setAllBetAmounts] = useState([]);
  const [betAmounts, setBetAmounts] = useState([]);
  const [selectedBetAmount, setSelectedBetAmount] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);

  

  const location = useLocation();
  const game = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  async function getLobbyData(){
    try{
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

      const { data } = await getEventsService({gameID})
      console.log('Data:')
      console.log(data)
      if (data.success === true && data.events?.length > 0) {
        console.log('true')
        const editedData = data.events.map((row, index) => {
          return {
            ...row,
            date: getDateFromEpoch(row.startTime),
            time: getTimeFromEpoch(row.startTime),
            noOfUsersEnrolled: row.noOfUsersEnrolled > row.maxUsers ? row.maxUsers : row.noOfUsersEnrolled, 
            duration: getDuration(row.startTime, row.endTime),
            betAmount: row.sponsored ? 'Free' : `$${(row.betAmount).toFixed(2)}`,
            prizePool: `$${(calculateTotalPrizePool(row.betAmount,
              row.maxUsers))}`,
          };
        })
        editedData.sort((firstRow, secondRow) => {
          if (firstRow.date === secondRow.date
            && firstRow.time === secondRow.time) {
              if (firstRow.betAmount === 'Free') {
                return -1
              }
              else if (secondRow.betAmount === 'Free') {
                return 1;
              }
              else {
                return parseInt(firstRow.betAmount.substring(1), 10) - parseInt(secondRow.betAmount.substring(1), 10)
              }
            }
          return 0;
        })
        console.log('edited Data:')
        console.log(editedData)
        setLobbyData(editedData)
        setSelectedBetAmount(AllBetAmount)
        setSelectedDate(AllDates)
        const allPossibleBetAmount = editedData.map((row) => row.betAmount)
        allPossibleBetAmount.sort(function (a, b) {
          if (a === 'Free') {
            return -1
          }
          else if (b === 'Free') {
            return 1;
          }
          else {
            return parseInt(a.substring(1), 10) - parseInt(b.substring(1), 10)
          }
        })
        setAllBetAmounts([AllBetAmount, ...new Set(allPossibleBetAmount)])
        setBetAmounts([AllBetAmount, ...new Set(allPossibleBetAmount)]);
        const allPossibleDates = editedData.map((row) => row.date)
        setAllDates([AllDates, ...new Set(allPossibleDates)])
        setDates([AllDates, ...new Set(allPossibleDates)]);
      } 
      setIsLoading(false);
    }
    catch (error) {
      console.log("🚀 ~ file: GameLobby.jsx ~ line 111 ~ getLobbyData ~ error", error)
      Sentry.captureException(error, {
        tags: {
            page: location.pathname,
        },
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
    getLobbyData();
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <Box ml={2} mt={5} mb={3}>
          <Typography
            display="inline"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            Upcoming Events
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
        <Card
          className={classes.card}
        >
          
            <Box minWidth={300} >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Event Name
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
                    <TableCell align="right">
                      Prize Pool
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lobbyData.map((entry) => {
                    return (
                      <TableRow
                        hover
                        key={entry.id}
                      >
                        <TableCell className={classes.rankCell}>
                          {entry.game}
                        </TableCell>
                        <TableCell>
                          {entry.gameFormat}
                        </TableCell>
                        <TableCell>
                          {entry.noOfUsersEnrolled}
                        </TableCell>
                        <TableCell>
                          {entry.date}
                        </TableCell>
                        <TableCell className={entry.betAmount == 'Free' ? classes.free : ''}>
                          {entry.betAmount}
                        </TableCell>
                        <TableCell>
                          {entry.duration}
                        </TableCell>
                        <TableCell className={classes.priceCell} align="right">
                          {entry.prizePool}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={12}
                labelRowsPerPage={'Rows per page'}
                /* onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange} */
                page={0}
                rowsPerPage={10}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Box>
          
        </Card>
      </Container>
    </div>
  );
};

export default LobbyView;
