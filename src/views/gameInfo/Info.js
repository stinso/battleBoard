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
import gold from '../../assets/img/trophy_gold.png';
import silver from '../../assets/img/trophy_silver.png';
import bronze from '../../assets/img/trophy_bronze.png';

const useStyles = makeStyles((theme) => ({
  root: {},
  price: {
    maxHeight: '280px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  avatar: {
    marginTop: theme.spacing(3),
    height: theme.spacing(16),
    width: theme.spacing(16),
    marginBottom: theme.spacing(1),
    border: '3px solid',
    borderColor: theme.palette.secondary.main
  },
  avatarGold: {
    marginTop: theme.spacing(2),
    height: theme.spacing(16),
    width: theme.spacing(16),
    marginBottom: theme.spacing(1),
    border: '3px solid',
    borderColor: '#F1B640',
    boxShadow:
      '0px 3px 1px -2px #F1B640,0px 2px 2px 0px #F1B640,0px 1px 5px 0px #F1B640'
  },
  avatarSilver: {
    marginTop: theme.spacing(2),
    height: theme.spacing(16),
    width: theme.spacing(16),
    marginBottom: theme.spacing(1),
    border: '3px solid',
    borderColor: '#999999',
    boxShadow:
      '0px 3px 1px -2px #999999,0px 2px 2px 0px #999999,0px 1px 5px 0px #999999'
  },
  avatarBronze: {
    marginTop: theme.spacing(2),
    height: theme.spacing(16),
    width: theme.spacing(16),
    marginBottom: theme.spacing(1),
    border: '3px solid',
    borderColor: '#DD6D40',
    boxShadow:
      '0px 3px 1px -2px #DD6D40,0px 2px 2px 0px #DD6D40,0px 1px 5px 0px #DD6D40'
  },
  place: {
    fontSize: 20
  }
}));

const Info = ({ eventData }) => {
  const classes = useStyles();
  const [winners, setWinners] = useState([]);

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
          <Avatar
            className={classes.avatarGold}
            src={gold}
            component={Paper}
            elevation={10}
          ></Avatar>
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
          <Avatar
            className={classes.avatarSilver}
            src={silver}
            component={Paper}
            elevation={10}
          ></Avatar>
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
          <Avatar
            className={classes.avatarBronze}
            src={bronze}
            component={Paper}
            elevation={10}
          ></Avatar>
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
