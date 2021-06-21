import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Monitor as MatchesIcon } from 'react-feather';
import { Link2 as NetworkIcon } from 'react-feather';
import { Users as FollowersIcon } from 'react-feather';
import { UserCheck as FollowingIcon } from 'react-feather';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import MatchHistory from './MatchHistory';
import Followers from './Followers';
import Following from './Following';
import GamingNetworks from './GamingNetworks';
import TournamentHistory from './TournamentHistory';
import defaultAvatar from '../../assets/img/placeholder.jpg';
import {
  userInfoService,
  followService,
  unFollowService,
  checkIsFollowingService,
  getBalanceFromCS
} from '../../service/node.service';
import { AuthContext } from '../../context/AuthContext';
import ChallengeModal from '../challenges/ChallengeModal';
//import ImageTagWithErrorImage from '../ImageConponentWithDefaultAvatar/index';
import { getFormattedUserName, formatInCHAIN } from '../../utils/helpers.js';
import * as Sentry from '@sentry/react';
import background from '../../assets/img/COD_Background.jpg';

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
  cover: {
    position: 'relative',
    height: 320,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:before': {
      position: 'absolute',
      content: '" "',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage:
        'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)'
    },
    '&:hover': {
      '& $changeButton': {
        visibility: 'visible'
      }
    }
  },
  avatar: {
    border: `2px solid ${theme.palette.common.white}`,
    height: 100,
    width: 100,
    top: -60,
    left: theme.spacing(3),
    position: 'absolute',
    cursor: 'pointer',
    borderColor: theme.palette.secondary.main
  },
  action: {
    marginLeft: theme.spacing(1)
  },
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0
  },
  card: {
    minHeight: '200px',
    padding: theme.spacing(4)
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
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    marginTop: theme.spacing(1)
  },
  bannedIcon: {
    marginTop: '4px',
    marginRight: '4px'
  },
  checkCircle: {
    color: '#388e3c'
  },
  active: {
    color: theme.palette.secondary.main
  },
  challengeModal: {
    marginTop: theme.spacing(1)
  }
}));

const tabs = [
  { value: 'matches', label: 'Matches' },
  { value: 'gamingNetworks', label: 'Gaming_Networks' },
  { value: 'followers', label: 'Followers' },
  { value: 'following', label: 'Following' }
];

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState('matches');

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  // new
  const { user } = useContext(AuthContext);
  //const router = useRouter()
  const { username } = useParams();
  //const [profileTabs, setProfileTabs] = useState(TabsEnum.MatchHistory);
  const [imageURL, setImageURL] = useState();
  const [name, setName] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [chainNetworkBalance, setChainNetworkBalance] = useState(0);

  useEffect(() => {
    setIsOwnProfile(user.user?.session?.username === username);
  }, [user, username]);

  async function getProfileInfo() {
    if (username) {
      try {
        const [userInfo, checkFollowing, balanceInfo] = await Promise.all([
          userInfoService({ username }),
          checkIsFollowingService({ username }),
          getBalanceFromCS({})
        ]);

        if (checkFollowing?.data?.success === true) {
          setIsFollowing(checkFollowing.data.isFollowing);
        }

        if (balanceInfo.data.success) {
          const networkFormatInChain = formatInCHAIN(
            balanceInfo.data.token.total
          );
          setChainNetworkBalance(networkFormatInChain);
        }

        if (userInfo.data.success === true) {
          setName(userInfo?.data?.username);
          setIsBanned(userInfo?.data?.isBanned);
          setImageURL(userInfo?.data?.dpHigh ? userInfo?.data?.dpHigh : '');
        }
      } catch (error) {
        console.log(
          '🚀 ~ file: ProfilePageSkeleton.js ~ line 135 ~ getProfileInfo ~ error',
          error
        );
        Sentry.captureException(error, {
          tags: {
            page: location.pathname
          }
        });
        if (error?.response?.data?.error === 'user not found') {
          history.push('/404');
        }
      }
    }
  }

  useEffect(() => {
    getProfileInfo();
  }, [username]);

  const handleFollowClick = async (event) => {
    if (isFollowing === false) {
      try {
        const response = await followService({ username });
        if (response.data.success === true) {
          setIsFollowing(true);
        }
      } catch (error) {
        console.log(
          '🚀 ~ file: ProfilePageSkeleton.js ~ line 183 ~ handleFollowClick ~ error',
          error
        );
        Sentry.captureException(error, {
          tags: {
            page: location.pathname
          }
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
      } catch (error) {
        console.log(
          '🚀 ~ file: ProfilePageSkeleton.js ~ line 204 ~ handleUnFollowClick ~ error',
          error
        );
        Sentry.captureException(error, {
          tags: {
            page: location.pathname
          }
        });
      }
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div
        className={classes.cover}
        style={{ backgroundImage: `url(${background})` }}
      />
      <Container maxWidth="lg">
        <Box position="relative" mt={1} display="flex" alignItems="center">
          <Avatar className={classes.avatar} src={imageURL ? imageURL : ''} />
          <Box marginLeft="140px" display="flex">
            <Box className={classes.bannedIcon}>
              {isBanned ? (
                <ErrorOutlineIcon color="error" />
              ) : (
                <CheckCircleOutlineIcon className={classes.checkCircle} />
              )}
            </Box>
            <Typography
              className={classes.userName}
              variant="body2"
              color="textPrimary"
            >
              {getFormattedUserName(name?.toUpperCase(), 9)}
            </Typography>
          </Box>
          <Box flexGrow={1} />
          {isOwnProfile === false && (
            <>
              <Button
                className={classes.action}
                variant={isFollowing === true ? 'outlined' : 'contained'}
                color="secondary"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  if (isFollowing === true) {
                    handleUnFollowClick();
                  } else {
                    handleFollowClick();
                  }
                }}
                size="small"
              >
                {isFollowing === false ? 'Follow' : 'Following'}
              </Button>
              <Button
                className={classes.action}
                color="secondary"
                variant="outlined"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setShowChallengeModal(true);
                }}
                size="small"
              >
                Challenge
              </Button>
            </>
          )}
        </Box>
        <Box mt={2}>
          <ChallengeModal
            className={classes.challengeModal}
            showChallengeModal={showChallengeModal}
            username={name}
            setShowChallengeModal={setShowChallengeModal}
          />
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            textColor="secondary"
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box py={3} pb={6}>
          {currentTab === 'matches' && <MatchHistory username={username} />}
          {currentTab === 'gamingNetworks' && (
            <GamingNetworks username={username} />
          )}
          {currentTab === 'followers' && <Followers username={username} />}
          {currentTab === 'following' && (
            <Following username={username} isOwnProfile={isOwnProfile} />
          )}
        </Box>
      </Container>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
