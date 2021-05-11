import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Challenges from './Challenges';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 0,
    paddingTop: 0
  }
}));

const ChallengesView = () => {
  const classes = useStyles();

  return (
    <PerfectScrollbar>
    <Page
      className={classes.root}
      title="Battle | Chain Games"
    >
      <Challenges />
    </Page>
    </PerfectScrollbar>
  );
};

export default ChallengesView;
