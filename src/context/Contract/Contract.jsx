import { ethers } from 'ethers';
import tokenData from '../contract-builds/IERC20';
import rootChainManagerData from '../contract-builds/RootChainManager';
import chainTokenMaticData from '../contract-builds/ChainTokenMatic';
import {
  network,
  chainTokenContractAddress,
  ERC20PredicateProxyAddress,
  RootChainManageProxyAddress,
  ChainTokenMaticAddress,
  MaticRpcURL,
  BetManagerMaticAddress,
  RootChainProxyAddress
} from '../../config/constants';
import rootChainProxyData from '../contract-builds/RootChainProxy';

const NETWORK_ROPSTEN = 'ropsten';
const NETWORK_KOVAN = 'kovan';
const NETWORK_DEVELOPMENT = 'development';
const NETWORK_GOERLI = 'goerli';
const NETWORK_LIVE = 'mainnet';

export default class Contract {
  provider;
  stakingContract;
  tokenContract;

  constructor() {
    this.setDummyProvider();
    this.initializeContractInstance();
  }

  initializeContractInstance() {
    try {
      this.tokenContract = new ethers.Contract(
        chainTokenContractAddress,
        tokenData.abi,
        this.provider
      );
    } catch (e) {
      console.warn('could not initialize chain token contract: ');
      throw e;
    }
  }

  static hasMetamask() {
    return typeof window.web3 !== 'undefined';
  }

  async metamaskEnabled() {
    try {
      await this.provider.getSigner().getAddress();
      return true;
    } catch (e) {
      return false;
    }
  }

  static enableMetamask() {
    return window.ethereum.enable();
  }

  ethBalance() {
    this.setDefaultSigners();
    return this.provider.getSigner().getBalance();
  }

  chainBalance(account) {
    return this.tokenContract.balanceOf(account).then((bigNumVal) => {
      return parseInt(ethers.utils.formatEther(bigNumVal), 10);
    });
  }

  chainNetworkBalance(account) {
    let provider = new ethers.providers.JsonRpcProvider(MaticRpcURL);
    let chainTokenMaticContract = new ethers.Contract(
      ChainTokenMaticAddress,
      chainTokenMaticData,
      provider
    );
    return chainTokenMaticContract.balanceOf(account).then((bigNumVal) => {
      return parseInt(ethers.utils.formatEther(bigNumVal), 10);
    });
  }

  approveBetBalance(account) {
    let provider = new ethers.providers.JsonRpcProvider(MaticRpcURL);
    let chainTokenMaticContract = new ethers.Contract(
      ChainTokenMaticAddress,
      chainTokenMaticData,
      provider
    );
    return chainTokenMaticContract
      .allowance(account, BetManagerMaticAddress)
      .then((bigNumVal) => {
        return parseInt(ethers.utils.formatEther(bigNumVal), 10);
      });
  }

  getRootChainLatestChildBlock() {
    let provider = new ethers.providers.InfuraProvider(network.name);
    let chainTokenMaticContract = new ethers.Contract(
      RootChainProxyAddress,
      rootChainProxyData,
      provider
    );
    return chainTokenMaticContract.getLastChildBlock().then((bigNumVal) => {
      return parseInt(bigNumVal, 10);
    });
  }

  getAllowance() {
    this.setDefaultSigners();
    return this.provider
      .getSigner()
      .getAddress()
      .then((address) => {
        return this.tokenContract
          .allowance(
            address,
            Contract.getEnv('REACT_APP_ETH_DEPLOYED_CONTRACT')
          )
          .then((bigNumVal) => {
            return parseInt(ethers.utils.formatEther(bigNumVal), 10);
          });
      });
  }

  approveContract(value) {
    this.setDefaultSigners();
    return this.tokenContract.approve(
      Contract.getEnv('REACT_APP_ETH_DEPLOYED_CONTRACT'),
      ethers.utils.parseEther(value)
    );
  }

  approveForDeposit(value, library) {
    this.provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider
    );
    this.tokenContract = new ethers.Contract(
      chainTokenContractAddress,
      tokenData.abi,
      this.provider
    );
    this.setDefaultSigners();
    return this.tokenContract.approve(
      ERC20PredicateProxyAddress,
      ethers.utils.parseEther(value.toString())
    );
  }

  depositChains(account, library, value) {
    this.provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider
    );
    let rootChainManagerContract = new ethers.Contract(
      RootChainManageProxyAddress,
      rootChainManagerData,
      this.provider
    );
    const BNValue = ethers.utils.parseEther(value.toString());
    let bnString = BNValue.toHexString().slice(2);
    let formattedValue = '0x' + bnString.padStart(64, '0');
    rootChainManagerContract = rootChainManagerContract.connect(
      this.provider.getSigner()
    );
    return rootChainManagerContract.depositFor(
      account,
      chainTokenContractAddress,
      formattedValue
    );
  }

  setLocalProvider() {
    if (!window.web3) {
      console.warn('metamask not installed');
      return false;
    }
    this.provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider
    );
    this.provider.ready.catch((e) =>
      console.error('Could not create Web3Provider: ', e)
    );
    return true;
  }

  setDummyProvider() {
    switch (process.env.REACT_APP_ETH_PROVIDER) {
      case NETWORK_ROPSTEN:
        this.provider = new ethers.providers.InfuraProvider('ropsten');
        this.provider.ready.catch((e) =>
          console.error('Could not create read-only InfuraProvider: ', e)
        );
        break;
      case NETWORK_LIVE:
        this.provider = new ethers.providers.InfuraProvider('homestead');
        this.provider.ready.catch((e) =>
          console.error('Could not create read-only InfuraProvider: ', e)
        );
        break;
      case NETWORK_KOVAN:
        this.provider = new ethers.providers.InfuraProvider('kovan');
        this.provider.ready.catch((e) =>
          console.error('Could not create read-only InfuraProvider: ', e)
        );
        break;
      case NETWORK_GOERLI:
        this.provider = new ethers.providers.InfuraProvider('goerli');
        this.provider.ready.catch((e) =>
          console.error('Could not create read-only InfuraProvider: ', e)
        );
        break;
      default:
        this.provider = new ethers.providers.JsonRpcProvider(
          'http://127.0.0.1:7545'
        );
        this.provider.ready.catch((e) =>
          console.error(
            'Could not create read-only JsonRpcProvider for development mode: ',
            e
          )
        );
    }
  }

  setDefaultSigners() {
    this.tokenContract = this.tokenContract.connect(this.provider.getSigner());
  }

  setWeb3ReactProvider(library) {
    if (!library) return;
    this.provider = library;
  }
}
