import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Divider,
  Toolbar,
  Hidden,
  IconButton,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
import Logo from '../../../components/Logo';
import { THEMES } from 'src/constants';
import Settings from './Settings';
import { useDispatch, useSelector } from 'src/store';
import { login, logout } from 'src/slices/account'
import { useWeb3React } from '@web3-react/core'
import WalletSelector from 'src/components/WalletSelector/WalletSelector';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...theme.name === THEMES.LIGHT ? {
      boxShadow: 'none',
      backgroundColor: theme.palette.primary.main
    } : {},
    ...theme.name === THEMES.DARK ? {
      backgroundColor: theme.palette.background.default
    } : {}
  },
  toolbar: {
    minHeight: 64
  },
  logo: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    ...theme.name === THEMES.LIGHT ? {
      backgroundColor: theme.palette.background.paper
    } : {}
  },
  button: {
    marginLeft: theme.spacing(2)
  },
  icon: {
    ...theme.name === THEMES.LIGHT ? {
      color: theme.palette.background.paper
    } : {}
  },
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { account } = useWeb3React()


  useEffect(() => {
    if (account) {
      dispatch(login(account))
    } else {
      dispatch(logout())
    }
  }, [account]);

  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
      <Hidden lgUp>
        <IconButton
          onClick={onMobileNavOpen}
        >
          <SvgIcon 
            className={classes.icon}
            fontSize="small"
          >
            <MenuIcon />
          </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo className={classes.logo}/>
          </RouterLink>
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        <Settings />
        <Divider className={classes.divider} />
        <Box ml={2}>
          <WalletSelector />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

TopBar.defaultProps = {
  onMobileNavOpen: () => {}
};

export default TopBar;

