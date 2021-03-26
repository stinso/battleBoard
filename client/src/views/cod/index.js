import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
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
  image: {
    width: '100vw'
  },
  paper: {
    width: '100vw',
    backgroundColor: theme.palette.background.dark,
    elevation: 10
  }
}));

const CodView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Call of Duty"
    >
      <Paper className={classes.paper} >
        <img
          alt="Presentation"
          src="/static/images/cod_banner.jpg"
        />      
      </Paper>
      <Container maxWidth="lg" m={5}>
        <Box mt={5}>
          <Typography
            display="inline"
            variant="h2"
            color="textSecondary"
          >
            Upcoming Events
          </Typography>
        </Box>
        <Box mt={5}>
          <Typography
            display="inline"
            variant="body1"
            color="textSecondary"
          >
            Table here
          </Typography>
        </Box>
      </Container>
    </Page>
  );
};

export default CodView;
