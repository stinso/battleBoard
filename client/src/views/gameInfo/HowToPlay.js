import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {},
  paper: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  typo: {
    marginBottom: 10
  }
}));

const HowToPlay = ({ className }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography 
        className={classes.typo}
        color="textPrimary"
        variant="body1"
      >
        - Follow the help page on linking gaming networks to ensure that your COD stats are getting synced with the linked networks.
      </Typography>
      <Typography
        className={classes.typo}
        color="textPrimary"
        variant="body1"
      >
        - Enroll in the event, preferably in advance, with one of your linked gaming networks. You must maintain sufficient Chain Network balance and have it approved 30 minutes before the event starts.
      </Typography>
      <Typography
        className={classes.typo}
        color="textPrimary"
        variant="body1"
      >
        - Once the event starts, join a Warzone match and try to score as many kills as you can.
      </Typography>
      <Typography
        className={classes.typo}
        color="textPrimary"
        variant="body1"
      >
        - If you die in a game, you are allowed to join another match.
      </Typography>
      <Typography
        className={classes.typo}
        color="textPrimary"
        variant="body1"
      >
        - Results are declared soon after the event ends and can be seen in your event history.
      </Typography>
    </Paper>
  );
};

HowToPlay.propTypes = {
  className: PropTypes.string
};

export default HowToPlay;
