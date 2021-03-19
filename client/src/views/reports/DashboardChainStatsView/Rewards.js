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
import EmojiEvents from '@material-ui/icons/EmojiEvents';
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

const Rewards = ({ className, rewards, ...rest }) => {
  const classes = useStyles();

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
          Rewards
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
            <NumberFormat value={Math.round(rewards * 100) / 100} displayType={'text'} thousandSeparator={true} />
          </Typography>
        </Box>
      </Box>
      <Hidden mdDown>
        <Avatar className={classes.avatar}>
          <EmojiEvents />
        </Avatar>
      </Hidden>
    </Card>
  );
};

Rewards.propTypes = {
  className: PropTypes.string
};

export default Rewards;
