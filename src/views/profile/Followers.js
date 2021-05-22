import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import defaultAvatar from "../../assets/img/placeholder.jpg";
import {getFollowersService} from '../../service/node.service'
import { generateImageURL, getFormattedUserName } from '../../utils/helpers.js'
import ImageTagWithErrorImage from '../ImageConponentWithDefaultAvatar/index';
import * as Sentry from "@sentry/react";


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

const Followers = ({ username }) => {
  const classes = useStyles();
  const location = useLocation();
  const [followers, setFollowers] = useState([]);

  async function getFollowers(){
    try{
      const response = await getFollowersService({username})
        if(response.data.success === true && response.data.users?.length > 0){
          setFollowers(response?.data?.users)
        }
    }
    catch(error){
      console.log("🚀 ~ file: Followers.js ~ line 33 ~ getFollowers ~ error", error)
      Sentry.captureException(error, {
        tags: {
            page: location.pathname,
        },
      });
    }
  }

  useEffect(()=>{
    getFollowers();
  },[username])

  return (
    <div>
      <Typography className={classes.title} variant="h6" color="textPrimary">
        Followers
      </Typography>
      {followers.length > 0 ? followers.map((row, index) => {
                        return (
                          <>
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
                          </>
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

Followers.propTypes = {
  className: PropTypes.string
};

export default Followers;
