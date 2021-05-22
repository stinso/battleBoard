import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import xboxImage from '../../assets/img/xbox-logo-profile-page.png';
import playStationImage from '../../assets/img/ps-logo.png';
import battleNetImage from '../../assets/img/battle-net-logo.png';
import { getLinkedNetworkService } from '../../service/node.service.js';
import { SupportedGameNetworks } from '../../config/constants';
import * as Sentry from '@sentry/react';

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
  }
}));

const GamingNetworks = ({ username }) => {
  const classes = useStyles();
  const location = useLocation();
  const [data, setData] = useState([]);

  const getLinkedNetworks = async () => {
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
      {data.map((row, index) => {
        return (
          <div key={index}>
            <img alt={`${row.name} Logo`} src={row.imageSrc} />
            <Typography variant="body2" color="textPrimary">
              {row.gamerTag}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

GamingNetworks.propTypes = {
  className: PropTypes.string
};

export default GamingNetworks;
