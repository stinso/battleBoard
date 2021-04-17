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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';

const font = "'Saira', sans-serif";

const events = [
  {
    id: "1",
    game: "COD - MW",
    eventName: "Free MW",
    format: "Warzone - Max Kills",
    entry: "Free",
    status: "Waiting",
    participants: "12",
    startTime: "00:00:04:23"
  },
  {
    id: "2",
    game: "COD - MW",
    eventName: "Free MW",
    format: "Warzone - Max Kills",
    entry: "Free",
    status: "Waiting",
    participants: "12",
    startTime: "00:00:05:23"
  },
  {
    id: "3",
    game: "COD - MW",
    eventName: "Free MW",
    format: "Warzone - Max Kills",
    entry: "Free",
    status: "Waiting",
    participants: "12",
    startTime: "00:01:04:23"
  },
]



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: 200,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      paddingBottom: 60
    },
    margin: 0,
    
  },
  waiting: {
    color: '#388e3c'
  }
}));

const Events = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  

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
          Upcoming Events
        </Typography>
        <Box mt={3}>
          <Paper>
        <Card>
            <Box minWidth={300} >
              <Table>
                <TableHead>
                  <TableRow >
                    <TableCell>
                      Game
                    </TableCell>
                    <TableCell>
                      Event Name
                    </TableCell>
                    <TableCell>
                      Game Format
                    </TableCell>
                    <TableCell>
                      Entry
                    </TableCell>
                    <TableCell>
                      Status
                    </TableCell>
                    <TableCell>
                      Participants
                    </TableCell>
                    <TableCell>
                      Start Time
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
                        <TableCell>
                          {entry.game}
                        </TableCell>
                        <TableCell>
                          {entry.eventName}
                        </TableCell>
                        <TableCell>
                          {entry.format}
                        </TableCell>
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
                        <TableCell>
                          {entry.participants}
                        </TableCell>
                        <TableCell>
                          {entry.startTime}
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
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

Events.propTypes = {
  className: PropTypes.string
};

export default Events;
