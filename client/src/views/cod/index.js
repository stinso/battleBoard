import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import PerfectScrollbar from 'react-perfect-scrollbar';

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
  paper: {
    backgroundColor: theme.palette.background.dark,
    elevation: 10
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
  {
    id: "MW Warzone Kill Race FREE",
    format: "Warzone - Max Kills",
    participants: "16 of 30",
    startTime: "27th Mar 21:00 CET",
    entry: "Free",
    duration: "60 Min.",
    prizePool: "$28.50"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Warzone - Max Kills",
    participants: "11 of 30",
    startTime: "27th Mar 19:00 CET",
    entry: "$1.00",
    duration: "120 Min.",
    prizePool: "$28.50"
  },
  {
    id: "MW Warzone Headshots",
    format: "Warzone - Most Headshots",
    participants: "7 of 30",
    startTime: "27th Mar 20:00 CET",
    entry: "$1.00",
    duration: "60 Min.",
    prizePool: "$28.50"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Warzone - Max Kills",
    participants: "22 of 30",
    startTime: "27th Mar 21:00 CET",
    entry: "Free",
    duration: "60 Min.",
    prizePool: "$28.50"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Warzone - Max Kills",
    participants: "13 of 30",
    startTime: "28th Mar 21:00 CET",
    entry: "Free",
    duration: "120 Min.",
    prizePool: "$28.50"
  },
  {
    id: "MW Warzone Headshots",
    format: "Warzone - Most Headshots",
    participants: "0 of 30",
    startTime: "28th Mar 21:00 CET",
    entry: "$1.00",
    duration: "60 Min.",
    prizePool: "$28.50"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Warzone - Max Kills",
    participants: "10 of 30",
    startTime: "28th Mar 21:00 CET",
    entry: "Free",
    duration: "60 Min.",
    prizePool: "$28.50"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Warzone - Max Kills",
    participants: "1 of 30",
    startTime: "29th Mar 21:00 CET",
    entry: "$1.00",
    duration: "60 Min.",
    prizePool: "$28.50"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Warzone - Max Kills",
    participants: "5 of 30",
    startTime: "29th Mar 19:00 CET",
    entry: "$1.00",
    duration: "120 Min.",
    prizePool: "$28.50"
  },
  {
    id: "MW Warzone Kill Race FREE",
    format: "Warzone - Max Kills",
    participants: "11 of 30",
    startTime: "30th Mar 21:00 CET",
    entry: "Free",
    duration: "60 Min.",
    prizePool: "$28.50"
  }
]

const CodView = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <PerfectScrollbar>
    <Page
      className={classes.root}
      title="Call of Duty"
    >
      
      <Paper className={classes.paper} >
        <img
          alt="Presentation"
          src="/static/images/cod_banner.jpg"
        />      
      </Paper>
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
                  {events.map((entry) => {
                    return (
                      <TableRow
                        hover
                        key={entry.id}
                      >
                        <TableCell className={classes.rankCell}>
                          {entry.id}
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
                        <TableCell className={entry.entry == 'Free' ? classes.free : ''}>
                          {entry.entry}
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
      
    </Page>
    </PerfectScrollbar>
  );
};

export default CodView;
