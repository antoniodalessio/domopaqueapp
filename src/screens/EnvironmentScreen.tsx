import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator
} from 'react-native'

import Environment from './../model/environment'
import Device from './../model/device'
import Sensor from './../model/sensor'

interface Props {}

interface State {
  environment: Environment
}

var { width } = Dimensions.get('window')

class EnvironmentScreen extends React.Component<Props, State> {
  
  state: State = {
    environment: null
  }

  interval;

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('envirnmentName'),
    };
  };

  componentDidMount = async () => {
    let environmentName = this.props.navigation.getParam('envirnmentName')
    this.interval = setInterval(async () => await this.composeEnvironment(environmentName), 1000)
    this.navigationOptions = {
      title: environmentName,
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  composeEnvironment = async (environmentName) => {

    let res = await fetch(`http://rondinino.addns.org:3001/environments/${environmentName}`);
    res = await res.json();
    this.setState({
      environment: res
    })
  }


  _renderSensors = (sensors: Sensor[]) => {
    return sensors.map((sensor) => {
      return(
        <View style={s.rowContainer} key={sensor.name}>
          <View style={[s.cell]}>
            <Text style={{fontWeight: 'bold'}}>{sensor.type}</Text>
            <Text>{sensor.value}</Text>
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

    const { environment } = this.state

    return (
      <View style={s.container}>
          {environment && this._renderDevices(environment.devices)}
          {!environment && <ActivityIndicator ></ActivityIndicator>}
      </View>
    )
  }
}


const s = StyleSheet.create({
  container: {},
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  cell: {
    flexDirection: 'row',
    width: width,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  }

})

export default EnvironmentScreen