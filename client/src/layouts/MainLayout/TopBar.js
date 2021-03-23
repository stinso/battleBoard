import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { THEMES } from 'src/constants';
import {
  AppBar,
  Badge,
  Box,
  Toolbar,
  IconButton,
  Hidden,
  Grid,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core';
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
  }/* ,
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "center"
  } */
}));

const TopBar = ({ className, ...rest }) => {
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
          <Box ml={2}>
            <Link
              className={classes.link}
              component={RouterLink}
              to="/app/staking-stats"
              underline="none"
              variant="body2"
            >
              Account
            </Link>
          </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
