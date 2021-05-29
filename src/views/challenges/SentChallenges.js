import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Link,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Typography,
  makeStyles,
  Dialog
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {
  getDateFromEpoch,
  getFormattedUserName,
  getGameFormatFromIndex,
  getTimeFromEpoch
} from '../../utils/helpers';

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
  }
}));

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const SentChallenges = ({ data, isLoading, cancelChallenge, ChallengesEnums }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [allStatus, setAllStatus] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedChallenges = applyPagination(data, page, limit);
  return (
    <Card>
      <Box minWidth={300}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Opponent</TableCell>
              <TableCell>Game</TableCell>
              <TableCell>Game Format</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Bet Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedChallenges.map((entry, index) => {
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
                  <TableCell>
                    <Button 
                      variant="outlined"
                      id={'Cancel' + index}
                      color="secondary"
                      onClick={async (e) => {
                          e.preventDefault();
                          await cancelChallenge(
                              { challengeID: entry.id, },
                              ChallengesEnums.Sent,
                              entry.startTime,
                          )
                      }}
                    >
                      CANCEL
                    </Button>
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
      </Box>
    </Card>
  );
};

SentChallenges.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  cancelChallenge: PropTypes.func
};

export default SentChallenges;
