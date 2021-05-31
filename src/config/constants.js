let networkName = '',
  projectID = process.env.REACT_APP_INFURA_ID,
  chainId = '',
  networkURL = '',
  chainTokenContract = '',
  etherscan = '',
  RootChainManagePredicateProxy = '',
  rootChainProxy = '',
  maticNetwork = '',
  maticVersion = '',
  maticExplorer = '',
  maticRPC = '',
  chainTokenMaticAddress = '',
  betManagerContractMaticAddress = '',
  ERC20PredicateProxy = '',
  devices = {
    XBOX_ONE: { id: 2, name: 'XBOX ONE' },
    XBOX_SERIES: { id: 1, name: 'XBOX SERIES X|S' },
    PS4: { id: 3, name: 'PLAYSTATION 4' },
    PS5: { id: 4, name: 'PLAYSTATION 5' }
  },
  gameNetworksWithNameAndID = [
    {
      name: 'Xbox Live',
      index: 0,
      devicesSupported: [devices.XBOX_ONE, devices.XBOX_SERIES]
    },
    { name: 'BattleNet', index: 1 },
    {
      name: 'PlayStation (PSN)',
      index: 2,
      devicesSupported: [devices.PS4, devices.PS5]
    },
    { name: 'Activision', index: 3 }
  ],
  allSupportedGames = [
    {
      name: 'Call of Duty: Modern Warfare',
      id: 1,
      shortName: 'COD: MW',
      supportedNetworks: [
        gameNetworksWithNameAndID[0],
        gameNetworksWithNameAndID[1]
      ]
    },
    {
      name: 'Madden NFL 21',
      id: 2,
      shortName: 'Madden NFL 21',
      supportedNetworks: [
        gameNetworksWithNameAndID[0],
        gameNetworksWithNameAndID[2]
      ]
    },
    {
      name: 'Fifa',
      id: 3,
      shortName: 'Fifa',
      supportedNetworks: [
        gameNetworksWithNameAndID[0],
        gameNetworksWithNameAndID[2]
      ]
    },
    {
      name: 'NBA 2K21',
      id: 4,
      shortName: 'NBA',
      supportedNetworks: [
        gameNetworksWithNameAndID[0],
        gameNetworksWithNameAndID[2]
      ]
    }
  ],
  captchaSiteKey = '6LdEPt8ZAAAAAJjKZNsmiHFPewM53OowRotwL-HL',
  baseApiURLBS = `http://127.0.0.1:8080/v1/`,
  baseApiURLCS = `http://127.0.0.1:8000/v1/`,
  redirectURL = 'https://wallet.testnet.chaingames.io/',
  basePathToImg = 'http://139.59.35.142:8080',
  facebookAppID = '513004062991942',
  chainoPageLink = 'https://chaino.testnet.chaingames.io/',
  cookieName = 'TCS_ISACTIVE',
  firebaseConfig = {
    apiKey: 'AIzaSyAa7NqUp_vMtl_8MkpDGEwcrxCMAVgrKcE',
    authDomain: 'chat-6c999.firebaseapp.com',
    databaseURL: 'https://chat-6c999-default-rtdb.firebaseio.com/',
    projectId: 'chat-6c999',
    storageBucket: 'chat-6c999.appspot.com',
    messagingSenderId: '74450210365',
    appId: '1:74450210365:web:a1a23a859e12d665f6a454'
  },
  publicVapidKey =
    'BBwedotvAwaP3nu5P4IYoWXs3r_ModlYBdEVZ4CUPoI5jvbW1-5I67N1dPC9PglFxD4JzyTQviwmbvNH9JKJJQU';

