import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

const font = "'Saira', sans-serif";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: 200,
    paddingTop: 100,
    minHeight: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      paddingBottom: 60
    },
    margin: 0
  }
}));

const Followers = ({ className }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.title} variant="h2" color="textPrimary">
        Followers
      </Typography>
    </div>
  );
};

Followers.propTypes = {
  className: PropTypes.string
};

export default Followers;
