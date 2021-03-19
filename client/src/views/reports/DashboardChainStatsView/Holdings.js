import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Typography,
  makeStyles
} from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import axios from 'axios'
import { isMobile } from 'react-device-detect'


const useStyles = makeStyles((theme) => ({
  root: {
    padding: isMobile ? theme.spacing(2) : theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  },
  imageIcon: {
    display: 'flex',
    height: 'inherit',
    width: 'inherit'
  }
}));

const Holdings = ({ className, account, ...rest }) => {
  const classes = useStyles();
  const [holdings, setHoldings] = useState(0)

  const getHoldings = async () => {
    if (account.loggedIn) {
      const response = await axios.get(`/holdings/${account.address}`).catch((err) => {
        console.log("Error:", err);
      });
      if (response && response.data.holdings) {
        const value = Math.round(response.data.holdings / 1000000000000000000)
        setHoldings(value)
      }
    }
  }

  useEffect(() => {
    getHoldings();
  }, [account]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
          Holdings
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            variant="h3"
            color="textPrimary"
          >
            {account.loggedIn? Math.round(holdings * 10) / 10 : '0'}
          </Typography>
        </Box>
      </Box>
      <Avatar className={classes.avatar}>
        <AccountBalanceIcon/>
      </Avatar>
    </Card>
  );
};

Holdings.propTypes = {
  className: PropTypes.string
};

export default Holdings;
