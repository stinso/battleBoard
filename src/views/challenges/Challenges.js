import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  makeStyles,
  Dialog
} from '@material-ui/core';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import { AuthContext } from '../../context/AuthContext';
import { SET_CHALLENGE_TAB } from '../../actions/actions.js';
import ChallengeModal from './ChallengeModal';
import {
  acceptChallengeService,
  cancelChallengeService,
  getChallengeService,
  rejectChallengeService
} from '../../service/battleServerService';
import SentChallenges from './SentChallenges';
import CompletedChallenges from './CompletedChallenges';
import AcceptedChallenges from './AcceptedChallenges';
import ReceivedChallenges from './ReceivedChallenges';
import moment from 'moment';
import { getDuration } from '../../utils/helpers';
import { AllSupportedGamesWithOtherAttributes } from '../../config/constants.js';
import * as Sentry from '@sentry/react';
import { ChallengesEnums } from './constants';

const font = "'Saira', sans-serif";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: 200,
    paddingTop: theme.spacing(3),
    minHeight: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      paddingBottom: 60
    },
    margin: 0
  },
  resultWon: {
    color: '#388e3c'
  },
  resultLost: {
    color: '#f44336'
  },
  avatar: {
    height: '32px',
    width: '32px'
  },
  imageCell: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  statusesButton: {
    margin: theme.spacing(2)
  },
  title: {
    fontFamily: font,
    fontSize: 40
  }
}));

const SafeMinutes = 5;

const checkSafeMinutes = (startTime) => {
  if (startTime > moment().add(SafeMinutes, 'm').unix()) {
    return true;
  }
  return false;
};

const applyPagination = (list, page, limit) => {
  return list.slice(page * limit, page * limit + limit);
};

