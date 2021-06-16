import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Toolbar,
  IconButton,
  Link,
  Hidden,
  Grid,
  Menu,
  MenuItem,
  Typography,
  SvgIcon,
  makeStyles,
  useTheme
} from '@material-ui/core';
import { ChevronDown as ArrowIcon, Menu as MenuIcon } from 'react-feather';
import Logo from 'src/components/Logo';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { AuthContext } from '../../../context/AuthContext';
import { useLocation, useHistory } from 'react-router-dom';
import { SET_USER_INFO } from '../../../actions/actions.js';
import { SessionID } from '../../../reducer/reducer.js';
import { PublicVapidKey } from '../../../config/constants';
import * as Sentry from '@sentry/react';
import { checkIsPrivatePath, checkIsPublicPath } from '../../../utils/helpers';
import {
  getMyInfoService,
  sendSubscriptionOfServiceWorkerService
} from '../../../service/battleServerService';
import Notifications from './Notifications';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1
  },
  toolbar: {
    height: 64,
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

const TopBar = ({ className, onNavOpen, ...rest }) => {
  const { user, dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(SessionID === 'true');
  const [userName, setUserName] = useState(user.user?.session?.username);

  // dropdowns
  const [anchorElShooter, setAnchorElShooter] = useState(null);
  const openShooter = Boolean(anchorElShooter);
  const [anchorElSports, setAnchorElSports] = useState(null);
  const openSports = Boolean(anchorElSports);
  const [anchorElCasual, setAnchorElCasual] = useState(null);
  const openCasual = Boolean(anchorElCasual);

  // dropdown shooter
  const handleMenuShooter = (event) => {
    setAnchorElShooter(event.currentTarget);
  };

  const handleCloseShooter = () => {
    setAnchorElShooter(null);
  };
  // dropdown sports
  const handleMenuSports = (event) => {
    setAnchorElSports(event.currentTarget);
  };

  const handleCloseSports = () => {
    setAnchorElSports(null);
  };
  // dropdown casual
  const handleMenuCasual = (event) => {
    setAnchorElCasual(event.currentTarget);
  };

  const handleCloseCasual = () => {
    setAnchorElCasual(null);
  };

  // nav bar
  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  useEffect(() => {
    setUserName(user.user?.session?.username);
  }, [user.user]);

  const setLoggedIn = useCallback(() => {
    setIsLoggedIn(false);
  }, [location.pathname]);

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async function registerSW() {
    let subscription = '';

    try {
      const register = await navigator.serviceWorker.register(
        '/notificationSW.js'
      );

      const tempSubscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PublicVapidKey)
      });

      subscription = JSON.stringify(tempSubscription);
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 57 ~ registerSW ~ error', error);
    } finally {
      const { data } = await sendSubscriptionOfServiceWorkerService({
        subscription
      });
    }
  }

  useEffect(() => {
    if (isLoggedIn && 'serviceWorker' in navigator && 'PushManager' in window) {
      registerSW();
    }
  }, [isLoggedIn]);

  const getUserInfo = useCallback(async () => {
    try {
      const { data } = await getMyInfoService({});
      if (data.success === true) {
        dispatch({
          type: SET_USER_INFO,
          payload: {
            ...data
          }
        });
      }
    } catch (error) {
      console.log('🚀 ~ file: index.js ~ line 96 ~ getUserInfo ~ error', error);
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (checkIsPublicPath(location.pathname)) {
      setLoggedIn();
    } else if (checkIsPrivatePath(location.pathname)) {
      getUserInfo();
    }
  }, [location.pathname]);

  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            id="logo"
            //onClick={onMobileNavOpen}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
          <Box ml={2} flexGrow={1} />
          <Box display="flex">
            <IconButton aria-label="search" color="inherit">
              <SearchIcon />
            </IconButton>
            <Notifications />
            <Box ml={2} display="flex">
              {user.user?.isLoggedIn ? (
                <Button className={classes.root} onClick={onNavOpen}>
                  <Box mr={1}>
                    <Typography variant="body1" color="textPrimary">
                      {user.user?.session?.username
                        ? user.user.session.username
                        : ''}
                    </Typography>
                  </Box>
                  <SvgIcon fontSize="small">
                    <MenuIcon />
                  </SvgIcon>
                </Button>
              ) : (
                <Box mt={1}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      history.push('/login');
                    }}
                  >
                    LOGIN
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Hidden>
        <Hidden mdDown>
          <Grid container className={classes.root}>
            <Grid item xs={5}>
              <Grid container justify="flex-start">
                <Box display="flex">
                  <Box mr={2}>
                    <Button
                      color="secondary"
                      href="https://app.uniswap.org/#/swap?outputCurrency=0xC4C2614E694cF534D407Ee49F8E44D125E4681c4"
                      variant="outlined"
                    >
                      Buy Tokens
                    </Button>
                  </Box>
                  <Button
                    aria-controls="menu-shooter"
                    aria-haspopup="true"
                    onClick={handleMenuShooter}
                  >
                    Shooter
                    <ArrowDropDownIcon />
                  </Button>
                  <Menu
                    id="menu-shooter"
                    anchorEl={anchorElShooter}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    keepMounted
                    open={openShooter}
                    onClose={handleCloseShooter}
                  >
                    <MenuItem
                      onClick={handleCloseShooter}
                      color="#fff"
                      component={RouterLink}
                      to="/actionGamePage/cod"
                    >
                      Call of Duty
                    </MenuItem>
                  </Menu>

                  <Button
                    aria-controls="menu-sports"
                    aria-haspopup="true"
                    onClick={handleMenuSports}
                  >
                    Sports
                    <ArrowDropDownIcon />
                  </Button>
                  <Menu
                    id="menu-sports"
                    anchorEl={anchorElSports}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    keepMounted
                    open={openSports}
                    onClose={handleCloseSports}
                  >
                    <MenuItem
                      onClick={handleCloseSports}
                      color="#fff"
                      component={RouterLink}
                      to="/actionGamePage/fifa"
                    >
                      Fifa
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseSports}
                      color="#fff"
                      component={RouterLink}
                      to="/actionGamePage/madden2021"
                    >
                      Madden
                    </MenuItem>
                  </Menu>
                  <Button
                    aria-controls="menu-casual"
                    aria-haspopup="true"
                    onClick={handleMenuCasual}
                  >
                    Casual
                    <ArrowDropDownIcon />
                  </Button>
                  <Menu
                    id="menu-casual"
                    anchorEl={anchorElCasual}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    keepMounted
                    open={openCasual}
                    onClose={handleCloseCasual}
                  >
                    <MenuItem
                      onClick={handleCloseCasual}
                      color="#fff"
                      component="a"
                      href="https://chaino.chaingames.io/"
                    >
                      Chaino
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseCasual}
                      color="#fff"
                      component="a"
                      href="https://chaingames.io/#sck"
                    >
                      Super Crypto Kart
                    </MenuItem>
                  </Menu>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="center">
                <RouterLink to="/dashboard">
                  <Logo />
                </RouterLink>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container justify="flex-end" spacing={2}>
                <Box display="flex">
                  <IconButton aria-label="search" color="inherit">
                    <SearchIcon />
                  </IconButton>
                  <Notifications />
                  <Box ml={2} display="flex">
                    {user.user?.isLoggedIn ? (
                      <Button className={classes.root} onClick={onNavOpen}>
                        <Box mr={1}>
                          <Typography variant="body1" color="textPrimary">
                            {user.user?.session?.username
                              ? user.user.session.username
                              : ''}
                          </Typography>
                        </Box>
                        <SvgIcon fontSize="small">
                          <MenuIcon />
                        </SvgIcon>
                      </Button>
                    ) : (
                      <Box mt={1}>
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={() => {
                            history.push('/login');
                          }}
                        >
                          LOGIN
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onNavOpen: PropTypes.func
};

TopBar.defaultProps = {
  onNavOpen: () => {}
};

export default TopBar;
