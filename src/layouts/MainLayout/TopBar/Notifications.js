import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation, useHistory } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  SvgIcon,
  Tooltip,
  Typography,
  makeStyles,
  ThemeProvider
} from '@material-ui/core';
import {
  Bell as BellIcon,
  MessageCircle as MessageIcon,
  CheckCircle as CheckIcon
} from 'react-feather';

import {
  notificationPollingService,
  markNotificationReadService
} from '../../../service/battleServerService';
import { PollingDelayInMinutes } from '../../../config/constants.js';
import { AuthContext } from '../../../context/AuthContext';
import useInterval from '../../../hooks/useInterval';
import { ChallengesEnums } from '../../../views/challenges/constants';
import TimeAgo from 'react-timeago';
import { getTimeAndDateFromEpoch } from '../../../utils/helpers';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles((theme) => ({
  popover: {
    width: 320
  },
  notifyList: {
    maxHeight: 280
  },
  icon: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.dark
  },
  successIcon: {
    color: theme.palette.success.main,
    backgroundColor: theme.palette.background.dark
  },
  title: {
    fontSize: 20
  }
}));

const NotificationsEnums = {
  Event_Starting: 1,
  Bet_Placed: 2,
  Event_Ended: 3,
  Event_Result_Declared: 4,
  Challenge_Received: 5,
  Challenge_Accepted: 6,
  Dispute_Occured: 7,
  Claim_Username: 8,
  Challenge_Declined: 9
};

