const CoinGecko = require('coingecko-api');
const logger = require('./log/logger');

const CoinGeckoClient = new CoinGecko();
const tokenList = ['chain-games']

let price = {
  usd: 0,
  usd_24h_change: 0
}

const getPriceInfo = async () => {
  try {
    const response = await CoinGeckoClient.simple.price({
      ids: tokenList,
      vs_currencies: 'usd',
      include_24hr_change: true
    });

    const { data } = response
    price = data['chain-games']
  } catch (error) {
    logger.error(`Can't get price of chain: ${error}`)
  }
}

getPriceInfo()
setInterval(() => getPriceInfo(), 60000);

const getPrice = () => {
  return price
}

module.exports.getPrice = getPrice