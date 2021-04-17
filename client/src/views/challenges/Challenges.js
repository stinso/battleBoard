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
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const font = "'Saira', sans-serif";

const challenges = [
  {
    id: 1,
    opponentName: "mukki@chaingames.io",
    opponentAvatar: "/static/images/panda.png",
    game: "Madden NFL 21",
    gameFormat: "Max Score", 
    startTime: "27th Mar 21:00 CET",
    duration: "30 Min",
    betAmount: 5,
    status: "Accepted",
    eventDetails: "Event",
    result: "Won"
  },
  {
    id: 2,
    opponentName: "mukki@chaingames.io",
    opponentAvatar: "/static/images/panda.png",
    game: "Madden NFL 21",
    gameFormat: "Max Score", 
    startTime: "24th Mar 21:00 CET",
    duration: "30 Min",
    betAmount: 25,
    status: "Accepted",
    eventDetails: "Event",
    result: "Won"
  },
  {
    id: 3,
    opponentName: "mukki@chaingames.io",
    opponentAvatar: "/static/images/panda.png",
    game: "Madden NFL 21",
    gameFormat: "Max Score", 
    startTime: "21th Mar 21:00 CET",
    duration: "30 Min",
    betAmount: 1,
    status: "Accepted",
    eventDetails: "Event",
    result: "Lost"
  }
]



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
        <Grid
            container
            justify="space-between"
          >
            <Grid item>
              <Typography
                variant="h1"
                color="textPrimary"
              >
                My Challenges
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                /* onClick={onAddClick} */
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusCircleIcon />
                  </SvgIcon>
                }
              >
                New Challenge
              </Button>
            </Grid>
          </Grid>
        
        <Box mt={3}>
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
                  <TableRow >
                    <TableCell>
                      Opponent
                    </TableCell>
                    <TableCell>
                      Game
                    </TableCell>
                    <TableCell>
                      Game Format
                    </TableCell>
                    <TableCell>
                      Start Time
                    </TableCell>
                    <TableCell>
                      Duration
                    </TableCell>
                    <TableCell>
                      Bet Amount
                    </TableCell>
                    <TableCell>
                      Status
                    </TableCell>
                    <TableCell>
                      Event Details
                    </TableCell>
                    <TableCell>
                      Result
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {challenges.map((entry) => {
                    return (
                      <TableRow
                        spacing={0}
                        hover
                        key={entry.id}
                      >
                        <TableCell className={classes.imageCell}>
                          <Box display="flex" alignItems="center">
                            <Avatar className={classes.avatar} src={entry.opponentAvatar}/>
                            <Box marginLeft={1}>
                              <Typography variant="body2">
                                {entry.opponentName}
                              </Typography>
                            </Box>
                            
                          </Box>
                        </TableCell>
                        <TableCell>
                          {entry.game}
                        </TableCell>
                        <TableCell>
                          {entry.gameFormat}
                        </TableCell>
                        <TableCell>
                          {entry.startTime}
                        </TableCell>
                        <TableCell>
                          {entry.duration}
                        </TableCell>
                        <TableCell>
                          {entry.betAmount}
                        </TableCell>
                        <TableCell>
                          {entry.status}
                        </TableCell>
                        <TableCell>
                          <Link
                            color="secondary"
                            to={entry.eventDetails}
                            underline="always"
                          >
                            Event
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Typography
                            className={entry.result == 'Won' ? classes.resultWon : classes.resultLost}
                            variant="body2"
                          >
                            {entry.result}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={3}
                labelRowsPerPage={'Rows per page'}
                /* onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange} */
                page={0}
                rowsPerPage={10}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Box>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

Challenges.propTypes = {
  className: PropTypes.string
};

export default Challenges;
