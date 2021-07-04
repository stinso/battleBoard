import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
  getDateFromEpoch,
  getFormattedUserName,
  getGameFormatFromIndex,
  getTimeFromEpoch
} from '../../utils/helpers';
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
  noChallengesBox: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4)
  },
  formControl: {
    minWidth: 180,
    padding: 0,
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  noEventsText: {
    fontSize: 24
  }
}));

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const AllStatus = 'All Statuses';

const CompletedChallenges = ({ data, isLoading, user }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const username = user.user?.session?.username;
  const [allStatus, setAllStatus] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    data.sort(function (a, b) {
      return b.startTime - a.startTime;
    });
    setSelectedStatus(AllStatus);
    const allPossibleStatus = data.map((row) => row.status);
    setAllStatus([AllStatus, ...new Set(allPossibleStatus)]);
    setStatuses([AllStatus, ...new Set(allPossibleStatus)]);
  }, [data]);

  const onStatusDropdownClick = (row) => {
    setSelectedStatus(row.target.value);
    if (row.target.value === AllStatus) {
      setStatuses([...allStatus]);
    } else {
      setStatuses([row.target.value]);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedChallenges = applyPagination(
    data.filter((row) => statuses.includes(row.status)),
    page,
    limit
  );

  return (
    <Card>
      <Box minWidth={300}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="select-status-label">Select Status</InputLabel>
          <Select
            labelId="select-status-label"
            id="select-status"
            label="Select Status"
            value={selectedStatus}
            onChange={(e) => {
              onStatusDropdownClick(e);
            }}
          >
            {allStatus.map((row, index) => (
              <MenuItem key={index} value={row}>
                {row}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
                  <TableCell>Status</TableCell>
                  <TableCell>Event Details</TableCell>
                  <TableCell>Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedChallenges.map((entry) => {
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
                              {getFormattedUserName(entry.opponent.username, 9)}
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
                      <TableCell>{entry.status}</TableCell>
                      <TableCell>
                        <Typography
                          color="secondary"
                          to={`/gameInformationPage/${entry.id}`}
                          underline="always"
                          component={RouterLink}
                        >
                          Event
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          className={
                            entry.winner
                              ? entry.winner === username
                                ? classes.resultWon
                                : classes.resultLost
                              : classes.resultLost
                          }
                          variant="body2"
                        >
                          {entry.winner
                            ? entry.winner === username
                              ? 'Won'
                              : 'Lost'
                            : '--'}
                        </Typography>
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
  );
};

CompletedChallenges.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  user: PropTypes.object
};

export default CompletedChallenges;
