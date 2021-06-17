import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Paper, makeStyles } from '@material-ui/core';
import BracketStructure from './BracketStructure';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Bracket = ({ eventData }) => {
  const classes = useStyles();

  return (
    <Paper>
      <BracketStructure eventData={eventData} />
    </Paper>
  );
};

Bracket.propTypes = {
  className: PropTypes.string
};

export default Bracket;
