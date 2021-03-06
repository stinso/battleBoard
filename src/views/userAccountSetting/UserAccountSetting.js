import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';
import Linking from './Linking';
import ChangePassword from './ChangePassword';
import { AuthContext } from '../../context/AuthContext';
import ImageUpload from '../CustomUpload/ImageUpload';

const font = "'Saira', sans-serif";

const tabs = {
  linking: 1,
  changePassword: 2
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: 200,
    paddingTop: 100,
    minHeight: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      paddingBottom: 60
    },
    margin: 0
  },
  paper: {
    minHeight: '200px',
    padding: theme.spacing(4)
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  rowImage: {
    height: '48px',
    width: '48px',
    margin: 0,
    padding: 0,
    verticalAlign: 'top'
  },
  imageCell: {
    height: '48px',
    width: '48px',
    padding: 0
  },
  accordion: {
    marginTop: theme.spacing(4)
  },
  title: {
    fontFamily: font,
    fontSize: 32,
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const userAccountSetting = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [currentTab, setCurrentTab] = useState(tabs.linking);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (user.user.session?.dpHigh) {
      setImageURL(user.user.session.dpHigh ? user.user.session.dpHigh : '');
    }
  }, [user.user]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Paper className={classes.paper}>
              <ImageUpload avatar imageURL={imageURL} addBtnColor="default" />
              <Box marginTop={2}>
                <Box mt={4}>
                  <Button
                    className={classes.button}
                    size="large"
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    onClick={(e) => handleTabsChange(e, tabs.linking)}
                  >
                    account linking
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button
                    className={classes.button}
                    size="large"
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    onClick={(e) => handleTabsChange(e, tabs.changePassword)}
                  >
                    Change password
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Paper className={classes.paper}>
              {currentTab === tabs.linking && (
                <Linking username={user.user?.session?.username} />
              )}
              {currentTab === tabs.changePassword && <ChangePassword />}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

userAccountSetting.propTypes = {
  className: PropTypes.string
};

export default userAccountSetting;
