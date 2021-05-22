import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Teams = ({ className }) => {
  const classes = useStyles();

  return <Paper>team</Paper>;
};

Teams.propTypes = {
  className: PropTypes.string
};

export default Teams;
