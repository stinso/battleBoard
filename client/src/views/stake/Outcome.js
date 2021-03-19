import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Link,
  useMediaQuery,
  useTheme,
  Typography,
  makeStyles
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useStakingContract } from "src/context/StakingContract";
import { EtherScanLink } from 'src/config/constants';

const useStyles = makeStyles((theme) => ({
  form: {
    height: 'auto'
  }
}));


const Outcome = ({
  className,
  onStartOver
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const {state} = useStakingContract();
  const success = !state.error.isError;
  const {staking} = state;

  const Success = ({txHash}) => (
    <form
      className={classes.form}
    >
      <Box 
        mt={3}
        display="flex"
        justifyContent="center"  
      >
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
          Success
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
          Congratulations! You have completed the CHAIN staking process.
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
  );
  
  const Failure = ({startOver, errorMessage}) => {
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