const Challenges = ({ className, ...rest }) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(ChallengesEnums.Sent);

  const { user, dispatch } = useContext(AuthContext);
  const [fetchDataInfo, setFetchDataInfo] = useState({ fetch: false });
  const [sentChallenges, setSentChallenges] = useState([]);
  const [acceptedChallenges, setAcceptedChallenges] = useState([]);
  const [receivedChallenges, setReceivedChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const location = useLocation();
  let { tab } = useParams();
  tab = parseInt(tab);

  const tabs = [
    { value: ChallengesEnums.Sent, label: 'Sent' },
    { value: ChallengesEnums.Received, label: 'Received' },
    { value: ChallengesEnums.Accepted, label: 'Accepted' },
    { value: ChallengesEnums.Completed, label: 'Completed' }
  ];

  const handleTabsChange = (event, value) => {
    setFetchDataInfo({ fetch: true, state: value });
    dispatch({
      type: SET_CHALLENGE_TAB,
      payload: {
        selectedTab: value
      }
    });
    setCurrentTab(value);
  };

  const generateModal = () => {
    return <Dialog>test</Dialog>;
  };

  useEffect(() => {
    let previousSelectedTab;
    if (tab) {
      previousSelectedTab = tab;
    } else {
      previousSelectedTab = user.user?.challenges?.selectedTab
        ? user.user?.challenges?.selectedTab
        : ChallengesEnums.Sent;
    }
    setCurrentTab(previousSelectedTab);
    setFetchDataInfo({ fetch: true, state: previousSelectedTab });
    return () => {
      // dispatch({
      //   type: SET_CHALLENGE_TAB,
      //   payload: {
      //     selectedTab: tabs,
      //   },
      // })
    };
  }, []);

  const toggleTabs = (e, index) => {
    e.preventDefault();
    dispatch({
      type: SET_CHALLENGE_TAB,
      payload: {
        selectedTab: index
      }
    });
    setCurrentTab(index);
  };

  useEffect(() => {
    if (fetchDataInfo.fetch) {
      fetchChallenges(fetchDataInfo.state);
    }
  }, [fetchDataInfo]);

  const fetchChallenges = async (state) => {
    setIsLoading(true);
    try {
      const response = await getChallengeService({ state: state });
      if (response.data.success === true) {
        const editedData = response.data.challenges.map((ChallengeInfo) => {
          const game = AllSupportedGamesWithOtherAttributes.find((row) => {
            if (row.name === ChallengeInfo.game) {
              return row;
            }
          });
          return {
            ...ChallengeInfo,
            duration: getDuration(
              ChallengeInfo.startTime,
              ChallengeInfo.endTime
            ),
            gameShortName: game.shortName
          };
        });
        switch (state) {
          case ChallengesEnums.Sent:
            setSentChallenges(editedData);
            break;
          case ChallengesEnums.Received:
            setReceivedChallenges(editedData);
            break;
          case ChallengesEnums.Accepted:
            setAcceptedChallenges(editedData);
            break;
          case ChallengesEnums.Completed:
            setCompletedChallenges(editedData);
            break;
        }
        setFetchDataInfo({ fetch: false });
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: Challenges.js ~ line 261 ~ fetchChallenges ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
    setIsLoading(false);
  };

  const rejectChallenge = async (body, state, startTime) => {
    if (checkSafeMinutes(startTime)) {
      try {
        const response = await rejectChallengeService(body);
        if (response.data.success === true) {
          setReceivedChallenges((prevValue) => {
            return prevValue.filter((row) => row.id !== body.challengeID);
          });
        }
      } catch (error) {
        console.log(
          '🚀 ~ file: Challenges.js ~ line 202 ~ rejectChallenge ~ error',
          error
        );
        Sentry.captureException(error, {
          tags: {
            page: location.pathname
          }
        });
      }
    } else {
      setShowModal(true);
    }
  };

  const cancelChallenge = async (body, state, startTime) => {
    if (checkSafeMinutes(startTime)) {
      try {
        const response = await cancelChallengeService(body);
        if (response.data.success === true) {
          if (ChallengesEnums.Sent === state) {
            setSentChallenges((prevValue) => {
              return prevValue.filter((row) => row.id !== body.challengeID);
            });
          } else if (ChallengesEnums.Accepted === state) {
            setAcceptedChallenges((prevValue) => {
              return prevValue.filter((row) => row.id !== body.challengeID);
            });
          }
        }
      } catch (error) {
        console.log(
          '🚀 ~ file: Challenges.js ~ line 234 ~ cancelChallenge ~ error',
          error
        );
        Sentry.captureException(error, {
          tags: {
            page: location.pathname
          }
        });
      }
    } else {
      setShowModal(true);
    }
  };

  const acceptChallenge = async (body, state, startTime) => {
    if (checkSafeMinutes(startTime)) {
      try {
        const response = await acceptChallengeService(body);
        if (response.data.success === true) {
          setReceivedChallenges((prevValue) => {
            return prevValue.filter((row) => row.id !== body.challengeID);
          });
          return;
        }
      } catch (error) {
        console.log(
          '🚀 ~ file: Challenges.js ~ line 364 ~ acceptChallenge ~ error',
          error
        );
        return error?.response?.data?.error;
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <ChallengeModal
        showChallengeModal={showChallengeModal}
        setShowChallengeModal={setShowChallengeModal}
        shouldEnterUsername={true}
        setFetchDataInfo={setFetchDataInfo}
        ChallengesEnums={ChallengesEnums}
      />
      <Container maxWidth="lg">
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              variant="h1"
              color="textPrimary"
            >
              My Challenges
            </Typography>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setShowChallengeModal(true);
              }}
              startIcon={
                <SvgIcon fontSize="small">
                  <PlusCircleIcon />
                </SvgIcon>
              }
            >
              New Challenge
            </Button>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Box mt={1} mb={3}>
            <Tabs
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="secondary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
            <Divider />
          </Box>
          {currentTab === ChallengesEnums.Sent && (
            <SentChallenges
              data={sentChallenges}
              isLoading={isLoading}
              cancelChallenge={cancelChallenge}
              ChallengesEnums={ChallengesEnums}
            />
          )}
          {currentTab === ChallengesEnums.Accepted && (
            <AcceptedChallenges
              isLoading={isLoading}
              data={acceptedChallenges}
              cancelChallenge={cancelChallenge}
              ChallengesEnums={ChallengesEnums}
            />
          )}
          {currentTab === ChallengesEnums.Received && (
            <ReceivedChallenges
              isLoading={isLoading}
              setReceivedChallenges={setReceivedChallenges}
              data={receivedChallenges}
              acceptChallenge={acceptChallenge}
              rejectChallenge={rejectChallenge}
              user={user}
              ChallengesEnums={ChallengesEnums}
            />
          )}
          {currentTab === ChallengesEnums.Completed && (
            <CompletedChallenges
              data={completedChallenges}
              isLoading={isLoading}
              user={user}
            />
          )}
        </Box>
      </Container>
    </div>
  );
};

Challenges.propTypes = {
  className: PropTypes.string
};

export default Challenges;
