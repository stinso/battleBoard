import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import UserAccountSetting from './UserAccountSetting';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 0,
    paddingTop: 0
  }
}));

const userAccountSettingView = () => {
  const classes = useStyles();

  return (
    <PerfectScrollbar>
      <Page className={classes.root} title="Battle | Chain Games">
        <UserAccountSetting />
      </Page>
    </PerfectScrollbar>
  );
};

export default userAccountSettingView;
