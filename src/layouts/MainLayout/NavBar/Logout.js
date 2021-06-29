import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Button, ListItem, makeStyles } from '@material-ui/core';
import { AuthContext } from '../../../context/AuthContext';
import { LOGOUT_REQUEST } from '../../../actions/actions.js';
import { logoutService } from '../../../service/centralServerService';
import { useLocation, useHistory } from 'react-router-dom';
import { LogOut as LogoutIcon } from 'react-feather';
import * as Sentry from '@sentry/react';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%'
  },
  buttonLeaf: {
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      '& $title': {
        fontWeight: theme.typography.fontWeightMedium
      }
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.secondary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.secondary.main
    }
  }
}));

const Logout = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  let paddingLeft = 8;

  const style = { paddingLeft };

  const handleLogoutRequest = async () => {
    try {
      const response = await logoutService();
      const data = response.data;
      if (data.success === true) {
        history.push('/login');
        dispatch({
          type: LOGOUT_REQUEST
        });
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: Logout.js ~ line 77 ~ handleLogoutRequest ~ error',
        error
      );
      Sentry.captureException(error, {
        tags: {
          page: location.pathname
        }
      });
    }
  };

  return (
    <ListItem className={classes.itemLeaf} disableGutters key={'logout'}>
      <Button
        className={clsx(classes.buttonLeaf, `depth-0`)}
        style={style}
        onClick={handleLogoutRequest}
      >
        <LogoutIcon className={classes.icon} size="20" />
        <span className={classes.title}>Logout</span>
      </Button>
    </ListItem>
  );
};

Logout.propTypes = {
  className: PropTypes.string
};

Logout.defaultProps = {
  open: false
};

export default Logout;
