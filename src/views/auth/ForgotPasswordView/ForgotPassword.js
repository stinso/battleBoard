import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { Box, Button, TextField, makeStyles } from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { recoverPassword } from '../../../service/node.service';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ForgotPassword = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        email: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const { data } = await recoverPassword({
            email: values.email,
            reCaptchaToken: ''
          });

          if (data && data.success) {
            //setShowModal(true);
            history.push('/dashboard');
          } else {
            setStatus({ success: false });
            setErrors({ submit: data.error });
            setSubmitting(false);
          }

          if (isMountedRef.current) {
            setStatus({ success: true });
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
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
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
              Send Password Reset Link
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

ForgotPassword.propTypes = {
  className: PropTypes.string
};

export default ForgotPassword;
