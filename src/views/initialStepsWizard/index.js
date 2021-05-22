import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
  ApproveRedirectLink,
  DepositRedirectLink,
  RegisterEthAddressRedirectURL,
  MAX_APPROVED_BALANCE
} from '../../config/constants.js';
import { AuthContext } from '../../context/AuthContext';
import { DO_NOT_SHOW_WIZARD } from '../../actions/actions.js';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import * as Sentry from '@sentry/react';
import {
  getMyInfoService,
  getLinkedNetworkService
} from '../../service/node.service.js';
import { getBalance } from '../../utils/helpers.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

function getSteps() {
  return [
    'Link Web3 Wallet',
    'Approve CHAIN for Esports Events',
    'Deposit CHAIN',
    'Link Gaming Network'
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Please click the below to link your Ethereum address.`;
    case 1:
      return 'Please click the below to approve CHAIN token to use for esports events.';
    case 2:
      return `Please click the below to deposit your CHAIN token to matic layer.`;
    case 3:
      return `Please click the below to link your gaming network accounts with Chain Games.`;
    default:
      return 'Unknown step';
  }
}

function getStepButtonText(step) {
  switch (step) {
    case 0:
      return 'LINK';
    case 1:
      return 'APPROVE';
    case 2:
      return 'DEPOSIT';
    case 3:
      return 'LINK';
    default:
      return 'Unknown step';
  }
}

function getStepButtonLink(step) {
  switch (step) {
    case 0:
      return RegisterEthAddressRedirectURL;
    case 1:
      return ApproveRedirectLink;
    case 2:
      return DepositRedirectLink;
    case 3:
      return '/userAccountSetting';
    default:
      return 'Unknown step';
  }
}

export default function Wizard({
  currentStep,
  showWizardModal,
  setShowWizardModal
}) {
  const { user, dispatch } = useContext(AuthContext);
  const username = user.user?.session?.username;
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(currentStep);
  const steps = getSteps();
  const location = useLocation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Step 0/3
  const getUserInfo = async () => {
    try {
      const { data } = await getMyInfoService({});
      if (data.success === true) {
        if (data.ethAddress) {
          handleNext();
        } else {
          setShowWizardModal(true);
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: initialStepWizard.js ~ line 95 ~ getUserInfo ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  useEffect(() => {
    if (activeStep === 0) getUserInfo();
  }, [activeStep]);

  // Step 1/3
  const getApprovedBalance = async () => {
    try {
      const { approvedBalance } = await getBalance(
        user.user?.session?.ethAddress
      );
      if (approvedBalance >= MAX_APPROVED_BALANCE) {
        handleNext();
      } else {
        setShowWizardModal(true);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: initialStepWizard.js ~ line 123 ~ getApprovedBalance ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  useEffect(() => {
    if (user.user?.session?.ethAddress && activeStep === 1) {
      getApprovedBalance();
    }
  }, [user.user?.session?.ethAddress, activeStep]);

  // Step 2/3
  const getNetworkBalance = async () => {
    try {
      const { networkBalance } = await getBalance(
        user.user?.session?.ethAddress
      );
      if (networkBalance > 0) {
        handleNext();
      } else {
        setShowWizardModal(true);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: initialStepWizard.js ~ line 143 ~ getNetworkBalance ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  useEffect(() => {
    if (user.user?.session?.ethAddress && activeStep === 2) {
      getNetworkBalance();
    }
  }, [user.user?.session?.ethAddress, activeStep]);

  // Step 3/3
  const getLinkedNetworks = async () => {
    try {
      const { data } = await getLinkedNetworkService({ username });
      if (data.success === true) {
        if (data.linkedNetworks?.length > 0) {
          setShowWizardModal(false);
        } else {
          setShowWizardModal(true);
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: initialStepWizard.js ~ line 172 ~ getLinkedNetworks ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  useEffect(() => {
    if (username && activeStep === 3) {
      getLinkedNetworks();
    }
  }, [username, activeStep]);

  const handleClose = () => {
    setShowWizardModal(false);
  };

  return (
    <Dialog
      open={showWizardModal}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle disableTypography>
        <Typography variant="h4">
          In order to get started with Chain Games, please follow these steps.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                        variant="outlined"
                        color="secondary"
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          openInNewWindow(getStepButtonLink(index));
                        }}
                        className={classes.button}
                      >
                        {getStepButtonText(index)}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            if (activeStep === steps.length - 1) {
              setShowWizardModal(false);
            } else {
              handleNext();
            }
          }}
          className={classes.button}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
        <Button
          className={classes.button}
          color="secondary"
          variant="contained"
          onClick={() => {
            setShowWizardModal(false);
            dispatch({
              type: DO_NOT_SHOW_WIZARD
            });
          }}
        >
          Do Not Ask Again
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function openInNewWindow(url) {
  window.open(url, '_blank');
}
