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
                  onClick={handleMenuOpen}
                  ref={anchorRef}
                >
                  Shooter
                  <ArrowDropDownIcon />
                </Button>
                <Button
                  onClick={handleMenuOpen}
                  ref={anchorRef}
                >
                  Sports
                  <ArrowDropDownIcon />
                </Button>
                <Button
                  onClick={handleMenuOpen}
                  ref={anchorRef}
                >
                  Casual
                  <ArrowDropDownIcon />
                </Button>
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
