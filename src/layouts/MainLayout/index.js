import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64 /* ,
    [theme.breakpoints.up('lg')]: {
      paddingRight: 256
    } */
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onNavOpen={() => setNavOpen((isNavOpen) => !isNavOpen)} />
      <NavBar onOpen={isNavOpen} />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