const Notifications = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [showMarkAllRead, setShowMarkAllRead] = useState(false);
  const { user } = useContext(AuthContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getNotificationTitle = (notificationInfoType) => {
    switch (notificationInfoType) {
      case NotificationsEnums.Event_Starting:
        return 'Event starting';
      case NotificationsEnums.Bet_Placed:
        return 'Bet placed';
      case NotificationsEnums.Event_Ended:
        return 'Event ended';
      case NotificationsEnums.Event_Result_Declared:
        return 'Event result';
      case NotificationsEnums.Challenge_Received:
        return `Challenge received`;
      case NotificationsEnums.Challenge_Accepted:
        return `Challenge accepted`;
      case NotificationsEnums.Dispute_Occured:
        return 'Dispute occured';
      case NotificationsEnums.Claim_Username:
        return `Claim username`;
      case NotificationsEnums.Challenge_Declined:
        return `Challenge declined`;
    }
  };

  const generateNotificationMessage = (notificationInfo) => {
    switch (notificationInfo.type) {
      case NotificationsEnums.Event_Starting:
        if (notificationInfo.payload.startTime) {
          return `A sub event of ${
            notificationInfo.payload.eventName
          } tournament is starting at ${getTimeAndDateFromEpoch(
            notificationInfo.payload.startTime
          )}`;
        } else {
          return `${notificationInfo.payload.eventName} is starting.`;
        }
      case NotificationsEnums.Bet_Placed:
        if (notificationInfo.payload.startTime) {
          return `$${
            notificationInfo.payload.betAmount
          } amount bet placed for ${
            notificationInfo.payload.eventName
          } and it is starting at ${getTimeAndDateFromEpoch(
            notificationInfo.payload.startTime
          )}`;
        } else {
          return `$${notificationInfo.payload.betAmount} amount bet placed for ${notificationInfo.payload.eventName}`;
        }
      case NotificationsEnums.Event_Ended:
        if (notificationInfo.payload.startTime) {
          return `${
            notificationInfo.payload.isTournamentChildEvent
              ? `A sub event of ${notificationInfo.payload.eventName} tournament`
              : `${notificationInfo.payload.eventName}`
          } has ended at ${getTimeAndDateFromEpoch(
            notificationInfo.payload.endTime
          )}`;
        } else {
          return `${notificationInfo.payload.eventName} has ended.`;
        }
      case NotificationsEnums.Event_Result_Declared:
        return `Result for ${
          notificationInfo.payload.isTournamentChildEvent
            ? `a sub event of ${notificationInfo.payload.eventName} tournament`
            : `${notificationInfo.payload.eventName}`
        } is declared.`;
      case NotificationsEnums.Challenge_Received:
        return `Challenge received from ${notificationInfo.payload.sender}.`;
      case NotificationsEnums.Challenge_Accepted:
        return `${notificationInfo.payload.sender} accepted your challenge.`;
      case NotificationsEnums.Dispute_Occured:
        return `Contrasting results have been submitted for ${
          notificationInfo.payload.isTournamentChildEvent
            ? `a sub event of ${notificationInfo.payload.eventName} tournament`
            : `${notificationInfo.payload.eventName}`
        }. Please submit evidence for your claim.`;
      case NotificationsEnums.Claim_Username:
        return `Your PSN username ${notificationInfo.payload.idOnNetwork} was successfully claimed by other user on Chain Games.`;
      case NotificationsEnums.Challenge_Declined:
        return `${notificationInfo.payload.sender} declined your challenge.`;
    }
  };

  const getPathToRoute = (notificationInfo) => {
    if (
      [
        NotificationsEnums.Event_Starting,
        NotificationsEnums.Bet_Placed,
        NotificationsEnums.Event_Ended,
        NotificationsEnums.Event_Result_Declared
      ].includes(notificationInfo.type)
    ) {
      return `/gameInformationPage/${notificationInfo.payload.eventID}`;
    } else if (
      notificationInfo.type === NotificationsEnums.Challenge_Received
    ) {
      //return `/myChallenges?tab=${ChallengesEnums.Received}`
      return `/myChallenges`;
    } else if (
      notificationInfo.type === NotificationsEnums.Challenge_Accepted
    ) {
      //return `/myChallenges?tab=${ChallengesEnums.Accepted}`
      return `/myChallenges`;
    } else if (notificationInfo.type === NotificationsEnums.Dispute_Occured) {
      return `/dispute/${notificationInfo.payload.eventID}`;
    } else if (notificationInfo.type === NotificationsEnums.Claim_Username) {
      return `/userAccountSetting`;
    } else if (
      notificationInfo.type === NotificationsEnums.Challenge_Declined
    ) {
      return `/myChallenges`;
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data } = await notificationPollingService({});
      if (data.success === true) {
        let read = true;
        const editedData = data.notifications
          ? data.notifications.map((notification) => {
              if (notification.read === false) {
                read = false;
              }
              notification = { ...notification };
              return {
                ...notification,
                message: generateNotificationMessage(notification),
                route: getPathToRoute(notification)
              };
            })
          : [];
        setShowMarkAllRead(!read);
        setNotifications(editedData);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: index.jsx ~ line 74 ~ fetchNotifications ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  const markNotification = async (isSingleNotification, notificationID) => {
    try {
      let body = {};
      if (isSingleNotification) {
        body = { notificationID };
      } else {
        body = { markAll: true };
      }
      const { data } = await markNotificationReadService({ ...body });
      if (data.success === true) {
        if (isSingleNotification) {
          let read = true;
          setNotifications((preValue) => {
            return preValue.map((notification, index) => {
              if (notification.id === notificationID) {
                return { ...notification, read: true };
              }
              if (notification.read === false) {
                read = false;
              }
              return notification;
            });
          });
          setShowMarkAllRead(!read);
        } else {
          setNotifications((preValue) => {
            return preValue.map((notification, index) => {
              return { ...notification, read: true };
            });
          });
          setShowMarkAllRead(false);
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: index.jsx ~ line 121 ~ markNotification ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  const unreadNotificationCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  useInterval(() => {
    fetchNotifications();
  }, PollingDelayInMinutes * 60 * 1000);

  useEffect(() => {
    fetchNotifications();
  }, []);

  console.log(notifications);

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton color="inherit" ref={ref} onClick={handleOpen}>
          <Badge badgeContent={unreadNotificationCount} color="secondary">
            <BellIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Box p={2}>
          <Typography
            variant="h5"
            color="textPrimary"
            className={classes.title}
          >
            Notifications
          </Typography>
        </Box>
        {notifications.length === 0 ? (
          <Box p={2}>
            <Typography variant="body2" color="textPrimary">
              There are no notifications
            </Typography>
          </Box>
        ) : (
          <>
            <PerfectScrollbar options={{ suppressScrollX: true }}>
              <List disablePadding className={classes.notifyList}>
                {notifications.map((row, index) => {
                  return (
                    <ListItem
                      component={RouterLink}
                      divider
                      key={index}
                      to={row.route}
                    >
                      <ListItemAvatar>
                        {!row.read ? (
                          <Avatar
                            className={classes.icon}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              markNotification(true, row.id);
                            }}
                          >
                            <SvgIcon fontSize="small">
                              <MessageIcon />
                            </SvgIcon>
                          </Avatar>
                        ) : (
                          <Avatar className={classes.successIcon}>
                            <SvgIcon fontSize="small">
                              <CheckIcon />
                            </SvgIcon>
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={getNotificationTitle(row.type)}
                        primaryTypographyProps={{
                          variant: 'subtitle2',
                          color: 'textPrimary'
                        }}
                        secondary={row.message}
                      />
                    </ListItem>
                  );
                })}
                <Box p={1} display="flex" justifyContent="center">
                  <Button
                    onClick={() => {
                      markNotification(false);
                    }}
                    size="small"
                  >
                    Mark all as read
                  </Button>
                </Box>
              </List>
            </PerfectScrollbar>
          </>
        )}
      </Popover>
    </>
  );
};

export default Notifications;
