import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import { GameFormat, Devices } from '../../config/constants';
import {
  checkGameRequiresManualResult,
  isEventBracket
} from '../../utils/helpers.js';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  typo: {
    marginBottom: 10
  },
  bullet: {
    color: theme.palette.secondary.main,
    height: 16,
    width: 16
  }
}));

const HowToPlay = ({ eventData }) => {
  const classes = useStyles();

  return (
    <Card className={classes.paper}>
      {eventData &&
        eventData.game &&
        renderAppropriateHowToPlay(
          eventData.game,
          eventData.gameFormat,
          eventData.deviceID,
          classes
        )}
    </Card>
  );
};

const renderAppropriateHowToPlay = (game, gameFormat, console, classes) => {
  const getAppropriateCODLi = () => {
    switch (gameFormat) {
      case 0:
        return (
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              {' '}
              Once the event starts, join a Warzone match in the appropriate BR
              mode and try to score as many kills as you can.
            </ListItemText>
          </ListItem>
        );
      case 1:
        return (
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              {' '}
              Once the event starts, join a Warzone match in the appropriate BR
              mode and try to score as much as you can.
            </ListItemText>
          </ListItem>
        );
      case 2:
        return (
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              {' '}
              Once the event starts, join a Warzone match in the appropriate BR
              mode and try to score as many headshots as you can.
            </ListItemText>
          </ListItem>
        );
      case 3:
        return (
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              {' '}
              Once the event starts, join a Warzone match in the appropriate BR
              mode and try to score as many kills as you can.
            </ListItemText>
          </ListItem>
        );
    }
  };

  switch (game) {
    case 'Call of Duty: Modern Warfare':
      return (
        <List dense={true}>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              Follow the help page on linking gaming networks to ensure that
              your COD stats are getting synced with the linked networks.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              Enroll in the event, preferably in advance, with one of your
              linked gaming networks. You must maintain sufficient Chain Network
              balance and have it approved 30 minutes before the event starts.
            </ListItemText>
          </ListItem>
          {getAppropriateCODLi()}
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              If you die in a game, you are allowed to join another match.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              Results are declared soon after the event ends and can be seen in
              your event history.
            </ListItemText>
          </ListItem>
        </List>
      );
    case 'Madden NFL 21':
      return (
        <List dense={true}>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              Add your opponent as a friend on{' '}
              {[Devices.XBOX_SERIES.id, Devices.XBOX_ONE.id].includes(console)
                ? `Xbox Live using your Xbox.`
                : `PSN network using your PlayStation.`}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              In Madden, go to the Online Head to Head mode, then select Play A
              Friend.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              Select your opponent from your friends list, and initiate a
              challenge.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              Show playbooks and confirm the match rules and settings.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>Start the match.</ListItemText>
          </ListItem>
        </List>
      );
    case 'Fifa':
      return (
        <List dense={true}>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              Add your opponent as a friend on{' '}
              {[Devices.XBOX_SERIES.id, Devices.XBOX_ONE.id].includes(console)
                ? `Xbox Live using your Xbox.`
                : `PSN network using your PlayStation.`}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              In FIFA, go to the Online tab, then open the Online Friendlies
              mode.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              Start a new season, or open an existing season with your opponent.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              Check and confirm the match rules and settings.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>Start the match.</ListItemText>
          </ListItem>
        </List>
      );
    case 'NBA 2K21':
      return (
        <List dense={true}>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              Add your opponent as a friend on{' '}
              {[Devices.XBOX_SERIES.id, Devices.XBOX_ONE.id].includes(console)
                ? `Xbox Live using your Xbox.`
                : `PSN network using your PlayStation.`}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              In NBA 2K, go to the Play Now mode, then select Play With Friends.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              Invite your opponent to join your locker room / lobby.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              Check and confirm the match rules and settings.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>Start the match.</ListItemText>
          </ListItem>
        </List>
      );
  }
};

HowToPlay.propTypes = {
  className: PropTypes.string
};

export default HowToPlay;
