import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { changeUserPassword } from '../../service/node.service';
import * as Sentry from '@sentry/react';
import { AuthContext } from '../../context/AuthContext';
import { LOGOUT_REQUEST } from '../../actions/actions';

const font = "'Saira', sans-serif";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginBottom: 10,
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

const ChangePassword = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [alertMessage, setAlertMsg] = useState('');
  const { dispatch } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        oldPassword: Yup.string().max(255).required('Password is required'),
        newPassword: Yup.string().max(255).required('Password is required'),
        confirmPassword: Yup.string().when('newPassword', {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref('newPassword')],
            'New Password and Confirm Password need to be the same'
          )
        })
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          let formData = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
          };

          const response = await changeUserPassword(formData);
          const data = response.data;
          if (data.success === true) {
            dispatch({
              type: LOGOUT_REQUEST
            });
            if (isMountedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
            history.push('/login');
          } else {
            return setAlertMsg('Something went wrong. Please try again');
          }
        } catch (error) {
          console.log(
            '🚀 ~ file: ChangePassword.js ~ line 70 ~ handleChangePassword ~ error',
            error
          );
          Sentry.captureException(error, {
            tags: {
              page: location.pathname
            }
          });
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
          }

          if (error.response) {
            setAlertMsg(error.response.data.error);
          } else {
            setAlertMsg('Something went wrong. Please try again');
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          noValidate
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Typography
            className={classes.title}
            variant="h2"
            color="textPrimary"
          >
            Change Password
          </Typography>
          <TextField
            error={Boolean(touched.oldPassword && errors.oldPassword)}
            fullWidth
            autoFocus
            helperText={touched.oldPassword && errors.oldPassword}
            label="Old Password"
            margin="normal"
            name="oldPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.oldPassword}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.newPassword && errors.newPassword)}
            fullWidth
            helperText={touched.newPassword && errors.newPassword}
            label="New Password"
            margin="normal"
            name="newPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.newPassword}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            fullWidth
            helperText={touched.confirmPassword && errors.confirmPassword}
            label="Confirm Password"
            margin="normal"
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.confirmPassword}
            variant="outlined"
          />
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Box>
          <Box mt={2}>
            {alertMessage && <Alert severity="info">{alertMessage}</Alert>}
          </Box>
        </form>
      )}
    </Formik>
  );
};

ChangePassword.propTypes = {
  className: PropTypes.string
};

export default ChangePassword;
