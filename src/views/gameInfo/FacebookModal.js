import { useEffect, useState, useContext, useCallback, Fragment } from 'react';
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
  Paper,
  Typography,
  Modal,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  makeStyles
} from '@material-ui/core';
import GameConsoleSelection from './ConsoleSelection';
import { useLocation } from 'react-router-dom';
import {
  FacebookProvider,
  LoginButton,
  Like,
  ShareButton,
  Initialize,
  Status
} from 'react-facebook';
import { FacebookAppID, ChainGamesFBID, Devices } from '../../config/constants';
import { Alert } from '@material-ui/lab';
import * as Sentry from '@sentry/react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  title: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

function getSteps() {
  return ['Login', 'Like and Share', 'Select Console'];
}

const FaceBookStepsModal = ({
  consoleSelectedValue,
  handleConsoleOnChange,
  handleSponsoredEventRegister,
  fbInfo,
  setFbInfo,
  eventData,
  isSponsoredEvent,
  setShowFacebookModal,
  showFacebookModal,
  facebookNotification,
  isLoading,
  setFacebookNotification
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();
  const classes = useStyles();
  const steps = getSteps();

  const handleClose = () => {
    setShowFacebookModal(false);
  };

  useEffect(() => {
    if (isSponsoredEvent) {
      checkLoginState();
    }
  }, [isSponsoredEvent, showFacebookModal]);

  useEffect(() => {
    CheckLikeOnFB();
  }, [fbInfo.isConnected]);

  function checkLoginState() {
    try {
      FB.getLoginStatus(function (response) {
        // See the onlogin handler
        console.log(
          '🚀 ~ file: GameInformationSectionOne.jsx ~ line 206 ~ window?.FB?.getLoginStatus ~ response',
          response
        );
        if (response.status === 'connected') {
          CheckLikeOnFB();
          setCurrentStep(1);
          setFbInfo((prevState) => {
            return {
              ...prevState,
              isConnected: true,
              accessToken: response.authResponse?.accessToken
            };
          });
        }
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: GameInformationSectionOne.jsx ~ line 230 ~ checkLoginState ~ error',
        error
      );
    }
  }
  function onLoginClick() {
    try {
      FB.login(function (response) {
        if (response.status === 'connected') {
          CheckLikeOnFB();
          setCurrentStep(1);
          setFbInfo((prevState) => {
            return {
              ...prevState,
              isConnected: true,
              accessToken: response.authResponse?.accessToken
            };
          });
        }
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: FacebookModal.js ~ line 95 ~ onLoginClick ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  }

  useEffect(() => {
    if (fbInfo.isConnected && !fbInfo.hasShared) {
      setCurrentStep(1);
    } else if (fbInfo.hasShared) {
      setCurrentStep(2);
    }
  }, [fbInfo.hasShared, fbInfo.isConnected, showFacebookModal]);

  function onShareClick() {
    try {
      FB.ui(
        {
          display: 'popup',
          method: 'share',
          href: window.location.href,
          hashtag: eventData.description,
          quote:
            'I just enrolled for free in an exciting Chain Games Battle! Join this event and you can win Free CHAIN Tokens.'
        },
        function (response) {
          console.log(
            '🚀 ~ file: GameInformationSectionOne.jsx ~ line 185 ~ onShareClick ~ response',
            response
          );
          if (response && !response.error_message) {
            setFbInfo((prevState) => {
              return { ...prevState, hasShared: true };
            });
          } else {
            setFbInfo((prevState) => {
              return { ...prevState, hasShared: false };
            });
          }
        }
      );
    } catch (error) {
      console.log(
        '🚀 ~ file: FacebookModal.js ~ line 132 ~ onShareClick ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  }

  async function CheckLikeOnFB() {
    if (fbInfo.isConnected) {
      return new Promise((resolve, reject) => {
        FB.api(
          '/me/likes',
          'GET',
          { target_id: ChainGamesFBID },
          function (response) {
            if (response.error_code) {
            } else {
              if (response.data?.length > 0) {
                setFbInfo((prevState) => {
                  return { ...prevState, isFollowing: true };
                });
              }
            }
            console.log(
              '🚀 ~ file: GameInformationSectionOne.jsx ~ line 139 ~ CheckLikeOnFB ~ response',
              response
            );
            resolve(true);
          }
        );
      });
    }
    return;
  }

  const FBStepOneLogin = () => {
    return (
      <>
        <Typography>
          Please login to your Facebook account. Click the below button.
        </Typography>
        <div className={classes.actionsContainer}>
          <Box mt={1}>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              disabled={fbInfo.isConnected}
              onClick={onLoginClick}
            >
              Login via Facebook
            </Button>
          </Box>
        </div>
      </>
    );
  };

  const FBStepTwoLikeShare = () => {
    return (
      <>
        <Typography>
          Like us and share our post on Facebook to win more.
        </Typography>
        <div className={classes.actionsContainer}>
          {!fbInfo.isFollowing && (
            <Box display="flex" mt={1}>
              <Like
                href="https://www.facebook.com/realchaingames"
                colorScheme="dark"
                size="large"
              />
            </Box>
          )}
          <Box mt={1}>
            <Button
              color="secondary"
              variant="contained"
              size="small"
              disabled={fbInfo.hasShared}
              onClick={onShareClick}
            >
              Share on Facebook
            </Button>
          </Box>
        </div>
      </>
    );
  };

  const FBStepThreeSelectConsole = () => {
    return (
      <>
        <GameConsoleSelection
          consoleSelectedValue={consoleSelectedValue}
          handleConsoleOnChange={handleConsoleOnChange}
          isSponsoredEvent={true}
          deviceID={eventData.deviceID}
          game={eventData.game}
        />
      </>
    );
  };

  const renderAppropriateCard = (currentStep) => {
    switch (currentStep) {
      case 0:
        return FBStepOneLogin();
      case 1:
        return FBStepTwoLikeShare();
      case 2:
        return FBStepThreeSelectConsole();
      default:
        return null;
    }
  };

  return (
    <FacebookProvider appId={FacebookAppID}>
      <div>
        <Dialog
          open={showFacebookModal}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle disableTypography>
            <Typography className={classes.title} variant="h6">
              Facebook Steps
            </Typography>
          </DialogTitle>
          <DialogContent>
            {facebookNotification.showNotification && (
              <Alert
                severity="warning"
                onClose={() => {
                  setFacebookNotification((prevValue) => {
                    return {
                      ...prevValue,
                      showNotification: false
                    };
                  });
                }}
              >
                <Typography variant="body1">
                  icon {facebookNotification.message}
                </Typography>
              </Alert>
            )}
            <Typography variant="body1">
              In order to register for the sponsored event, please complete
              below steps.
            </Typography>
            <Stepper activeStep={currentStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>{renderAppropriateCard(index)}</StepContent>
                </Step>
              ))}
            </Stepper>
          </DialogContent>
          <DialogActions>
            {currentStep === steps.length - 1 && (
              <Button
                color="secondary"
                variant="contained"
                disabled={
                  !(
                    fbInfo.isConnected &&
                    fbInfo.hasShared &&
                    consoleSelectedValue !== ''
                  ) || isLoading
                }
                onClick={handleSponsoredEventRegister}
              >
                Register
              </Button>
            )}
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setShowFacebookModal(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </FacebookProvider>
  );
};

export default FaceBookStepsModal;
