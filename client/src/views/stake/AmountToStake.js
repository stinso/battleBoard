import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
  TextField,
  Typography,
  makeStyles,
  Paper
} from '@material-ui/core';
import { useStakingContract, useStakingDispatch } from "src/context/StakingContract";
import { SET_STAKING_VALUE, SET_TOAPPROVE_ALLOWANCE, SHOW_STAKE } from "src/context/StakingContract/actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  addTab: {
    marginLeft: theme.spacing(2)
  },
  sizedBox: {
    height: '296px'
  }
}));

const AmountToStake = ({
  className,
  onBack,
  onNext,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const { state } = useStakingContract();
  const dispatch = useStakingDispatch();
  const [ staking, setStakingValue ] = useState(state.staking)
  const [ allowance ] = useState(state.allowance)
  const maxStake = 50000000;
  // This is the maximum the user can stake: either the whole maxStake, either his entire balance
  const userCanStake = staking.stakingValue < maxStake ? staking.stakingValue : maxStake;

  return (
    <Formik
      initialValues={{
        amountToStake: userCanStake
      }}
      enableReinitialize={true}
      validationSchema={Yup.object().shape({
        amountToStake: Yup.number().required('Required')
        .typeError('Amount to stake must be a Number')
        .positive('Amount to stake must be greater than 0')
        .min(1, 'The minimum stake is 1 CHAIN')
        .max(staking.chainBalance, `Your maximum stake is ${staking.chainBalance} CHAIN`)
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          setSubmitting(true);
          setStatus({ success: true });

          dispatch({ type: SET_STAKING_VALUE, payload: parseInt(values.amountToStake) });
          dispatch({ type: SHOW_STAKE, payload: true });
          let diffToApprove = parseInt(values.amountToStake) - allowance.existing;
          if (diffToApprove <= 0) {
            dispatch({ type: SET_TOAPPROVE_ALLOWANCE, payload: 0 });
          }

          dispatch({ type: SET_TOAPPROVE_ALLOWANCE, payload: parseInt(values.amountToStake) });

          if (onNext) {
            onNext();
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue
      }) => (
        <form
          className={mobileDevice ? classes.root : classes.sizedBox}
          onSubmit={handleSubmit}
          display="flex"
          flex-direction="column"
          {...rest}
        >
          <Grid 
            container
            className={mobileDevice ? classes.root : classes.sizedBox}
            display="flex"
            flex-direction="column"
          >
            <Grid item container direction="column" justify="flex-start">
              <Typography
                variant="h3"
                color="textPrimary"
              >
                How much do you want to stake?
              </Typography>
              <Box mt={2}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                >
                  Please enter the amount of CHAIN you want to stake.
                </Typography>
              </Box>
              <Box mt={3}>
                <Paper>
                  <TextField
                    error={Boolean(touched.amountToStake && errors.amountToStake)}
                    fullWidth
                    helperText={touched.amountToStake && errors.amountToStake}
                    label="Amount to stake"
                    name="amountToStake"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amountToStake}
                    variant="outlined"
                  />
                </Paper>
                {mobileDevice 
                ?
                  <Box>
                    <Box mt={1} display="flex">
                      <Box>
                        <Typography
                          display="inline"
                          variant="body2"
                          color="textPrimary"
                        >
                          Balance:&nbsp;
                        </Typography>
                        <Typography
                          display="inline"
                          variant="body2"
                          color="secondary"
                        >
                          {staking.chainBalance?.toLocaleString('en')}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box mt={1} display="flex">
                      <Button
                        color="secondary"
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setFieldValue('amountToStake', staking.chainBalance * 0.25)
                        }}
                      >
                        25%
                      </Button>
                      <Box ml={1}>
                        <Button
                          color="secondary"
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setFieldValue('amountToStake', staking.chainBalance * 0.5)
                          }}
                        >
                          50%
                        </Button>
                      </Box>
                      <Box ml={1}>
                        <Button
                          color="secondary"
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setFieldValue('amountToStake', staking.chainBalance)
                          }}
                        >
                          100%
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                :
                  <Box mt={1} display="flex">
                    <Box>
                      <Typography
                        display="inline"
                        variant="body2"
                        color="textPrimary"
                      >
                        Balance:&nbsp;
                      </Typography>
                      <Typography
                        display="inline"
                        variant="body2"
                        color="secondary"
                      >
                        {staking.chainBalance?.toLocaleString('en')}
                      </Typography>
                    </Box>
                    
                    <Box flexGrow={1} />
                    <Button
                      color="secondary"
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setFieldValue('amountToStake', staking.chainBalance * 0.25)
                      }}
                    >
                      25%
                    </Button>
                    <Box ml={1}>
                      <Button
                        color="secondary"
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setFieldValue('amountToStake', staking.chainBalance * 0.5)
                        }}
                      >
                        50%
                      </Button>
                    </Box>
                    <Box ml={1}>
                      <Button
                        color="secondary"
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setFieldValue('amountToStake', staking.chainBalance)
                        }}
                      >
                        100%
                      </Button>
                    </Box>
                  </Box>
                }
                
              </Box>
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
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
  
};

AmountToStake.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func
};

AmountToStake.defaultProps = {
  onNext: () => {},
  onBack: () => {}
};

export default AmountToStake;