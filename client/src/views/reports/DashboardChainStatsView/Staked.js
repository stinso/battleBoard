import React from 'react';
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
import LockItem from '@material-ui/icons/Lock'
import NumberFormat from 'react-number-format';
import { isMobile } from 'react-device-detect'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: isMobile ? theme.spacing(2) : theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  }
}));

const Staked = ({ className, stake, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          color="textSecondary"
          component="h3"
          gutterBottom
          variant="overline"
        >
          Staked
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            color="inherit"
            variant="h3"
          >
            <NumberFormat value={Math.round(stake * 10) / 10} displayType={'text'} thousandSeparator={true} />
          </Typography>
        </Box>
      </Box>
      <Hidden mdDown>
        <Avatar
          className={classes.avatar}
          color="inherit"
        >
          <LockItem />
        </Avatar>
      </Hidden>
    </Card>
  );
};

Staked.propTypes = {
  className: PropTypes.string
};

export default Staked;
