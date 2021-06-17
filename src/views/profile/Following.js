import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  getFollowingService,
  unFollowService
} from '../../service/node.service';
import { getFormattedUserName } from '../../utils/helpers.js';
import * as Sentry from '@sentry/react';
import LoadingScreen from 'src/components/LoadingScreen';

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
    padding: 0,
    display: 'flex',
    justifyContent: 'center'
  },
  followButton: {
    textTransform: 'none'
  },
  link: {
    textDecoration: 'none'
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

const Following = ({ username, isOwnProfile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [followingUsers, setFollowingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getFollowing() {
    setIsLoading(true);
    try {
      const response = await getFollowingService({ username });
      if (response.data.success === true && response.data.users?.length > 0) {
        setFollowingUsers(response?.data?.users);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: Following.js ~ line 27 ~ getFollowing ~ error',
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
    getFollowing();
  }, [username]);

  const handleUnFollowClick = async (username) => {
    try {
      const response = await unFollowService({ username });
      if (response.data.success === true) {
        setFollowingUsers((prevState) => {
          return prevState.filter((row) => row.username !== username);
        });
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: Following.jsx ~ line 57 ~ handleUnFollowClick ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  return (
    <div>
      <Typography className={classes.title} variant="h6" color="textPrimary">
        Following
      </Typography>

      {followingUsers.length > 0 ? (
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={3}
        >
          {followingUsers.map((row, index) => {
            return (
              <Grid item key={index} md={3} sm={6} xs={12} align="center">
                <Card className={classes.followerCard} variant="outlined">
                  <RouterLink
                    className={classes.link}
                    style={{ textDecoration: 'none' }}
                    to={`/profile/${row.username}`}
                  >
                    <CardMedia>
                      <div className={classes.centerContainer}>
                        <Avatar className={classes.avatar} src={row.dpHigh} />
                      </div>
                    </CardMedia>
                    <Box className={classes.cardContent} mt={1}>
                      <Typography variant="h4" color="textPrimary">
                        {getFormattedUserName(row.username, 16)}
                      </Typography>
                    </Box>
                  </RouterLink>
                  {isOwnProfile && (
                    <Box className={classes.cardContent} mt={1}>
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        className={classes.followButton}
                        onClick={(e) => {
                          e.preventDefault();
                          handleUnFollowClick(row.username);
                        }}
                      >
                        Unfollow
                      </Button>
                    </Box>
                  )}
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
    </div>
  );
};

Following.propTypes = {
  className: PropTypes.string
};

export default Following;
