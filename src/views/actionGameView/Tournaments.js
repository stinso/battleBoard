import React, { useState } from 'react';
import {
  Box,
  Button,
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
import {
  getTimeFromEpoch,
  getDateFromEpoch,
  calculateTotalPrizePool,
  getDuration,
  getGameFormatFromIndex
} from '../../utils/helpers';
import { useHistory } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import DeviceIconAndName from '../gameInfo/DeviceIconAndName';

const useStyles = makeStyles((theme) => ({
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
  },
  noEvents: {
    minHeight: '100px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  noEventsText: {
    fontSize: 32
  },
  fetching: {
    fontSize: 20
  }
}));

const font = "'Saira', sans-serif";

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const Events = ({ tournaments, isLoading }) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const history = useHistory();

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const handleRowClick = (id) => {
    history.push('/gameInformationPage/' + id);
  };

  const filterEvents = () => {
    const result = tournaments.filter((event) => {
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
  const paginatedLobbyData = applyPagination(filteredEvents, page, limit);

  return (
    <>
      <Box ml={2} mt={5} mb={3}>
        <Typography
          display="inline"
          variant="h2"
          color="textPrimary"
          className={classes.title}
        >
          Upcoming Tournaments
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
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <Divider />
      </Box>
      {tournaments?.length > 0 ? (
        <>
          <Card className={classes.card}>
            <Box minWidth={300}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tournaments Name</TableCell>
                    <TableCell>Game Format</TableCell>
                    {tournaments[0].deviceID && <TableCell>Console</TableCell>}
                    <TableCell>Participants</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Entry</TableCell>
                    <TableCell align="right">Prize Pool</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedLobbyData.map((entry) => {
                    return (
                      <TableRow
                        hover
                        key={entry.id}
                        onClick={() => handleRowClick(entry.id)}
                      >
                        <TableCell className={classes.rankCell}>
                          {entry.name}
                        </TableCell>
                        <TableCell>
                          {getGameFormatFromIndex(entry.game, entry.gameFormat)}
                        </TableCell>
                        {entry.deviceID && (
                          <TableCell>
                            <DeviceIconAndName deviceID={entry.deviceID} />
                          </TableCell>
                        )}
                        <TableCell>
                          {`${entry.noOfUsersEnrolled} of ${entry.maxUsers}`}
                        </TableCell>
                        <TableCell>{`${entry.date} ${entry.time}`}</TableCell>
                        <TableCell
                          className={
                            entry.betAmount == 'Free' ? classes.free : ''
                          }
                        >
                          {entry.betAmount}
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
        </>
      ) : (
        <Card className={classes.noEvents}>
          <Box>
            {isLoading ? (
              <>
                <Box display="flex" justifyContent="center">
                  <Typography variant="h5" className={classes.fetching}>
                    Fetching Upcoming Tournaments
                  </Typography>
                </Box>
                <Box>
                  <LoadingScreen width={200} />
                </Box>
              </>
            ) : (
              <Typography variant="h5" className={classes.noEventsText}>
                No Upcoming Tournaments
              </Typography>
            )}
          </Box>
        </Card>
      )}
    </>
  );
};

export default Events;
