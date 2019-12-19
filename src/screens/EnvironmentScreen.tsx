import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  ScrollView
} from 'react-native'


import { config } from './../config/config'
import I18n from './../config/i18n';

import { httpService } from '../services/httpServices'

import Environment from './../model/environment'
import Device from './../model/device'

import Sensors from '../components/Sensors';
import Actuators from '../components/Actuators';

interface Props {}

interface State {
  environment: Environment
  name: string,
  loading: boolean,
  pressed: boolean
}


class EnvironmentScreen extends React.Component<Props, State> {
  
  state: State = {
    environment: null,
    name: '',
    loading: false,
    pressed: false,
  }

  props: Props

  interval;

  static navigationOptions = ({ navigation }) => {
    return {
      title: I18n.t(navigation.getParam('envirnmentName')),
    };
  };

  componentDidMount = async () => {
  
    let environmentName = this.props.navigation.getParam('envirnmentName')
    this.setState(
      {
        name: environmentName,
        loading: true,
      })
    
    await this.composeEnvironment(environmentName)
    this.interval = setInterval(
      async () => {
        //await this.composeEnvironment(environmentName)
      }, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  composeEnvironment = async (environmentName) => {
    let res = await httpService(`${config.baseApiPathUrl}home/environments/${environmentName}`);
    res = await res.json();
    this.setState({
      environment: res,
      loading: false,
    })
  }

  onRefresh = () => {
    this.setState({
      loading: true
    })
    this.composeEnvironment(this.state.name)
  }

  
  _renderDevices = (devices:Device[]) => {
    return devices.map((device) => {
      return (
        <View key={device.name}>
          {device.hasOwnProperty('error') &&
            <Text>{I18n.t("device_unavailable")}</Text>
          }
          <Sensors key={"sensors_" + device.name} sensors={device.sensors}/>
          <View style={s.spacer}></View>
          <Actuators key={"actuators_" + device.name} actuators={device.actuators}/>
        </View>)
    })
  }

  render() {

    const { environment, loading } = this.state

    return (
      
        <ScrollView
          refreshControl={
            <RefreshControl 
              refreshing={loading}
              onRefresh={this.onRefresh}
              enabled={true}
              progressViewOffset={100}
            />
          }
        >
        <View style={s.container}>
          {environment && this._renderDevices(environment.devices)}
        </View>
        </ScrollView>
    )
  }
}


const s = StyleSheet.create({
  container: {
    //paddingHorizontal: 1,
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10, 
    paddingVertical: 10, 
  },
  spacer: {
    width: '100%',
    paddingVertical: 10,
  }

})

export default EnvironmentScreen

