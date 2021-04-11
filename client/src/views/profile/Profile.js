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
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';

const font = "'Saira', sans-serif";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: 200,
    minHeight: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      paddingBottom: 60
    },
    margin: 0
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    > 
      <Paper>
        <Typography>
          profile
        </Typography>
      </Paper>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
