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
import { findLastIndex } from 'lodash';

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
      backgroundColor: theme.palette.secondary.main,
      marginRight: '20px'
    }
  },
  cardLeft: {
    width: '100%',
    height: 502,
    backgroundColor: '#00008B',
    color: '#fff',
    margin: '0 15px',
    position: 'relative'
  },
  cardRight: {
    width: '100%',
    height: 248,
    backgroundColor: '#00008B',
    color: '#fff',
    margin: '0 15px',
    position: 'relative'
  },
  pricePool: {
    position: 'absolute',
    top: 0,
    right: 0,

    paddingRight: '15px',
    paddingBottom: '10px',
    color: 'white',
    fontFamily: font,
    fontSize: 60,
    '&:before': {
      position: 'absolute',
      bottom: -2,
      right: 0,
      paddingRight: '18px',
      content: '"PRICE"',
      fontSize: 20
    }
  },
  pricePoolRight: {
    position: 'absolute',
    top: 0,
    right: 0,

    paddingRight: '15px',
    paddingBottom: '10px',
    color: 'white',
    fontFamily: font,
    fontSize: 40,
    '&:before': {
      position: 'absolute',
      bottom: 2,
      right: 0,
      paddingRight: '18px',
      content: '"PRICE"',
      fontSize: 16
    }
  },
  mediaLeft: {
    height: '100%'
  },
  mediaRight: {
    height: '100%'
  },
  tournamentBox: {
    width: '100%',
    display: "flex"
  },
  paper: {
    paddingTop: 20,
    paddingRight: 60,
    paddingLeft: 40,
    paddingBottom: 20,
    marginBottom: 60
  },
  MediaCaption: {
    position: 'absolute',
    bottom: 0,

    paddingLeft: '15px',
    paddingBottom: '10px',
    paddingTop: '10px',

    backgroundColor: 'black',
    color: 'white',
    opacity: 0.8,

    width: '100%',
    height: '30%'    
  },
  MediaCaptionLeft: {
    position: 'absolute',
    bottom: 0,

    paddingLeft: '30px',
    paddingBottom: '10px',
    paddingTop: '36px',

    backgroundColor: 'black',
    color: 'white',
    opacity: 0.8,

    width: '100%',
    height: '24%'    
  },
  viewButtonRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: theme.palette.secondary.main
  },
  viewButtonLeft: {
    position: 'absolute',
    bottom: 16,
    right: 16
  },
  gamesTitle: {
    fontFamily: font,
    fontSize: 40
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
      <Paper className={classes.paper}>
        <Box className={classes.tournamentBox}>
          <Grid container spacing={1}>
            <Grid item xs={6} >
              <Card raised className={classes.cardLeft}>
                <Typography
                  variant="h6"
                  color="secondary"
                  className={classes.pricePool}
                  fontFamily={font}
                >
                  $10
                </Typography>
                <CardMedia
                  className={classes.mediaLeft}
                  image="/static/images/games/cod_coldWar.jpg"
                  title="title"
                >
                  <Box className={classes.MediaCaptionLeft}>
                    <Grid container spacing={3}>
                      <Grid container xs={6} >
                        <Grid item xs={12} >
                          <Typography
                            variant="h4"
                            color="secondary"
                          >
                            COMMUNITY TOURNAMENT
                          </Typography>
                        </Grid>
                        <Grid item xs={12} >
                          <Typography
                            variant="h4"
                            color="textPrimary"
                          >
                            MAR 29, 2:00 PM PST
                          </Typography>
                        </Grid>
                        <Grid item xs={12} >
                          <Typography
                            variant="h3"
                            color="textPrimary"
                          >
                            $10 Free Entry 3v3 Best of 1
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Button className={classes.viewButtonLeft}
                    variant="contained"
                    size="large"
                    color="secondary"
                  >
                    VIEW TOURNAMENT
                  </Button>
                </CardMedia>
              </Card>
            </Grid>
            <Grid item container xs={6} spacing={1}>
              <Grid item xs={6}>
                <Card raised className={classes.cardRight}>
                <Typography
                  variant="h6"
                  color="secondary"
                  className={classes.pricePoolRight}
                  fontFamily={font}
                >
                  $10
                </Typography>
                  <CardMedia
                    className={classes.mediaRight}
                    image="/static/images/games/fortnite.jpg"
                    title="title"
                  >
                    <Box className={classes.MediaCaption}>
                      <Grid container spacing={1}>
                        <Grid container xs={6} >
                          <Grid item xs={12} >
                            <Typography
                              variant="body2"
                              color="secondary"
                            >
                              COMMUNITY TOURNAMENT
                            </Typography>
                          </Grid>
                          <Grid item xs={12} >
                            <Typography
                              variant="body2"
                              color="textPrimary"
                            >
                              MAR 29, 2:00 PM PST
                            </Typography>
                          </Grid>
                          <Grid item xs={12} >
                            <Typography
                              variant="body1"
                              color="textPrimary"
                            >
                              $10 Free Entry 3v3 Best of 1
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                    <Button className={classes.viewButtonRight}
                      variant="outlined"
                      size="small"
                      color="secondary"
                    >
                      VIEW
                    </Button>
                  </CardMedia>
                </Card>
              </Grid>
              <Grid item xs={6} >
                <Card raised className={classes.cardRight}>
                  <Typography
                    variant="h6"
                    color="secondary"
                    className={classes.pricePoolRight}
                    fontFamily={font}
                  >
                    $16
                  </Typography>
                  <CardMedia
                    className={classes.mediaRight}
                    image="/static/images/games/nba.jpg"
                    title="title"
                  >
                    <Box className={classes.MediaCaption}>
                      <Grid container spacing={1}>
                        <Grid container xs={6} >
                          <Grid item xs={12} >
                            <Typography
                              variant="body2"
                              color="secondary"
                            >
                              COMMUNITY TOURNAMENT
                            </Typography>
                          </Grid>
                          <Grid item xs={12} >
                            <Typography
                              variant="body2"
                              color="textPrimary"
                            >
                              MAR 29, 2:00 PM PST
                            </Typography>
                          </Grid>
                          <Grid item xs={12} >
                            <Typography
                              variant="body1"
                              color="textPrimary"
                            >
                              $10 Free Entry 3v3 Best of 1
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                    <Button className={classes.viewButtonRight}
                      variant="outlined"
                      size="small"
                      color="secondary"
                    >
                      VIEW
                    </Button>
                  </CardMedia>
                </Card>
              </Grid>
              <Grid item xs={6} >
                <Card raised className={classes.cardRight}>
                  <Typography
                    variant="h6"
                    color="secondary"
                    className={classes.pricePoolRight}
                    fontFamily={font}
                  >
                    $10
                  </Typography>
                  <CardMedia
                    className={classes.mediaRight}
                    image="/static/images/games/nba.jpg"
                    title="title"
                  >
                    <Box className={classes.MediaCaption}>
                      <Grid container spacing={1}>
                        <Grid container xs={6} >
                          <Grid item xs={12} >
                            <Typography
                              variant="body2"
                              color="secondary"
                            >
                              COMMUNITY TOURNAMENT
                            </Typography>
                          </Grid>
                          <Grid item xs={12} >
                            <Typography
                              variant="body2"
                              color="textPrimary"
                            >
                              MAR 29, 2:00 PM PST
                            </Typography>
                          </Grid>
                          <Grid item xs={12} >
                            <Typography
                              variant="body1"
                              color="textPrimary"
                            >
                              $10 Free Entry 3v3 Best of 1
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                    <Button className={classes.viewButtonRight}
                      variant="outlined"
                      size="small"
                      color="secondary"
                    >
                      VIEW
                    </Button>
                  </CardMedia>
                </Card>
              </Grid>
              <Grid item xs={6} >
                <Card raised className={classes.cardRight}>
                  <Typography
                    variant="h6"
                    color="secondary"
                    className={classes.pricePoolRight}
                    fontFamily={font}
                  >
                    $10
                  </Typography>
                  <CardMedia
                    className={classes.mediaRight}
                    image="/static/images/games/cod_coldWar.jpg"
                    title="title"
                  >
                    <Box className={classes.MediaCaption}>
                      <Grid container spacing={1}>
                        <Grid container xs={6} >
                          <Grid item xs={12} >
                            <Typography
                              variant="body2"
                              color="secondary"
                            >
                              COMMUNITY TOURNAMENT
                            </Typography>
                          </Grid>
                          <Grid item xs={12} >
                            <Typography
                              variant="body2"
                              color="textPrimary"
                            >
                              MAR 29, 2:00 PM PST
                            </Typography>
                          </Grid>
                          <Grid item xs={12} >
                            <Typography
                              variant="body1"
                              color="textPrimary"
                            >
                              $10 Free Entry 3v3 Best of 1
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                    <Button className={classes.viewButtonRight}
                      variant="outlined"
                      size="small"
                      color="secondary"
                    >
                      VIEW
                    </Button>
                  </CardMedia>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Container maxWidth="lg">
        <Box mb={3} ml={2}>
          <Typography
            variant="h1"
            color="textPrimary"
            className={classes.gamesTitle}
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
