const axios = require('axios');
var cron = require('node-cron');
const cryptoRandomString = require('crypto-random-string');
const logger = require('./log/logger')


/* CONSTANTS */
const KEY = 'W2PNPD5HA9TYABR3RYUFCCSUV3UR6BBC5R'
const ADDRESS = '0xc4c2614e694cf534d407ee49f8e44d125e4681c4'
const REWARDS_ADDRESS = '0x6b78ff6668d639deb89363d8e24f2abe2d7ab1ba'
const STAKING_ADDRESS = '0x9b7fcaebe9a69eceeab72142ed35a238775d179a'


const calcRewards = async () => {
  const rewardsList = new Object();
  logger.info('Calculate rewards')

  try {
    let listDict = new Object();
    // get newest transaction
    let url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${ADDRESS}&address=${REWARDS_ADDRESS}&page=1&offset=1&sort=desc&apikey=${KEY}`
    let startBlockNr = 10858311
    let response = await axios.get(url);
    let transactions = response['data']['result']
    let newestBlockNr = transactions[0]['blockNumber']

    while (startBlockNr < newestBlockNr) {
      url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${ADDRESS}&address=${REWARDS_ADDRESS}&startblock=${startBlockNr}&endblock=999999999&sort=asc&apikey=${KEY}`
      response = await axios.get(url);
      transactions = response['data']['result']

      transactions.forEach((transaction) => {       
        let { blockNumber, hash, to, value } = transaction

        if (to != STAKING_ADDRESS) {
          listDict[hash] = { address: to, value }
        }        

        startBlockNr = blockNumber
      });
    }

    Object.values(listDict).forEach((transaction) => {
      if (!(transaction.address in rewardsList)) {
        rewardsList[transaction.address] = parseInt(transaction.value)
      } else {
        rewardsList[transaction.address] += parseInt(transaction.value) 
      }
    });

    return rewardsList

  } catch (err) {
    console.log(err)
  }
}

module.exports.calcRewards = calcRewards
