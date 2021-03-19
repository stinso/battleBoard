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
import { getStakingInfo } from 'src/slices/stakingInfo'

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
  technologyIcon: {
    height: 40,
    margin: theme.spacing(1)
  },
  image: {
    perspectiveOrigin: 'left center',
    transformStyle: 'preserve-3d',
    perspective: 1500,
    '& > img': {
      maxWidth: '90%',
      height: 'auto',
      transform: 'rotateY(-35deg) rotateX(15deg)',
      backfaceVisibility: 'hidden',
      boxShadow: theme.shadows[16]
    }
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    '& > img': {
      maxWidth: '90%',
      height: 'auto'
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
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();
  const stakingInfo = useSelector((state) => state.stakingInfo);
  const [ stakers, setStakers ] = useState(0);
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  

  const getStakers = useCallback(async () => {
    
    try {
      const response = await axios.get('/stakers');

      if (isMountedRef.current) {
        setStakers(response.data.stakers);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getStakers();
  },[getStakers]);

  useEffect(() => {
    dispatch(getStakingInfo());
  }, []);

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
            <Grid
              item
              xs={12}
              md={5}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="100%"
              >
                <Typography
                  variant="overline"
                  color="secondary"
                >
                  Introducing
                </Typography>
                <Typography
                  variant="h1"
                  color="textPrimary"
                >
                  Chain Games - Dashboard
                </Typography>
                <Box mt={4} bt={4}>
                  <div className={classes.image}>
                    <img
                      alt="Presentation"
                      src={theme.name === THEMES.LIGHT ? '/static/home/light.png' : '/static/home/dark.png'}
                    />
                  </div>
                </Box>
                <Box mt={3}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                  >
                    Chain Games is an evolution in Web 3.0 blockchain gaming combining smart contract based
                    competitions with state of the art gameplay. We are committed to transitioning the blockchain
                    gaming industry into the modern gaming era.
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid item>
                      <Typography
                        variant="h1"
                        color="secondary"
                      >
                        {stakingInfo.poolFilled}%
                      </Typography>
                      <Typography
                        variant="overline"
                        color="textSecondary"
                      >
                        Staked
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h1"
                        color="secondary"
                      >
                        {Math.floor(stakers / 100) * 100}+
                      </Typography>
                      <Typography
                        variant="overline"
                        color="textSecondary"
                      >
                        Stakers
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={3}>
                  <Button
                    color="secondary"
                    variant="contained"
                    component={RouterLink}
                    size="medium"
                    to="/app/staking-stats"
                  >
                    DASHBOARD
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      : <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              md={5}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="100%"
              >
                <Typography
                  variant="overline"
                  color="secondary"
                >
                  Introducing
                </Typography>
                <Typography
                  variant="h1"
                  color="textPrimary"
                >
                  Chain Games - Dashboard
                </Typography>
                <Box mt={3}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                  >
                    Chain Games is an evolution in Web 3.0 blockchain gaming combining smart contract based
competitions with state of the art gameplay. We are committed to transitioning the blockchain
gaming industry into the modern gaming era.
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid item>
                      <Typography
                        variant="h1"
                        color="secondary"
                      >
                        {stakingInfo.poolFilled}%
                      </Typography>
                      <Typography
                        variant="overline"
                        color="textSecondary"
                      >
                        Staked
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h1"
                        color="secondary"
                      >
                        {Math.floor(stakers / 100) * 100}+
                      </Typography>
                      <Typography
                        variant="overline"
                        color="textSecondary"
                      >
                        Stakers
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={3}>
                  <Button
                    color="secondary"
                    variant="contained"
                    component={RouterLink}
                    size="medium"
                    to="/app/staking-stats"
                  >
                    DASHBOARD
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
            >
              <Box position="relative">
                <div className={classes.shape}>
                  <img
                    alt="Shapes"
                    src="/static/home/shapes.svg"
                  />
                </div>
                <div className={classes.image}>
                  <img
                    alt="Presentation"
                    src={theme.name === THEMES.LIGHT ? '/static/home/light.png' : '/static/home/dark.png'}
                  />
                </div>
              </Box>
            </Grid>
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
