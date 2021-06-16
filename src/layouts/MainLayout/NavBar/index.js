/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext } from 'react';
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
  List as ListIcon,
  CreditCard as CreditcardIcon,
  Phone as PhoneIcon,
  ChevronsDown as WithdrawIcon,
  Award as AwardIcon,
  Calendar as CalendarIcon
} from 'react-feather';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import NavItem from './NavItem';
import NumberFormat from 'react-number-format';
import { useSelector } from 'src/store';
import Logout from './Logout';
import * as Sentry from '@sentry/react';
import { AuthContext } from '../../../context/AuthContext';
import {
  ApproveRedirectLink,
  DepositRedirectLink,
  RedirectURL,
  RegisterEthAddressRedirectURL
} from '../../../config/constants';
import { getBalance, formatInCHAIN } from '../../../utils/helpers.js';
import {
  getTotalEventsService,
  getTotalWinningsService,
  getBalanceFromCS
} from '../../../service/node.service';
import { MAX_APPROVED_BALANCE } from '../../../config/constants';

const WizardEnums = {
  AccountLink: 1,
  Approve: 2,
  Deposit: 3,
  ConsoleLink: 4
};

const mySections = [
  {
    items: [
      {
        title: 'My Events',
        icon: CalendarIcon,
        href: '/upcomingEvents',
        isExternal: false
      },
      {
        title: 'My Challanges',
        icon: AwardIcon,
        href: '/myChallenges',
        isExternal: false
      }
    ]
  }
];

const sections = [
  {
    items: [
      {
        title: 'My Wallet',
        icon: CreditcardIcon,
        href: 'https://wallet.chaingames.io/home',
        isExternal: true
      },
      {
        title: 'Transaction History',
        icon: ListIcon,
        href: 'https://wallet.chaingames.io/transaction-history',
        isExternal: true
      },
      {
        title: 'Withdraw',
        icon: WithdrawIcon,
        href: 'https://wallet.chaingames.io/withdraw-initiate',
        isExternal: true
      },
      {
        title: 'Report Issue',
        icon: PhoneIcon,
        href: '/reportIssue',
        isExternal: false
      },
      {
        title: 'Admin Panel',
        icon: ToolIcon,
        href: '/admin',
        isExternal: false
      },
      {
        title: 'Account Settings',
        icon: ToolIcon,
        href: '/userAccountSetting',
        isExternal: false
      }
    ]
  }
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title;

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
        isExternal={item.isExternal}
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
        isExternal={item.isExternal}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
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
  },
  checkCircle: {
    color: '#388e3c'
  }
}));

const NavBar = ({ onOpen }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const account = user.user?.session?.ethAddress;
  const [showNotification, setShowNotification] = useState(false);
  const [showWizardModal, setShowWizardModal] = useState(false);
  const [chainNetworkBalance, setChainNetworkBalance] = useState(0);
  const [approveBalance, setApprovedBalance] = useState(0);
  const [fiatBalance, setFiatBalance] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentStep, setCurrentStep] = useState(WizardEnums.AccountLink);
  const [username, setUsername] = useState('');
  const profileNavItem = [
    {
      title: 'Profile',
      icon: UserIcon,
      href: '/profile/' + username,
      isExternal: false
    }
  ];

  useEffect(() => {
    if (!user.user.session?.ethAddress) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }

    if (user.user?.session?.username) {
      setUsername(user.user?.session?.username);
    }
  }, [user.user.session]);

  const getInfoFromAPI = async () => {
    try {
      const [winnings, events, balanceInfo] = await Promise.all([
        getTotalWinningsService({}),
        getTotalEventsService({}),
        getBalanceFromCS({})
      ]);
      if (winnings.data?.success) {
        setTotalWinnings(winnings.data.winnings);
      }
      if (events.data?.success) {
        setTotalEvents(events.data.totalEvents);
      }
      if (balanceInfo.data.success) {
        setFiatBalance(balanceInfo.data.fiat);
        const allowanceFormatInChain = formatInCHAIN(
          balanceInfo.data.token.allowance
        );
        const networkFormatInChain = formatInCHAIN(
          balanceInfo.data.token.total
        );

        setApprovedBalance(allowanceFormatInChain);
        setChainNetworkBalance(networkFormatInChain);
        if (account) {
          if (MAX_APPROVED_BALANCE > allowanceFormatInChain) {
            setCurrentStep(WizardEnums.Approve);
            setShowWizardModal(true);
          } else if (networkFormatInChain <= 0) {
            setCurrentStep(WizardEnums.Deposit);
            setShowWizardModal(true);
          } else {
            setCurrentStep(WizardEnums.ConsoleLink);
            setShowWizardModal(true);
          }
        } else {
          setCurrentStep(WizardEnums.AccountLink);
          setShowWizardModal(true);
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: DashboardSectionOne.js ~ line 102 ~ getInfoFromAPI ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  useEffect(() => {
    setTotalEvents(0);
    setTotalWinnings(0);
    getInfoFromAPI();
  }, []);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <Avatar
              className={classes.avatar}
              src="/static/images/panda.png"
            ></Avatar>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="stretch"
          padding={1}
        >
          <Paper className={classes.paper} elevation={3}>
            <Box textAlign="center">
              <Typography display="inline" variant="body1" color="textPrimary">
                $
                <NumberFormat
                  value={fiatBalance.toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                />
              </Typography>
            </Box>
            <Box justifyContent="center" display="flex" mt={1}>
              <Button
                className={classes.button}
                size="small"
                color="secondary"
                variant="outlined"
                component={RouterLink}
                to="#"
                fullWidth
              >
                +Add Cash
              </Button>
            </Box>
          </Paper>
          <Box flexGrow={1} />
          <Paper className={classes.paper} elevation={3}>
            <Box textAlign="center">
              <Typography display="inline" variant="body1" color="textPrimary">
                <NumberFormat
                  value={chainNetworkBalance ? chainNetworkBalance : 0}
                  displayType={'text'}
                  thousandSeparator={true}
                />
              </Typography>
            </Box>
            <Box mt={1} display="flex" justifyContent="center">
              <Button
                className={classes.button}
                size="small"
                color="secondary"
                variant="outlined"
                to={DepositRedirectLink}
                fullWidth
              >
                Deposit CHAIN
              </Button>
            </Box>
          </Paper>
        </Box>
        <Box alignItems="center" padding={1}>
          <Paper className={classes.paperApprove} elevation={3}>
            <Box textAlign="center">
              {MAX_APPROVED_BALANCE <= approveBalance ? (
                <CheckCircleOutlineIcon className={classes.checkCircle} />
              ) : (
                <ErrorOutlineIcon color="error" />
              )}
            </Box>
            <Box justifyContent="center" display="flex">
              <Button
                className={classes.button}
                size="small"
                color="secondary"
                variant="outlined"
                to={ApproveRedirectLink}
                disabled={MAX_APPROVED_BALANCE <= approveBalance}
                fullWidth
              >
                {MAX_APPROVED_BALANCE <= approveBalance
                  ? 'Approved'
                  : 'Approve'}
              </Button>
            </Box>
          </Paper>
        </Box>
        <Box p={2}>
          {mySections.map((section) => (
            <List key={'walletSection'}>
              {renderNavItems({
                items: section.items,
                pathname: location.pathname
              })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          {renderNavItems({
            items: profileNavItem,
            pathname: location.pathname
          })}
          {sections.map((section) => (
            <List key={'personalSection'}>
              {renderNavItems({
                items: section.items,
                pathname: location.pathname
              })}
              <Logout />
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
