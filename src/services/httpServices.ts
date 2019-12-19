import { TOKEN } from 'react-native-dotenv'

export const httpService = (url, params = {}) => {

  const newParams = {
    ...params,
    headers: Object.assign(params, {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + TOKEN,
    }) 
  }

  return fetch(url, newParams)
}