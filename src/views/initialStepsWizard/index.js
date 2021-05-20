//import Nav from './Nav.jsx';
import React, {useState, useEffect, useContext} from 'react';
//import StepOneLinkAccount from './StepOneLinkAccount.jsx';
//import StepTwoApprove from './StepTwoApprove.jsx';
//import StepThreeDeposit from './StepThreeDeposit.jsx';
//import StepFourLinkGameNetwork from './StepFourLinkGameNetwork.jsx';
//import { ModalHeader, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ApproveRedirectLink, DepositRedirectLink, RegisterEthAddressRedirectURL } from '../../config/constants.js';
import { AuthContext } from "../../context/AuthContext";
import { DO_NOT_SHOW_WIZARD } from '../../actions/actions.js';
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Link Web3 Wallet', 'Approve CHAIN for Esports Events', 'Deposit CHAIN', 'Link Gaming Network'];
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


export default function Wizard({
  showWizardModal,
  setShowWizardModal,
  currentStep,
  setCurrentStep,
  WizardEnums
}) {
    
  const { user, dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Dialog 
        open={showWizardModal}
        maxWidth="sm"
        fullWidth
      >
    <DialogTitle>
      <Typography variant="h4">In order to get started with Chain Games, please follow these steps.</Typography>
    </DialogTitle >
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
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
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
        color="primary"
        onClick={handleNext}
        className={classes.button}
      >
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
      <Button
        className={classes.button}
        onClick={() => {
          setShowWizardModal(false);
          dispatch({
              type: DO_NOT_SHOW_WIZARD,
          })
        }}
      >
        Do Not Ask Again
      </Button>
    </DialogActions>
    </Dialog>
  );
}