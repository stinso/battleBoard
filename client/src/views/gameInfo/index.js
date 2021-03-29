import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

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
  }
}));


const BattleView = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('overview');

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'prices', label: 'Prices/Players' },
    { value: 'howToPlay', label: 'How to Play' },
    { value: 'rules', label: 'Rules' }
  ];

  return (
    <Page
      className={classes.root}
      title="Battle"
    >
      <Container maxWidth="md">
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  textAlign="center"
                >
                  <Avatar
                    className={classes.avatar}
                    src={'static/images/apex.jpg'}
                  />
                  <Typography
                    className={classes.name}
                    color="textPrimary"
                    gutterBottom
                    variant="h3"
                  >
                    Apex
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="body1"
                  >
                    2 - 30 Players
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                >
                  Register | 1.00$
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xl={9}
            xs={12}
          >
            <Card>
              <CardHeader title="Event Details" />
              <Divider />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                    GAME MODE
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        Warzone - Max Kills
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      START TIME
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        28th Mar 2021 01:00 CET
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      END TIME
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        28th Mar 2021 03:00 CET
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                    DURATION
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        60 Min.
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      MIN PLAYER
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        2
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      MAX PLAYER
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        30
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      MAX WINNER
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        10
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Grid>
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <Card>
              <CardHeader title="Players" />
              <Divider />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                    GAME MODE
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        Warzone - Max Kills
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      START TIME
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        28th Mar 2021 01:00 CET
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      END TIME
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        28th Mar 2021 03:00 CET
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                    DURATION
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        60 Min.
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      MAX PLAYER
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        30
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      MIN PLAYER
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        2
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      MAX WINNER
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        10
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default BattleView;
