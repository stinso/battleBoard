/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListSubheader,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  User as UserIcon,
  Settings as ToolIcon,
  LogOut as LogoutIcon,
  List as ListIcon,
  CreditCard as CreditcardIcon,
  Phone as PhoneIcon,
  ChevronsDown as WithdrawIcon,
  Award as AwardIcon,
  Calendar as CalendarIcon
} from 'react-feather';
import NavItem  from './NavItem';
import NumberFormat from 'react-number-format';
import { useSelector } from 'src/store';


const mySections = [
  {
    items: [
      {
        title: 'My Events',
        icon: CalendarIcon,
        href: '/upcomingEvents'
      },
      {
        title: 'My Challanges',
        icon: AwardIcon,
        href: '/challenges'
      }
    ]
  }
];


const sections = [
  {
    items: [
      {
        title: 'Profile',
        icon: UserIcon,
        href: '/profile'
      },
      {
        title: 'My Wallet',
        icon: CreditcardIcon,
        href: 'https://wallet.chaingames.io/home'
      },
      {
        title: 'Transaction History',
        icon: ListIcon,
        href: 'https://wallet.chaingames.io/transaction-history'
      },
      {
        title: 'Withdraw',
        icon: WithdrawIcon,
        href: 'https://wallet.chaingames.io/withdraw-initiate'
      },
      {
        title: 'Report Issue',
        icon: PhoneIcon,
        href: '/app/'
      },
      {
        title: 'Account Settings',
        icon: ToolIcon,
        href: '/userAccountSettings'
      },
      {
        title: 'Logout',
        icon: LogoutIcon,
        href: '/app/'
      },
    ]
  }
];

function renderNavItems({
  items,
  pathname,
  depth = 0
}) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}


const useStyles = makeStyles(theme => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  paper: {
    backgroundColor: '#38383E',
    width: 116,
    padding: 0,
    paddingTop: 3
  },
  paperApprove: {
    backgroundColor: '#38383E',
    width: 240,
    padding: 0,
    paddingTop: 3
  },
  button: {
    textTransform: 'none',
    borderRadius: 3
  }
}));

const NavBar = ({ onOpen }) => {
  const classes = useStyles();
  const location = useLocation();
  const acc = useSelector((state) => state.account);


  const content = (
    <Box
      height='100%'
      display='flex'
      flexDirection='column'
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
      {/* <Divider /> */}
        <Box p={2}>
          <Box
            display='flex'
            justifyContent='center'
          >
            <Avatar className={classes.cityAvatar} src="/static/images/panda.png">
            </Avatar>
          </Box>
        </Box>
        {/* <Divider /> */}
        <Box display="flex" flexDirection="row" alignItems="stretch" padding={1}>
          <Paper className={classes.paper} elevation={3} >
            <Box className={classes.overview}
              textAlign="center"
            >
              <Typography
                display="inline"
                variant="body1"
                color="textPrimary"
              >
                $
                <NumberFormat 
                  value={1000} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                />
              </Typography>
            </Box>
            <Box
              justifyContent='center'
              display='flex'
              mt={1}
            >
              <Button
                className={classes.button}
                size="small"
                color="secondary"
                variant="outlined"
                component={RouterLink}
                to="/app/stake"
                fullWidth
              >
                +Add Cash
              </Button>
            </Box>    
          </Paper>
          <Box flexGrow={1} />
          <Paper className={classes.paper}
            elevation={3}
          >
            <Box className={classes.overview}
              textAlign="center"
            >
            <Typography
              display="inline"
              variant="body1"
              color="textPrimary"
            >
              <NumberFormat 
                value={2200} 
                displayType={'text'} 
                thousandSeparator={true} 
              />
            </Typography>
            </Box>
            <Box
              mt={1}
              display="flex"
              justifyContent='center'
            >
              <Button
                className={classes.button}
                size="small"
                color="secondary"
                variant="outlined"
                component={RouterLink}
                to="/app/stakeRewards"
                fullWidth
              >
                Deposit CHAIN
              </Button>
            </Box>
          </Paper>
        </Box>
        <Box alignItems="center" padding={1}>
          <Paper className={classes.paperApprove} elevation={3}>
            <Box className={classes.overview}
              textAlign="center"
            >
              <Typography
                display="inline"
                variant="body1"
                color="textPrimary"
              >
                <NumberFormat 
                  value={1000} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                />
              </Typography>
            </Box>
            <Box
              justifyContent='center'
              display='flex'
              mt={1}
            >
              <Button
                className={classes.button}
                size="small"
                color="secondary"
                variant="outlined"
                component={RouterLink}
                to="/app/stake"
                fullWidth
              >
                Approve
              </Button>
            </Box>    
          </Paper>
        </Box>
        {/* <Divider /> */}
        <Box p={2}>
          {mySections.map(section => (
            <List
              key={section.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {section.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname
              })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          {sections.map(section => (
            <List
              key={section.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {section.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname
              })}
            </List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      classes={{ paper: classes.desktopDrawer }}
      open={onOpen}
      variant="persistent"
    >
      {content}
    </Drawer>
  );
};

NavBar.propTypes = {
  onOpen: PropTypes.bool
};

export default NavBar;
