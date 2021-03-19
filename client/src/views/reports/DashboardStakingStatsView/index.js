import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import NumberOfStakers from './NumberOfStakers';
import PerformanceOverTime from './PerformanceOverTime';
import StakedChain from './StakedChain';
import StakingPool from './StakingPool';
import ChainPrice from './ChainPrice';
import ContractInfo from './ContractInfo';
import { useDispatch, useSelector } from 'src/store';
import { getStakingInfo } from 'src/slices/stakingInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DashboardStakingStatsView = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const stakingInfo = useSelector((state) => state.stakingInfo);

  useEffect(() => {
    dispatch(getStakingInfo());
  }, []);

  return (
    <Page
      className={classes.root}
      title="Dashboard"
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
            <ChainPrice />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={6}
          >
            <NumberOfStakers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={6}
          >
            <StakingPool prop={stakingInfo.poolFilled}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={6}
          >
            <StakedChain prop={parseInt(stakingInfo.stakedAmount)}/>
          </Grid>
          <Grid
            item
            lg={3}
            xs={12}
          >
            {<ContractInfo />}
          </Grid>
          {/* <Grid
            item
            lg={9}
            xs={12}
          >
            <PerformanceOverTime />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardStakingStatsView;
