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
import { getFollowersService } from '../../service/node.service';
import { generateImageURL, getFormattedUserName } from '../../utils/helpers.js';
import * as Sentry from '@sentry/react';
import LoadingScreen from 'src/components/LoadingScreen';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
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
  },
  noEventsText: {
    fontSize: 24
  }
}));

const Followers = ({ username }) => {
  const classes = useStyles();
  const location = useLocation();
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getFollowers() {
    setIsLoading(true);
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
    setIsLoading(false);
  }

  useEffect(() => {
    getFollowers();
  }, [username]);

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h6" color="textPrimary">
        Followers
      </Typography>

      {followers.length > 0 ? (
        <Grid container direction="row" spacing={3}>
          {followers.map((row, index) => {
            return (
              <Grid item key={index} md={2} sm={4} xs={6} align="center">
                <RouterLink
                  key={index}
                  to={`/profile/${row.username}`}
                  style={{ textDecoration: 'none' }}
                >
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
        <Box>
          {isLoading ? (
            <>
              <Box display="flex" justifyContent="center" pt={2}>
                <Typography variant="h5" className={classes.noEventsText}>
                  Fetching Followers
                </Typography>
              </Box>
              <Box>
                <LoadingScreen width={200} />
              </Box>
            </>
          ) : (
            <Box display="flex" justifyContent="center" pt={2} mb={2}>
              <Typography variant="h5" className={classes.noEventsText}>
                No Followers found
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Card>
  );
};

Followers.propTypes = {
  className: PropTypes.string
};

export default Followers;
