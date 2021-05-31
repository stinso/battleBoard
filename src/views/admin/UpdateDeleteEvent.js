import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import * as Sentry from '@sentry/react';

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
  }
}));

const UpdateDeleteEvent = ({ isRecurringEvent }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div>
      <Typography className={classes.title} variant="h6" color="textPrimary">
        Events
      </Typography>
    </div>
  );
};

UpdateDeleteEvent.propTypes = {
  className: PropTypes.string
};

export default UpdateDeleteEvent;
