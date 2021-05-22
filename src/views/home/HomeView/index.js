import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Hero from './Hero';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 0,
    paddingTop: 0
  }
}));

const HomeView = () => {
  const classes = useStyles();

  return (
    <PerfectScrollbar>
      <Page className={classes.root} title="Chain Games Battleboard">
        <Hero />
      </Page>
    </PerfectScrollbar>
  );
};

export default HomeView;
