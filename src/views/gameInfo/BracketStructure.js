import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import { useEffect, useState, useContext, createContext } from 'react';
import { Bracket, Seed, SeedItem, SeedTeam, SeedTime } from 'react-brackets';
import { getTimeAndDateFromEpoch } from '../../utils/helpers.js';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '20px',
    height: '20px'
  },
  titleBox: {
    textAlign: 'center'
  },
  title: {
    color: theme.palette.secondary.main,
    fontSize: 24
  }
}));

const Dash = '-----------';

const PlayerComponent = ({
  player: {
    isWinner = false,
    dpHigh = '',
    username = Dash,
    eventStatus = '',
    winnerIndex = -1
  }
}) => {
  const { usernameBeingHovered, setUsernameBeingHovered } =
    useContext(HighlightContext);
  const classes = useStyles();
  return (
    <SeedTeam
      onMouseEnter={() => {
        if (username === Dash) {
          setUsernameBeingHovered('');
        } else {
          setUsernameBeingHovered(username);
        }
      }}
      onMouseLeave={() => {
        setUsernameBeingHovered('');
      }}
      className={eventStatus && 'hover-pointer'}
      style={{
        backgroundColor:
          usernameBeingHovered === username
            ? '#ff8d7299'
            : isWinner
            ? '#00f2c370'
            : [0, 1].includes(winnerIndex) && username !== Dash
            ? '#ff649178'
            : '#3b5998ab',
        justifyContent: 'center'
      }}
    >
      {username !== Dash && (
        <Avatar className={classes.avatar} alt="profile image" src={dpHigh} />
      )}
      {username}
    </SeedTeam>
  );
};

const DateComponent = ({ date, isApproximate }) => {
  return (
    <p
      style={{
        fontSize: 9,
        height: 'auto',
        color: '#cec4c4',
        marginBottom: '2px'
      }}
    >
      {date &&
        `${isApproximate ? 'Approx.' : ''} ${getTimeAndDateFromEpoch(date)}`}
    </p>
  );
};

const HighlightContext = createContext();

const BracketStructure = ({ eventData }) => {
  const [data, setData] = useState([]);
  const [usernameBeingHovered, setUsernameBeingHovered] = useState('');
  const classes = useStyles();

  const RenderTitle = (title, breakpoint) => {
    return (
      <Box className={classes.titleBox}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
      </Box>
    );
  };

  const RenderSeed = (seed, breakpoint, roundIndex) => {
    const { usernameBeingHovered } = useContext(HighlightContext);

    return (
      <>
        {seed?.id &&
        (seed?.playersEnrolled?.length !== 1 || roundIndex !== 0) ? (
          <Seed
            className={
              (usernameBeingHovered === seed?.winnerUsername
                ? 'highlight'
                : '') + ' highlight-horizontal-line'
            }
            mobileBreakpoint={breakpoint}
          >
            <DateComponent
              date={seed?.startTime}
              isApproximate={seed?.eventStatus === 'Incomplete'}
            />
            <SeedItem
              style={{
                width: '100%',
                backgroundColor: '#222a42',
                boxShadow: ' 0 1px 20px 0px rgb(0 0 0 / 76%)',
                color: 'white'
              }}
              onClick={() => {
                if (seed.playersEnrolled?.length !== 0) {
                  window.location.href = `/gameInformationPage/${seed.id}`;
                }
              }}
            >
              <div>
                <PlayerComponent
                  player={{
                    ...seed?.playersEnrolled?.[0],
                    isWinner: seed?.winner === 0,
                    eventStatus: seed.eventStatus,
                    winnerIndex: seed?.winner
                  }}
                />
                <div
                  style={{
                    height: 1,
                    backgroundColor: '#707070'
                  }}
                ></div>
                <PlayerComponent
                  player={{
                    ...seed?.playersEnrolled?.[1],
                    isWinner: seed?.winner === 1,
                    eventStatus: seed.eventStatus,
                    winnerIndex: seed?.winner
                  }}
                />
              </div>
            </SeedItem>

            <SeedTime
              mobileBreakpoint={breakpoint}
              style={{ fontSize: 9, height: 'auto' }}
            >
              {seed.eventStatus}
            </SeedTime>
          </Seed>
        ) : (
          <Seed
            style={{
              visibility: seed?.id ? 'hidden' : 'visible'
            }}
            className={
              (seed.showLine && `show-horizontal-line-connector`) +
              ' highlight-horizontal-line'
            }
            mobileBreakpoint={breakpoint}
          >
            <DateComponent
              date={seed?.startTime}
              isApproximate={seed?.eventStatus === 'Incomplete'}
            />

            <SeedItem>
              <Card className={classes.seed}>
                <PlayerComponent player={{}} />
                <div
                  style={{
                    height: 1,
                    backgroundColor: '#707070'
                  }}
                ></div>
                <PlayerComponent player={{}} />
              </Card>
            </SeedItem>

            {seed?.eventStatus && (
              <SeedTime
                mobileBreakpoint={breakpoint}
                style={{ fontSize: 9, height: 'auto' }}
              >
                {seed.eventStatus}
              </SeedTime>
            )}
          </Seed>
        )}
      </>
    );
  };

  const formatBracketData = async () => {
    try {
      let formattedData = eventData.childEvents.map((row, index) => {
        //in round one to show horizontal connector line
        if (index === 0 && row[0]) {
          let result = [];
          let oddIndexList = row.filter((row, index) => index % 2 !== 0);
          let evenIndexList = row.filter((row, index) => index % 2 === 0);

          for (let i = 0; i < oddIndexList.length; i++) {
            if (
              evenIndexList[i].playersEnrolled.length === 2 &&
              oddIndexList[i].playersEnrolled.length === 1
            ) {
              oddIndexList[i] = { ...oddIndexList[i], showLine: true };
            }

            result.push(evenIndexList[i]);
            result.push(oddIndexList[i]);
          }
          row = result;
        }

        return {
          title: `Round ${index + 1}`,
          seeds: row.map((childEvent, index) => {
            let winnerUsername;
            if (childEvent && childEvent?.winner !== -1) {
              winnerUsername =
                childEvent.playersEnrolled[childEvent.winner]?.username;
            }
            return { ...childEvent, winnerUsername, index };
          })
        };
      });
      setData(formattedData);
    } catch (error) {
      console.log(
        '🚀 ~ file: BracketStructure.jsx ~ line 100 ~ formatBracketData ~ error',
        error
      );
    }
  };

  useEffect(() => {
    if (eventData?.childEvents) {
      formatBracketData();
    }
  }, [eventData?.childEvents]);

  return (
    <>
      <HighlightContext.Provider
        value={{ usernameBeingHovered, setUsernameBeingHovered }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardContent
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  maxWidth: '100%',
                  overflow: 'auto',
                  height: '100%'
                }}
              >
                <div
                  style={{
                    overflow: 'auto'
                  }}
                  className="row"
                >
                  <Bracket
                    bracketClassName="bracket"
                    renderSeedComponent={RenderSeed}
                    roundTitleComponent={RenderTitle}
                    mobileBreakpoint={0}
                    rounds={data}
                    swipeableProps={{
                      enableMouseEvents: true,
                      animateHeight: true
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </HighlightContext.Provider>
    </>
  );
};

export default BracketStructure;
