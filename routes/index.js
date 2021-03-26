const apiKey = require('../secret/apiKey')
const coingecko = require('../coingecko')
const etherscan = require('../etherscan')
const express = require('express')
const logger = require('../log/logger')
const stakingInfo = require('../stakingInfo')
const web3 = require('../web3')

const DEC = 1000000000000000000;

const router = express.Router()

router.get('/price', async (_, res) => {
  res.send(coingecko.getPrice());
});

router.get('/accounts/:id', async (req, res) => {
  const address = req.params.id.toLowerCase()
  var account = {
    address: address,
    loggedIn: true,
    hasAdminRole: false,
    stake: 0,
    rewards: 0,
    accumulatedRewards: 0
  }

  
  try {
    const result = await web3.myContract.methods.getStakeDetails(address).call()
    account.stake = result['0'] / DEC
    account.rewards = result['3'] / DEC
  } catch {
    account.stake = 0
    account.rewards = 0
  }

  try {
    const rewardsList = calc.getRewardsList()
    if (address in rewardsList) {
      account.accumulatedRewards = (rewardsList[address] / DEC) + account.rewards
    }
  } catch {
    account.accumulatedRewards = 0
  }

  res.send(account);
});


router.get('/contractInfo', async (_, res) => {
  let contractInfo = {
    rewards: 0,
    burned: 0
  }

  try {
    let result = await web3.myContract.methods.totalRewardsDistributed().call()
    contractInfo.rewards =  Math.round(result / DEC)

    /* result = await web3.myContract.methods.totalSupply().call()
    contractInfo.burned = result - 100000000
    */
    contractInfo.burned = stakingInfo.getTotalBurned()
  } catch (error) {
    logger.error(`Error getting contract info: ${error}`)
  }
  res.send({ contractInfo });
});



router.get('/stakerslist', (_, res) => {
  res.send(calc.getStakersList())
})


router.get('/stakinginfo', (_, res) => {
  res.send(stakingInfo.getStakedAmountStatic())
})


router.get('/latestTransactions/:id', async (req, res) => {
  const address = req.params.id.toLowerCase()
  transactions = await etherscan.getTransactions(address)

  res.send({ transactions })
})


router.get('/holdings/:id', async (req, res) => {
  const address = req.params.id.toLowerCase()
  holdings = await etherscan.getHoldings(address)

  res.send({ holdings })
})


router.get('/stakers', (_, res) => {
  let stakers = calc.getStakers()
  res.send({ stakers })
})


router.post('/totalburned/:id', (req, res) => {
  try {
    const totalBurned = req.body.totalburned
    const key =  req.params.id

    if (key === apiKey) {
      stakingInfo.setTotalBurned(parseInt(totalBurned))
      logger.info('Updated "total burned"')
      res.json({ totalBurned })
    } else {
      logger.error('Invalid api key')
      res.status(500).json({ Message: 'invalid api key' })
    }    
  } catch (error) {
    logger.error(error)
  }
})


router.post('/calcscore/:id', (req, res) => {
  try {
    const key =  req.params.id

    if (key === apiKey) {
      calc.calcScore()
      logger.info('Started calc score')
      res.json({ Message: 'Started calc score' })
    } else {
      logger.error('Invalid api key')
      res.status(500).json({ Message: 'invalid api key' })
    }    
  } catch (error) {
    logger.error(error)
  }
})

module.exports = router