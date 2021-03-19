import React, { useState, useEffect, useCallback } from 'react'
import { useStakingContract } from '../../context/StakingContract';
import { injected, walletconnect, walletlink } from '../connectors/connectors'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { isMobile } from 'react-device-detect'
import StakingContract from '../../context/StakingContract/StakingContract';
import { shortenAddress } from '../../utils/helpers';
import useConnectedWallet from '../../hooks/useConnectedWallet';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import wait from 'src/utils/wait';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useSelector } from 'src/store';


const useStyles = makeStyles((theme) => ({
  root: {},
  img: {
    cursor: 'pointer',
    width: 28,
    height: 28,
  },
  dialogTitle: {
    backgroundColor: theme.palette.background.dark,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    textTransform: 'none',
    paddingBottom: 10,
    paddingTop: 10,
    '&:hover': {
      borderColor: theme.palette.primary.main
    }
  }
}));


export const SUPPORTED_WALLETS = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/gBDa9b1Gt9',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  }
}


export default function WalletSelector () {
  const acc = useSelector((state) => state.account);
  const { stakingContract } = useStakingContract();
  const { account, connector, activate, library, active } = useWeb3React()
  const [ connectedWallet, setConnectedWallet ] = useConnectedWallet()
  const [ open, setOpen ] = useState(false);
  const [ selectedValue, setSelectedValue ] = useState(null);
  const [ hasTriedToConnect, setHasTriedToConnect ] = useState(false);


  const handleClickOpen = () => {
    SUPPORTED_WALLETS.WALLET_CONNECT.connector.walletConnectProvider = undefined
    if (isMobile && StakingContract.hasMetamask() && stakingContract.metamaskEnabled()) {
      if (connectedWallet !== SUPPORTED_WALLETS.WALLET_CONNECT) {
        tryActivation(injected, true)
      }
    } else if (!acc.loggedIn) {
      setOpen(true);
    }
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(()=> {
    if(library) {
      stakingContract.setWeb3ReactProvider(library)
    }
  }, [library, stakingContract])
  

  const tryActivation = useCallback(async (connector, skipSetConnectedWallet = false) => {
    if (!skipSetConnectedWallet) {
      Object.keys(SUPPORTED_WALLETS).map(key => {
        if (connector === SUPPORTED_WALLETS[key].connector) {
          setConnectedWallet(key)
          return false
        }
        return true
      })
    }

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    await wait(1000);  // ugly! Change it

    

    activate(connector, undefined, true).then((res)=> {        
      setOpen(false);
    }).catch(error => {
      console.log(`error: ${error}`)
      if (error instanceof UnsupportedChainIdError) {
        activate(connector).then((res)=> {
          console.log('UnsupportedChainIdError')
          setOpen(false);
        }) // a little janky...can't use setError because the connector isn't set
      }
    })
    
  }, [activate, setConnectedWallet])


  useEffect(()=> {
    if (connectedWallet != 'WALLET_CONNECT') {
      if (isMobile && StakingContract.hasMetamask() && stakingContract.metamaskEnabled()) {
        tryActivation(injected, true)
      } else {
        if (!active && !hasTriedToConnect) {
          setHasTriedToConnect(true)
          if(connectedWallet) {
            tryActivation(SUPPORTED_WALLETS[connectedWallet].connector, true)
          }
          else if(StakingContract.hasMetamask() && stakingContract.metamaskEnabled()) {
            tryActivation(SUPPORTED_WALLETS.METAMASK.connector, true)
          }
        }
      }
    } else {
      if (!active) {
        // disconnect walletConnect
        SUPPORTED_WALLETS.WALLET_CONNECT.connector.walletConnectProvider = undefined
        setHasTriedToConnect(true)
      }
    }
  }, [])


  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key]
      // check for mobile options
      if (isMobile) {
        if (!window.ethereum && option.mobile) {
          return (
            key
          )
        }
        return null
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!window.ethereum) {
          return null
        }

        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // return rest of options
      if (!isMobile && !option.mobileOnly) {
        return (
          key
        )
      } else {
        return null
      }
    })
  }

  function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      if (SUPPORTED_WALLETS[value].connector !== connector && !SUPPORTED_WALLETS[value].href) {
        if (value == 'WALLET_CONNECT') {
          SUPPORTED_WALLETS[value].connector.walletConnectProvider = undefined
        }
        tryActivation(SUPPORTED_WALLETS[value].connector)
      }
      onClose(value)
    };
  
    return (
      <Dialog className={classes.dialog} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth maxWidth={"xs"}>
        <DialogTitle 
          className={classes.dialogTitle} 
          id="simple-dialog-title"
        >
          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              color="textPrimary"
            >
              Connect to a wallet
            </Typography>
          
            <Box flexGrow={1} />
            <Box>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {getOptions().map((connector) => (
            (connector &&
              <Box mb={1} key={connector}>
                <Button className={classes.button} onClick={() => handleListItemClick(connector)} key={connector} 
                  fullWidth display="flex" variant="outlined" href={SUPPORTED_WALLETS[connector].href}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >
                    {SUPPORTED_WALLETS[connector].name}
                  </Typography>
                  <Box flexGrow={1} />
                  <img className={classes.img} src={'/static/images/walletIcons/' + SUPPORTED_WALLETS[connector].iconName} />
                </Button>
              </Box>
            )
          ))}
        </DialogContent>
      </Dialog>
    );
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  };

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        size="small"
        onClick={handleClickOpen}
      >
        {
          account ?
            shortenAddress(account)
          :
            'Connect to a Wallet'
        }
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </>
  )
}