//const ENV = process.env.REACT_APP_ETH_PROVIDER;
const ENV = 'goerli';
switch (ENV) {
  case 'kovan':
    networkName = 'kovan';
    chainId = 42;
    networkURL = `https://kovan.infura.io/v3/${projectID}`;
    chainTokenContract = '0xcc986742BA5c88bD5c5551378dB1096b431286b9';
    etherscan = 'https://kovan.etherscan.io/tx/';
    break;
  case 'mainnet':
    networkName = 'mainnet';
    chainId = 1;
    networkURL = `https://mainnet.infura.io/v3/${projectID}`;
    chainTokenContract = '0xC4C2614E694cF534D407Ee49F8E44D125E4681c4';
    etherscan = 'https://etherscan.io/tx/';
    ERC20PredicateProxy = '0x40ec5B33f54e0E8A33A975908C5BA1c14e5BbbDf';
    RootChainManagePredicateProxy =
      '0xA0c68C638235ee32657e8f720a23ceC1bFc77C77';
    chainTokenMaticAddress = '0xd55fCe7CDaB84d84f2EF3F99816D765a2a94a509';
    betManagerContractMaticAddress =
      '0x16625b9FF0f12952b3a9B048aAba4aC4229B2F9a';
    maticExplorer = 'https://explorer.matic.network/tx/';
    maticRPC = 'https://rpc-mainnet.matic.network';
    maticVersion = 'v1';
    maticNetwork = 'mainnet';
    rootChainProxy = '0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287';
    facebookAppID = '2444224715883757';
    redirectURL = 'https://wallet.chaingames.io/';
    chainoPageLink = 'https://chaino.chaingames.io/';
    cookieName = 'CS_ISACTIVE';
    baseApiURLBS = `https://battle.chaingames.io:8080/v1/`;
    baseApiURLCS = `https://wallet.chaingames.io:8000/v1/`;
    publicVapidKey = '';
    captchaSiteKey = '6Lcuge8ZAAAAAOvMI6arX-0GgRPcwsyUBabgK6v8';
    firebaseConfig = {
      databaseURL: 'https://battle-dash-98c0aeurope-west.firebasedatabase.app',
      authDomain: 'battle-dash-98c0a.firebaseapp.com',
      projectId: 'battle-dash-98c0a',
      storageBucket: 'battle-dash-98c0a.appspot.com',
      messagingSenderId: '1050832496508',
      appId: '1:1050832496508:web:fd45eedcbf776d912526f9',
      measurementId: 'G-V3J8BHRTF1'
    };
    break;
  case 'goerli':
    networkName = 'goerli';
    chainId = 5;
    networkURL = `https://goerli.infura.io/v3/${projectID}`;
    chainTokenContract = '0x76EBA9F21d659Fc15D5f33a1a0C7f9088D0FBd28';
    etherscan = 'https://goerli.etherscan.io/tx/';
    ERC20PredicateProxy = '0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34';
    RootChainManagePredicateProxy =
      '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74';
    chainTokenMaticAddress = '0x783288fb03079238dd917794ec16F812eB25B390';
    betManagerContractMaticAddress =
      '0x39d3f03Fa9Cdc11DE1fc21b267dBd703b87C596E';
    maticExplorer = 'https://mumbai-explorer.matic.today/tx/';
    maticRPC = 'https://rpc-mumbai.matic.today';
    maticVersion = 'mumbai';
    maticNetwork = 'testnet';
    rootChainProxy = '0x2890bA17EfE978480615e330ecB65333b880928e';
    captchaSiteKey = '6LdEPt8ZAAAAAJjKZNsmiHFPewM53OowRotwL-HL';
    baseApiURLBS = `http://127.0.0.1:8080/v1/`;
    baseApiURLCS = `http://127.0.0.1:8000/v1/`;
    /* baseApiURLBS = `http://139.59.35.142:8080/v1/`;
    baseApiURLCS = `http://139.59.35.142:8000/v1/`; */
    /* baseApiURLBS = `https://battle.testnet.chaingames.io:8080/v1/`;
    baseApiURLCS = `https://wallet.testnet.chaingames.io:8000/v1/`; */
    publicVapidKey =
      'BCU5sE8oaZtY0ybJ5Wmt1eHP6S-4Y_wryla0ykKyjx2FHgNAqG9iOXJVKDnMvCyEb8HNX559K_U34VCmD6uDvMw';
    break;
  default:
    etherscan = 'https://etherscan.io/tx/';
}

export const network = {
  name: networkName,
  chainID: chainId,
  url: networkURL
};

