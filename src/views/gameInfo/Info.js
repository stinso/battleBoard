import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import secondPrizes from '../../assets/img/secondPrizes.png';
import thirdPrizes from '../../assets/img/thirdPrizes.png';
import {
  calculateTotalPrizePool,
  calIndividualPrize
} from '../../utils/helpers.js';
import grandPrize from '../../assets/img/grandPrize.png';

const useStyles = makeStyles((theme) => ({
  root: {},
  price: {
    maxHeight: '280px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  avatar: {
    marginTop: theme.spacing(3),
    height: theme.spacing(12),
    width: theme.spacing(12),
    marginBottom: theme.spacing(1),
    border: '3px solid',
    borderColor: theme.palette.secondary.main
  },
  place: {
    fontSize: 20
  }
}));

const Info = ({ eventData }) => {
  const classes = useStyles();
  const [winners, setWinners] = useState([]);

  console.log(winners);

  const getPriceInfo = () => {
    let winnersTemp = [];
    if (eventData.winners?.length > 0) {
      winnersTemp = eventData.winners.map((row, index) => {
        let imgSrc = null;
        switch (index + 1) {
          case 1:
            imgSrc = grandPrize;
            break;
          case 2:
            imgSrc = secondPrizes;
            break;
          case 3:
            imgSrc = thirdPrizes;
            break;
          default:
            imgSrc = null;
            break;
        }
        return {
          imgSrc,
          prizeAmount: row.winningsInUSD.toFixed(2),
          ...row
        };
      });
    } else {
      const totalPrize = calculateTotalPrizePool(
        eventData?.betAmount,
        eventData.maxPlayers
      );
      winnersTemp = eventData.rewardsDistribution.map((row, index) => {
        let imgSrc = null;
        switch (index + 1) {
          case 1:
            imgSrc = grandPrize;
            break;
          case 2:
            imgSrc = secondPrizes;
            break;
          case 3:
            imgSrc = thirdPrizes;
            break;
          default:
            imgSrc = null;
            break;
        }
        return { imgSrc, prizeAmount: calIndividualPrize(row, totalPrize) };
      });
    }
    setWinners(winnersTemp);
  };

  useEffect(() => {
    if (eventData?.maxPlayers && eventData.rewardsDistribution?.length > 0) {
      getPriceInfo();
    }
  }, [eventData]);

  return (
    <Grid container spacing={2}>
      <Grid item align="center" xs={3}>
        <Paper className={classes.price}>
          <Typography className={classes.place} variant="h6">
            1st
          </Typography>
          <Avatar className={classes.avatar}></Avatar>
          <Typography className={classes.place} variant="h6">
            {winners.length > 0 && `$${winners[0].prizeAmount}`}
          </Typography>
        </Paper>
      </Grid>
      <Grid item align="center" xs={3}>
        <Paper className={classes.price}>
          <Typography className={classes.place} variant="h6">
            2nd
          </Typography>
          <Avatar className={classes.avatar}></Avatar>
          <Typography className={classes.place} variant="h6">
            {winners.length > 1 && `$${winners[1].prizeAmount}`}
          </Typography>
        </Paper>
      </Grid>
      <Grid item align="center" item xs={3}>
        <Paper className={classes.price}>
          <Typography className={classes.place} variant="h6">
            3rd
          </Typography>
          <Avatar className={classes.avatar}></Avatar>
          <Typography className={classes.place} variant="h6">
            {winners.length > 2 && `$${winners[2].prizeAmount}`}
          </Typography>
        </Paper>
      </Grid>
      {eventData &&
        eventData.maxWinners &&
        eventData.rewardsDistribution?.length >= 4 && (
          <Grid item align="center" xs={3}>
            <Paper className={classes.price}>
              <Typography className={classes.place} variant="h6">
                Additional Prizes{' '}
                {eventData && !eventData.declareWinnerTx && 'UP TO'}
              </Typography>
            </Paper>
          </Grid>
        )}
    </Grid>
  );
};

Info.propTypes = {
  className: PropTypes.string
};

export default Info;
