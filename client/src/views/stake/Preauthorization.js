import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  useMediaQuery,
  useTheme,
  Link,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useStakingContract, useStakingDispatch } from "src/context/StakingContract";
import { SET_APPROVE_TX_HASH, SET_ERROR_WITH_MESSAGE, SET_PREAUTH_LOADING } from "src/context/StakingContract/actions";
import LoadingScreen from 'src/components/LoadingScreen';
import { EtherScanLink } from 'src/config/constants';

const useStyles = makeStyles((theme) => ({
  root: {},
  sizedBox: {
    height: '296px'
  }
}));

const Preauthorization = ({
  className,
  onBack,
  onNext,
  onLast,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { stakingContract, state } = useStakingContract();
  const dispatch = useStakingDispatch();


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);

      stakingContract.approveContract(allowance.toApprove.toString())
      .then(v => {
        dispatch({ type: SET_APPROVE_TX_HASH, payload: v.hash });
        dispatch({ type: SET_PREAUTH_LOADING, payload: true });
        stakingContract.provider.waitForTransaction(v.hash).then(tx => {
          if (tx.status) {
            dispatch({ type: SET_PREAUTH_LOADING, payload: false });
            if (onNext) {
              onNext();
            }
          } else {
            dispatch({ type: SET_PREAUTH_LOADING, payload: false });
            dispatch({ type: SET_ERROR_WITH_MESSAGE, payload: "Something went wrong with your approval, try again if you wish to stake." });
            if (onLast) {
              onLast();
            }
          }
        }).catch(err => {
          console.warn(err);
          dispatch({ type: SET_ERROR_WITH_MESSAGE, payload: "Something went wrong with your approval, try again if you wish to stake." });
          if (onLast) {
            onLast();
          }
        });
      }).catch(err => {
        console.warn(err);
        dispatch({ type: SET_ERROR_WITH_MESSAGE, payload: "Something went wrong with your approval, try again if you wish to stake." });
        if (onLast) {
          onLast();
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const { allowance, ui } = state;

  if (ui.preAuth.loading) {
    return (
      <Box 
        className={classes.root}
        {...rest}
      >
        <Box 
          mt={2}
          mb={2}
        >
          <LoadingScreen width={mobileDevice ? 200 : 400}/>
        </Box>  
        <Box justifyContent="center" display="flex">
          <Typography
            variant="h3"
            color="textPrimary"
          >
            Waiting for the transaction to complete
          </Typography>
        </Box>
        <Box mt={2} justifyContent="center" display="flex">
          <Typography
            variant="subtitle1"
            color="textSecondary"
          >
            Please wait for the web3 wallet transaction to complete before any other action.
          </Typography>
        </Box>
        <Box mt={2} justifyContent="center" display="flex">
            { allowance.approveTxHash &&            
              <Link
                variant="subtitle1"
                color="secondary"
                href={EtherScanLink + allowance.approveTxHash}
                target="blank"
              >
                {mobileDevice ? 'Etherscan link' : allowance.approveTxHash}
              </Link>
            }
        </Box>
      </Box> 
    )
  } else {
    return (
      <form
        className={mobileDevice ? classes.root : classes.sizedBox}
        onSubmit={handleSubmit}
        display="flex"
        flex-direction="column"
        {...rest}
      >
        <Grid 
          container
          className={mobileDevice? classes.root : classes.sizedBox}
          display="flex"
          flex-direction="column"
        >
          <Grid item container direction="column" justify="flex-start">
            <Typography
              variant="h3"
              color="textPrimary"
            >
              Pre-authorization
            </Typography>
            <Box mt={2}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
              >
                1<sup>st</sup> of 2 transactions required.
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                First transaction is the Pre-authorization step, where you allow the staking contract to access your tokens upto the provided amount.
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                You will be asked to confirm that you allow the smart contract to have access to <strong>{allowance.toApprove?.toLocaleString('en')}</strong> CHAIN from your wallet.
              </Typography>
            </Box>
            {error && (
              <Box mt={2}>
                <FormHelperText error>
                  {FormHelperText}
                </FormHelperText>
              </Box>
            )}
          </Grid>
          <Grid item container direction="column" justify="flex-end">
            <Box
              mt={6}
              display="flex"
            >
              {onBack && (
                <Button
                  onClick={onBack}
                  size="large"
                >
                  Previous
                </Button>
              )}
              <Box flexGrow={1} />
              <Button
                color="secondary"
                disabled={isSubmitting}
                onClick={handleSubmit}
                variant="contained"
                size="large"
              >
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
};

Preauthorization.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  onLast: PropTypes.func
};

Preauthorization.defaultProps = {
  onNext: () => {},
  onBack: () => {},
  onLast: () => {}
};

export default Preauthorization;
