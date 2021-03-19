import React, { useState, useEffect, useCallback } from 'react';
import BigNumber from 'bignumber.js';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import momentTz from 'moment-timezone';
import {
  Box,
  Paper,
  Typography,
  Radio,
  Button,
  useMediaQuery,
  useTheme,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useSelector } from 'src/store';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {ethers} from 'ethers';
import { useStakingContract, useStakingDispatch } from 'src/context/StakingContract';
import { SET_ADDEES_NOT_STAKED, SET_CONNECTED_ADDRESS, SET_CHAIN_BALANCE, SET_CHAIN_BALANCE_BOOL, SET_ETH_BALANCE_BOOL, SET_EXISTING_ALLOWANCE, SET_METAMASK, SET_STAKING_VALUE, SET_TOTAL_STAKE, SET_TOTAL_STAKE_LIMIT } from 'src/context/StakingContract/actions';
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
  const [isLoading, setIsLoading] = useState(1);
  const acc = useSelector((state) => state.account);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(true);
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const { stakingContract, state } = useStakingContract();
  const dispatch = useStakingDispatch();
  const [stakedAmount, setStakedAmount] = useState('0');
  const [stakedDate, setStakedDate] = useState('0');
  const [withdrawDate, setInitWithdrawDate] = useState('0');
  const zone_name = momentTz.tz.guess();
  const timezone = momentTz.tz(zone_name).zoneAbbr() ;
  const { account, connector, library } = useWeb3React();
  

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
  
  const thisWorks = (account, library) => {
    dispatch({ type: SET_METAMASK, payload: true });
    setIsLoading(7)

    stakingContract.contractTotalStakeLimit()
      .then(val => dispatch({ type: SET_TOTAL_STAKE_LIMIT, payload: val }))
      .catch(err => {
        console.warn('error fetching total staking limit', err);
      })
      .finally(()=> {
        setIsLoading(isLoading => --isLoading)
      });
    stakingContract.currentTotalStake()
      .then(val => {
        dispatch({ type: SET_TOTAL_STAKE, payload: val });
      })
      .catch(err => {
        console.warn('error fetching total stake', err);
      })
      .finally(()=> {
        setIsLoading(isLoading => --isLoading)
      });
    stakingContract.getStakeDeposit(account)
      .then(res => {
        if(res) {
          setStakedAmount(ethers.utils.formatEther(res.initialDeposit));
          setStakedDate(res[1].toString());
          setInitWithdrawDate(res[2].toString());
        } else {
          setStakedAmount('0')
          setStakedDate('0');
          setInitWithdrawDate('0');
        }
      }).catch(err => {
        console.warn('error get stake deposit', err);
      })
      .finally(()=> {
        setIsLoading(isLoading => --isLoading)
      });

    // 4. Check if connected account has CHAIN and ETH balances
    library.getSigner().getAddress().then(addr => {
      dispatch({ type: SET_CONNECTED_ADDRESS, payload: addr });
      setIsLoading(isLoading => --isLoading)

      library.getBalance(account).then(ethBalance => {
        if (ethBalance > new BigNumber(0)) {
          dispatch({ type: SET_ETH_BALANCE_BOOL, payload: true });
        } else {
          dispatch({ type: SET_ETH_BALANCE_BOOL, payload: false });
        }
      }).catch(e => console.error(e))
      .finally(()=> {
        setIsLoading(isLoading => --isLoading)
      });

      stakingContract.chainBalance(account).then(chainBalance => {
        if (chainBalance > 0) {
          dispatch({ type: SET_CHAIN_BALANCE_BOOL, payload: true });
        } else {
          dispatch({ type: SET_CHAIN_BALANCE_BOOL, payload: false });
        }
        dispatch({ type: SET_CHAIN_BALANCE, payload: chainBalance });
        dispatch({ type: SET_STAKING_VALUE, payload: chainBalance });
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

        stakingContract.getAllowance(account).then(allowance => {
          if (allowance > 0) {
            dispatch({ type: SET_EXISTING_ALLOWANCE, payload: allowance });
          }
        }).catch(e => console.error(e))
        .finally(()=> {
          setIsLoading(isLoading => --isLoading)
        });
      }).catch(e => {
        console.error(e)
        setIsLoading(isLoading => isLoading - 2)
      });
    }).catch((e)=> {
      setIsLoading(isLoading => isLoading-4)
    });;
  };

  useEffect(()=> {
    if(account && library) {
      thisWorks(account, library);
    }
  }, [account, library]);

  const { prerequisites } = state;
  const allowInitiate = stakedAmount !== '0' && stakedDate !== '0';
  const differenceInSeconds = (date) => moment().utc().diff(moment.unix(date), 'seconds') > 60 * 60 * 24 * 7;
  const sevenDaysPassed = withdrawDate !== '0' && differenceInSeconds(withdrawDate);
  const canGoToTheNextStep = (allowInitiate || sevenDaysPassed) && prerequisites.metamask;
  const buttonDisabled = (withdrawDate !== '0' && !sevenDaysPassed) || !canGoToTheNextStep

  if (isLoading <= 0 || !acc.loggedIn) {
    return (
      <Formik
        initialValues={{
          checkedConnected: acc.loggedIn,
          checkedChainBalance: (parseInt(stakedAmount) > 1 && acc.loggedIn ? true : false),
          checkedEthBalance: prerequisites.ethBalance  && acc.loggedIn
        }}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          checkedConnected: Yup.boolean().oneOf([true], 'Must connect a wallet'),
          checkedChainBalance: Yup.boolean().oneOf([true], 'Must have CHAIN in your wallet'),
          checkedEthBalance: Yup.boolean().oneOf([true], 'Must have ETH in your wallet')
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
            {withdrawDate !== '0' && !sevenDaysPassed && isAlertVisible && acc.loggedIn && (
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
                  {!acc.loggedIn ?
                    <Typography
                      gutterBottom
                      variant="h5"
                      color="textPrimary"
                    >
                      Please connect to a wallet
                    </Typography>
                  :
                    <Typography
                      gutterBottom
                      variant="h5"
                      color="textPrimary"
                    >
                      Connected with {formatConnectorName()}
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
                    Staked {acc.loggedIn ? stakedAmount : '0'} CHAIN
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >
                    Your current CHAIN stake
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
              mt={6}
              display="flex"
            >
              <Box flexGrow={1} />
              <Button
                color="secondary"
                disabled={isSubmitting || buttonDisabled}
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
