import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import xboxImage from '../../assets/img/xbox-logo-profile-page.png';
import playStationImage from '../../assets/img/ps-logo.png';
import battleNetImage from '../../assets/img/battle-net-logo.png';
import { getLinkedNetworkService } from '../../service/node.service.js';
import { SupportedGameNetworks } from '../../config/constants';
import * as Sentry from '@sentry/react';
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import LoadingScreen from 'src/components/LoadingScreen';

const NetworkEnums = {
  XBOX_NETWORK_ID: SupportedGameNetworks[0].index,
  BATTLE_NETWORK_ID: SupportedGameNetworks[1].index,
  PLAYSTATION_NETWORK_ID: SupportedGameNetworks[2].index
};

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
  title: {
    marginBottom: theme.spacing(2),
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  followerCard: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    transition: 'transform 0.15s ease-in-out',
    maxWidth: '160px',
    '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' }
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    border: '3px solid',
    borderColor: theme.palette.secondary.main
  },
  centerContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  cardContent: {
    padding: 0,
    display: 'flex',
    justifyContent: 'center'
  },
  noEventsText: {
    fontSize: 24
  }
}));

const GamingNetworks = ({ username }) => {
  const classes = useStyles();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getLinkedNetworks = async () => {
    setIsLoading(true);
    try {
      const { data } = await getLinkedNetworkService({ username });
      if (data.success === true) {
        if (data.linkedNetworks?.length > 0) {
          setData(
            data.linkedNetworks.map((row, index) => {
              switch (row.network) {
                case NetworkEnums.XBOX_NETWORK_ID:
                  return {
                    gamerTag: row.idOnNetwork,
                    imageSrc: xboxImage,
                    name: 'xbox'
                  };
                case NetworkEnums.BATTLE_NETWORK_ID:
                  return {
                    gamerTag: row.idOnNetwork,
                    imageSrc: battleNetImage,
                    name: 'battle-net'
                  };

                case NetworkEnums.PLAYSTATION_NETWORK_ID:
                  return {
                    gamerTag: row.idOnNetwork,
                    imageSrc: playStationImage,
                    name: 'playstation'
                  };
              }
            })
          );
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: GamingNetworks.js ~ line 37 ~ getLinkedNetworks ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (username) {
      getLinkedNetworks();
    }
  }, [username]);

  return (
    <div>
      <Typography className={classes.title} variant="h6" color="textPrimary">
        GamingNetworks
      </Typography>

      {data.length > 0 ? (
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={3}
        >
          {data.map((row, index) => {
            return (
              <Grid item key={index} md={4} sm={4} xs={12} align="center">
                <Card className={classes.followerCard} variant="outlined">
                  <CardMedia>
                    <div className={classes.centerContainer}>
                      <Avatar
                        className={classes.avatar}
                        src={row.imageSrc}
                        alt={`${row.name} Logo`}
                      />
                    </div>
                  </CardMedia>
                  <Box className={classes.cardContent} mt={1}>
                    <div className={classes.centerContainer}>
                      <Typography variant="h4">{row.gamerTag}</Typography>
                    </div>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box>
          {isLoading ? (
            <>
              <Box display="flex" justifyContent="center" pt={2}>
                <Typography variant="h5" className={classes.noEventsText}>
                  Fetching Linked Networks
                </Typography>
              </Box>
              <Box>
                <LoadingScreen width={200} />
              </Box>
            </>
          ) : (
            <Box display="flex" justifyContent="center" pt={2} mb={2}>
              <Typography variant="h5" className={classes.noEventsText}>
                No Linked Networks Found
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};

GamingNetworks.propTypes = {
  className: PropTypes.string
};

export default GamingNetworks;
