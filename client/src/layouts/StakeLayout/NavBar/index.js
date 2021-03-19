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
  Card,
  CardContent,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  User as UserIcon,
  Calendar as CalendarIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Tablet as CalculatorIcon,
  List as ListIcon,
  LifeBuoy,
  Loader
} from 'react-feather';
import { BiRocket } from 'react-icons/bi';
import Logo from 'src/components/Logo';
import NavItem  from './NavItem';
import NumberFormat from 'react-number-format';
import { useSelector } from 'src/store';

import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useStakingContract, useStakingDispatch } from 'src/context/StakingContract';


const sections = [
  {
    subheader: 'Dashboard',
    items: [
      {
        title: 'Staking Stats',
        icon: PieChartIcon,
        href: '/app/staking-stats'
      },
      {
        title: 'Personal Stats',
        icon: BarChartIcon,
        href: '/app/chain-stats'
      },
      {
        title: 'Leaderboard',
        icon: ListIcon,
        href: '/app/leaderboard'
      }
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
  card: {
    backgroundColor: theme.palette.background.dark
  }
}));

const NavBar = ({ onMobileClose, openMobile, ...rest }) => {
  const classes = useStyles();
  const location = useLocation();
  const { stakingContract, state } = useStakingContract();
  const dispatch = useStakingDispatch();
  const { account, connector, library } = useWeb3React()
  const acc = useSelector((state) => state.account);

  const [rewards, setRewards] = useState(0) 
  const [stakedAmount, setStakedAmount] = useState(0) 
  const [isWithdrawInit, setIsWithdrawInit] = useState(false) 


  const getStakingInfo = useCallback((account) => {
    stakingContract.getStakeDeposit(account)
      .then(res =>{
        if(res === false) {
          setIsWithdrawInit(false)
          setRewards(0)
          setStakedAmount(0)
          return
        }
        const result = res.endDate.toString() !== '0';
        const stakedAmount = (ethers.utils.formatEther(res.initialDeposit))
        const rewards = (ethers.utils.formatEther(res.rewards))

        setRewards(rewards)
        setStakedAmount(stakedAmount)
        setIsWithdrawInit(result)
      })
      .catch(err => {
        console.warn('error in checking is withdram init', err);
      })
  }, [dispatch, stakingContract]);


  useEffect(()=> {
    if(account) {
      getStakingInfo(account)
    }
  }, [account, library, stakingContract]);


  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      height='100%'
      display='flex'
      flexDirection='column'
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            p={2}
            display='flex'
            justifyContent='center'
          >
            <RouterLink to='/'>
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box
            display='flex'
            justifyContent='center'
          >
          <Avatar className={classes.cityAvatar}>
            <UserIcon size='22' />
          </Avatar>

          </Box>
          <Box
            mt={2}
            textAlign='center'
          >
            <Link
              component={RouterLink}
              to='#'
              variant='h5'
              color='textPrimary'
              underline='none'
            >
              {acc.loggedIn ? `${acc.address.substr(0,6)}...${acc.address.substr(acc.address.length-4, acc.address.length)}` : ''}
            </Link>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          <Paper elevation={10} >
            <Card
              className={classes.card}
            >
              
              <CardContent>
                <Box className={classes.overview}
                  textAlign="center"
                >
                  <Typography
                    display="inline"
                    variant="body1"
                    color="textSecondary"
                  >
                    Your Stake: &nbsp; 
                  </Typography>
                  <Typography
                    display="inline"
                    variant="body1"
                    color="secondary"
                  >
                    <NumberFormat 
                      value={acc.loggedIn 
                        ? Math.round(stakedAmount * 10) / 10
                        : 0
                      } 
                      displayType={'text'} 
                      thousandSeparator={true} 
                    />
                  </Typography>
                </Box>
                <Divider />
                <Box
                  justifyContent='center'
                  display='flex'
                  mt={2}
                >
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    component={RouterLink}
                    to="/app/stake"
                    fullWidth
                  >
                    {acc.loggedIn && stakedAmount > 0 ? 'Stake more' : 'Stake'}
                  </Button>
                </Box>
                {acc.loggedIn && stakedAmount > 0 &&
                  <Box
                    justifyContent='center'
                    display='flex'
                    mt={2}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      component={RouterLink}
                      to="/app/withdrawStake"
                      fullWidth
                    >
                      Withdraw
                    </Button>
                  </Box>  
                }             
              </CardContent>
            </Card>
          </Paper>
        </Box>
        <Box p={2}>
          <Paper className={classes.paper}
            elevation={10}
          >
            <Card
              className={classes.card}
            >
              
              <CardContent>
                <Box className={classes.overview}
                  textAlign="center"
                >
                <Typography
                  display="inline"
                  variant="body1"
                  color="textSecondary"
                >
                  Your Rewards: &nbsp; 
                </Typography>
                <Typography
                  display="inline"
                  variant="body1"
                  color="secondary"
                >
                  <NumberFormat 
                    value={acc.loggedIn 
                      ? Math.round(rewards * 10) / 10
                      : 0
                    } 
                    displayType={'text'} 
                    thousandSeparator={true} 
                  />
                </Typography>
                </Box>
                <Divider />
                <Box
                  mt={2}
                  display="flex"
                  justifyContent='center'
                >
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    component={RouterLink}
                    to="/app/stakeRewards"
                    fullWidth
                  >
                    Stake
                  </Button>
                </Box>
                {acc.loggedIn && stakedAmount > 0 &&
                  <Box
                    mt={2}
                    display="flex"
                    justifyContent='center'
                  >
                    <Button
                      size="small"
                      color="secondary"
                      variant="contained"
                      component={RouterLink}
                      to="/app/withdrawRewards"
                      fullWidth
                    >
                      Withdraw
                    </Button>
                  </Box>
                }
              </CardContent>
            </Card>
          </Paper>
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
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
