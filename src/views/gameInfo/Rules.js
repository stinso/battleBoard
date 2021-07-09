import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  checkGameRequiresManualResult,
  isEventBracket
} from '../../utils/helpers.js';

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  bullet: {
    color: theme.palette.secondary.main,
    height: 16,
    width: 16
  },
  accordion: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const Rules = ({ questionAnswers, eventData }) => {
  const classes = useStyles();

  return (
    <>
      {isEventBracket(eventData.style) && (
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Tournament Rules</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  The bracket structure above would be auto-filled once the
                  tournament starts.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  If player gets a bye in round one, they would not appear in
                  round one of bracket structure, they would directly appear
                  from round two in bracket structure.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Click on the specific match in bracket structure, if you want
                  more information about that match or want to submit result for
                  that match.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Each tournament match has a window of{' '}
                  {eventData.childEventDuration / 60} minutes to be played.
                </ListItemText>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      )}
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Rules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {eventData &&
            eventData.game &&
            renderAppropriateRules(
              eventData.game,
              eventData.gameFormat,
              classes
            )}
        </AccordionDetails>
      </Accordion>
      {checkGameRequiresManualResult(eventData.game) && (
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Reporting Results</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  We encourage both parties to report the results of the match
                  afterwards on the events page.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  <b>Note: </b> We recommend screen recording all of your
                  matches on your console when competing in Chain Games matches.
                  Be sure to take pictures/screenshots of the match final score
                  in case of a dispute about the match results.
                </ListItemText>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

const renderAppropriateRules = (game, gameFormat, classes) => {
  switch (game) {
    case 'Call of Duty: Modern Warfare':
      switch (gameFormat) {
        case 0:
          return (
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Player with the highest kills has the highest rank.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  You need to have at least one kill to be eligible for the
                  prize money.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  In case of a tie, the player with fewer deaths is ranked
                  higher. In cases there is still a tie, the player who enrolled
                  first is ranked higher.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>Gulag kills are not counted.</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Headshots are treated like any other kill
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Private matches do not count towards your stats.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Stats of just the matches that start within the time period of
                  the event will be counted.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  It is a player's responsibility to ensure a stable network
                  connection with the COD Servers.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Winners will be declared and the rewards distributed an hour
                  after the event ends.
                </ListItemText>
              </ListItem>
            </List>
          );
        case 1:
          return (
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Player with the highest cumulative score has the highest rank.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  You need to score at least 100 points to be eligible for the
                  prize money
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  In case of a tie, the player who enrolled first is ranked
                  higher.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Private matches do not count towards your stats.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Stats of just the matches that start within the time period of
                  the event will be counted.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  It is a player's responsibility to ensure a stable network
                  connection with the COD Servers.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Winners will be declared and the rewards distributed an hour
                  after the event ends.
                </ListItemText>
              </ListItem>
            </List>
          );
        case 2:
          return (
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Player with the highest kills has the highest rank.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  You need to have at least one headshot to be eligible for the
                  prize money
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  In case of a tie, the player with fewer deaths is ranked
                  higher. In cases there is still a tie, the player who enrolled
                  first is ranked higher.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>Gulag kills are not counted.</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Private matches do not count towards your stats.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Stats of just the matches that start within the time period of
                  the event will be counted.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  It is a player's responsibility to ensure a stable network
                  connection with the COD Servers.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Winners will be declared and the rewards distributed an hour
                  after the event ends.
                </ListItemText>
              </ListItem>
            </List>
          );
        case 3:
          return (
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Player with the highest kills has the highest rank.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  In case of a tie, the player with fewer deaths is ranked
                  higher. In cases there is still a tie, the player who enrolled
                  first is ranked higher.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>Gulag kills are not counted.</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Headshots are treated like any other kill
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Private matches do not count towards your stats.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Stats of just the matches that start within the time period of
                  the event will be counted.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  It is a player's responsibility to ensure a stable network
                  connection with the COD Servers.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordTwoToneIcon className={classes.bullet} />
                </ListItemIcon>
                <ListItemText>
                  Winners will be declared and the rewards distributed an hour
                  after the event ends.
                </ListItemText>
              </ListItem>
            </List>
          );
      }
      break;
    case 'Madden NFL 21':
      return (
        <List dense={true}>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>Game Settings:</b> Unless otherwise specified, the following
              settings must be set to following:
              <br />
              Fatigue: ON
              <br />
              Even Teams: OFF
              <br />
              Game Speed: NORMAL
              <br />
              Weather: OFF
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>Lag/Settings/Teams: </b> After 2 minutes of gameplay any
              complaints on lag, pre-game settings, or banned teams will not be
              taken into consideration. No exceptions. (Note: connection is much
              better if you use a LAN cable instead of WiFi.)
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>Pause Timer: </b> If you are "Kicked for Excessive Griefing"
              when you are losing a match or the game is tied, you automatically
              lose. If you are kicked when you are winning a match, the match
              will be cancelled. If you're kicked prior to the end of the first
              quarter of game play and the score is tied, we will consider it a
              non issue and the game should be replayed.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>No Customs: </b> The use of custom playbooks is NOT allowed.
              The actual "West Coast" and "Multiple-D" Playbooks are allowed.
              Custom playbooks show up as "West Coast" and "Multiple-D" in the
              pre-game match screen. If you get caught using a Custom playbook
              claiming to use the real "West Coast" or "Multiple-D" playbook,
              you will either forfeit or have the match canceled. If you ready
              up to play against "West Coast" or "Multiple-D", and suspect your
              opponent is using a Custom at any time, you must quit the match
              immediately. You need sufficient evidence of your opponent running
              a play/formation that is not in the "West Coast" and "Multiple-D"
              playbook to support your claim.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>Accelerated vs Chew clock: </b>
              Accelerated clock is a PRE-game setting that is set by the match
              host. This will cause the play clock to consistently run down to
              15/20/25 seconds for each player throughout the entire match. NOTE
              - the clock automatically runs time off in All-Madden difficulty
              after selecting a play or during a hurry-up offense. This is NOT
              Accelerated clock.
              <br />
              Chew clock is an IN-game option that's available to anyone picking
              an offensive play. Chew will bring the playclock down to 10
              seconds after an offensive play is selected. It is legal to Chew
              at any time and is not disputable unless otherwise specified.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>Disconnections: </b>
              In the event of a disconnection, you and your opponent must finish
              the remaining time of the match, keeping the score the same as it
              was in the game that got disconnected. i.e. If the disconnection
              occurred in at the end of the 1st quarter, the new game should be
              played until the end of the 3rd quarter. We highly recommend
              recording video of all game footage in case of a dispute.
              <br />
              If you can't continue the match within 15 minutes of
              disconnecting, Chain Games may rule on the match using our
              discretion. If you were losing, you will be given the loss. If you
              were winning, the match may be canceled or you may be given the
              loss depending on the circumstances. It is up to the player who
              was losing to reach out and attempt to play the match again. If
              you were losing and no attempt is made to play again within 15
              minutes, you will lose the match.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>Online Squads Only: </b>
              Matches must be played with Online Squads only. You are not
              allowed to import a team or a franchise.
            </ListItemText>
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
              <b>Lag/Settings/Teams: </b> After 2 minutes of gameplay any
              complaints on lag, pre-game settings, or banned teams will not be
              taken into consideration. No exceptions. (Note: connection is much
              better if you use a LAN cable instead of WiFi.)
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>Disconnections: </b>
              In the event of a disconnection, you and your opponent must finish
              the remaining time of the match, keeping the score the same as it
              was in the game that got disconnected. i.e. If the disconnection
              occurred in the 30th minute, the new game should be played until
              the 60th.
              <br />
              When the 60th minute is reached, as soon as the ball is no longer
              in play, the match is over and both players must quit the game. If
              you continue to play and goals are scored, the goals will count.
              We highly recommend recording video of all game footage in case of
              a dispute.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>Online Squads Only: </b>
              Matches must be played with 'Online Squads' only. If there is any
              attempt to use Custom Squads or edited players, you will
              automatically forfeit the match and get a loss.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>No Custom Formations: </b> Custom Formations are not allowed to
              be used, unless agreed upon by the players involved. In case of a
              dispute, you MUST HAVE VIDEO EVIDENCE for it to be considered and
              the decision is at the discretion of Chain Games.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>Drawing/Tying a Match: </b> If the match ends in a draw, a new
              game must be played under the Golden Goal rules. Whoever scores
              first, wins the match. If there is no goal scored in the Golden
              Goal match, then each player will have the option to cancel or
              agree to continue.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>Legacy Defending: </b>
              Legacy defending is not allowed to be used in Chain Games
              Tournament matches. In case of a dispute, you MUST HAVE VIDEO
              EVIDENCE for it to be considered and the decision is at the
              discretion of Chain Games.
            </ListItemText>
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
              <b>Lag/Settings/Teams: </b> After 2 minutes of gameplay any
              complaints on lag, pre-game settings, or banned teams will not be
              taken into consideration. No exceptions. (Note: connection is much
              better if you use a LAN cable instead of WiFi.)
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>Pause Timer: </b>
              If your pause timer runs out and your opponent quits the game when
              you are losing, you automatically lose. If your pause timer runs
              out and your opponent quits the game when you are winning or the
              match is tied, the match will be cancelled. If your timer runs out
              prior to the end of the first quarter of game play and the score
              is tied, we will consider it a non issue and the game should be
              replayed.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon className={classes.bullet} />
            </ListItemIcon>
            <ListItemText>
              <b>Disconnections: </b>
              In the event of a disconnection, you and your opponent must finish
              the remaining time of the match, keeping the score the same as it
              was in the game that got disconnected. i.e. If the disconnection
              occurred in at the end of the 1st quarter, the new game should be
              played until the end of the 3rd quarter. We highly recommend
              recording video of all game footage in case of a dispute.
              <br />
              If you can't continue the match within 15 minutes of
              disconnecting, Chain Games may rule on the match using our
              discretion. If you were losing, you will be given the loss. If you
              were winning, the match may be canceled or you may be given the
              loss depending on the circumstances. It is up to the player who
              was losing to reach out and attempt to play the match again. If
              you were losing and no attempt is made to play again within 15
              minutes, you will lose the match.
            </ListItemText>
          </ListItem>
        </List>
      );
  }
};

Rules.propTypes = {
  className: PropTypes.string
};

export default Rules;
