import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Grid,
  Paper,
  makeStyles,
  Typography
} from '@material-ui/core';
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
      <Grid item align="center" xs={3}>
        <Paper className={classes.price}>
          {/* <h2>
            {`PRIZES ${
              eventData && !eventData.declareWinnerTx ? ' UP TO' : ''
            }`}
          </h2>
          <hr />
          {eventData?.maxPlayers &&
            eventData.rewardsDistribution?.length > 0 &&
            generatePrizeCard()} */}
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
              {/* {eventData?.maxPlayers && generatePrizeCard(true)} */}
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
