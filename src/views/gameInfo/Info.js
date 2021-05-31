import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Paper, makeStyles } from '@material-ui/core';
import secondPrizes from '../../assets/img/secondPrizes.png';
import thirdPrizes from '../../assets/img/thirdPrizes.png';
import {
  calculateTotalPrizePool,
  calIndividualPrize,
  getFormattedUserName
} from '../../utils/helpers.js';
import defaultAvatar from '../../assets/img/placeholder.jpg';
import grandPrize from '../../assets/img/grandPrize.png';
import forthPrizes from '../../assets/img/forthPrizes.png';
import fifthPrize from '../../assets/img/fifthPrize.png';
import ImageTagWithErrorImage from '../ImageConponentWithDefaultAvatar/index';

const useStyles = makeStyles(() => ({
  root: {},
  price: {
    height: '280px'
  }
}));

const Info = ({ eventData }) => {
  const classes = useStyles();

  const generatePrizeCard = (additionalPrize = false) => {
    let winners = [];
    if (eventData.winners?.length > 0) {
      winners = eventData.winners.map((row, index) => {
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
          case 4:
            imgSrc = forthPrizes;
            break;
          case 5:
            imgSrc = fifthPrize;
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
      winners = eventData.rewardsDistribution.map((row, index) => {
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
          case 4:
            imgSrc = forthPrizes;
            break;
          case 5:
            imgSrc = fifthPrize;
            break;
          default:
            imgSrc = null;
            break;
        }
        return { imgSrc, prizeAmount: calIndividualPrize(row, totalPrize) };
      });
    }
    return (
      <>
        {!additionalPrize &&
          winners.map((row, index) => {
            if (index < 3) {
              return (
                <div key={row.prizeAmount}>
                  <div>
                    {row.username && (
                      <>
                        <a href={`/profile/${row.username}`} className="">
                          <p>{row.username}</p>
                        </a>
                      </>
                    )}
                    <h4>{`$${row.prizeAmount}`}</h4>
                    <p>CHAIN</p>
                  </div>
                </div>
              );
            }
          })}
        {additionalPrize &&
          winners.map((row, index) => {
            if (index > 2) {
              return (
                <>
                  {row.username && (
                    <>
                      <a
                        href={`/profile/${row.username}`}
                        style={{
                          width: '87px',
                          display: 'inline-block',
                          overflow: 'hidden'
                        }}
                        className=""
                      >
                        <span className="username-winner">
                          {getFormattedUserName(row.username, 6)}
                        </span>
                      </a>
                    </>
                  )}
                  <h4>{`${index + 1}th   $${row.prizeAmount}`}</h4>
                  {index + 1 !== winners.length && (
                    <hr
                      style={{
                        borderBottom: '0.5px solid #ff8d72',
                        margin: '0px',
                        width: '93%'
                      }}
                    />
                  )}
                </>
              );
            }
          })}
      </>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper className={classes.price}>
          <h2>
            {`PRIZES ${
              eventData && !eventData.declareWinnerTx ? ' UP TO' : ''
            }`}
          </h2>
          <hr />
          {eventData?.maxPlayers &&
            eventData.rewardsDistribution?.length > 0 &&
            generatePrizeCard()}
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.price}></Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.price}></Paper>
      </Grid>
    </Grid>
  );
};

Info.propTypes = {
  className: PropTypes.string
};

export default Info;
