import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Button,Typography, makeStyles } from '@material-ui/core';
import defaultAvatar from "../../assets/img/placeholder.jpg";
import {getFollowingService, unFollowService} from '../../service/node.service'
import {generateImageURL, getFormattedUserName} from '../../utils/helpers.js'
import ImageTagWithErrorImage from '../ImageConponentWithDefaultAvatar/index';
import * as Sentry from "@sentry/react";

const font = "'Saira', sans-serif";

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

const Following = ({ username, isOwnProfile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [followingUsers, setFollowingUsers] = useState([]);

  async function getFollowing(){
    try{
      const response = await getFollowingService({username})
        if(response.data.success === true && response.data.users?.length > 0){
          setFollowingUsers(response?.data?.users)
        }
    }
    catch(error){
      console.log("🚀 ~ file: Following.js ~ line 27 ~ getFollowing ~ error", error)
      Sentry.captureException(error, {
        tags: {
            page: location.pathname,
        },
      });
    }
  }

  useEffect(()=>{
    getFollowing();
  }, [username])

  return (
    <div>
      <Typography className={classes.title} variant="h6" color="textPrimary">
        Following
      </Typography>
      {followingUsers.length > 0 ? followingUsers.map((row, index) => {
                        return (
                          <div key={index}>
                          <Typography
                            key={row.username}
                            component={RouterLink}
                            to={`/profile/${row.username}`}
                          >
                            {getFormattedUserName(row.username, 16)}
                          </Typography>
                          <ImageTagWithErrorImage
                            src={row.dpHigh ? (row.dpHigh) : defaultAvatar}
                            alt="profile image"
                            className="img-fluid rounded-circle profile-image"
                            errorImage={defaultAvatar}
                          />
                          {
                                  isOwnProfile
                              && 
                          <Button
                          color="secondary"
                          variant="contained"
                            onClick={(e) => {
                              e.preventDefault();
                              handleUnFollowClick(row.username)
                            }}
                          >
                            unfollow
                          </Button>}
                          </div>
                        )
                    })
                :
                <p>
                  No Followers Found.
                </p>
                    }
    </div>
  );
};

Following.propTypes = {
  className: PropTypes.string
};

export default Following;
