import React from 'react'
import {
  AppRegistry
} from 'react-native'

import AppNavigator from './AppNavigator';
import LoginScreen from './screens/LoginScreen';
import AppStore from './AppStore'


interface Props {}

interface State {
  
}


class Domopaque extends React.Component<Props, State> {
  
  state: State = {}
  
  render() {
    return (
      <AppNavigator />
    )
  }
}

AppRegistry.registerComponent('domopaqueapp', () => Domopaque);