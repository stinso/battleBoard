import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import defaultAvatar from '../../assets/img/placeholder.jpg';
import { getFollowersService } from '../../service/node.service';
import { generateImageURL, getFormattedUserName } from '../../utils/helpers.js';
import ImageTagWithErrorImage from '../ImageConponentWithDefaultAvatar/index';
import * as Sentry from '@sentry/react';

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
    padding: 0
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
  }
}));

const Followers = ({ username }) => {
  const classes = useStyles();
  const location = useLocation();
  const [followers, setFollowers] = useState([]);

  async function getFollowers() {
    try {
      const response = await getFollowersService({ username });
      if (response.data.success === true && response.data.users?.length > 0) {
        setFollowers(response?.data?.users);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: Followers.js ~ line 33 ~ getFollowers ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  }

  useEffect(() => {
    getFollowers();
  }, [username]);

  return (
    <div>
      <Typography className={classes.title} variant="h6" color="textPrimary">
        Followers
      </Typography>

      {followers.length > 0 ? (
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={3}
        >
          {followers.map((row, index) => {
            return (
              <Grid item key={index} md={3} sm={6} xs={12} align="center">
                <RouterLink key={index} to={`/profile/${row.username}`}>
                  <Card className={classes.followerCard} variant="outlined">
                    <CardMedia>
                      <div className={classes.centerContainer}>
                        <Avatar className={classes.avatar} src={row.dpHigh} />
                      </div>
                    </CardMedia>
                    <Box className={classes.cardContent} mt={1}>
                      <div className={classes.centerContainer}>
                        <Typography variant="h4">
                          {getFormattedUserName(row.username, 16)}
                        </Typography>
                      </div>
                    </Box>
                  </Card>
                </RouterLink>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box display="flex" mt={2} justifyContent="center">
          <Typography variant="h4">No Followers Found.</Typography>
        </Box>
      )}
    </div>
  );
};

Followers.propTypes = {
  className: PropTypes.string
};

export default Followers;
