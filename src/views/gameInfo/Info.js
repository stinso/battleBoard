import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  price: {
    height: '280px'
  }
}));

const Info = ({ className }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper className={classes.price}></Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.price}></Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.price}></Paper>
      </Grid>
    </Grid>
  );
};

Info.propTypes = {
  className: PropTypes.string
};

export default Info;
