import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AllSupportedGamesNames,
  AllSupportedGamesWithOtherAttributes
} from '../../config/constants.js';
import { getHistoricalEventsService } from '../../service/node.service';
import {
  getTimeFromEpoch,
  getDateFromEpoch,
  formatEventStatus,
  getGameFormatFromIndex
} from '../../utils/helpers';

const font = "'Saira', sans-serif";

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
  },
  card: {
    minHeight: '200px',
    padding: theme.spacing(4)
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  rowImage: {
    height: '48px',
    width: '48px',
    margin: 0,
    padding: 0,
    verticalAlign: 'top'
  },
  imageCell: {
    height: '48px',
    width: '48px',
    padding: 0
  },
  accordion: {
    marginTop: theme.spacing(4)
  },
  title: {
    fontFamily: font,
    fontSize: 32
  },
  userName: {
    fontFamily: font,
    fontSize: 24
  },
  statusesButton: {
    marginTop: theme.spacing(2)
  },
  button: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  waiting: {
    color: '#388e3c'
  },
  formControl: {
    minWidth: 180,
    padding: 0
  }
}));

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const TournamentHistory = ({ className, username }) => {
  const classes = useStyles();

  return (
    <Typography variant="h6" color="textPrimary">
      Tournament History
    </Typography>
  );
};

TournamentHistory.propTypes = {
  username: PropTypes.string
};

export default TournamentHistory;
