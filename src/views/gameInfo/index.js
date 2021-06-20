import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  useHistory,
  useLocation,
  useParams,
  Link as RouterLink
} from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Alert, AlertTitle } from '@material-ui/lab';
import Page from 'src/components/Page';
import Info from './Info';
import HowToPlay from './HowToPlay';
import Rules from './Rules';
import Bracket from './Bracket';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';
import EthAddressNotLinkedNotification from '../home/HomeView/EthAddressNotLinkedNotification';
import { FacebookProvider } from 'react-facebook';
import {
  getTimeAndDateFromEpoch,
  getUSDValueOfAChain,
  isBalanceEnough,
  checkGameRequiresManualResult,
  isMinutesRemaining,
  checkWithCurrentTime,
  getDuration,
  isEventBracket
} from '../../utils/helpers.js';
import {
  getEventDetailsFromId,
  enrollInAnEventService,
  disenrollFromEventService,
  enrollInASponsoredEventService,
  submitEventResultService
} from '../../service/node.service';
import {
  SupportedGamesWithID,
  FacebookAppID,
  StatusReceivedFromAPI,
  HoursAfterWhichCanSubmitEvidence,
  MinutesAfterWhichCanSubmitResult
} from '../../config/constants';
import GameConsoleSelection from './ConsoleSelection';
import CODSettingsModal from './CODSettingsModal';
import FacebookModal from './FacebookModal';
//import EventDetailsSection from "./EventDetailsSection";
//import PrizesSection from "./PrizesSection";
import SubmitResultModal from './SubmitResultModal';
import CountDown from './CountDown';
//import PlayersInfo from './PlayersInfo'
//import ImageTagWithErrorImage from '../ImageConponentWithDefaultAvatar/index';
//import EventRules from "./EventRules";
import GamingNetworkNotLinkedNotification from './GamingNetworkNotLinkedNotification';
import DisputeNotification from './DisputeNotification';
import GameStyleNotification from './GameStyleNotification';
import Chat from '../chat/index';
import useInterval from '../../hooks/useInterval';
import CloseIcon from '@material-ui/icons/Close';
import * as Sentry from '@sentry/react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FIFA_Image from '../../assets/img/fifa21.jpg';
import NBA_Image from '../../assets/img/nba.jpg';
import COD_Image from '../../assets/img/cod.jpg';
import MADDEN_Image from '../../assets/img/madden.png';
import LoadingScreen from 'src/components/LoadingScreen';
import DeviceIconAndName from '../gameInfo/DeviceIconAndName';

const font = "'Saira', sans-serif";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    minWidth: '100%',
    paddingBottom: theme.spacing(3)
  },
  title: {
    position: 'relative',
    '&:before': {
      position: 'absolute',
      bottom: -2,
      left: -16,
      content: '" "',
      height: 40,
      width: 6,
      backgroundColor: theme.palette.secondary.main,
      marginRight: '20px'
    }
  },
  avatar: {
    height: 100,
    width: 100
  },
  name: {
    marginTop: theme.spacing(1)
  },
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  },
  topPaper: {
    minHeight: '290px',
    backgroundColor: theme.palette.background.default
  },
  info: {
    height: '210px'
  },
  timer: {
    height: '80px',
    backgroundColor: '#1f2429'
  },
  image: {
    width: '100%',
    objectFit: 'cover',
    height: '210px',
    margin: 0,
    padding: 0,
    verticalAlign: 'top'
  },
  titlePaper: {
    fontFamily: font,
    fontSize: 30
  },
  divider: {
    width: 2,
    height: 36,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  borderedBox: {
    backgroundColor: theme.palette.background.dark,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: theme.palette.primary.main
  },
  borderedBoxGlew: {
    backgroundColor: theme.palette.background.default,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: theme.palette.primary.main
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
  caption: {
    paddingLeft: theme.spacing(2)
  },
  noEventsText: {
    fontSize: 24
  }
}));

const checkIsOngoingEvent = (startTime, endTime) => {
  if (startTime <= moment().unix() && endTime > moment().unix()) {
    return true;
  }
  return false;
};

const checkShouldDisplayStyle = (style) => {
  if ([2, 3, 4, 5].includes(style)) {
    return true;
  }
  return false;
};

const checkHasEventEnded = (endTime) => {
  if (endTime < moment().unix()) {
    return true;
  }
  return false;
};

