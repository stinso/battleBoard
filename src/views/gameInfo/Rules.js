import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  paper: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30
  }
}));

const Rules = ({ questionAnswers, eventData }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.typo} color="textPrimary" variant="body1">
        - Player with the highest kills has the highest rank.
      </Typography>
      <Typography className={classes.typo} color="textPrimary" variant="body1">
        - In case of a tie, the player with fewer deaths is ranked higher. In
        cases there is still a tie, the player who enrolled first is ranked
        higher.
      </Typography>
      <Typography className={classes.typo} color="textPrimary" variant="body1">
        - Gulag kills are not counted.
      </Typography>
      <Typography className={classes.typo} color="textPrimary" variant="body1">
        - Headshots are treated like any other kill
      </Typography>
      <Typography className={classes.typo} color="textPrimary" variant="body1">
        - Private matches do not count towards your stats.
      </Typography>
      <Typography className={classes.typo} color="textPrimary" variant="body1">
        - Stats of the matches that start and end within the time period of the
        event will only be counted.
      </Typography>
      <Typography className={classes.typo} color="textPrimary" variant="body1">
        - End time is considered as time that the match ended, not the time you
        get killed.
      </Typography>
      <Typography className={classes.typo} color="textPrimary" variant="body1">
        - It is a player's responsibility to ensure a stable network connection
        with the COD Servers.
      </Typography>
    </Paper>
  );
};

Rules.propTypes = {
  className: PropTypes.string
};

export default Rules;
