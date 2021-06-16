import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Paper, makeStyles } from '@material-ui/core';
import BracketStructure from './BracketStructure';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Teams = ({ eventData }) => {
  const classes = useStyles();

  return (
    <Paper>
      <BracketStructure eventData={eventData} />
    </Paper>
  );
};

Teams.propTypes = {
  className: PropTypes.string
};

export default Teams;
