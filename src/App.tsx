import React from 'react'
import {
  AppRegistry
} from 'react-native'

import AppNavigator from './AppNavigator';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import logger from "redux-logger";
//import LoginScreen from './screens/LoginScreen';
//import AppStore from './AppStore'
import itemApp from "./reducers";


const middlewares = [thunk, logger];
const store = createStore(itemApp, applyMiddleware(...middlewares));

interface Props {}

interface State {
  
}


class Domopaque extends React.Component<Props, State> {
  
  state: State = {}

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}


export default Domopaque;

AppRegistry.registerComponent('domopaqueapp', () => Domopaque);