export const chainTokenContractAddress = chainTokenContract;
export const EtherScanLink = etherscan;
export const ERC20PredicateProxyAddress = ERC20PredicateProxy;
export const RootChainManageProxyAddress = RootChainManagePredicateProxy;
export const RootChainProxyAddress = rootChainProxy;
export const ChainTokenMaticAddress = chainTokenMaticAddress;
export const BetManagerMaticAddress = betManagerContractMaticAddress;
export const MaticRpcURL = maticRPC;
export const MaticExplorerLink = maticExplorer;
export const MaticNetwork = {
  name: maticNetwork,
  version: maticVersion
};
export const SignUpRedirectURL = redirectURL + 'register';
export const BaseApiURLCS = baseApiURLCS;
export const BaseApiURLBS = baseApiURLBS;
export const BasePathToImg = basePathToImg;
export const RedirectURL = redirectURL;
export const RegisterEthAddressRedirectURL = redirectURL + 'home';
export const ForgotPasswordRedirectURL = redirectURL + 'resetPassword';
export const DepositRedirectLink = redirectURL + 'deposit';
export const ApproveRedirectLink = redirectURL + 'approve';
export const WithdrawInitiateRedirectLink = redirectURL + 'withdraw-initiate';
export const CODStatsRedirectLink =
  'https://cod.tracker.gg/modern-warfare/profile/xbl/riftdawg/mp';
export const RecaptchaSiteKey = captchaSiteKey;
export const AllSupportedGamesNames = allSupportedGames.map((row) => row.name);
export const AllSupportedGamesWithOtherAttributes = allSupportedGames;
export const PollingDelayInMinutes = 5;
export const ChaingamesFeesCutPercentage = 5;
export const SupportedGameNetworks = gameNetworksWithNameAndID;
export const SupportedGamesWithID = allSupportedGames;
export const CoinGeckoAPIURL =
  'https://api.coingecko.com/api/v3/simple/price?ids=chain-games&vs_currencies=usd';
export const Styles = [
  { name: 'Single Game', index: 0 },
  { name: '1v1', index: 1 },
  { name: 'Solos', index: 2 },
  { name: 'Duos', index: 3 },
  { name: 'Trios', index: 4 },
  { name: 'Quads', index: 5 }
];

export const GameFormat = {
  [allSupportedGames[0].name]: [
    { name: 'Warzone - Max Kills', index: 0 },
    { name: 'Warzone - Max Score', index: 1 },
    { name: 'Warzone - Most Headshots', index: 2 }
    // { name: "Warzone - Max K/D", index: 3 },
  ],
  [allSupportedGames[1].name]: [{ name: 'Max Score', index: 0 }],
  [allSupportedGames[2].name]: [{ name: 'Max Score', index: 0 }],
  [allSupportedGames[3].name]: [{ name: 'Max Score', index: 0 }]
};
export const passwordRegex =
  /^(?=.*\d)(?=.*[!@#$%^&*()_+=,.\\\/;':"-])(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
export const BetAmount = [1, 2.5, 5, 10, 15, 20, 25];
export const MaxWinners = [1, 2, 3, 5, 10];
export const MAX_APPROVED_BALANCE = 1.157920892373162e59;
export const SuperCryptoKartLink = 'https://chaingames.io/#sck';
export const FacebookAppID = facebookAppID;
export const ChainGamesFBID = '106807154470210';
export const ChainOPageLink = chainoPageLink;
export const CookieName = cookieName;
export const NotificationsTypes = [
  { typeID: 1, notificationName: 'Event Starting' },
  { typeID: 2, notificationName: 'Event Bets Placed' },
  { typeID: 3, notificationName: 'Event Ended' },
  { typeID: 4, notificationName: 'Event Result Declared' },
  { typeID: 5, notificationName: 'Challenge Invite Received' },
  { typeID: 6, notificationName: 'Challenge Invite Accepted' }
];
export const SupportedCurrency = [
  {
    currency: 'CHAIN',
    id: 0
  },
  {
    currency: 'USD',
    id: 1
  }
];
export const StatusReceivedFromAPI = {
  RESULT_NOT_SUBMITTED: 1,
  RESULT_SUBMITTED: 2,
  DISPUTE_OCCURED: 3,
  PROOF_SUBMITTED: 4
};
export const Devices = devices;
export const HoursAfterWhichCanSubmitEvidence = 12;
export const MinutesAfterWhichCanSubmitResult = 15;
export const FirebaseConfig = firebaseConfig;
export const PublicVapidKey = publicVapidKey;
export const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/zip'
];
