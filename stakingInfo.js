const logger = require('./log/logger')
const web3 = require('./web3')

let stakingInfo = {
  stakedAmount: 0,
  poolFilled: 0,
  totalBurned: 3189
}

const poolMaxCap = 250000000

const getStakedAmount = async () => {  
  try {
    const result = await web3.myContract.methods.currentTotalStake().call()
    stakingInfo.stakedAmount =  Math.round(result / 1000000000000000000)
    stakingInfo.poolFilled = Math.round(stakingInfo.stakedAmount / poolMaxCap * 100)
  } catch (error) {
    logger.error(error)
  }
}

getStakedAmount()
setInterval(() => getStakedAmount(), 60000);

const getStakedAmountStatic = () => {
  return stakingInfo
}

const setTotalBurned = (totalBurned) => {
  stakingInfo.totalBurned = totalBurned
}

const getTotalBurned = () => {
  return stakingInfo.totalBurned
}

module.exports.getStakedAmountStatic = getStakedAmountStatic
module.exports.setTotalBurned = setTotalBurned
module.exports.getTotalBurned = getTotalBurned