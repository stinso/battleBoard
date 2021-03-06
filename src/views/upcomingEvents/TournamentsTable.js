import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  FormControl,
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
  AllSupportedGamesNames,
  AllSupportedGamesWithOtherAttributes
} from '../../config/constants.js';
import { getHistoricalEventsService } from '../../service/centralServerService';
import {
  getTimeFromEpoch,
  getDateFromEpoch,
  formatEventStatus,
  getGameFormatFromIndex
} from '../../utils/helpers';
import LoadingScreen from 'src/components/LoadingScreen';

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
  card: {
    minHeight: '200px',
    padding: theme.spacing(4)
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  rowImage: {
    height: '48px',
    width: '48px',
    margin: 0,
    padding: 0,
    verticalAlign: 'top'
  },
  imageCell: {
    height: '48px',
    width: '48px',
    padding: 0
  },
  accordion: {
    marginTop: theme.spacing(4)
  },
  title: {
    fontFamily: font,
    fontSize: 32
  },
  userName: {
    fontFamily: font,
    fontSize: 24
  },
  statusesButton: {
    marginTop: theme.spacing(2)
  },
  button: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  waiting: {
    color: '#388e3c'
  },
  formControl: {
    minWidth: 180,
    padding: 0
  },
  noEventsText: {
    fontSize: 24
  }
}));

const applyPagination = (list, page, limit) => {
  if (list.length > 0) {
    return list.slice(page * limit, page * limit + limit);
  }
};

const TournamentsTable = ({ tournaments, isLoading }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const history = useHistory();

  const [selectedGame, setSelectedGame] = useState('All Games');
  const allSupportedGames = ['All Games', ...AllSupportedGamesNames];
  const [showModal, setShowModal] = useState(false);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedTournaments = applyPagination(tournaments, page, limit);

  return (
    <Card>
      {showModal && generateModal()}
      <PerfectScrollbar>
        <Box minWidth={300}>
          {paginatedTournaments ? (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Game</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Game Format</TableCell>
                    <TableCell>Entry</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Result</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedTournaments &&
                    paginatedTournaments.map((row, index) => {
                      return (
                        <TableRow
                          spacing={0}
                          hover
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              row.eventStatus === 'Cancelled' ||
                              row.eventStatus === 'Deleted'
                            ) {
                              setSelectedRow(row);
                              setShowModal(true);
                            } else {
                              history.push(`/gameInformationPage/${row.id}`);
                            }
                          }}
                        >
                          <TableCell>{row.gameShortName}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            {getGameFormatFromIndex(row.game, row.gameFormat)}
                          </TableCell>
                          <TableCell>
                            <Typography
                              color={
                                row.sponsored ? 'secondary' : 'textPrimary'
                              }
                              variant="body2"
                            >
                              {row.sponsored
                                ? 'Free'
                                : `$${row.betAmount.toFixed(2)}`}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {getDateFromEpoch(row.startTime)}{' '}
                            {getTimeFromEpoch(row.startTime)}
                          </TableCell>
                          <TableCell>
                            <Typography
                              className={classes.waiting}
                              variant="body2"
                            >
                              {formatEventStatus(row.eventStatus)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {['WinnersDeclared'].includes(row.eventStatus)
                              ? row.rank
                                ? `Won : Ranked ${row.rank}`
                                : `Lost`
                              : `--`}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={tournaments.length}
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
                      Fetching Upcoming Tournaments
                    </Typography>
                  </Box>
                  <Box>
                    <LoadingScreen width={200} />
                  </Box>
                </>
              ) : (
                <Box display="flex" justifyContent="center" pt={2} mb={2}>
                  <Typography variant="h5" className={classes.noEventsText}>
                    No Upcoming Tournaments
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

TournamentsTable.propTypes = {
  tournaments: PropTypes.array,
  isLoading: PropTypes.bool
};

export default TournamentsTable;
