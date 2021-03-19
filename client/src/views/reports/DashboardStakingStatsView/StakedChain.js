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
import FlashOnIcon from '@material-ui/icons/FlashOn';
import NumberFormat from 'react-number-format';
import { isMobile } from 'react-device-detect'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    padding: isMobile ? theme.spacing(2) : theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.secondary.main,
    height: 48,
    width: 48
  }
}));

const StakedChain = ({ className, prop, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box flexGrow={1}>
        <Typography
          color="inherit"
          component="h3"
          gutterBottom
          variant="overline"
        >
          Staked CHAIN
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
            <NumberFormat value={Math.round(prop * 10) / 10} displayType={'text'} thousandSeparator={true} />
          </Typography>
        </Box>
      </Box>
      <Hidden mdDown>
        <Avatar
            className={classes.avatar}
            color="inherit"
          >
          <FlashOnIcon />
        </Avatar>
      </Hidden>
    </Card>
  );
};

StakedChain.propTypes = {
  className: PropTypes.string
};

export default StakedChain;
