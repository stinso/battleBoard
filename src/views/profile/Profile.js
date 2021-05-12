import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Monitor as MatchesIcon } from 'react-feather';
import { Link2 as NetworkIcon } from 'react-feather';
import { Users as FollowersIcon } from 'react-feather';
import { UserCheck as FollowingIcon } from 'react-feather';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import MatchHistory from './MatchHistory'
import Followers from './Followers'
import Following from './Following'
import GamingNetworks from './GamingNetworks'

// new
import defaultAvatar from "../../assets/img/placeholder.jpg";
import {
  userInfoService,
  followService,
  unFollowService,
  checkIsFollowingService,
  getBalanceFromCS,
} from '../../service/node.service'
import { AuthContext } from "../../context/AuthContext";
//import MatchHistory from "./MatchHistory";
//import Followers from "./Followers";
//import Following from "./Following";
//import GamingNetworks from './GamingNetworks';
//import ChallengeModal from '../challenges/ChallengeModal';
//import ImageTagWithErrorImage from '../ImageConponentWithDefaultAvatar/index';
import {
  getFormattedUserName,
  formatInCHAIN,
} from '../../utils/helpers.js';
//import { useRouter } from "next/router";
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
  },
  card: {
    minHeight: "200px",
    padding: theme.spacing(4)
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  title: {
    fontFamily: font,
    fontSize: 32
  },
  userName: {
    fontFamily: font,
    fontSize: 24
  },
  statusesButton: {
    marginTop: theme.spacing(2)
  },
  button: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  bannedIcon: {
    marginTop: '4px',
    marginRight: '4px',
  },
  checkCircle: {
    color: '#388e3c'
  }
}));

const tabs = {
  matches: 1,
  gamingNetworks: 2,
  followers: 3,
  following: 4
};

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState(tabs.matches);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  // new
  const {user, dispatch} = useContext(AuthContext)
  //const router = useRouter()
  //const { username } = router.query
  const username = "mukki"
  const wrapper = useRef('wrapper');
  //const [profileTabs, setProfileTabs] = useState(TabsEnum.MatchHistory);
  const [imageURL, setImageURL] = useState(defaultAvatar);
  const [name, setName] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  //const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [chainNetworkBalance, setChainNetworkBalance] = useState(0);


  useEffect(()=>{
    setIsOwnProfile(user.user?.session?.username === username);
  },[user, username])

  async function getProfileInfo(){
    if (username) {
      try {
        const [ userInfo, checkFollowing, balanceInfo] = await Promise.all([
          userInfoService({ username }),
          checkIsFollowingService({ username }),
          getBalanceFromCS({}),
        ])
  
        console.log(userInfo)
        console.log(checkFollowing)
        console.log(balanceInfo)
        
        if(checkFollowing?.data?.success === true){
          setIsFollowing(checkFollowing.data.isFollowing)
        }
  
        if (balanceInfo.data.success) {
          const networkFormatInChain = formatInCHAIN(balanceInfo.data.token.total);
          setChainNetworkBalance(networkFormatInChain);
        }
  
        if(userInfo.data.success === true){
          setName(userInfo?.data?.username);
          setIsBanned(userInfo?.data?.isBanned);
          setImageURL(userInfo?.data?.dpHigh ? (userInfo?.data?.dpHigh) : defaultAvatar);
        }
      }
      catch(error){
        console.log("🚀 ~ file: ProfilePageSkeleton.jsx ~ line 89 ~ getProfileInfo ~ error", error)
        Sentry.captureException(error, {
          tags: {
            page: location.pathname,
          },
        });
        if (error?.response?.data?.error === 'user not found') {
          history.push('/404');
        }
      }
    }
  }

  useEffect(()=>{
    getProfileInfo();
  },[username])

  const handleFollowClick = async (event) => {
    if (isFollowing === false) {
      try {
        const response = await followService({ username });
        if (response.data.success === true) {
          setIsFollowing(true);
        }
      }
      catch (error) {
        console.log("🚀 ~ file: ProfilePageSkeleton.jsx ~ line 119 ~ handleFollowClick ~ error", error)
        Sentry.captureException(error, {
          tags: {
            page: location.pathname,
          },
        });
      }
    }
  };

  const handleUnFollowClick = async () => {
    if (isFollowing === true) {
      try {
        const response = await unFollowService({ username });
        if (response.data.success === true) {
          setIsFollowing(false);
          }
        }
        catch (error) {
          console.log("🚀 ~ file: ProfilePageSkeleton.jsx ~ line 138 ~ handleUnFollowClick ~ error", error)
          Sentry.captureException(error, {
            tags: {
              page: location.pathname,
            },
          });
        }
    }
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    > 
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Card className={classes.card}>
              <Box
                display='flex'
                justifyContent='center'
              >
                <Avatar className={classes.avatar} src={imageURL} />
              </Box>
              <Box 
                marginTop={2}
              >
                <Box 
                  display='flex'
                  justifyContent='center'
                  marginTop={1}
                >
                  <Box className={classes.bannedIcon}>
                    {isBanned ? 
                      <ErrorOutlineIcon 
                        fontSize="medium"
                        color="error"  
                      />
                    :
                      <CheckCircleOutlineIcon 
                        className={classes.checkCircle}
                        fontSize="medium"
                      />
                    }
                    
                  </Box>
                  <Typography
                    className={classes.userName}
                    variant="body2"
                    color="textPrimary"
                  >
                    {getFormattedUserName(name?.toUpperCase(), 9)}
                  </Typography>
                </Box>
                <Box mt={4} mb={1}>
                  <Button
                    className={classes.button}
                    size="large"
                    variant="text"
                    onClick={(e) =>
                      handleTabsChange(e, tabs.matches)
                    }
                    startIcon={
                      <SvgIcon fontSize="small">
                        <MatchesIcon />
                      </SvgIcon>
                    }
                  >
                    Matches
                  </Button>
                </Box>
                <Divider />
                <Box>
                  <Button
                    className={classes.button}
                    size="large"
                    variant="text"
                    onClick={(e) =>
                      handleTabsChange(e, tabs.gamingNetworks)
                    }
                    startIcon={
                      <SvgIcon fontSize="small">
                        <NetworkIcon />
                      </SvgIcon>
                    }
                  >
                    Gaming Networks
                  </Button>
                </Box>
                <Divider />
                <Box>
                  <Button
                    className={classes.button}
                    size="large"
                    variant="text"
                    onClick={(e) =>
                      handleTabsChange(e, tabs.followers)
                    }
                    startIcon={
                      <SvgIcon fontSize="small">
                        <FollowersIcon />
                      </SvgIcon>
                    }
                  >
                    Followers
                  </Button>
                </Box>
                <Divider />
                <Box>
                  <Button
                    className={classes.button}
                    size="large"
                    variant="text"
                    onClick={(e) =>
                      handleTabsChange(e, tabs.following)
                    }
                    startIcon={
                      <SvgIcon fontSize="small">
                        <FollowingIcon/>
                      </SvgIcon>
                    }
                  >
                    Following
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Card className={classes.card}>
              <Box minWidth={300} >
                {currentTab === tabs.matches && <MatchHistory />}
                {currentTab === tabs.gamingNetworks && <GamingNetworks />}
                {currentTab === tabs.followers && <Followers />}
                {currentTab === tabs.following && <Following />}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
