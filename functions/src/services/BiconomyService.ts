const Biconomy = require('@biconomy/mexa')
const axios = require('axios')

const { configs } = require('../configs')

export const biconomy = new Biconomy(
  configs.provider,
  {
    apiKey: configs.biconomyApiKey,
    debug: false,
    strict: true
  }
)

export const whitelistAddresses = async (destinationAddresses: string []) => {
  try {
    const biconomyWhitelistEndpoint = 'https://api.biconomy.io/api/v1/dapp/whitelist/destination'

    await axios.post(biconomyWhitelistEndpoint, {
      'destinationAddresses': destinationAddresses
    }, {
      'headers': {
        'Authorization': `User ${configs.biconomyWhitelistToken}`,
        'Content-Type': 'application/json'
      }
    })

    return
  } catch (error) {
    throw error
  }
}

export const postBiconomy = (data: any) => {
  try {
    const body = JSON.stringify({
      'to': data.toAddress,
      'userAddress': data.userAddress,
      'apiId': data.biconomyMethodKey,
      'params': data.txParams,
    })

    const headerSettings = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': configs.biconomyApiKey,
      },
    }

    return new Promise((resolve, reject) => {
      axios
        .post('https://api.biconomy.io/api/v2/meta-tx/native', body, headerSettings)
        .then((res: any) => resolve(res.data.txHash))
        .catch((error: any) => reject(error))
    })
  } catch (error) {
    throw error
  }
}