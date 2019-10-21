import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert
} from 'react-native'

import DeviceInfo from 'react-native-device-info';

import KeyValueRow from '../components/keyValueRow'

import AppStore from '../AppStore'

interface Props {}

interface State {
  
}


class SettingsScreen extends React.Component<Props, State> {
  
  constructor() {
    super()
  }

  state: State = {
    
  }

  static navigationOptions = {
    title: 'Domopaque Settings',
  };

  componentDidMount = async () => {
    console.log(AppStore.fcmToken)
  }

  componentWillUnmount = () => {
    
  }

  
  render() {
    return (
      <View style={s.container}>
        <ScrollView>

          <KeyValueRow label="Lock with fingerprints" type="switch"></KeyValueRow>

          <KeyValueRow odd={true} label="Lock with fingerprints" type="switch"></KeyValueRow>

          <KeyValueRow label="Lock with fingerprints" type="switch"></KeyValueRow>

          <TouchableOpacity style={s.button} onPress={() => { AppStore.sendLocalPushNotification() }}><Text>Local Notification (now)</Text></TouchableOpacity>

          <Text>{DeviceInfo.getVersion()}</Text>
        </ScrollView>
      </View>
    )
  }
}


const s = StyleSheet.create({
  container: {},
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowOdd: {
    backgroundColor: '#eee'
  },
  button: {
    backgroundColor: 'tomato'
  }
})

export default SettingsScreen