import moment from 'moment';
import momentTz from 'moment-timezone';
import { ethers } from 'ethers';
import Contract from '../context/Contract/Contract.jsx';
import {
  ChaingamesFeesCutPercentage,
  BasePathToImg,
  GameFormat,
  Devices,
  Styles
} from '../config/constants';
import { convertChaintoUSDService } from '../service/battleServerService';
import { getBalanceFromCS } from '../service/centralServerService';
const DATE_FORMAT = 'Do MMM YYYY';
const TIME_FORMAT = 'HH:mm';

export function getDateFromEpoch(epoch) {
  const date = moment.utc(moment.unix(epoch)).local().format(DATE_FORMAT);
  return date;
}

export function getTimeFromEpoch(epoch) {
  const zoneName = momentTz.tz.guess();
  const timezone = momentTz.tz(zoneName).zoneAbbr();
  const time =
    moment.utc(moment.unix(epoch)).local().format(TIME_FORMAT) + ' ' + timezone;
  return time;
}

export const getTimeAndDateFromEpoch = (epoch) => {
  const date = getDateFromEpoch(epoch);
  const time = getTimeFromEpoch(epoch);
  return date + ' ' + time;
};

export const getDuration = (sTime, eTime) => {
  const durationUnix = moment.unix(eTime).diff(moment.unix(sTime));
  const duration = moment.duration(durationUnix).as('minutes');
  return parseInt(duration, 10);
};

export async function getBalance(account) {
  const contract = new Contract();
  if (account) {
    try {
      const [approvedBalance, networkBalance] = await Promise.all([
        contract.approveBetBalance(account),
        contract.chainNetworkBalance(account)
      ]);
      return { approvedBalance, networkBalance };
    } catch (error) {
      console.log('getBalance -> error', error);
      return { approvedBalance: 0, networkBalance: 0 };
    }
  } else {
    return { approvedBalance: 0, networkBalance: 0 };
  }
}

export function calculateTotalPrizePool(betAmount, playersEnrolled = 0) {
  const prize =
    betAmount * playersEnrolled * (1 - ChaingamesFeesCutPercentage / 100);
  return prize.toFixed(2);
}

export function calIndividualPrize(percentage, totalPrize) {
  const prizeAmount = ((percentage / 100) * totalPrize).toFixed(2);
  return prizeAmount;
}

export const generateImageURL = (relativePathToImage) => {
  return BasePathToImg + relativePathToImage;
};

export const getUSDValueOfAChain = async () => {
  try {
    const { data } = await convertChaintoUSDService();
    const usdValueOfAChain = data['chain-games'].usd;
    return usdValueOfAChain;
  } catch (error) {
    console.log('getUSDValueOfAChain->error', error);
  }
};

// TODO for adding new page/path: always add new path here if they are authenticated path
export const checkIsPrivatePath = (path) => {
  if (
    [
      '/dashboard',
      '/upcomingEvents',
      '/profile',
      '/admin',
      '/gameInformationPage',
      '/actionGamePage',
      '/404',
      '/500',
      '/reportIssue',
      '/userAccountSetting',
      '/liveStats',
      '/myChallenges',
      '/dispute',
      '/claim-network'
    ].includes(path)
  ) {
    return true;
  }
  return false;
};

// TODO for adding new page/path: always add new path here if they are public path
export const checkIsPublicPath = (path) => {
  if (
    [
      '/login',
      '/register',
      '/ForgotPassword',
      '/VerifyEmail',
      '/resetPassword',
      '/'
    ].includes(path)
  ) {
    return true;
  }
  return false;
};

export function shortenAddress(address, firstChars = 3, lastChars = 7) {
  return `${address.substring(0, firstChars)}...${address.substring(
    address.length - lastChars
  )}`;
}

export function formatEventStatus(status) {
  switch (status) {
    case 'Waiting':
      return status;
    case 'Started':
      return status;
    case 'Ended':
      return status;
    case 'Cancelled':
      return status;
    case 'Deleted':
      return status;
    case 'PlacingBets':
      return 'Placing Bets';
    case 'WinnersDeclared':
      return 'Winners Declared';
    case 'PlaceBetsFailed':
      return 'Place Bets Failed';
    case 'DeclareWinnersFailed':
      return 'Declare Winners Failed';
    case 'DisputeOccured':
      return 'Dispute Occured';
  }
}

export function getGameFormatFromIndex(game, gameFormatIndex) {
  if (gameFormatIndex == 3) {
    return 'Warzone - Max K/D';
  }
  const gameFormat = GameFormat[game].find((row) => {
    if (row.index === gameFormatIndex) {
      return row;
    }
  });
  return gameFormat.name;
}

export function getFormattedUserName(username, maxCharacters) {
  if (username.length <= maxCharacters) {
    return username;
  }
  return `${username.substring(0, maxCharacters - 2)}..`;
}

export async function checkBalance(betAmount, account) {
  if (account) {
    const [{ approvedBalance, networkBalance }, usdValueOfOneChain] =
      await Promise.all([getBalance(account), getUSDValueOfAChain()]);
    const approvedBalanceCheck =
      betAmount * 1.05 <= usdValueOfOneChain * approvedBalance;
    const networkBalanceCheck =
      betAmount * 1.05 <= usdValueOfOneChain * networkBalance;
    return approvedBalanceCheck && networkBalanceCheck;
  } else {
    return false;
  }
}

export async function isBalanceEnough(betAmount, isFiat) {
  const { data } = await getBalanceFromCS({});
  if (isFiat) {
    return betAmount <= data.fiat;
  } else {
    const approvedBalanceCheck = betAmount * 1.05 <= data.token.allowanceInUSD;
    const networkBalanceCheck = betAmount * 1.05 <= data.token.totalInUSD;
    return approvedBalanceCheck && networkBalanceCheck;
  }
}

export function formatInCHAIN(amountInSmallestUnit) {
  return parseInt(
    ethers.utils.formatEther(ethers.BigNumber.from(amountInSmallestUnit)),
    10
  );
}

// TODO for adding new game which requires manual result: add game name here
export const checkGameRequiresManualResult = (game) => {
  if (['Madden NFL 21', 'Fifa', 'NBA 2K21'].includes(game)) {
    return true;
  } else {
    return false;
  }
};

export const isMinutesRemaining = (time, compareMinutes) => {
  if (time > moment().add(compareMinutes, 'minutes').unix()) {
    return true;
  }
  return false;
};

export const checkWithCurrentTime = (time, minutesToAdd) => {
  if (moment.unix(time).add(minutesToAdd, 'minutes').unix() > moment().unix()) {
    return true;
  }
  return false;
};

export const getDevicesArray = () => {
  const devices = [];
  for (let key of Object.keys(Devices)) {
    devices.push(Devices[key]);
  }
  return devices;
};

export const getDeviceName = (deviceID) => {
  let deviceName = 'Not Specified';

  for (let device in Devices) {
    if (Devices[device].id === deviceID) {
      deviceName = Devices[device].name;
      break;
    }
  }

  return deviceName;
};

export const getStyleName = (styleIndex) => {
  const style = Styles.find((row) => {
    if (row.index === styleIndex) {
      return row;
    }
  });
  return style.name;
};

export const isEventBracket = (styleIndex) => {
  // Hard Coded: 6 is the style index of bracket
  if (styleIndex === 6) {
    return true;
  }
  return false;
};
