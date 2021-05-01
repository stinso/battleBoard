import { MaticRpcURL, ERC20PredicateProxyAddress, RootChainManageProxyAddress, network, MaticNetwork} from "../../config/constants";

const MaticPOSClient = require("@maticnetwork/maticjs").MaticPOSClient;

const config = {
  root: {
    RPC: network.url,
    POSRootChainManager: RootChainManageProxyAddress,
    posERC20Predicate: ERC20PredicateProxyAddress,
  },
  child: {
    RPC: MaticRpcURL,
  }
}

const getMaticPostClient = () => {
  return new MaticPOSClient({
    network: MaticNetwork.name, // optional, default is testnet
    version: MaticNetwork.version, // optional, default is mumbai
    parentProvider: window.web3.currentProvider,
      maticProvider: config.child.RPC,
     posRootChainManager: config.root.POSRootChainManager,
    posERC20Predicate: config.root.posERC20Predicate, // optional, required only if working with ERC20 tokens
  });
}
  

export default getMaticPostClient;