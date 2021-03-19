import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useStakingContract, useStakingDispatch } from 'src/context/StakingContract';
import { SET_ERROR_WITH_MESSAGE, STAKE_TX_HASH } from 'src/context/StakingContract/actions';
import { useWeb3React } from '@web3-react/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  editorContainer: {
    marginTop: theme.spacing(3)
  },
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

const InitializeWithdrawal = ({
  className,
  onBack,
  onNext,
  ...rest
}) => {
  const classes = useStyles();
  const [isSubmitting, setSubmitting] = useState(false);
  const { stakingContract } = useStakingContract();
  const dispatch = useStakingDispatch();
  const {account} = useWeb3React()
  const [withdrawDate, setInitWithdrawDate] = useState('0');

  useEffect(() => {
    let mounted = true
    if (account) {
      stakingContract.getStakeDeposit(account)
        .then(res => {
          if (mounted) {
          if(res) {
            return setInitWithdrawDate(res[2].toString());
          }
          setInitWithdrawDate('0');
          }
        }).catch(err => {
          setInitWithdrawDate('0');
          console.warn('error get stake deposit', err);
        });
    }

    return () => mounted = false;
  }, [stakingContract, account]);


  const initiateWithdraw = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);

      stakingContract.initiateWithdrawal()
      .then(v => {
        console.log('withdraw initiated', v);
        dispatch({ type: STAKE_TX_HASH, payload: v.hash });
        if (onNext) {
          onNext();
        }
      })
      .catch(e => {
        dispatch({ type: SET_ERROR_WITH_MESSAGE, payload: '' });
        if (onNext) {
          onNext();
        }
        console.warn(e);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const withdraw = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      stakingContract.executeWithdrawal()
        .then(v => {
          console.log('withdraw executed', v);
          dispatch({ type: STAKE_TX_HASH, payload: v.hash });
          if (onNext) {
            onNext();
          }
        })
        .catch(e => {
          dispatch({ type: SET_ERROR_WITH_MESSAGE, payload: '' });
          if (onNext) {
            onNext();
          }
          console.warn(e);
        });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  
  if (withdrawDate === '0') {
    return (
      <form
        onSubmit={initiateWithdraw}
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Typography
          variant="h3"
          color="textPrimary"
        >
          Initialize Withdrawal
        </Typography>
        <Box mt={2}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
          >
            1<sup>st</sup> of 2 transactions required to withdraw.
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            The withdrawal process has two steps. On the first transaction the withdrawal is initialized, and after 7 days passed a second withdrawal confirmation
            is required to finalize the process.
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            You will now be asked to confirm the withdrawal initialization by sending a web3 wallet transaction.
          </Typography>
        </Box>
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
            type="submit"
            variant="contained"
            size="large"
          >
            Next
          </Button>
        </Box>
      </form>
    )
  } else {
    return (
      <form
        onSubmit={withdraw}
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Typography
          variant="h3"
          color="textPrimary"
        >
          Finalize Withdrawal
        </Typography>
        <Box mt={2}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
          >
            2<sup>nd</sup> of 2 transactions needed to withdraw
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            You will now be asked to confirm the withdrawal finalization by sending a web3 wallet transaction.
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            After the transaction is processed your stake as well as the stake reward will be transferred back to your wallet.
          </Typography>
        </Box>
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
            type="submit"
            variant="contained"
            size="large"
          >
            Next
          </Button>
        </Box>
      </form>
    )
  }
};

InitializeWithdrawal.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func
};

InitializeWithdrawal.defaultProps = {
  onNext: () => {},
  onBack: () => {}
};

export default InitializeWithdrawal;
