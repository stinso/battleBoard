import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  toolbar: {
    height: 64,
    display: "flex",
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2)
    },
    ...theme.name === THEMES.LIGHT ? {
      color: theme.palette.background.paper
    } : {
      color: theme.palette.text.primary
    }
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

  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
          <Typography
            variant="body1"
            color="textSecondary"
          >
            Test
          </Typography>
          <Box flexGrow={1} />
          <RouterLink to="/">
            <Logo className={classes.logo} />
          </RouterLink>
          <Box flexGrow={1} />
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
