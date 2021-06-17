import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
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
import { getHistoricalEventsService } from '../../service/node.service';
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
  title: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  noEventsText: {
    fontSize: 24
  }
}));

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const MatchHistory = ({ className, username }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const location = useLocation();
  const history = useHistory();

  const [games, setGames] = useState(['All Games', ...AllSupportedGamesNames]);
  const [selectedGame, setSelectedGame] = useState('All Games');
  const allSupportedGames = ['All Games', ...AllSupportedGamesNames];
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedEvents = applyPagination(
    data.filter((row) => games.includes(row.game)),
    page,
    limit
  );

  async function getMatchHistory() {
    setIsLoading(true);
    try {
      const response = await getHistoricalEventsService({ username });
      if (response.data?.success === true && response.data.events?.length > 0) {
        const editedData = response.data.events.map((eventInfo) => {
          const game = AllSupportedGamesWithOtherAttributes.find((row) => {
            if (row.name === eventInfo.game) {
              return row;
            }
          });
          return { ...eventInfo, gameShortName: game.shortName };
        });
        setData(editedData.reverse());
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: MatchHistory.js ~ line 140 ~ getMatchHistory ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getMatchHistory();
  }, [username]);

  const generateModal = () => {
    return (
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle disableTypography>
          <Typography variant="h4">Match Status</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This event has been {selectedRow.eventStatus}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShowModal(false);
            }}
            className={classes.button}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const onDropdownClick = (event) => {
    setSelectedGame(event.target.value);
    setPage(0);
    if (event.target.value === 'All Games') {
      setGames([...allSupportedGames]);
    } else {
      setGames([event.target.value]);
    }
  };

  return (
    <div>
      {showModal && generateModal()}
      <Typography className={classes.title} variant="h6" color="textPrimary">
        Match History
      </Typography>

      <Box mt={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            id="select-game"
            value={selectedGame}
            onChange={onDropdownClick}
          >
            {allSupportedGames.map((row, index) => (
              <MenuItem key={index} value={row}>
                {row}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {paginatedEvents.length > 0 ? (
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
              {paginatedEvents.map((row, index) => {
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
                        color={row.sponsored ? 'secondary' : 'textPrimary'}
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
                      <Typography className={classes.waiting} variant="body2">
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
            count={data.filter((row) => games.includes(row.game)).length}
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
                  Fetching Matches
                </Typography>
              </Box>
              <Box>
                <LoadingScreen width={200} />
              </Box>
            </>
          ) : (
            <Box display="flex" justifyContent="center" pt={2} mb={2}>
              <Typography variant="h5" className={classes.noEventsText}>
                No Matches Found
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};

MatchHistory.propTypes = {
  className: PropTypes.string
};

export default MatchHistory;
