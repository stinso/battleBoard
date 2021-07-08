import React, { useContext, useEffect, useState } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  SvgIcon,
  Tooltip,
  makeStyles,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import FIFA_Image from '../../../assets/img/fifa21.jpg';
import NBA_Image from '../../../assets/img/nba.jpg';
import COD_Image from '../../../assets/img/cod.jpg';
import MADDEN_Image from '../../../assets/img/madden.png';
import { SupportedGamesWithID } from '../../../config/constants';
import { Star as StarIcon } from 'react-feather';

const font = "'Saira', sans-serif";

const useStyles = makeStyles((theme) => ({
  gamesTitle: {
    fontFamily: font,
    fontSize: 40
  },
  title: {
    position: 'relative',
    '&:before': {
      position: 'absolute',
      bottom: -2,
      left: -16,
      content: '" "',
      height: 62,
      width: 6,
      backgroundColor: theme.palette.secondary.main,
      marginRight: '20px'
    }
  },
  '@keyframes fadeIn': {
    '0%': {
      color: theme.palette.secondary.main
    },
    '100%': {
      color: '#30913C'
    }
  },
  icon: {
    marginRight: theme.spacing(1),
    animation: '$fadeIn 1s alternate infinite'
  },
  imageCell: {
    height: '60px',
    width: '60px',
    padding: 0
  },
  rowImage: {
    height: '60px',
    width: '60px',
    margin: 0,
    padding: 0,
    verticalAlign: 'top',
    objectFit: 'cover'
  },
  entry: {
    fontFamily: font,
    fontSize: 16
  },
  entryFree: {
    fontFamily: font,
    fontSize: 16,
    color: theme.palette.secondary.main
  },
  priceCell: {
    color: theme.palette.success.main,
    fontFamily: font,
    fontSize: 16
  }
}));

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const Events = ({ events }) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' }
  ];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const filterEvents = () => {
    const result = events.filter((event) => {
      if (currentTab === 'free') {
        if (event.betAmount === 'Free') {
          return true;
        }
      } else if (currentTab === 'paid') {
        if (event.betAmount !== 'Free') {
          return true;
        }
      } else {
        return true;
      }
    });

    return result;
  };

  const filteredEvents = filterEvents();
  const paginatedEvents = applyPagination(filteredEvents, page, limit);

  const getImage = (game) => {
    switch (game) {
      case SupportedGamesWithID[0].name:
        return COD_Image;
      case SupportedGamesWithID[1].name:
        return MADDEN_Image;
      case SupportedGamesWithID[2].name:
        return FIFA_Image;
      case SupportedGamesWithID[3].name:
        return NBA_Image;
    }
  };

  return (
    <Container maxWidth="lg">
          <Box ml={2} mt={10} mb={3}>
            <Typography
              display="inline"
              variant="h2"
              color="textPrimary"
              className={classes.gamesTitle}
            >
              Events
            </Typography>
            <Typography
              className={classes.title}
              variant="h4"
              color="textPrimary"
            >
              Here you can find all upcoming events.
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
          <Card>
            <Box minWidth={300}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Game</TableCell>
                    <TableCell>Game Format</TableCell>
                    <TableCell>Participants</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Entry</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Prize Pool</TableCell>
                    <TableCell align="center">Join</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedEvents.map((entry) => {
                    return (
                      <TableRow spacing={0} hover key={entry.id}>
                        <TableCell
                          className={classes.imageCell}
                          align="center"
                          padding="none"
                        >
                          <img
                            className={classes.rowImage}
                            src={getImage(entry.game)}
                          />
                        </TableCell>
                        <TableCell>
                          {entry.betAmount === 'Free' && (
                            <Tooltip title="Sponsored Event!">
                              <SvgIcon
                                className={classes.icon}
                                fontSize="small"
                              >
                                <StarIcon />
                              </SvgIcon>
                            </Tooltip>
                          )}
                          {entry.gameFormat}
                        </TableCell>
                        <TableCell>
                          {`${entry.noOfUsersEnrolled} of ${entry.maxUsers}`}
                        </TableCell>
                        <TableCell>{`${entry.date} ${entry.time}`}</TableCell>
                        <TableCell
                          className={
                            entry.betAmount !== 'Free'
                              ? classes.entry
                              : classes.entryFree
                          }
                        >
                          {entry.betAmount}
                        </TableCell>
                        <TableCell>{`${entry.duration} min`}</TableCell>
                        <TableCell className={classes.priceCell}>
                          {entry.prizePool}
                        </TableCell>
                        <TableCell className={classes.priceCell} align="center">
                          <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            component={RouterLink}
                            to={`/gameInformationPage/${entry.id}`}
                          >
                            JOIN
                          </Button>
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
        </Container>
  );
};

export default Events;