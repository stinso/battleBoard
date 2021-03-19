import React, { useState, useEffect, useCallback } from 'react';
import BigNumber from "bignumber.js";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Paper,
  FormHelperText,
  Typography,
  Radio,
  Button,
  useMediaQuery,
  useTheme,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Checkbox } from 'formik-material-ui';
import { useSelector } from 'src/store';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import TermsAndConditions from './TermsAndConditions'
import moment from 'moment';
import momentTz from 'moment-timezone';
import { ethers } from 'ethers';
import { useStakingContract, useStakingDispatch } from "src/context/StakingContract";
import { SET_ADDEES_NOT_STAKED, SET_WITHDRAW_INITIATED_DATE, SET_IS_WITHDRAW_INITIATED, SET_STAKED_AMOUNT, SET_REWARD_VALUE, SET_CONNECTED_ADDRESS, SET_CHAIN_BALANCE, SET_CHAIN_BALANCE_BOOL, SET_ETH_BALANCE_BOOL, SET_EXISTING_ALLOWANCE, SET_METAMASK, SET_STAKING_VALUE, SET_TOTAL_STAKE, SET_TOTAL_STAKE_LIMIT } from "src/context/StakingContract/actions";
import { useWeb3React } from '@web3-react/core';
import { SUPPORTED_WALLETS } from 'src/components/WalletSelector/WalletSelector';
import { injected } from 'src/components/connectors/connectors';
import LoadingScreen from 'src/components/LoadingScreen';


