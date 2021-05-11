//import { ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'

const CHAIN_ID = 1

// interface WalletLinkConnectorArguments {
//   url: string
//   appName: string
//   appLogoUrl?: string
//   darkMode?: boolean
// }

export class WalletLinkConnector extends AbstractConnector {
  // private readonly url: string
  // private readonly appName: string
  // private readonly appLogoUrl?: string
  // private readonly darkMode: boolean

  //  walletLink: any
  // private provider: any

  constructor({ url, appName, appLogoUrl, darkMode }) {
    super({ supportedChainIds: [CHAIN_ID] })

    this.url = url
    this.appName = appName
    this.appLogoUrl = appLogoUrl
    this.darkMode = darkMode || false
  }

  async activate() {
    if (!this.walletLink) {
      const { default: WalletLink } = await import('walletlink')
      this.walletLink = new WalletLink({
        appName: this.appName,
        darkMode: this.darkMode,
        ...(this.appLogoUrl ? { appLogoUrl: this.appLogoUrl } : {})
      })
      this.provider = this.walletLink.makeWeb3Provider(this.url, CHAIN_ID)
    }

    const account = await this.provider.send('eth_requestAccounts').then((accounts) => accounts[0])

    return { provider: this.provider, chainId: CHAIN_ID, account: account }
  }

  async getProvider() {
    return this.provider
  }

  async getChainId() {
    return CHAIN_ID
  }

  async getAccount() {
    return this.provider.send('eth_accounts').then((accounts) => accounts[0])
  }

   deactivate() {}

   async close() {
    this.provider.close()
    this.emitDeactivate()
  }
}