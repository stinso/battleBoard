import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  useMediaQuery,
  useTheme,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useStakingContract, useStakingDispatch } from "src/context/StakingContract";
import { SET_ERROR_WITH_MESSAGE, STAKE_TX_HASH } from "src/context/StakingContract/actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  sizedBox: {
    height: '296px'
  }
}));

const Confirm = ({
  className,
  onBack,
  onNext,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { stakingContract, state } = useStakingContract();
  const dispatch = useStakingDispatch();
  const { staking } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      stakingContract.stakeCHAIN('0')
        .then(v => {
          if (v === undefined) {
            dispatch({ type: SET_ERROR_WITH_MESSAGE, payload: "Your stake was not submitted" });
            if (onNext) {
              onNext();
            }
            return;
          }
          dispatch({ type: STAKE_TX_HASH, payload: v.hash });
          if (onNext) {
            onNext();
          }
        }).catch(err => {
          console.warn("err", err);
          dispatch({ type: SET_ERROR_WITH_MESSAGE, payload: "Something went wrong with your deposit, try again" });
          if (onNext) {
            onNext();
          }
        });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

return (
    <form
        className={mobileDevice? classes.root : classes.sizedBox}
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
                    Confirm
                </Typography>
                <Box mt={2}>
                    <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    >
                    Second transaction is the <strong>Stake</strong> step, where the provided amount of CHAIN tokens will be actually staked in the contract. This is the last transaction you need to make to finalize the staking.
                    </Typography>
                </Box>                
                <Box mt={2}>
                  <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  >
                    You are about to stake:<strong>{' '}{staking.stakingValue.toString()} CHAIN</strong>
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
                    <Button className={classes.button}
                    color="secondary"
                    disabled={isSubmitting}
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                    >
                      Confirm
                    </Button>
                </Box>
            </Grid>
        </Grid>
    </form>
);
}

Confirm.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func
};

Confirm.defaultProps = {
  onNext: () => {},
  onBack: () => {}
};

export default Confirm;
