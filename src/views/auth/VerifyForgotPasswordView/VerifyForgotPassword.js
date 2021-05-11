import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { 
  useHistory,
  useLocation
} from 'react-router-dom';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  makeStyles
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import {LOGOUT_REQUEST} from '../../../actions/actions.js';
import {
    verifyForgotPasswordTokenService,
    resetForgottenPasswordService
} from '../../../service/node.service';
import { passwordRegex } from "../../../config/constants";

const useStyles = makeStyles(() => ({
  root: {}
}));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const VerifyForgotPassword = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const [token, setToken] = useState('');
  const query = useQuery();
  const [tokenValid, setTokenValid] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  

  const verifyToken = async () => {
    try {
      const { data } = await verifyForgotPasswordTokenService({ token })
      if (data.success === true) {
          setTokenValid(true)
      }
    }
    catch (error) {
      setTokenValid(false)
      if (error.response?.data) {
          setSubmitMessage(error.response.data.error)
      } else {
          setSubmitMessage('Something went wrong!')
      }
    }
  }

  useEffect(() => {
    let token = query.get("token");
    setToken(token);
    console.log('token: ' + token);
  }, []);

  useEffect(() => {
    if (token) {
        verifyToken();
    }
  }, [token]);

  return (
    <Formik
      initialValues={{
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        password: yup.string().required("Password is a required field").matches(passwordRegex, 'min 6  and max 30 letter password, with at least a symbol, upper and lower case letters and a number'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          if (tokenValid) {
            setSubmitting(true);
            const { data } = await resetForgottenPasswordService({
              newPassword: values.password,
              token: token,
              reCaptchaToken: '',
            });

            if (data.success === true) {
                setStatus({ success: true });
                dispatch({
                  type: LOGOUT_REQUEST
                });
                history.push('/login');
                setSubmitting(false);
            } else {
              setStatus({ success: false });
              setErrors({ submit: data.error });
            }
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
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
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="New Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />          
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Confirm
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

VerifyForgotPassword.propTypes = {
  className: PropTypes.string
};

export default VerifyForgotPassword;
