import React from 'react';
import clsx from 'clsx';
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
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

// new
import ReCAPTCHA from 'react-google-recaptcha';
import { useEffect, useState, useContext } from 'react';
//import { useRouter } from 'next/router'
import { loginService } from '../../../service/node.service.js';
import { SignUpRedirectURL, ForgotPasswordRedirectURL, RecaptchaSiteKey } from '../../../config/constants';
import { AuthContext } from '../../../context/AuthContext';
import { LOGIN_REQUEST } from '../../../actions/actions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const JWTLogin = ({ className, ...rest }) => {
  const classes = useStyles();
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();

  // new
  const {dispatch} = useContext(AuthContext);
  const [userNameFocus, setUserNameFocus] = useState()
  const [passwordFocus, setPasswordFocus] = useState()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState()
  const recaptchaRef = React.useRef();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState()

  const onCaptchaChange = (value) => {
    setCaptchaVerified(value ? true: false);
    setCaptchaToken(value);
  }

  useEffect(() =>{
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    document.body.classList.add("login-page");
  }, [])

  async function onLoginButtonClick(e){
    setErrMsg('');
    e.preventDefault()
    if(userName && password && captchaVerified){
      try{
        let formData = {
          username: userName,
          reCaptchaToken: captchaToken,
          password
        };
        
        const response = await loginService(formData);
        
        const data = response.data;
        if(data.success === true){
          dispatch({
            type: LOGIN_REQUEST,
            payload: {
              ...data,
            }
          })
          if (redirect) {
            router.push(redirect)
          }
          else {
            router.push('/dashboard')
          }
        }
        else{
          setErrMsg('Something went wrong. Please try again');
        }
      }
      catch(error){
        console.log("onLoginButtonClick -> error", error)
        recaptchaRef.current.reset();

        if(error.response){
          setErrMsg(error.response.data.error);
        }
        
      }
    }
    else if(!userName){
      setErrMsg('Please enter User Name');
    }
    else if(!password){
      setErrMsg('Please enter Password');
    }
    else if(!captchaVerified){
      setErrMsg('Please complete Captcha');
    }
  }

  return (
    <Formik
      initialValues={{
        email: 'mukki@chaingames.io',
        password: 'Password123',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try{
          let formData = {
            username: values.email,
            reCaptchaToken: captchaToken,
            password: values.password
          };
          
          const response = await loginService(formData);

          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
          
          const data = response.data;
          if(data.success === true){
            dispatch({
              type: LOGIN_REQUEST,
              payload: {
                ...data,
              }
            })
            /* if (redirect) {
              router.push(redirect)
            }
            else {
              router.push('/dashboard')
            } */
            console.log('######## LOGIN SUCCESS! ########')
          }
          else{
            setErrMsg('Something went wrong. Please try again');
          }
        }
        catch(error){
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
          
          console.log("onLoginButtonClick -> error", error)
          recaptchaRef.current.reset();
  
          if(error.response){
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
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
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
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
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
          <Box mt={2}>
            <Alert
              severity="info"
            >
              Wrong Username or Password
            </Alert>
          </Box>
        </form>
      )}
    </Formik>
  );
};

JWTLogin.propTypes = {
  className: PropTypes.string,
};

export default JWTLogin;
