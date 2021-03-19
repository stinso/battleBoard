const axios = require('axios');
var cron = require('node-cron');
const cryptoRandomString = require('crypto-random-string');
const logger = require('./log/logger')
const rewards = require('./calcRewards')


/* CONSTANTS */
const KEY = 'W2PNPD5HA9TYABR3RYUFCCSUV3UR6BBC5R'
const ADDRESS = '0xc4c2614e694cf534d407ee49f8e44d125e4681c4'
const STAKING_ADDRESS = '0x9b7fcaebe9a69eceeab72142ed35a238775d179a'

var stakersList = []
var top25Stakers = []
var rewardsList = []


const date_diff_indays = (dt1, dt2) => {
  return Math.floor((Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) - Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) ) /(1000 * 60 * 60 * 24));
}


const calcScore = async () => {
  logger.info('Calculate score')
  var dassAddressesDict = new Object();
  
  const today = new Date(Date.now())
  try {
    let listDict = new Object();
    let rewardsTransactionList = new Object();
    // get newest transaction
    let url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${ADDRESS}&address=${STAKING_ADDRESS}&page=1&offset=1&sort=desc&apikey=${KEY}`
    let startBlockNr = 10858311
    let response = await axios.get(url);
    let transactions = response['data']['result']
    let newestBlockNr = transactions[0]['blockNumber']

    while (startBlockNr < newestBlockNr) {
      url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${ADDRESS}&address=${STAKING_ADDRESS}&startblock=${startBlockNr}&endblock=999999999&sort=asc&apikey=${KEY}`
      response = await axios.get(url);
      transactions = response['data']['result']

      // delete duplicates
      if (Object.keys(listDict).length !== 0 && listDict.constructor === Object) {
        for (const [key, value] of Object.entries(listDict)) { 
          if (value['blockNumber'] == startBlockNr) {
            delete listDict[key]
          }
        }
      }

      let lastTransaction = {
        hash: ''
      }

      transactions.forEach(function(transaction){       
        let { blockNumber, timeStamp, hash, from, to, value } = transaction

        if (transaction['hash'] == lastTransaction['hash']) {
          if (transaction['to'] == STAKING_ADDRESS) {
            // staked rewards
            from = lastTransaction['from']
            rewardsTransactionList[hash] = { address: from, value };
            hash = cryptoRandomString({length: 16, type: 'base64'});
            
          }
        }
        const data = { blockNumber, timeStamp, hash, from, to, value };
        listDict[hash] = data
        

        startBlockNr = blockNumber
        lastTransaction = transaction
      });
    }

    const oldRewardsList = rewardsList
    rewardsList = []
    try {
      Object.values(rewardsTransactionList).forEach((transaction) => {
        if (!(transaction.address in rewardsList)) {
          rewardsList[transaction.address] = parseInt(transaction.value)
        } else {
          rewardsList[transaction.address] += parseInt(transaction.value) 
        }
      });
  
      
      const newRewardsList = await rewards.calcRewards();
      for (const [key, value] of Object.entries(newRewardsList)) {
        if (!(key in rewardsList)) {
          rewardsList[key] = value
        } else {
          rewardsList[key] += value 
        }
      }
    } catch (err) {
      logger.error(`Cannot calculate rewards. Error: ${err}`)
      rewardsList = oldRewardsList
    }

    


    Object.values(listDict).forEach((transaction) => {
      if (transaction.from !== transaction.to) {
        // stake
        if (!(transaction.to in dassAddressesDict)) {
          dassAddressesDict[transaction.to] = []  
        }

        const newUnstakeTransaction = {
          value: transaction.value,
          timeStamp: transaction.timeStamp,
          buy: false
        }
        dassAddressesDict[transaction.to].push(newUnstakeTransaction)

        // unstake
        if (!(transaction.from in dassAddressesDict)) {
          dassAddressesDict[transaction.from] = []  
        }

        const newStakeTransaction = {
          value: transaction.value,
          timeStamp: transaction.timeStamp,
          buy: true
        }
        dassAddressesDict[transaction.from].push(newStakeTransaction)
      }
    });


    // ######################### SCORE CALCULATION ######################### //
    let dass = {}
    stakersList = []
    for (const [key, value] of Object.entries(dassAddressesDict)) {
      let oldTimestamp = new Date(0)
      let dailyAmount = 0
      let dailySum = 0
      let sum = 0
      let stake = 0

      value.forEach(function(transaction) {
        let timeStamp = new Date(transaction.timeStamp * 1000)

        if (transaction['buy']) {
          stake = stake + Number(transaction['value'])
        } else {
          dailyAmount = -dailySum
          stake = 0
        }

        oldTimestamp = timeStamp
      
      });

      thresholdDelta = date_diff_indays(today, oldTimestamp)
      deltaDays = 0
      if (thresholdDelta >= 60) {
        deltaDays = 60
      } else {
        deltaDays = thresholdDelta
      }

      dailySum = dailySum + dailyAmount
      sum = sum + deltaDays * dailySum
      let avg = sum / 60 / 1000000000000000000
      if (avg > 0) {
        dass[key] = avg
      }

      // save staked amount
      const entry = [key, stake / 1000000000000000000]
      if (entry[1] > 0) {
        stakersList.push(entry)
      }
      
    }

    stakersList = stakersList.sort((a,b) => b[1] - a[1])
    top25Stakers = []

    stakersList.forEach((value, index) => {
      var dassAccount = {
        id: index + 1,
        address: value[0],
        value: Math.round(parseInt(value[1]))
      }
      top25Stakers.push(dassAccount)
    });

  } catch (error) {
    console.error(error);
  }
};

cron.schedule('00 00 00 * * 0-6', () => {
  logger.info('Trigger calculate scores')
  calcScore()
});

const getStakers = () => {
  return top25Stakers.length
}

const getStakersList = () => {
  return top25Stakers
}

const getRewardsList = () => {
  return rewardsList
}

module.exports.calcScore = calcScore
module.exports.getStakers = getStakers
module.exports.getStakersList = getStakersList
module.exports.getRewardsList = getRewardsList
