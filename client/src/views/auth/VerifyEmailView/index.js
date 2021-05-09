import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import VerifyEmail from './VerifyEmail';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  },
  logo: {
    width: '400px'
  }
}));

const VerifyEmailView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Verify Email"
    >
      <Container
        className={classes.cardContainer}
        maxWidth="sm"
      >
        <Box
          mb={8}
          display="flex"
          justifyContent="center"
        >
          <RouterLink to="/">
            <Logo className={classes.logo} />
          </RouterLink>
        </Box>
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <div>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h2"
                >
                  Verify Email
                </Typography>
              </div>
            </Box>
            <Box
              flexGrow={1}
              mt={3}
            >
              <VerifyEmail />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default VerifyEmailView;
