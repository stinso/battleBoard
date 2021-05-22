import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import PropTypes from 'prop-types';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  AllSupportedGamesNames,
  AllSupportedGamesWithOtherAttributes
} from '../../config/constants.js';
import { getHistoricalEventsService } from '../../service/node.service';

const font = "'Saira', sans-serif";

const events = [
  {
    id: '1',
    game: 'COD - MW',
    eventName: 'Free MW',
    format: 'Warzone - Max Kills',
    entry: 'Free',
    status: 'Waiting',
    result: 'Won',
    startTime: '00:00:04:23'
  },
  {
    id: '2',
    game: 'COD - MW',
    eventName: 'Free MW',
    format: 'Warzone - Max Kills',
    entry: 'Free',
    status: 'Waiting',
    result: 'Won',
    startTime: '00:00:05:23'
  },
  {
    id: '3',
    game: 'COD - MW',
    eventName: 'Free MW',
    format: 'Warzone - Max Kills',
    entry: 'Free',
    status: 'Waiting',
    result: 'Lost',
    startTime: '00:01:04:23'
  }
];

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

  const [games, setGames] = useState(['All Games', ...AllSupportedGamesNames]);
  const [selectedGame, setSelectedGame] = useState('All Games');
  const allSupportedGames = ['All Games', ...AllSupportedGamesNames];
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedEvents = applyPagination(events, page, limit);

  async function getMatchHistory() {
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
  }

  useEffect(() => {
    getMatchHistory();
  }, [username]);

  return (
    <div>
      <Typography className={classes.title} variant="h2" color="textPrimary">
        Match History
      </Typography>
      <Button
        className={classes.statusesButton}
        aria-controls="menu-shooter"
        aria-haspopup="true"
        color="secondary"
        variant="outlined"
        /* onClick={handleMenuShooter} */
      >
        All Statuses
        <ArrowDropDownIcon />
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Game</TableCell>
            <TableCell>Event Name</TableCell>
            <TableCell>Game Format</TableCell>
            <TableCell>Entry</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedEvents.map((entry) => {
            return (
              <TableRow spacing={0} hover key={entry.id}>
                <TableCell>{entry.game}</TableCell>
                <TableCell>{entry.eventName}</TableCell>
                <TableCell>{entry.format}</TableCell>
                <TableCell>
                  <Typography
                    color={entry.entry == 'Free' && 'secondary'}
                    variant="body2"
                  >
                    {entry.entry}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    className={entry.status == 'Waiting' && classes.waiting}
                    variant="body2"
                  >
                    {entry.status}
                  </Typography>
                </TableCell>
                <TableCell>{entry.startTime}</TableCell>
                <TableCell>{entry.result}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={events.length}
        labelRowsPerPage={'Rows per page'}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

MatchHistory.propTypes = {
  className: PropTypes.string
};

export default MatchHistory;
