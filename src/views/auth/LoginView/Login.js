import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

// new
import { useEffect, useState, useContext } from 'react';
import { loginService } from '../../../service/centralServerService';
import {
  SignUpRedirectURL,
  ForgotPasswordRedirectURL,
  RecaptchaSiteKey
} from '../../../config/constants';
import { AuthContext } from '../../../context/AuthContext';
import { LOGIN_REQUEST } from '../../../actions/actions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Login = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    document.body.classList.add('login-page');
  }, []);

  return (
    <Formik
      initialValues={{
        username: 'mukki',
        password: 'Proevo08!',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().max(255).required('Password is required'),
        username: Yup.string().max(255).required('Username is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          let formData = {
            username: values.username,
            reCaptchaToken: ' ',
            password: values.password
          };

          const response = await loginService(formData);

          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }

          const data = response.data;
          if (data.success === true) {
            dispatch({
              type: LOGIN_REQUEST,
              payload: {
                ...data
              }
            });
            history.push('/dashboard');
          } else {
            setErrMsg('Something went wrong. Please try again');
          }
        } catch (error) {
          console.error(error);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
          }

          if (error.response) {
            setErrMsg(error.response.data.error);
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
          <TextField
            error={Boolean(touched.username && errors.username)}
            fullWidth
            autoFocus
            helperText={touched.username && errors.username}
            label="Username"
            margin="normal"
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            type="username"
            value={values.username}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
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
              Log In
            </Button>
          </Box>
          <Box mt={2}>{errMsg && <Alert severity="info">{errMsg}</Alert>}</Box>
        </form>
      )}
    </Formik>
  );
};

Login.propTypes = {
  className: PropTypes.string
};

export default Login;
