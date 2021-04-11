import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import UserAccountSettings from './UserAccountSettings';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 0,
    paddingTop: 0
  }
}));

const UserAccountSettingsView = () => {
  const classes = useStyles();

  return (
    <PerfectScrollbar>
    <Page
      className={classes.root}
      title="Battle | Chain Games"
    >
      <UserAccountSettings />
    </Page>
    </PerfectScrollbar>
  );
};

export default UserAccountSettingsView;
