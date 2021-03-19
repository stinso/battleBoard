let etherscan="",
projectID = process.env.REACT_APP_INFURA_PROJECT_ID,
maticRPC='',
chainTokenMaticAddress = '',
chainId = '',
stakingContractAddress = '',
chainTokenAddress = '',
networkURL = '',
rewardAddress = '';

const ENV = process.env.REACT_APP_ETH_PROVIDER;
  switch (ENV) {
    case "ropsten":
      etherscan ="https://ropsten.etherscan.io/tx/";
      chainId = 3;
      break;
    case "mainnet":
      etherscan ="https://etherscan.io/tx/";
      maticRPC = "https://rpc-mainnet.matic.network";
      rewardAddress = '0x6B78Ff6668D639DEb89363d8E24f2abe2D7Ab1bA';
      chainTokenMaticAddress = '0xd55fCe7CDaB84d84f2EF3F99816D765a2a94a509';
      stakingContractAddress = '0x9b7fcaebe9a69eceeab72142ed35a238775d179a'
      chainTokenAddress = '0xC4C2614E694cF534D407Ee49F8E44D125E4681c4'
      networkURL = `https://mainnet.infura.io/v3/${projectID}`;
      chainId = 1;
      break;
    case "kovan":
      etherscan ="https://kovan.etherscan.io/tx/";
      maticRPC ="https://rpc-mumbai.matic.today";
      chainTokenMaticAddress = '0x783288fb03079238dd917794ec16F812eB25B390';
      rewardAddress ="0xc9fd2bb8fdb697ea269948181458a7afa4a08378";
      chainId = 42;
      break;
    case "goerli":
      etherscan ="https://goerli.etherscan.io/tx/";
      rewardAddress ="0xc9fd2bb8fdb697ea269948181458a7afa4a08378";
      maticRPC ="https://rpc-mumbai.matic.today";
      chainTokenMaticAddress = '0x783288fb03079238dd917794ec16F812eB25B390';
      stakingContractAddress = '0xA9F21E25C1fB0C55249942252e328Ee5eE2966AD';
      chainTokenAddress = '0x76EBA9F21d659Fc15D5f33a1a0C7f9088D0FBd28';
      networkURL = `https://goerli.infura.io/v3/${projectID}`;
      chainId = 5;
      break;
    default: etherscan ="https://etherscan.io/tx/";
}

export const EtherScanLink = etherscan
export const MaticRpcURL = maticRPC;
export const ChainTokenMaticAddress = chainTokenMaticAddress;
export const RewardAccount = rewardAddress;
export const ChainID = chainId;
export const StakingContractAddress = stakingContractAddress;
export const ChainTokenAddress = chainTokenAddress;
export const NetworkURL = networkURL;