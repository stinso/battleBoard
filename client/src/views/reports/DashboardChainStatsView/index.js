import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import LatestTransactions from './LatestTransactions';
import Rewards from './Rewards';
import AccumulatedRewards from './AccumulatedRewards';
import Staked from './Staked';
import Holdings from './Holdings';
import { useSelector } from 'src/store';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DashboardChainStatsView = () => {
  const classes = useStyles();
  const account = useSelector((state) => state.account);

  return (
    <Page
      className={classes.root}
      title="Personal Stats"
    >
      <Container maxWidth={false}>
        <Header />
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xs={6}
          >
            <Staked stake={account.stake}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={6}
          >
            <Rewards rewards={account.rewards}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={6}
          >
            <AccumulatedRewards accumulatedRewards={account.accumulatedRewards}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={6}
          >
            <Holdings account={account}/>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <LatestTransactions account={account}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardChainStatsView;