const useStyles = makeStyles((theme) => ({
  root: {},
  typeOption: {
    alignItems: 'flex-start',
    display: 'flex',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  stepButton: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const Prerequisites = ({
  className,
  onNext,
  ...rest
}) => {
  const classes = useStyles();
  const [isAlertVisible, setAlertVisible] = useState(true);
  const [isStakingPeriodAlertVisible, setStakingPeriodAlertVisible] = useState(true);
  const acc = useSelector((state) => state.account);
  const [isSubmitting, setSubmitting] = useState(false);
  const { stakingContract, state } = useStakingContract();
  const dispatch = useStakingDispatch();
  const [isLoading, setIsLoading] = useState(1);
  const [isWithdrawInit, setIsWithdrawInit] = useState(true);
  const zone_name = momentTz.tz.guess();
  const timezone = momentTz.tz(zone_name).zoneAbbr();
  const { account, connector, library } = useWeb3React()
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        k =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map(k => SUPPORTED_WALLETS[k].name)[0]
    return name
  }
  
  const thisWorks = useCallback((account, library) => {
    dispatch({ type: SET_METAMASK, payload: true });
    setIsLoading(7)
    
   

    stakingContract.stakingContract.maxStakingAmount()
      .then(val => dispatch({ type: SET_TOTAL_STAKE_LIMIT, payload: val }))
      .catch(err => {
        console.warn("error fetching total staking limit", err);
      }).finally(()=> {
        setIsLoading(isLoading => --isLoading)
      });
    stakingContract.stakingContract.currentTotalStake()
      .then(val => {
        dispatch({ type: SET_TOTAL_STAKE, payload: val })
      })
      .catch(err => {
        console.warn("error fetching total stake", err);
      }).finally(()=> {
        setIsLoading(isLoading => --isLoading)
      });;

      
    // 4. Check if connected account has CHAIN and ETH balances
    library.getSigner().getAddress().then(addr => {
      setIsLoading(isLoading => --isLoading)
      dispatch({ type: SET_CONNECTED_ADDRESS, payload: addr });

      library.getBalance(account).then(ethBalance => {
        if (ethBalance > new BigNumber(0)) {
          dispatch({ type: SET_ETH_BALANCE_BOOL, payload: true })
        } else {
          dispatch({ type: SET_ETH_BALANCE_BOOL, payload: false })
        }
      }).catch(e => console.error(e)).finally(()=> {
        setIsLoading(isLoading => --isLoading)
      });;

      stakingContract.chainBalance(account).then(chainBalance => {
        setIsLoading(isLoading => --isLoading)
        if (chainBalance > 0) {
          dispatch({ type: SET_CHAIN_BALANCE_BOOL, payload: true });
        } else {
          dispatch({ type: SET_CHAIN_BALANCE_BOOL, payload: false });
        }
        dispatch({ type: SET_CHAIN_BALANCE, payload: chainBalance });
        dispatch({ type: SET_STAKING_VALUE, payload: chainBalance });
      }).catch(e => console.error(e)).finally(()=> {
        setIsLoading(isLoading => --isLoading)
      });

      stakingContract.getStakeDeposit(account)
      .then(res =>{
        if(res === false) {
          dispatch({ type: SET_IS_WITHDRAW_INITIATED, payload: false })
          setIsWithdrawInit(false)
          dispatch({ type: SET_WITHDRAW_INITIATED_DATE, payload: '0' })
          return
        }
        const result = res.endDate.toString() !== '0';
        const stakedAmount = (ethers.utils.formatEther(res.initialDeposit))
        const reward = (ethers.utils.formatEther(res.rewards))
        dispatch({ type: SET_IS_WITHDRAW_INITIATED, payload: result })
        dispatch({ type: SET_WITHDRAW_INITIATED_DATE, payload: res.endDate.toString() })

        dispatch({ type: SET_STAKED_AMOUNT, payload: stakedAmount })
        dispatch({ type: SET_REWARD_VALUE, payload: reward })
        setIsWithdrawInit(result)
      })
      .catch(err => {
        console.warn("error in checking is withdram init", err);
      }).finally(()=> {
        setIsLoading(isLoading => --isLoading)
      });

      stakingContract.getAllowance(account).then(allowance => {
        dispatch({ type: SET_EXISTING_ALLOWANCE, payload: allowance });
      }).catch(e => console.error(e))
      .finally(()=> {
        setIsLoading(isLoading => --isLoading)
      });

      // Check if address is already staked:
      stakingContract.alreadyStaked(account).then(staked => {
        setIsLoading(isLoading => --isLoading)
        dispatch({ type: SET_ADDEES_NOT_STAKED, payload: !staked });
        if (staked) {
          return;
        }
      }).catch(e => {
        console.error(e)
        setIsLoading(isLoading => isLoading - 2)
      });
    }).catch((e)=> {
      setIsLoading(isLoading => isLoading-4)
    });
  }, [dispatch, stakingContract]);

  useEffect(()=> {
    if(account && library) {
      thisWorks(account, library)
    }
  }, [account, library]);

  const { prerequisites, staking } = state;
  const differenceInSeconds = (date) => moment().utc().diff(moment.unix(date), 'seconds') > 60 * 60 * 24 * 7;
  const sevenDaysPassed = prerequisites.endDate !== '0' && differenceInSeconds(prerequisites.endDate);
  
  if (isLoading <= 0 || !acc.loggedIn) {
    return (
      <Formik
        initialValues={{
          checkedConnected: acc.loggedIn,
          checkedChainBalance: prerequisites.chainBalance && acc.loggedIn,
          checkedEthBalance: prerequisites.ethBalance && acc.loggedIn,
          checkedTermsAndConditions: false
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          checkedConnected: Yup.boolean().oneOf([true], "Must connect a wallet"),
          checkedChainBalance: Yup.boolean().oneOf([true], "Must have CHAIN in your wallet"),
          checkedEthBalance: Yup.boolean().oneOf([true], "Must have ETH in your wallet"),
          checkedTermsAndConditions: Yup.boolean().oneOf([true], "Pleace accept the Terms and Conditions")
        })}
        onSubmit={async (values, {
          setErrors,
          setStatus,
          setSubmitting
        }) => {
          try {
            setStatus({ success: true });
            setSubmitting(true);
  
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
          setFieldValue,
          setFieldTouched,
          touched,
          values
        }) => (
          <form
            onSubmit={handleSubmit}
            className={clsx(classes.root, className)}
            {...rest}
          >
            {prerequisites.endDate !== '0' && !sevenDaysPassed && isAlertVisible && acc.loggedIn && (
              <Box mb={3}>
                <Alert
                  onClose={() => setAlertVisible(false)}
                  severity="info"
                >
                  You will be able to stake again after proceeding with the final withdrawal step on the <strong>{moment.utc(moment.unix(prerequisites.endDate).add(7, 'days')).local().format("Do of MMMM HH:mm A")} {timezone}</strong>,
                  7 days after the withdrawal initialization was made.
                </Alert>
              </Box>
            )}
            {isStakingPeriodAlertVisible && (
              <Box mb={3}>
                <Alert
                  onClose={() => setStakingPeriodAlertVisible(false)}
                  severity="info"
                >
                  <strong>7 Day Withdrawal Cooldown Period: </strong>
                  Please note, there is a 7 day withdrawal cooldown period.  This means once you unstake, it will take 7 days for the CHAIN tokens 
                  to be available for the final withdrawal step in order to move back to your wallet.
                </Alert>
              </Box>
            )}
            <Typography
              variant="h3"
              color="textPrimary"
            >
              Prerequisites
            </Typography>
            <Box mt={2}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
              >
                In order to move to the next step, we are automatically checking that the following conditions are met:
              </Typography>
            </Box>
            <Box mt={2}>
              <Paper
                className={classes.typeOption}
                elevation={10}
              >
                <Radio
                  checked={values.checkedConnected}
                />
                <Box ml={2}>
                  {acc.loggedIn ? 
                    <Typography
                      gutterBottom
                      variant="h5"
                      color="textPrimary"
                    >
                      Connected with {formatConnectorName()}
                    </Typography>
                    :
                    <Typography
                      gutterBottom
                      variant="h5"
                      color="textPrimary"
                    >
                      Please connect to a wallet
                    </Typography>
                  }
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >
                    If not connected click "CONNECT WALLET" in the top right corner
                  </Typography>
                </Box>
              </Paper>
              <Paper
                className={classes.typeOption}
                elevation={10}
              >
                <Radio
                  checked={values.checkedChainBalance}
                />
                <Box ml={2}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    color="textPrimary"
                  >
                    CHAIN balance {acc.loggedIn ? staking.chainBalance.toLocaleString('en') : '0'}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >
                    Your current CHAIN balance in your wallet
                  </Typography>
                </Box>
              </Paper>
              <Paper
                className={classes.typeOption}
                elevation={10}
              >
                <Radio
                  checked={values.checkedEthBalance}
                />
                <Box ml={2}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    color="textPrimary"
                  >
                    ETH balance greater than 0
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >
                    Only required for Ethereum transaction fees
                  </Typography>
                </Box>
              </Paper>
            </Box>
            <Box
              alignItems="center"
              display="flex"
              mt={2}
              ml={-1}
            >
              <Field component={Checkbox} type="checkbox" name="checkedTermsAndConditions" />
              {' '}
              <TermsAndConditions />
            </Box>
            {errors.checkedTermsAndConditions && (
              <Box mt={2}>
                <FormHelperText error>
                  {errors.checkedTermsAndConditions}
                </FormHelperText>
              </Box>
            )}
            <Box
              mt={6}
              display="flex"
            >
              <Button
                size="large"
              >
                Previous
              </Button>
              <Box flexGrow={1} />
              <Button
                color="secondary"
                disabled={isSubmitting || (prerequisites.endDate !== '0' && !sevenDaysPassed)}
                type="submit"
                variant="contained"
                size="large"
              >
                Next
              </Button>
            </Box>
          </form>
        )}
      </Formik>    
    );
  } else {
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
            Fetching account details
          </Typography>
        </Box>
      </Box>
    )
  }
};

Prerequisites.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func
};

Prerequisites.defaultProps = {
  onNext: () => {}
};

export default Prerequisites;
