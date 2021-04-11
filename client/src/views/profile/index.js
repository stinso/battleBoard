import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 0,
    paddingTop: 0
  }
}));

const ProfileView = () => {
  const classes = useStyles();

  return (
    <PerfectScrollbar>
    <Page
      className={classes.root}
      title="Battle | Chain Games"
    >
      <Profile />
    </Page>
    </PerfectScrollbar>
  );
};

export default ProfileView;
