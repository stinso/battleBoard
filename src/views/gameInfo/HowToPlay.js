import React from 'react';
import PropTypes from 'prop-types';
import {
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

const useStyles = makeStyles(() => ({
  root: {},
  paper: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  typo: {
    marginBottom: 10
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
          eventData.deviceID
        )}
    </Card>
  );
};

const renderAppropriateHowToPlay = (game, gameFormat, console) => {
  const getAppropriateCODLi = () => {
    switch (gameFormat) {
      case 0:
        return (
          <li>
            {' '}
            Once the event starts, join a Warzone match in the appropriate BR
            mode and try to score as many kills as you can.
          </li>
        );
      case 1:
        return (
          <li>
            {' '}
            Once the event starts, join a Warzone match in the appropriate BR
            mode and try to score as much as you can.
          </li>
        );
      case 2:
        return (
          <li>
            {' '}
            Once the event starts, join a Warzone match in the appropriate BR
            mode and try to score as many headshots as you can.
          </li>
        );
      case 3:
        return (
          <li>
            {' '}
            Once the event starts, join a Warzone match in the appropriate BR
            mode and try to score as many kills as you can.
          </li>
        );
    }
  };

  switch (game) {
    case 'Call of Duty: Modern Warfare':
      return (
        <ol>
          <li>
            Follow the help page on linking gaming networks to ensure that your
            COD stats are getting synced with the linked networks.
          </li>
          <li>
            Enroll in the event, preferably in advance, with one of your linked
            gaming networks. You must maintain sufficient Chain Network balance
            and have it approved 30 minutes before the event starts.
          </li>
          {getAppropriateCODLi()}
          <li>If you die in a game, you are allowed to join another match.</li>
          <li>
            Results are declared soon after the event ends and can be seen in
            your event history.
          </li>
        </ol>
      );
    case 'Madden NFL 21':
      return (
        <ul>
          <li>
            Add your opponent as a friend on{' '}
            {[Devices.XBOX_SERIES.id, Devices.XBOX_ONE.id].includes(console)
              ? `Xbox Live using your Xbox.`
              : `PSN network using your PlayStation.`}
          </li>
          <li>
            In Madden, go to the Online Head to Head mode, then select Play A
            Friend.
          </li>
          <li>
            Select your opponent from your friends list, and initiate a
            challenge.
          </li>
          <li>Show playbooks and confirm the match rules and settings.</li>
          <li>Start the match.</li>
        </ul>
      );
    case 'Fifa':
      return (
        <ul>
          <li>
            Add your opponent as a friend on{' '}
            {[Devices.XBOX_SERIES.id, Devices.XBOX_ONE.id].includes(console)
              ? `Xbox Live using your Xbox.`
              : `PSN network using your PlayStation.`}
          </li>
          <li>
            In FIFA, go to the Online tab, then open the Online Friendlies mode.
          </li>
          <li>
            Start a new season, or open an existing season with your opponent.
          </li>
          <li>Check and confirm the match rules and settings.</li>
          <li>Start the match.</li>
        </ul>
      );
    case 'NBA 2K21':
      return (
        <ul>
          <li>
            Add your opponent as a friend on{' '}
            {[Devices.XBOX_SERIES.id, Devices.XBOX_ONE.id].includes(console)
              ? `Xbox Live using your Xbox.`
              : `PSN network using your PlayStation.`}
          </li>
          <li>
            In NBA 2K, go to the Play Now mode, then select Play With Friends.
          </li>
          <li>Invite your opponent to join your locker room / lobby.</li>
          <li>Check and confirm the match rules and settings.</li>
          <li>Start the match.</li>
        </ul>
      );
  }
};

HowToPlay.propTypes = {
  className: PropTypes.string
};

export default HowToPlay;
