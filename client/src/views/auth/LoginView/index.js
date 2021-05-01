import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Link,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import useAuth from 'src/hooks/useAuth';
import JWTLogin from './JWTLogin';

// new
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState, useContext } from "react";
//import { useRouter } from 'next/router'
import { loginService } from '../../../service/node.service.js';
import { SignUpRedirectURL, ForgotPasswordRedirectURL, RecaptchaSiteKey } from "../../../config/constants";
import { AuthContext } from '../../../context/AuthContext';
import { LOGIN_REQUEST } from "../../../actions/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  logo: {
    width: '400px'
  },
  banner: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  bannerChip: {
    marginRight: theme.spacing(2)
  },
  methodIcon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
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
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const { method } = useAuth();

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

  function onUserNameChange(e){
    if(e.target.value){
      setUserName(e.target.value);
    }
  }
  
  function onPasswordChange(e){
    if(e.target.value){
      setPassword(e.target.value);
    }
  }

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
    <Page
      className={classes.root}
      title="Login"
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
                  Sign in
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  Sign in on the internal platform
                </Typography>
              </div>
            </Box>
            <Box
              flexGrow={1}
              mt={3}
            >
              {method === 'JWT' && <JWTLogin /> }
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              Create new account
            </Link>
            <Box marginTop={1}>
              <Link
                component={RouterLink}
                to="/register"
                variant="body2"
                color="textSecondary"
              >
                Forgot Password?
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default LoginView;
