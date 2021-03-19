// Web3 init //
const Web3 = require('web3')
const MyContract = require('./contract/StakingContract.json')
const contractAddress = '0x9b7fcaebe9a69eceeab72142ed35a238775d179a'

const infuraUrl = 'https://mainnet.infura.io/v3/9ed122808de646f0a2f0854746375e1e'
const web3 = new Web3(infuraUrl);
const myContract = new web3.eth.Contract(
  MyContract.abi,
  contractAddress
);


module.exports = { myContract }