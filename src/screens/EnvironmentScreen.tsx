import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  RefreshControl,
  ScrollView
} from 'react-native'


import { config } from './../config/config'
import I18n from './../config/i18n';

import Environment from './../model/environment'
import Device from './../model/device'
import Sensor from './../model/sensor'

import IconFont from './../components/iconFont'

interface Props {}

interface State {
  environment: Environment
  name: string,
  loading: boolean,
}

var { width } = Dimensions.get('window')

class EnvironmentScreen extends React.Component<Props, State> {
  
  state: State = {
    environment: null,
    name: '',
    loading: false,
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
    this.setState({name: environmentName, loading: true})
    this.interval = setInterval(
      async () => {
        await this.composeEnvironment(environmentName)
      }, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  composeEnvironment = async (environmentName) => {
    let res = await fetch(`${config.basePathUrl}environments/${environmentName}`);
    res = await res.json();
    this.setState({
      environment: res,
      loading: false,
    })
  }

  _renderUnitOfMeasure = (type) => {
    switch(type) {
      case "temperature":
        return "°C"
      case "umidity":
        return "%"
    }
  }

  _renderIcon = (type) => {
    switch(type) {
      case "temperature":
        return <IconFont name={"temperature"} size={30} color={"black"} ></IconFont>
      case "umidity":
        return <IconFont name={"umidity2"} size={30} color={"black"} ></IconFont>
      case "raindrop":
        return <IconFont name={"umidity"} size={30} color={"black"} ></IconFont>
    }
  }

  _parseRaindrop = (value) => {
    switch(value) {
      case "very_dry_not_raining":
        return 'It\'s Not raining'
      case "not_raining":
        return 'It\'s Not raining'
      case "rain_warning":
        return "It's going to rain"
      case "flood":
        return "diluvia"
    }
  }


  onRefresh = () => {
    this.setState({
      loading: true
    })
    this.composeEnvironment(this.state.name)
  }


  _renderSensors = (sensors: Sensor[]) => {

    if (sensors.length % 2 != 0) {
      sensors.push({
        type: '',
        name: '',
        value: ''
      })
    }

    return sensors.map((sensor) => {
      return(
        <View style={s.rowContainer} key={sensor.name}>
          <View style={[s.cell]}>
            <View style={s.metaContainer}>
              {this._renderIcon(sensor.type)}
              
            </View>
            {sensor.type == 'raindrop' &&
              <Text style={{fontSize: 20}}>
              {this._parseRaindrop(sensor.value)}
              </Text>
            }
            {sensor.type != 'raindrop' &&
              <Text style={{fontSize: 20, fontWeight: 'bold'}}> {sensor.value} {this._renderUnitOfMeasure(sensor.type)}</Text>
            }
          </View>
        </View>
      )
    })
  }

  _renderDevices = (devices:Device[]) => {
    return devices.map((device) => {
      return this._renderSensors(device.sensors)
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  rowContainer: {
    width: width/2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexWrap: 'wrap',
    backgroundColor: '#eee'
  },
  metaContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  cell: {
    width: width/2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc'
  }

})

export default EnvironmentScreen