const EventStates = {
  CAN_REGISTER: 'Can Register in the event',
  CANNOT_REGISTER_EVENT_NOT_STARTED: 'event is in middle state(stale state)',
  CAN_UNREGISTER: 'User can disenroll from event',
  CANNOT_UNREGISTER_EVENT_NOT_STARTED:
    'event is in middle state of unregister(stale state)',
  ONGOING: 'Event is ongoing',
  EVENT_ENDED: 'Event has ended',
  CAN_SUBMIT_RESULT: 'Event has ended, user can submit result',
  CAN_SUBMIT_DISPUTE_EVIDENCE:
    'Event in conflict state, user can submit evidence',
  CANNOT_DO_ANYTHING: 'Stale state'
};

const polllingMinutes = 1;

const BattleView = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('info');
  const history = useHistory();
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const [showFacebookModal, setShowFacebookModal] = useState(false);
  const [showSubmitResultModal, setShowSubmitResultModal] = useState(false);
  const [showEthAddressNotification, setShowEthAddressNotification] =
    useState(false);
  const [showGamingNetworkNotification, setShowGamingNetworkNotification] =
    useState(false);
  const [showDisputeNotification, setShowDisputeNotification] = useState(false);
  const [successNotifications, setSuccessNotifications] = useState({
    showNotification: false,
    message: ''
  });
  const [errorNotifications, setErrorNotifications] = useState({
    showNotification: false,
    message: ''
  });
  const [eventData, setEventData] = useState({ betAmount: 0 });
  const [isSponsoredEvent, setIsSponsoredEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chainAmount, setChainAmount] = useState(0);
  const [fbInfo, setFbInfo] = useState({ isConnected: false });
  const [eventState, setEventState] = useState('');
  const [showCODSettingsModal, setShowCODSettingsModal] = useState({
    show: false
  });
  const [notification, setNotification] = useState({
    showNotification: false,
    message: 'Please select a linked account to register for event..'
  });
  const [facebookNotification, setFacebookNotification] = useState({
    showNotification: false,
    message: ''
  });
  const [consoleSelectedValue, setConsoleValue] = useState('');
  const [currency, setCurrency] = useState('');
  const [doesGameRequireManualResult, setDoesGameRequireManualResult] =
    useState(false);
  const [timeObject, setTimeObject] = useState({ showTimer: false });
  const [shouldDisplayStyle, setShouldDisplayStyle] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const account = user.user?.session?.ethAddress;
  const username = user.user?.session?.username;
  const [sponsoredEventNotificationOpen, setSponsoredEventNotificationOpen] =
    useState(true);
  const [showGameStyleNotification, setShowGameStyleNotification] =
    useState(true);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const tabs = [
    { value: 'info', label: 'Info' },
    { value: 'howToPlay', label: 'How to Play' },
    { value: 'rules', label: 'Rules' },
    { value: 'bracket', label: 'Bracket' }
  ];

  async function getChainAmount(betAmount) {
    const usdValueOfOneChain = await getUSDValueOfAChain();
    let chainValue = 0;
    if (usdValueOfOneChain > 0) {
      chainValue = betAmount / usdValueOfOneChain;
    }
    setChainAmount(chainValue.toFixed(0));
  }

  const getEventDetails = async () => {
    try {
      const { data } = await getEventDetailsFromId({ eventID: parseInt(id) });
      if (data.success === true) {
        getChainAmount(data.events.betAmount);
        setEventData({
          ...data?.events,
          description: data.events.description
            ? JSON.parse(data.events.description).fb_sponsorship_hashtag
            : '#chaingames'
        });

        if (data?.events?.sponsored) {
          setIsSponsoredEvent(true);
        }

        const checkGame = checkGameRequiresManualResult(data.events.game);
        if (checkGame) {
          setDoesGameRequireManualResult(true);
        } else {
          setDoesGameRequireManualResult(false);
        }

        const playerInfo = data.events.playersEnrolled?.find(
          (row) => row.username === username
        );

        if (isEventBracket(data.events.style)) {
          if (data.events.eventStatus === 'Waiting') {
            if (playerInfo?.username) {
              if (isMinutesRemaining(data.events.startTime, 120)) {
                setEventState(EventStates.CAN_UNREGISTER);
              } else {
                setEventState(EventStates.CANNOT_UNREGISTER_EVENT_NOT_STARTED);
              }
            } else {
              if (isMinutesRemaining(data.events.startTime, 16)) {
                setEventState(EventStates.CAN_REGISTER);
              } else {
                setEventState(EventStates.CANNOT_REGISTER_EVENT_NOT_STARTED);
              }
            }
          } else {
            setEventState(EventStates.CANNOT_DO_ANYTHING);
          }
        } else {
          if (checkIsOngoingEvent(data.events.startTime, data.events.endTime)) {
            setEventState(EventStates.ONGOING);
          } else if (checkHasEventEnded(data.events.endTime)) {
            if (checkGame) {
              if (
                playerInfo?.status ===
                  StatusReceivedFromAPI.RESULT_NOT_SUBMITTED &&
                checkWithCurrentTime(data.events.endTime, 15)
              ) {
                setEventState(EventStates.CAN_SUBMIT_RESULT);
              } else if (
                playerInfo?.status === StatusReceivedFromAPI.DISPUTE_OCCURED &&
                checkWithCurrentTime(
                  data.events.endTime,
                  HoursAfterWhichCanSubmitEvidence * 60
                )
              ) {
                setShowDisputeNotification(true);
                setEventState(EventStates.CAN_SUBMIT_DISPUTE_EVIDENCE);
              } else {
                setEventState(EventStates.CANNOT_DO_ANYTHING);
              }
            } else {
              setEventState(EventStates.EVENT_ENDED);
            }
          } else {
            if (data.events.challengeID) {
              setEventState(EventStates.CANNOT_DO_ANYTHING);
            } else {
              if (playerInfo?.username) {
                if (isMinutesRemaining(data.events.startTime, 120)) {
                  setEventState(EventStates.CAN_UNREGISTER);
                } else {
                  setEventState(
                    EventStates.CANNOT_UNREGISTER_EVENT_NOT_STARTED
                  );
                }
              } else {
                if (isMinutesRemaining(data.events.startTime, 16)) {
                  setEventState(EventStates.CAN_REGISTER);
                } else {
                  setEventState(EventStates.CANNOT_REGISTER_EVENT_NOT_STARTED);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: gameInfo/index.js ~ line 248 ~ getEventDetails ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
      if (error.response?.status === 400) {
        history.push('/404');
      }
    }
  };

  useInterval(() => {
    if (doesGameRequireManualResult) {
      getEventDetails();
    }
  }, polllingMinutes * 60 * 1000);

  const handleErrorCodeInRegister = (error) => {
    if (error.response && error.response.data.errorCode) {
      switch (error.response.data.errorCode) {
        case 100:
          setShowCODSettingsModal({
            show: true,
            errorCode: error.response.data.errorCode
          });
          break;
        case 101:
          setShowCODSettingsModal({
            show: true,
            errorCode: error.response.data.errorCode
          });
          break;
        case 102:
          setShowGamingNetworkNotification(true);
          break;
      }
    } else if (error.response) {
      setErrorNotifications({
        showNotification: true,
        message: error.response.data.error
      });
    } else {
      setErrorNotifications({
        showNotification: true,
        message: 'Something went wrong.'
      });
    }
  };

  useEffect(() => {
    if (id) {
      getEventDetails();
    }
  }, []);

  useEffect(() => {
    if (eventData.style) {
      setShouldDisplayStyle(checkShouldDisplayStyle(eventData.style));
    }
  }, [eventData.style]);

  const toggle = (e) => {
    e.preventDefault();
    setNotification({
      showNotification: false,
      message: 'Please select a linked account to register for event..'
    });
    setModal(!modal);
    setConsoleValue('');
    setCurrency('');
  };

  useEffect(() => {
    if (eventState === EventStates.CAN_SUBMIT_RESULT) {
      setTimeObject({
        showTimer: true,
        time:
          eventData.endTime * 1000 +
          MinutesAfterWhichCanSubmitResult * 60 * 1000
      });
    } else if (eventState === EventStates.CAN_SUBMIT_DISPUTE_EVIDENCE) {
      setTimeObject({
        showTimer: true,
        time:
          eventData.endTime * 1000 +
          HoursAfterWhichCanSubmitEvidence * 60 * 60 * 1000
      });
    } else {
      setTimeObject({ showTimer: false });
    }
  }, [eventState]);

  const handleConsoleOnChange = (value) => {
    setConsoleValue(value.id);
  };

  const handleCurrencyOnChange = (value) => {
    setCurrency(value.id);
  };

  const handleDisenroll = async (e) => {
    e.preventDefault();
    if (isMinutesRemaining(eventData.startTime, 120)) {
      try {
        const { data } = await disenrollFromEventService({
          eventID: parseInt(id, 10)
        });
        if (data.success === true) {
          setSuccessNotifications({
            showNotification: true,
            message: 'Disenrollment from the event successfull.'
          });
          setFbInfo({ isConnected: false });
          getEventDetails();
        }
      } catch (error) {
        console.log(
          '🚀 ~ file: gameInfo/index.js ~ line 411 ~ handleDisenroll ~ error',
          error
        );
        Sentry.captureException(error, {
          tags: {
            page: location.pathname
          }
        });
        if (error.response) {
          setErrorNotifications({
            showNotification: true,
            message: error.response.data.error
          });
        }
      }
    } else {
      getEventDetails();
    }
  };

  const handleSponsoredEventRegister = async (e) => {
    setIsLoading(true);

    if (consoleSelectedValue === '') {
      setIsLoading(false);
      return setFacebookNotification({
        showNotification: true,
        message: 'Please select a linked account to register for event.'
      });
    } else if (!account) {
      setIsLoading(false);
      setShowEthAddressNotification(true);
      setShowFacebookModal(false);
      return;
    }

    if (isMinutesRemaining(eventData.startTime, 16)) {
      try {
        const data = {
          eventID: parseInt(id, 10),
          networkID: consoleSelectedValue,
          fbAccessToken: fbInfo.accessToken,
          skipFBVerification: true
        };
        const response = await enrollInASponsoredEventService(data);
        if (response.data?.success === true) {
          setSuccessNotifications({
            showNotification: true,
            message: 'Successfully registered for sponsored event'
          });
          getEventDetails();
          setShowFacebookModal(false);
        }
      } catch (error) {
        console.log(
          '🚀 ~ file: gameInfo/index.js ~ line 445 ~ handleSponsoredEventRegister ~ error',
          error
        );
        Sentry.captureException(error, {
          tags: {
            page: location.pathname
          }
        });
        setShowFacebookModal(false);
        setFbInfo({});
        console.log('display error', error);
        handleErrorCodeInRegister(error);
      }
    } else {
      getEventDetails();
    }
    setIsLoading(false);
  };

  const handleRegister = async (e) => {
    setErrorNotifications({
      showNotification: false,
      message: ''
    });
    if (isSponsoredEvent) {
      setShowEthAddressNotification(false);
      return setShowFacebookModal(true);
    } else {
      setIsLoading(true);
      if (isMinutesRemaining(eventData.startTime, 16)) {
        const hasBalance = await isBalanceEnough(eventData.betAmount, currency);

        if (hasBalance) {
          try {
            const data = {
              eventID: parseInt(id, 10),
              networkID: consoleSelectedValue,
              currency: currency
            };
            const response = await enrollInAnEventService(data);
            if (response.data?.success === true) {
              toggle(e);
              setSuccessNotifications({
                showNotification: true,
                message: 'Successfully registered for an event'
              });
              getEventDetails();
            }
          } catch (error) {
            console.log(
              '🚀 ~ file: gameInfo/index.js ~ line 498 ~ handleRegister ~ error',
              error
            );
            Sentry.captureException(error, {
              tags: {
                page: location.pathname
              }
            });
            setModal(false);
            handleErrorCodeInRegister(error);
          }
        } else {
          setNotification({
            showNotification: true,
            message: 'Balance not enough.'
          });
        }
      } else {
        getEventDetails();
      }
      setIsLoading(false);
    }
  };

  const generateErrorNotification = () => {
    return (
      <Alert severity="error">
        <AlertTitle>Oops!</AlertTitle>
        {errorNotifications.message}
      </Alert>
    );
  };

  const generateSponsoredEventNotification = useCallback(() => {
    return (
      <Alert
        severity="info"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setSponsoredEventNotificationOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>Heads up!</AlertTitle>
        This is a sponsored event, you don't need to pay anything to register
        for it.
      </Alert>
    );
  }, [isSponsoredEvent]);

  const generateSuccessNotification = () => {
    return (
      <Alert severity="success">
        <AlertTitle>Congratulations!</AlertTitle>
        {successNotifications.message}
      </Alert>
    );
  };

  const consoleModalWindow = () => {
    return (
      <Dialog open={modal} maxWidth="sm" fullWidth>
        <DialogTitle disableTypography>
          <Typography className={classes.title} variant="h6">
            Register
          </Typography>
        </DialogTitle>
        <DialogContent>
          {isLoading && (
            <>
              <Box display="flex" justifyContent="center" pt={2}>
                <Typography variant="h5" className={classes.noEventsText}>
                  Registering
                </Typography>
              </Box>
              <Box>
                <LoadingScreen width={200} />
              </Box>
            </>
          )}
          <Box>
            {notification.showNotification && (
              <Box mb={2}>
                <Alert severity="error">{notification.message}</Alert>
              </Box>
            )}
            <GameConsoleSelection
              consoleSelectedValue={consoleSelectedValue}
              handleConsoleOnChange={handleConsoleOnChange}
              game={eventData.game}
              deviceID={eventData.deviceID}
              handleCurrencyOnChange={handleCurrencyOnChange}
              currency={currency}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            disabled={
              consoleSelectedValue === '' || currency === '' || isLoading
            }
            onClick={handleRegister}
          >
            Register
          </Button>
          <Button variant="contained" color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleSubmitResult = () => {
    setShowSubmitResultModal(true);
  };

  const getAppropriateButton = useCallback(() => {
    let showButton = true;
    let disabled;
    let onClick;
    let buttonText;

    switch (eventState) {
      case EventStates.CAN_REGISTER:
        onClick = isSponsoredEvent ? handleRegister : toggle;
        disabled = false;
        buttonText =
          `Register` +
          ` | $${
            eventData &&
            (isSponsoredEvent ? 'Free' : eventData.betAmount.toFixed(2))
          }`;
        break;
      case EventStates.CANNOT_REGISTER_EVENT_NOT_STARTED:
        onClick = isSponsoredEvent ? handleRegister : toggle;
        disabled = true;
        buttonText =
          `Register` +
          ` | $${
            eventData &&
            (isSponsoredEvent ? 'Free' : eventData.betAmount.toFixed(2))
          }`;
        break;
      case EventStates.CAN_UNREGISTER:
        onClick = handleDisenroll;
        disabled = false;
        buttonText = `Unregister`;
        break;
      case EventStates.CANNOT_UNREGISTER_EVENT_NOT_STARTED:
        onClick = handleDisenroll;
        disabled = true;
        buttonText = `Unregister`;
        break;
      case EventStates.ONGOING:
        if (doesGameRequireManualResult) {
          showButton = false;
        } else {
          onClick = () => {
            history.push(`/liveStats/${id}`);
          };
          disabled = false;
          buttonText = `Live Stats`;
        }
        break;
      case EventStates.EVENT_ENDED:
        onClick = () => {
          history.push(`/liveStats/${id}`);
        };
        disabled = false;
        buttonText = `Event Stats`;
        break;
      case EventStates.CAN_SUBMIT_RESULT:
        onClick = handleSubmitResult;
        disabled = false;
        buttonText = `Submit Result`;
        break;
      case EventStates.CAN_SUBMIT_DISPUTE_EVIDENCE:
        onClick = () => {
          history.push(`/dispute/${id}`);
        };
        disabled = false;
        buttonText = `Submit Evidence`;
        break;
      default:
        showButton = false;
        break;
    }

    return (
      <>
        {showButton ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={onClick}
            disabled={disabled}
          >
            {buttonText}
          </Button>
        ) : null}
      </>
    );
  }, [eventState]);

  const submitResult = async (result) => {
    setIsLoading(true);
    setShowSubmitResultModal(false);
    if (
      checkWithCurrentTime(eventData.endTime, MinutesAfterWhichCanSubmitResult)
    ) {
      try {
        const { data } = await submitEventResultService({
          eventID: parseInt(id, 10),
          won: result
        });
        if (data.success) {
          setSuccessNotifications({
            showNotification: true,
            message: 'Successfully submitted your result.'
          });
        }
      } catch (error) {
        console.log(
          '🚀 ~ file: gameInfo/index.js ~ line 715 ~ submitResult ~ error',
          error
        );
        Sentry.captureException(error, {
          tags: {
            page: location.pathname
          }
        });
        if (error.response) {
          setErrorNotifications({
            showNotification: true,
            message: error.response.data.error
          });
        }
      }
    }
    await getEventDetails();
    setIsLoading(false);
  };

  const getImage = (game) => {
    switch (game) {
      case SupportedGamesWithID[0].name:
        return COD_Image;
      case SupportedGamesWithID[1].name:
        return MADDEN_Image;
      case SupportedGamesWithID[2].name:
        return FIFA_Image;
      case SupportedGamesWithID[3].name:
        return NBA_Image;
    }
  };

  return (
    <PerfectScrollbar>
      <Chat roomType={2} typeId={id} />
      <Page className={classes.root} title="Battle">
        <FacebookProvider appId={FacebookAppID}>
          <Container maxWidth="lg">
            {modal && consoleModalWindow()}
            {showFacebookModal && (
              <FacebookModal
                consoleSelectedValue={consoleSelectedValue}
                handleConsoleOnChange={handleConsoleOnChange}
                handleSponsoredEventRegister={handleSponsoredEventRegister}
                fbInfo={fbInfo}
                setFbInfo={setFbInfo}
                eventData={eventData}
                isSponsoredEvent={isSponsoredEvent}
                setShowFacebookModal={setShowFacebookModal}
                showFacebookModal={showFacebookModal}
                facebookNotification={facebookNotification}
                isLoading={isLoading}
              />
            )}
            {showCODSettingsModal.show && (
              <CODSettingsModal
                setShowCODSettingsModal={setShowCODSettingsModal}
                showCODSettingsModal={showCODSettingsModal}
              />
            )}
            {showSubmitResultModal && (
              <SubmitResultModal
                setShowSubmitResultModal={setShowSubmitResultModal}
                showSubmitResultModal={showSubmitResultModal}
                submitResult={submitResult}
              />
            )}

            {isSponsoredEvent &&
              sponsoredEventNotificationOpen &&
              !(
                eventState === EventStates.ONGOING ||
                eventState === EventStates.EVENT_ENDED
              ) &&
              generateSponsoredEventNotification()}

            {showGamingNetworkNotification && (
              <GamingNetworkNotLinkedNotification />
            )}

            {shouldDisplayStyle && showGameStyleNotification && (
              <GameStyleNotification
                style={eventData.style}
                setShowGameStyleNotification={setShowGameStyleNotification}
              />
            )}

            {/* NOTIFICATIONS */}
            {showDisputeNotification && <DisputeNotification />}
            {showEthAddressNotification && <EthAddressNotLinkedNotification />}
            {errorNotifications.showNotification && generateErrorNotification()}
            {successNotifications.showNotification &&
              generateSuccessNotification()}

            <Box mt={10} mb={3}>
              <Paper className={classes.topPaper}>
                <Grid container>
                  <Grid item xs={12} sm={2} md={4}>
                    <img
                      className={classes.image}
                      src={getImage(eventData?.game)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={10} md={8}>
                    <Box
                      className={classes.caption}
                      display="flex"
                      flexDirection="column"
                    >
                      <Typography
                        className={classes.titlePaper}
                        color="textPrimary"
                        variant="body2"
                      >
                        {eventData?.name}
                      </Typography>
                      <Box display="flex" mb={1}>
                        <Box className={classes.borderedBoxGlew}>
                          <Typography color="textPrimary" variant="body2">
                            {eventData?.game}
                          </Typography>
                          {isSponsoredEvent ? (
                            <Typography color="secondary" variant="body2">
                              COMMUNITY TOURNAMENT
                            </Typography>
                          ) : (
                            <Box mt={2} />
                          )}
                        </Box>
                      </Box>
                      <Box display="flex">
                        <Box className={classes.borderedBox} border={1}>
                          <Typography color="secondary" variant="body2">
                            REGISTRATION OPENS
                          </Typography>
                          <Typography color="textPrimary" variant="body1">
                            Open Now
                          </Typography>
                        </Box>
                        <Box ml={1} className={classes.borderedBox} border={1}>
                          <Typography color="secondary" variant="body2">
                            START TIME
                          </Typography>
                          <Typography color="textPrimary" variant="body1">
                            {eventData &&
                              eventData.startTime &&
                              getTimeAndDateFromEpoch(eventData.startTime)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" mt={1} ml={1}>
                        <Box>
                          <Typography color="textSecondary" variant="body2">
                            ENTRY/PLAYER
                          </Typography>
                          <Typography color="textPrimary" variant="body2">
                            {eventData &&
                              (isSponsoredEvent
                                ? 'Free'
                                : '$' + eventData.betAmount.toFixed(2))}
                          </Typography>
                        </Box>
                        <Divider className={classes.divider} />
                        <Box>
                          <Typography color="textSecondary" variant="body2">
                            DURATION
                          </Typography>
                          <Typography color="textPrimary" variant="body2">
                            {eventData &&
                              eventData.startTime &&
                              eventData.endTime &&
                              getDuration(
                                eventData.startTime,
                                eventData.endTime
                              )}
                            {` Min.`}
                          </Typography>
                        </Box>
                        <Divider className={classes.divider} />
                        <Box>
                          <Typography color="textSecondary" variant="body2">
                            PLAYERS
                          </Typography>
                          <Typography color="textPrimary" variant="body2">
                            {eventData?.minPlayers} – {eventData?.maxPlayers}
                          </Typography>
                        </Box>
                        <Divider className={classes.divider} />
                        <Box>
                          <Typography color="textSecondary" variant="body2">
                            ENROLLED
                          </Typography>
                          <Typography color="textPrimary" variant="body2">
                            {eventData?.playersEnrolled &&
                              eventData?.playersEnrolled.length}
                          </Typography>
                        </Box>
                        {eventData.deviceID && (
                          <>
                            <Divider className={classes.divider} />
                            <Box>
                              <Typography color="textSecondary" variant="body2">
                                CONSOLE
                              </Typography>

                              <DeviceIconAndName
                                deviceID={eventData.deviceID}
                              />
                            </Box>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Divider />
                <Box display="flex" className={classes.timer}>
                  <Box
                    ml={5}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {timeObject.showTimer && (
                      <>
                        <Box mt={1} mr={1}>
                          <Typography color="textPrimary" variant="body2">
                            Starts in
                          </Typography>
                        </Box>
                        <CountDown
                          timeObject={timeObject}
                          getEventDetails={getEventDetails}
                          setTimeObject={setTimeObject}
                        />
                      </>
                    )}
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    ml={timeObject.showTimer ? 9 : 0}
                  >
                    {eventState && getAppropriateButton()}
                    {eventData?.playersEnrolled &&
                      eventData?.playersEnrolled.length > 0 &&
                      !(
                        eventData?.bracketEventID || eventData?.challengeID
                      ) && (
                        <Box display="flex" alignItems="center" ml={4}>
                          <Typography>Joined</Typography>
                          <Box ml={2}>
                            <AvatarGroup max={5}>
                              {eventData?.playersEnrolled.map((row, index) => {
                                return (
                                  <Tooltip
                                    title={row.username}
                                    key={index}
                                    component={RouterLink}
                                    to={`/profile/${row.username}`}
                                  >
                                    <Avatar
                                      key={row.username}
                                      src={row.dpLow}
                                    />
                                  </Tooltip>
                                );
                              })}
                            </AvatarGroup>
                          </Box>
                        </Box>
                      )}
                  </Box>
                </Box>
              </Paper>
            </Box>
            <Box mt={10} mb={3}>
              <Tabs
                onChange={handleTabsChange}
                scrollButtons="auto"
                textColor="secondary"
                value={currentTab}
                variant="scrollable"
              >
                {tabs.map((tab) =>
                  tab.value !== 'bracket' ? (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ) : (
                    isEventBracket(eventData.style) && (
                      <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                      />
                    )
                  )
                )}
              </Tabs>
              <Divider />
            </Box>
            {currentTab === 'info' && <Info eventData={eventData} />}
            {currentTab === 'howToPlay' && <HowToPlay eventData={eventData} />}
            {currentTab === 'rules' && (
              <Rules
                questionAnswers={
                  eventData?.description ? eventData.description : []
                }
                eventData={eventData}
              />
            )}
            {currentTab === 'bracket' && <Bracket eventData={eventData} />}
          </Container>
        </FacebookProvider>
      </Page>
    </PerfectScrollbar>
  );
};

export default BattleView;
