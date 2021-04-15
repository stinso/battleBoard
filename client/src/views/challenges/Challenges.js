import React, { useEffect, useState, useCallback } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { THEMES } from 'src/constants';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  Grid,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';

const font = "'Saira', sans-serif";

const events = [
  {
    id: "MW Warzone Kill Race FREE",
    format: "Warzone - Max Kills",
    participants: "16 of 30",
    startTime: "27th Mar 21:00 CET",
    entry: "Free",
    duration: "60 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/cod.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Warzone - Max Kills",
    participants: "11 of 30",
    startTime: "27th Mar 19:00 CET",
    entry: "$1.00",
    duration: "120 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/cod.jpg"
  },
  {
    id: "MW Warzone Headshots",
    format: "Apex - Most Headshots",
    participants: "7 of 30",
    startTime: "27th Mar 20:00 CET",
    entry: "$1.00",
    duration: "60 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/apex.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Fortnite - Max Kills",
    participants: "22 of 30",
    startTime: "27th Mar 21:00 CET",
    entry: "Free",
    duration: "60 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/fortnite.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Fifa - Winner",
    participants: "1 of 2",
    startTime: "28th Mar 21:00 CET",
    entry: "$10.00",
    duration: "15 Min.",
    prizePool: "$20",
    image: "/static/images/gameIcons/fifa.jpg"
  },
  {
    id: "MW Warzone Headshots",
    format: "Warzone - Most Headshots",
    participants: "0 of 30",
    startTime: "28th Mar 21:00 CET",
    entry: "$1.00",
    duration: "60 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/cod.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Fifa - Winner",
    participants: "1 of 2",
    startTime: "28th Mar 21:00 CET",
    entry: "Free",
    duration: "15 Min.",
    prizePool: "$20",
    image: "/static/images/gameIcons/fifa.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Apex - Max Kills",
    participants: "1 of 30",
    startTime: "29th Mar 21:00 CET",
    entry: "$1.00",
    duration: "60 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/apex.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Warzone - Max Kills",
    participants: "5 of 30",
    startTime: "29th Mar 19:00 CET",
    entry: "$1.00",
    duration: "120 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/cod.jpg"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Fortnite - Most Headshots",
    participants: "11 of 30",
    startTime: "30th Mar 21:00 CET",
    entry: "Free",
    duration: "60 Min.",
    prizePool: "$28.50",
    image: "/static/images/gameIcons/fortnite.jpg"
  }
]



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: 200,
    minHeight: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      paddingBottom: 60
    },
    margin: 0
  }
}));

const Challenges = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentTab, setCurrentTab] = useState('sent');

  const tabs = [
    { value: 'sent', label: 'Sent' },
    { value: 'received', label: 'Received' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'completed', label: 'Completed' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    > 
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          color="textPrimary"
        >
          My Challenges
        </Typography>
        <Box mt={3}>
          <Paper>
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
            <Card>
              <Box minWidth={300} >
                <Table>
                  <TableHead>
                    <TableRow >
                      <TableCell>
                        Game
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
                      <TableCell>
                        Prize Pool
                      </TableCell>
                      <TableCell align="center">
                        Join
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.map((entry) => {
                      return (
                        <TableRow
                          spacing={0}
                          hover
                          key={entry.id}
                        >
                          <TableCell className={classes.imageCell} align='center' padding='none'>
                              <img className={classes.rowImage}
                                src={entry.image}
                              />
                          </TableCell>
                          <TableCell>
                            {entry.format}
                          </TableCell>
                          <TableCell>
                            {entry.participants}
                          </TableCell>
                          <TableCell>
                            {entry.startTime}
                          </TableCell>
                          <TableCell className={classes.entry}>
                            {entry.entry}
                          </TableCell>
                          <TableCell>
                            {entry.duration}
                          </TableCell>
                          <TableCell className={classes.priceCell}>
                            {entry.prizePool}
                          </TableCell>
                          <TableCell className={classes.priceCell} align="center">
                            <Button
                              variant="outlined"
                              size="small"
                              color="secondary"
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
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

Challenges.propTypes = {
  className: PropTypes.string
};

export default Challenges;
