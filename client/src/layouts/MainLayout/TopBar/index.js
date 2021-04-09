import React, { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { THEMES } from 'src/constants';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Toolbar,
  IconButton,
  Hidden,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Link,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import {
  ChevronDown as ArrowIcon,
  Menu as MenuIcon,
} from 'react-feather';
import Logo from 'src/components/Logo';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const selectOptions = [
  {
    label: 'Type',
    options: [
      'Freelance',
      'Full Time',
      'Part Time',
      'Internship']
  },
  {
    label: 'Level',
    options: ['Novice', 'Expert']
  },
  {
    label: 'Location',
    options: [
      'Africa',
      'Asia',
      'Australia',
      'Europe',
      'North America',
      'South America'
    ]
  },
  {
    label: 'Roles',
    options: ['Android', 'Web Developer', 'iOS']
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1
  },
  toolbar: {
    height: 64,
    display: "flex",
    flex: 1,
    justifyContent: "center"
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

const TopBar = ({ className, onNavOpen, ...rest }) => {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

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

  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Grid container className={classes.root}>
          <Grid item xs={4}>
            <Grid container justify="flex-start">
              <Box display="flex">
                <Box mr={2}>
                  <Button
                    onClick={handleMenuOpen}
                    color="secondary"
                    variant="outlined"
                    ref={anchorRef}
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
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  keepMounted
                  open={openShooter}
                  onClose={handleCloseShooter}
                >
                  <MenuItem onClick={handleCloseShooter}>Call of Duty</MenuItem>
                  <MenuItem onClick={handleCloseShooter}>Counter-Strike</MenuItem>
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
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  keepMounted
                  open={openSports}
                  onClose={handleCloseSports}
                >
                  <MenuItem onClick={handleCloseSports}>Fifa</MenuItem>
                  <MenuItem onClick={handleCloseSports}>Madden</MenuItem>
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
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  keepMounted
                  open={openCasual}
                  onClose={handleCloseCasual}
                >
                  <MenuItem onClick={handleCloseCasual}>Chaino</MenuItem>
                  <MenuItem onClick={handleCloseCasual}>Crypto Kart</MenuItem>
                </Menu>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="center">
              <RouterLink to="/">
                <Logo />
              </RouterLink>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="flex-end" spacing={2}>
              <Box display="flex">
                <IconButton aria-label="search" color="inherit">
                  <SearchIcon />
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Box ml={2} display="flex">
                  <Button 
                    className={classes.root}
                    onClick={onNavOpen}
                  >
                    <Box mr={1}>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                      >
                        mukki
                      </Typography>
                    </Box>
                    <SvgIcon
                      fontSize="small"
                      color="textPrimary"
                    >
                      <MenuIcon />
                    </SvgIcon>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>

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
