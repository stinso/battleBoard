import React, { useEffect, useState, useCallback } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { THEMES } from 'src/constants';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { axios } from 'src/utils/axiosHook';
import { useDispatch, useSelector } from 'src/store';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 200,
    paddingBottom: 200,
    minHeight: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: 60,
      paddingBottom: 60
    }
  },
  button: {
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%'
  }
}));

const Hero = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      {mobileDevice ?
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            Chain Games Battleboard
          </Grid>
        </Container>
      : <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            Chain Games Battleboard
          </Grid>
        </Container>
      }
    </div>
  );
};

Hero.propTypes = {
  className: PropTypes.string
};

export default Hero;
