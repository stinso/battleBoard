import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import momentTz from 'moment-timezone';
import {
  Box,
  Button,
  Link,
  useMediaQuery,
  useTheme,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useStakingContract } from 'src/context/StakingContract';
import { EtherScanLink } from 'src/config/constants';
import { useWeb3React } from '@web3-react/core';

const useStyles = makeStyles((theme) => ({
  form: {
    height: 'auto'
  }
}));

const zone_name = momentTz.tz.guess();
const timezone = momentTz.tz(zone_name).zoneAbbr();


const Success = ({txHash}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [withdrawDate, setInitWithdrawDate] = useState('0');
  const { stakingContract } = useStakingContract();
  const {account} = useWeb3React()

  useEffect(() => {
    if (account) {
      stakingContract.getStakeDeposit(account)
        .then(res => {
          if(res) {
            return setInitWithdrawDate(res[2].toString());
          }
          setInitWithdrawDate('0');
        }).catch(err => {
          console.warn('error get stake deposit', err);
        });
    }
  }, [stakingContract, account]);

  const differenceInSeconds = (date) => moment().utc().diff(moment.unix(date), 'seconds') > 60 * 60 * 24 * 7;
  const sevenDaysPassed = withdrawDate !== '0' && differenceInSeconds(withdrawDate);
  const showReminder = withdrawDate !== '0' && !sevenDaysPassed;

  return (
    <form
      className={classes.form}
    >
      <Box 
        mt={3}
        display="flex"
        justifyContent="center"  
      >
        {showReminder && isAlertVisible && (
          <Box mb={3}>
            <Alert
              onClose={() => setAlertVisible(false)}
              severity="info"
            >
              You will be able to proceed with the final withdrawal step on the <strong>{moment.utc(moment.unix(withdrawDate).add(7, 'days')).local().format('Do of MMMM HH:mm A')} {timezone}</strong>,
              7 days after the withdrawal initialization was made.
            </Alert>
          </Box>
        )}
        <CheckCircleOutlineIcon 
          fontSize="large"
          color="secondary"  
        />
      </Box>
      <Box 
        mt={1}
        display="flex"
        justifyContent="center"  
      >
        <Typography
          variant="body1"
          color="textSecondary"
        >
          Transaction Sent
        </Typography>
      </Box>
      <Box 
        mt={1}
        display="flex"
        justifyContent="center"  
      >
        <Typography
          variant="body2"
          color="textSecondary"
        >
          Please check Etherscan to see if the transaction was successful.
        </Typography>
      </Box>
      <Box mt={2} justifyContent="center" display="flex">          
        <Link
          variant="subtitle1"
          color="secondary"
          href={EtherScanLink + txHash}
          target="blank"
        >
          <Typography
            className={classes.wrap}
          >
            {mobileDevice ? 'Etherscan link' : txHash}
          </Typography>
        </Link>
      </Box>
    </form>
  )
};

const Failure = ({startOver, errorMessage}) => {
  const classes = useStyles();

  const handleStartOver = () => {
    if (startOver) {
      startOver();
    }
  };

  return (
    <form
    className={classes.form}
    >
      <Box 
        mt={3}
        display="flex"
        justifyContent="center"  
      >
        <ErrorOutlineIcon 
          fontSize="large"
          color="error"  
        />
      </Box>
      <Box 
        mt={1}
        display="flex"
        justifyContent="center"  
      >
        <Typography
          variant="body1"
          color="textSecondary"
        >
          Error
        </Typography>
      </Box>
      <Box 
        mt={1}
        display="flex"
        justifyContent="center"  
      >
        <Typography
          variant="body2"
          color="textSecondary"
        >
          The process has encountered an error and needs to be started over.
        </Typography>
      </Box>
      <Box 
        mt={1}
        display="flex"
        justifyContent="center"  
      >
        <Typography
          variant="body2"
          color="textSecondary"
        >
          { errorMessage }
        </Typography>
      </Box>
      <Box
        mt={6}
        display="flex"
        flex-direction="column"
        height="100%"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Button
          color="secondary"
          variant="contained"
          size="large"
          type="submit"
          onClick={handleStartOver}
        >
          START OVER
        </Button>
      </Box>
    </form>
  )
};


const Outcome = ({
  className,
  onStartOver
}) => {
  const { state } = useStakingContract();
  const success = !state.error.isError;
  const { staking } = state;
  

  return (
    <>
      {success ? <Success txHash={staking.stakeTxHash}/> : <Failure startOver={onStartOver} errorMessage={state.error.errorMessage}/>}
    </>
  );
};

Outcome.propTypes = {
  className: PropTypes.string,
  onStartOver: PropTypes.func
};

Outcome.defaultProps = {
  onStartOver: () => {}
};

export default Outcome;
