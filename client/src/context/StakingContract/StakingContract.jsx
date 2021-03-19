import {ethers} from "ethers";
import contractData from "../contract-builds/StakingContract";
import tokenData from "../contract-builds/IERC20";
import chainTokenMaticData from "../contract-builds/ChainTokenMatic";
import { MaticRpcURL, ChainTokenMaticAddress, RewardAccount, StakingContractAddress, ChainTokenAddress } from "../../config/constants";

const NETWORK_ROPSTEN = "ropsten";
const NETWORK_KOVAN = "kovan";
const NETWORK_GOERLI = "goerli";
const NETWORK_MAINNET = "mainnet";

export default class StakingContract {
  provider;
  stakingContract;
  tokenContract;

  constructor() {
    this.initializeProvider()
    this.intitalizeContractInstance()
  }

  initializeProvider() {
    let canInitialize = false;
    canInitialize = this.setLocalProvider();
    
    if ( !canInitialize ) {
      this.setDummyProvider();
    }
  }

  intitalizeContractInstance() {
    try {
      this.stakingContract = new ethers.Contract(StakingContractAddress, contractData.abi, this.provider);
    } catch (e) {
      console.warn("could not initialize stakingContract: ", StakingContractAddress);
      throw e;
    }

    try {
      this.tokenContract = new ethers.Contract(ChainTokenAddress, tokenData.abi, this.provider);
    } catch (e) {
      console.warn("could not initialize stakingContract: ", ChainTokenAddress);
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

  chainBalance(address) {
    return this.tokenContract.balanceOf(address)
          .then(bigNumVal => {
            return (ethers.utils.formatEther(bigNumVal));
          });
  }

  getAllowance(address) {
    this.setDefaultSigners();
    return this.tokenContract.allowance(address, StakingContractAddress)
      .then(bigNumVal => {
        return (ethers.utils.formatEther(bigNumVal));
      });
  }

  getStakeDeposit(address) {
    return this.stakingContract.getStakeDetails(address)
      .then(res => res)
      .catch(e => {
        return false;
      });
  }

  chainNetworkBalance(account) {
    let provider = new ethers.providers.JsonRpcProvider(MaticRpcURL);
    let chainTokenMaticContract = new ethers.Contract(ChainTokenMaticAddress, chainTokenMaticData, provider);
    return chainTokenMaticContract.balanceOf(account)
      .then(bigNumVal => {
        return bigNumVal
      });
  }

  alreadyStaked() {
    this.setDefaultSigners();
    return this.provider.getSigner().getAddress()
    .then(address => {
      return this.stakingContract.getStakeDetails(address)
      .then(res => {
        return true;
      })
      .catch(e => {
        console.log("err: ", e);
        return false;
      });
    });
  }

  contractTotalStakeLimit() {
    return this.stakingContract.maxStakingAmount()
      .then(bigNumVal => {
        return  ((bigNumVal.toString()));
      });
  }

  currentTotalStake() {
    return this.stakingContract.currentTotalStake()
      .then(bigNumVal => {
        return  ((bigNumVal.toString()));
      });
  }

  totalRewardsDistributed() {
    return this.stakingContract.totalRewardsDistributed()
      .then(bigNumVal => {
        return parseInt(ethers.utils.formatEther(bigNumVal.toString()), 10);
      });
  }

  async getRewardsAccumulated() {
    const rewardsAddress = await this.stakingContract.rewardsAddress()
    let [rewardsWithdrawn,
         rewardsDistributed,
         rewardsBalance,
         maticChainBalance
        ] = await Promise.all([this.stakingContract.rewardsWithdrawn(), 
                               this.stakingContract.rewardsDistributed(), 
                               this.tokenContract.balanceOf(rewardsAddress),
                               await this.chainNetworkBalance(RewardAccount)
                             ]) 
    const result = rewardsBalance.add(rewardsWithdrawn).sub(rewardsDistributed).add(maticChainBalance)
    return Math.max(parseInt(ethers.utils.formatEther(result.toString()), 10), 0);
  }

  async getLatestBlock() {
    const topicTransfer= ethers.utils.id("RewardsDistributed(uint256)") //This is the interface for your event
    const logs = await this.provider.getLogs({
      fromBlock: 10858675,
      address: StakingContractAddress, // Address of contract
      toBlock: "latest",
      topics: [topicTransfer]
    })
    if(logs && logs.length) {
      const last = this.stakingContract.interface.parseLog(logs[logs.length-1])
      const lastBlock = await this.provider.getBlock(logs[logs.length-1].blockNumber)
      return lastBlock.timestamp;
    }
    return null
  }

  approveContract(value) {
    this.setDefaultSigners();
    return this.tokenContract.approve(StakingContractAddress, ethers.utils.parseEther(value));
  }

  stakeCHAIN(value) {
    this.setDefaultSigners();
    return this.stakingContract.deposit(ethers.utils.parseEther(value))
      .catch(e => console.error("stake err", e));
  }

  setLocalProvider() {
    if ( !window.web3 ) {
      console.warn("metamask not installed");
      return false;
    }
    this.provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
    this.provider.ready.catch(e => console.error("Could not create Web3Provider: ", e));
    return true;
  }

  setDummyProvider() {
    switch (process.env.REACT_APP_ETH_PROVIDER) {
      case NETWORK_ROPSTEN:
        this.provider = new ethers.providers.InfuraProvider("ropsten");
        this.provider.ready.catch(e => console.error("Could not create read-only InfuraProvider: ", e));
        break;
      case NETWORK_MAINNET:
        this.provider = new ethers.providers.InfuraProvider("homestead");
        this.provider.ready.catch(e => console.error("Could not create read-only InfuraProvider: ", e));
        break;
      case NETWORK_KOVAN:
        this.provider = new ethers.providers.InfuraProvider("kovan");
        this.provider.ready.catch(e => console.error("Could not create read-only InfuraProvider: ", e));
        break;
      case NETWORK_GOERLI:
        this.provider = new ethers.providers.InfuraProvider("goerli");
        this.provider.ready.catch(e => console.error("Could not create read-only InfuraProvider: ", e));
        break;
      default:
        this.provider  = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
        this.provider.ready.catch(e => console.error("Could not create read-only JsonRpcProvider for development mode: ", e));
    }
  }

  initiateWithdrawal() {
    this.setDefaultSigners();
    return this.stakingContract.initiateWithdrawal();
  }

  executeWithdrawal() {
    this.setDefaultSigners();
    return this.stakingContract.executeWithdrawal();
  }

  withdrawRewards() {
    this.setDefaultSigners();
    console.log("in withdrawRewards function")
    try{
      return this.stakingContract.withdrawRewards();
    }
    catch(error){
      console.log("error iin withdrawRewards->", error)
    }
  }

  // Owner functions
  toggleRewards(enabled) {
    this.setDefaultSigners();
    return this.stakingContract.toggleRewards(enabled)
  }

  togglePaused(enabled) {
    this.setDefaultSigners();
    if ( enabled ) {
      return this.stakingContract.unpause();
    }
    return this.stakingContract.pause();
  }

  setDefaultSigners() {
    this.stakingContract = this.stakingContract.connect(this.provider.getSigner());
    this.tokenContract = this.tokenContract.connect(this.provider.getSigner());
  }

  setWeb3ReactProvider(library) {
    if(!library) return;
    this.provider = library
  }

  static getEnv(envVar) {
    const provider = process.env.REACT_APP_ETH_PROVIDER;
    
    return process.env[envVar + `_${provider.toUpperCase()}`];
  }
}