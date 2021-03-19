import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Hidden,
  Typography,
  makeStyles
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Label from 'src/components/Label';
import { useDispatch, useSelector } from 'src/store';
import { getPrice } from 'src/slices/price'
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
  }
}));


const ChainPrice = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const price = useSelector((state) => state.price);
  const currency = '$';

  useEffect(() => {
    dispatch(getPrice());
  }, []);

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
          CHAIN price
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
            {currency}
            
            {price.value}
          </Typography>
          {!isMobile &&
            <Label
              className={classes.label}
              color={price.usd_24h_change > 0 ? 'success' : 'error'}
            >
              {price.usd_24h_change > 0 ? '+' : ''}
              {Math.round(price.usd_24h_change * 10) / 10}
              %
            </Label>
          }
          
        </Box>
      </Box>
      <Hidden mdDown>
        <Avatar className={classes.avatar}>
          <AttachMoneyIcon />
        </Avatar>
      </Hidden>
    </Card>
  );
};

ChainPrice.propTypes = {
  className: PropTypes.string
};

export default ChainPrice;
