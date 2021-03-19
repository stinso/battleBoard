const axios = require('axios');

const ETHERSCAN_API_KEY = 'DCRBPESFCAXRFJRWQ1YMVQHHXWF5T2CFFR'
const BASE_URL = 'https://api.etherscan.io/'

const getHoldings = async (address) => {
  const uri = `api?module=account&action=tokenbalance&contractaddress=0xc4c2614e694cf534d407ee49f8e44d125e4681c4&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`

  try {
    const response = await axios.get(BASE_URL + uri)
    return(response.data.result);
  } catch {
    return 0
  }
}


const getTransactions = async (address) => {
  const uri = `api?module=account&action=tokentx&contractaddress=0xc4c2614e694cf534d407ee49f8e44d125e4681c4&address=${address}&page=1&offset=5&sort=desc&apikey=${ETHERSCAN_API_KEY}`

  try {
    const response = await axios.get(BASE_URL + uri)
    return(response.data.result);
  } catch {
    return 0
  }
}


module.exports.getHoldings = getHoldings
module.exports.getTransactions = getTransactions