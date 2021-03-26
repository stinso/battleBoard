import React, { useEffect, useState, useCallback } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { THEMES } from 'src/constants';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { axios } from 'src/utils/axiosHook';
import { useDispatch, useSelector } from 'src/store';
import Carousel from 'react-material-ui-carousel'
import Example from 'src/components/Example'

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
  },
  card: {
    width: '100%',
    height: 320,
    backgroundColor: '#00008B',
    color: '#fff',
    margin: '0 15px'
  },
  image: {
    height: 320,
    backgroundColor: theme.palette.background.dark
  },
  title: {
    position: 'relative',
    '&:before': {
      position: 'absolute',
      bottom: -2,
      left: -16,
      content: '" "',
      height: 62,
      width: 6,
      backgroundColor: theme.palette.primary.main,
      marginRight: '20px'
    }
  }
}));

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

const Hero = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  var items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!"
    },
    {
        name: "Random Name #2",
        description: "Hello World!"
    }
]

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Box mb={3} ml={2}>
          <Typography
            variant="h1"
            color="textPrimary"
          >
            GAMES
          </Typography>
          <Typography
            className={classes.title}
            variant="h5"
            color="textPrimary"
          >
            Select a game and choose how you want to play.
          </Typography>
        </Box>
        <Example/>
      </Container>
    </div>
  );
};

Hero.propTypes = {
  className: PropTypes.string
};

export default Hero;
