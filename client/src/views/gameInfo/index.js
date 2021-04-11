import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Info from './Info';
import HowToPlay from './HowToPlay';
import Rules from './Rules';
import Teams from './Teams';

const font = "'Saira', sans-serif";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    minWidth: '100%',
    paddingBottom: theme.spacing(3),
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
    height: '290px',
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
    height: '210px'
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
  }
}));


const BattleView = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('info');

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const tabs = [
    { value: 'info', label: 'Info' },
    { value: 'howToPlay', label: 'How to Play' },
    { value: 'rules', label: 'Rules' },
    { value: 'teams', label: 'Teams' }
  ];

  return (
    <Page
      className={classes.root}
      title="Battle"
    >
      <Container maxWidth="lg">
        <Box mt={10} mb={3}>
          <Paper className={classes.topPaper}>
            <Box className={classes.info} borderBottom={1}>
              <Grid container>
                <Grid item xs={3}>
                  <img className={classes.image} src="/static/images/gameIcons/fortnite.jpg"/>
                </Grid>
                <Grid item xs={9}>
                  <Box className={classes.caption}
                    display='flex'
                    flexDirection='column'
                  >
                      <Typography
                        className={classes.titlePaper}
                        color="textPrimary"
                        variant="body3"
                      >
                        $50 GUARANTEED 1V1 KILL RACE BEST OF 1
                      </Typography>
                      <Box display="flex" mb={1}>
                        <Box className={classes.borderedBoxGlew}>
                          <Typography
                            color="textPrimary"
                            variant="body2"
                          >
                            Fortnite
                          </Typography>
                          <Typography
                            color="secondary"
                            variant="body2"
                          >
                            COMMUNITY TOURNAMENT
                          </Typography>
                        </Box>                        
                      </Box>
                      <Box display="flex">
                        <Box className={classes.borderedBox} border={1}>
                          <Typography
                            color="secondary"
                            variant="body2"
                          >
                            REGISTRATION OPENS
                          </Typography>
                          <Typography
                            color="textPrimary"
                            variant="body1"
                          >
                            Open Now
                          </Typography>
                        </Box>
                        <Box ml={1} className={classes.borderedBox}  border={1}>
                          <Typography
                            color="secondary"
                            variant="body2"
                          >
                            START TIME
                          </Typography>
                          <Typography
                            color="textPrimary"
                            variant="body1"
                          >
                            Apr 24th 1:00 AM UTC
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex" mt={1} ml={1}>
                        <Box>
                          <Typography
                            color="textSecondary"
                            variant="body2"
                          >
                            ENTRY/PLAYER
                          </Typography>
                          <Typography
                            color="textPrimary"
                            variant="body2"
                          >
                            $25
                          </Typography>
                        </Box>
                        <Divider className={classes.divider} />
                        <Box>
                          <Typography
                            color="textSecondary"
                            variant="body2"
                          >
                            TEAM SIZE
                          </Typography>
                          <Typography
                            color="textPrimary"
                            variant="body2"
                          >
                            1 vs 1
                          </Typography>
                        </Box>
                        <Divider className={classes.divider} />
                        <Box>
                          <Typography
                            color="textSecondary"
                            variant="body2"
                          >
                            MAX TEAMS
                          </Typography>
                          <Typography
                            color="textPrimary"
                            variant="body2"
                          >
                            64
                          </Typography>
                        </Box>
                        <Divider className={classes.divider} />
                        <Box>
                          <Typography
                            color="textSecondary"
                            variant="body2"
                          >
                            ENROLLED
                          </Typography>
                          <Typography
                            color="textPrimary"
                            variant="body2"
                          >
                            4
                          </Typography>
                        </Box>
                      </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            
            <Box display="flex" className={classes.timer}>
              <Box ml={5} display="flex" alignItems="center" justifyContent="center">
                <Box mt={1} mr={1}>
                  <Typography
                    color="textPrimary"
                    variant="body2"
                  >
                    Starts in
                  </Typography>
                </Box>
                <Typography
                  color="textPrimary"
                  variant="h2"
                >
                  10M 22S
                </Typography>
                  
              </Box>
                <Box display="flex" alignItems="center" ml={9}>
                  <Button
                    variant="contained"
                    color="secondary"
                  >
                    ENROLL NOW
                  </Button>
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
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider />
        </Box>
        {currentTab === 'info' && <Info />}
        {currentTab === 'howToPlay' && <HowToPlay />}
        {currentTab === 'rules' && <Rules />}
        {currentTab === 'teams' && <Teams />}
      </Container>
    </Page>
  );
};

export default BattleView;
