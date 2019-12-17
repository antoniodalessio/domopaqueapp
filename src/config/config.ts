
import { BASE_PATH } from 'react-native-dotenv'

console.log("BASE_PATH" + BASE_PATH)

export const config = {
    basePathUrl: BASE_PATH,
    baseApiPathUrl: BASE_PATH + "api/"
}