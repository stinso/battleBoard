import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import BracketStructure from './BracketStructure';

const Bracket = ({ eventData }) => {
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
