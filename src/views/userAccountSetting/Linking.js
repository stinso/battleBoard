import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { 
  getOAuthURL, 
  deleteLinkedNetworkService, 
  getLinkedNetworkService,
  addPSNTagService
} from "../../service/node.service";
import {SupportedGameNetworks} from '../../config/constants'
import * as Sentry from "@sentry/react";
import {Formik} from 'formik';
import * as yup from "yup";

const font = "'Saira', sans-serif";


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
    minHeight: "200px",
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
  },
  linkPS: {
    height: '56px',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));

const SuccessText = 'PSN info added.'

const NetworkEnums = {
  XBOX_NETWORK_ID: SupportedGameNetworks[0].index,
  BATTLE_NETWORK_ID: SupportedGameNetworks[1].index,
  PLAYSTATION_NETWORK_ID: SupportedGameNetworks[2].index,
  ACTIVISION_NETWORK_ID: SupportedGameNetworks[3].index,
}

const Linking = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [xboxAccount, setXboxAccount] = useState({isLinked: false, infoRegardingAccount:{}});
  const [playStationAccount, setPlayStationAccount] = useState({isLinked: false, infoRegardingAccount:{}});
  const [battleAccount, setBattleAccount] = useState({ isLinked: false, infoRegardingAccount: {} });
  const [showModal, setShowModal] = useState({show: false, networkSelected: ''});
  const [showPSNModal, setShowPSNModal] = useState({
    show: false,
    msg: '',
  });

  console.log(showPSNModal);

  const schema = yup.object({
    psnName: yup.string().required("This field is required."),
  });

  const getNetworkIDFromConsole = (consoleName) => {
    switch(consoleName){
      case 'xbox':
        return NetworkEnums.XBOX_NETWORK_ID;
      case 'battle':
        return NetworkEnums.BATTLE_NETWORK_ID;
      case 'playstation':
        return NetworkEnums.PLAYSTATION_NETWORK_ID;
        // case 'activision':
        // return NetworkEnums.ACTIVISION_NETWORK_ID;
    }
  }

  const handleAccountLink = async (e, consoleName) => {
    e.preventDefault();
    const network = getNetworkIDFromConsole(consoleName);
    try{
    const {data} = await getOAuthURL({network});
      if (data.success === true && data.url) {
        window.open(
          data.url,
          '_blank'
        );
      }
    }
    catch (error) {
      console.log("🚀 ~ file: Linking.js ~ line 147 ~ handleAccountLink ~ error", error)
      Sentry.captureException(error, {
        tags: {
          page: location.pathname,
        },
      });    
    }
  };

  const handleUnlinkAccount = async (consoleName) => {
    // e.preventDefault();
    const network = getNetworkIDFromConsole(consoleName); 
    try{
      const {data} = await deleteLinkedNetworkService({network})
      if(data.success === true){
        switch(network){
        case NetworkEnums.XBOX_NETWORK_ID:
          setXboxAccount({isLinked: false, infoRegardingAccount:{}});
          break;
        case NetworkEnums.BATTLE_NETWORK_ID:
          setBattleAccount({isLinked: false, infoRegardingAccount:{}});
          break;
        case NetworkEnums.PLAYSTATION_NETWORK_ID:
          setPlayStationAccount({isLinked: false, infoRegardingAccount:{}});
          break;
        }
        setShowModal({show: false});
      }
    }
    catch (error) {
      console.log("🚀 ~ file: Linking.js ~ line 171 ~ handleUnlinkAccount ~ error", error)
      Sentry.captureException(error, {
        tags: {
          page: location.pathname,
        },
      });
    }
  };

  const linkPSN = async (values) => {
    setShowPSNModal((preValue) => {
      return { ...preValue, msg: '' }
    })
    try {
      const { data } = await addPSNTagService({
        uID: values.psnName,
        networkID: getNetworkIDFromConsole('playstation'),
      });
      if (data.success) {
        getLinkedAccounts();
        setShowPSNModal({
          show: false,
          msg: '',
        })
      }
    }
    catch (error) {
      console.log("🚀 ~ file: Linking.js ~ line 201 ~ linkPSN ~ error", error);
      if (error.response?.data) {
        if (error.response.data.errorCode === 103) {
          history.push(`/claim-network?tag=${values.psnName}&network=2`)
        }
        setShowPSNModal((preValue) => {
          return { ...preValue, msg: error.response.data.error }
        })
      }
      else {
        setShowPSNModal((preValue) => {
          return { ...preValue, msg: 'Something went wrong!' }
        })
      }
    }
  }

  const getLinkedAccounts = async () => {
    try {
      const response = await getLinkedNetworkService({username : props.username});
      if(response.data.success === true && response.data.linkedNetworks) {
        response.data.linkedNetworks.map((row, index) => {
          switch(row.network) {
            case NetworkEnums.XBOX_NETWORK_ID:
              setXboxAccount({isLinked: true, infoRegardingAccount: {
                userNameOnNetwork : row.idOnNetwork
              }})
              break;
            case NetworkEnums.BATTLE_NETWORK_ID:
              setBattleAccount({isLinked: true, infoRegardingAccount: {
                userNameOnNetwork : row.idOnNetwork
              }})
              break;
            case NetworkEnums.PLAYSTATION_NETWORK_ID:
              setPlayStationAccount({isLinked: true, infoRegardingAccount: {
                userNameOnNetwork : row.idOnNetwork
              }})
              break;
            // case NetworkEnums.ACTIVISION_NETWORK_ID:
            //   break;
          }
        })
      }
    } catch (error) {
      console.log("🚀 ~ file: Linking.js ~ line 237 ~ getLinkedAccounts ~ error", error)
      Sentry.captureException(error, {
        tags: {
          page: location.pathname,
        },
      });
    }
  };

  useEffect(() => {
    if (props.username) {
      getLinkedAccounts() 
    }
  }, [props.username]);

  const ModalWindow = () => {
    return (
      <Dialog 
        open={showModal}
        onClose={()=>setShowModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle disableTypography>
          <Typography variant="h4">Are you sure?</Typography>
        </DialogTitle >
        <DialogContent>
          <DialogContentText>
            Are you sure you want to unlink? The Events and challenges in which you've registered with this linked account would fail. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleUnlinkAccount(showModal.networkSelected);
            }}
            className={classes.button}
          >
            unlink
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShowModal(false);
            }}
            className={classes.button}
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const handleClosePSNModal = () => {
    setShowPSNModal({show: false, msg:''});
  }

  const PSNModal = () => {
    return (
      <Dialog 
        open={showPSNModal.show}
        onClose={handleClosePSNModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle disableTypography >
          <Typography variant="h4"> PSN Network Name </Typography>
        </DialogTitle >
        <DialogContent>
          <Formik
            validationSchema={schema}
            onSubmit={linkPSN}
            initialValues={{
            }}
            isInitialValid={schema.isValidSync()}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              isValid,
              errors,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Box display='flex'>
                <FormControl>
                  <TextField
                    error={errors.psnName}
                    fullWidth
                    helperText={!!errors.psnName && errors.psnName}
                    label="PSN name"
                    margin="normal"
                    name="psnName"
                    onChange={handleChange}
                    type="text"
                    value={values.psnName}
                    variant="outlined"
                  />  
                  <FormHelperText error>
                    {errors.psnName}
                  </FormHelperText>
                </FormControl>
                
                  <Typography variant="h4"> {showPSNModal.msg} </Typography>
                  <Button
                    className={classes.linkPS}
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={!(isValid)} 
                  >
                    Link
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClosePSNModal}
            className={classes.button}
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return(
    <div>
      {showModal.show && ModalWindow()}
      {showPSNModal.show && PSNModal()}
      <Typography
        className={classes.title}
        variant="h2"
        color="textPrimary"
        >
        Linked Accounts
      </Typography>
      <Table>
        <TableHead>
          <TableRow >
          <TableCell>
            Network
          </TableCell>
          <TableCell>
            Username
          </TableCell>
          <TableCell align="center">
            Action
          </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* xbox */}
          <TableRow
            spacing={0}
            hover
            key={'xbox'}
          >
            <TableCell className={classes.imageCell} align='center' padding='none'>
              <img className={classes.rowImage}
                src="/static/images/networks/xbox.png"
              />
            </TableCell>
            <TableCell>
              {xboxAccount.isLinked ? `${xboxAccount.infoRegardingAccount.userNameOnNetwork}` : 'NA'}
            </TableCell>
            <TableCell align="center">
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                onClick={(e) => {
                  if (xboxAccount.isLinked) {
                    setShowModal({ show: true, networkSelected: 'xbox' })
                  }
                  else {
                    handleAccountLink(e, 'xbox');
                  }
                }}
              >
                {xboxAccount.isLinked ? 'Unlink' : 'Link'}
              </Button>
            </TableCell>
          </TableRow>
          {/* battlenet */}
          <TableRow
            spacing={0}
            hover
            key={'battlenet'}
          >
            <TableCell className={classes.imageCell} align='center' padding='none'>
              <img className={classes.rowImage}
                src="/static/images/networks/battleNet.png"
              />
            </TableCell>
            <TableCell>
              {battleAccount.isLinked ? `${battleAccount.infoRegardingAccount.userNameOnNetwork}` : 'NA'}
            </TableCell>
            <TableCell align="center">
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                onClick={(e) => {
                  if (battleAccount.isLinked) {
                    setShowModal({ show: true, networkSelected: 'battle' })
                  }
                  else {
                    handleAccountLink(e, 'battle');
                  }
                }}
              >
                {battleAccount.isLinked ? 'Unlink' : 'Link'}
              </Button>
            </TableCell>
          </TableRow>
          {/* psn */}
          <TableRow
            spacing={0}
            hover
            key={'psn'}
          >
            <TableCell className={classes.imageCell} align='center' padding='none'>
              <img className={classes.rowImage}
                src="/static/images/networks/playstation.png"
              />
            </TableCell>
            <TableCell>
              {playStationAccount.isLinked ? `${playStationAccount.infoRegardingAccount.userNameOnNetwork}` : 'NA'}
            </TableCell>
            <TableCell align="center">
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                onClick={(e) => {
                  if (playStationAccount.isLinked) {
                    setShowModal({ show: true, networkSelected: 'playstation' })
                  }
                  else {
                    setShowPSNModal({ show: true, msg: '' });
                  }
                }}
              >
                {playStationAccount.isLinked ? 'Unlink' : 'Link'}
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>


      <Accordion className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography className={classes.heading}>Linking PSN or Activision Account for Call of Duty: MW</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography variant="body2" gutterBottom>
            Note: This workaround is only for COD: Modern Warfare.
          </Typography>
          <Typography variant="body2" display="block" gutterBottom>
            Currently, we only support linking your XBox and
            <Link
              color="secondary"
              component="a"
              href="https://us.battle.net/account/creation/flow/create-full "
              variant="body2"
            >
              {' '} Battle.net {' '}
            </Link> 
            accounts on ChainGames Battle. Players using PSN or Activision accounts in COD: MW do not need to worry. Just follow these simple steps to link your account on ChainGames and start battling!
          </Typography>
          <Typography variant="body2" display="block" gutterBottom > 
            Create a freeBattle.net account if you don't already have one.
          </Typography>
          <Typography variant="body2" display="block" gutterBottom >
            Login to the
          <Link
            color="secondary"
            component="a"
            href="https://my.callofduty.com/login"
            variant="body2"
          >
            {' '} My Call of Duty {' '}
          </Link>  
            website with your existing PSN or Activision account (whichever one you use to play the game).
          </Typography>
          <Typography variant="body2" display="block" gutterBottom >
            At the top of the website, you'll see your username. Hover over it and select "Linked Accounts" from the pop-up menu.
          </Typography>
          <Typography variant="body2" display="block" gutterBottom >
            You will now see options to link with other gaming networks. Select "Battle.net" from that list and login to your Battle.net account. This will link your exisitng PSN/Activision account with Battle.net and sync your COD: MW stats accross the two.
          </Typography>
          <Typography variant="body2" display="block" gutterBottom>
            Now you can link your Battle.net account here.
            That's it. Our systems will now be able to see your stats even when you're playing on your PlayStation or using your Activision account. Battle on!
          </Typography>
        </Box>
      </AccordionDetails>
      </Accordion>
    </div>
  );
};

Linking.propTypes = {
  className: PropTypes.string
};
  
export default Linking;