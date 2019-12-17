import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import Actuator from '../model/actuator'
import IconFont from './iconFont'

var { width } = Dimensions.get('window')

import { config } from '../config/config'
import I18n from '../config/i18n';

import AppStore from '../AppStore'

interface Props {
  actuators: Actuator[]
}

interface State {
  actuators
}


class VirtualActuators extends React.Component<Props, State> {

  state: State = {
    actuators: {}
  }

  _interval;

  async post(url, params) {
    return await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  }

  async componentDidMount() {
    this.state.actuators = {}

    this.refresh()

    AppStore.socket.on("virtual actuator change status", (res) => {
      console.log("res", res)
      this.state.actuators[res.name] = res.value
      this.forceUpdate()
    })

  }

  refresh = async () => {
    for (const actuator of this.props.actuators) {
      this.state.actuators[actuator.name] = await this.getState(actuator.name);
    }
    this.forceUpdate()
  }

  componentWillUnmount = () => {
    clearInterval(this._interval)
  }

  async getState(name: string) {
    let url = `${config.baseApiPathUrl}home/virtualactuators/${name}`
    let res:any = await fetch(url)
    res = await res.json();
    return res.value;
  }

  async onPress(name: string) {
    let state = await this.getState(name)
    state = state == 0 ? 1 : 0
    this.setActuatorState(name, state)
  }


  async setActuatorState(name, state) {

    console.log(name, state)

    let url = `${config.baseApiPathUrl}home/virtualactuators`
    let params = {
      value: `${state}`,
      name: `${name}`
    }
    let res:any = await this.post(url, params)

  }

  render() {
    let { actuators } = this.props;

    return(
      <View style={s.container}>
        {actuators.map((actuator) => {
          return( 
            <View key={actuator.name}>
              <TouchableOpacity style={[s.btn, this.state.actuators[actuator.name]  ? {backgroundColor: 'yellow'} : {}]} onPress={() => this.onPress(actuator.name)}>
                  <IconFont name="switch" size={50}></IconFont>
                  <Text>{I18n.t(actuator.name)}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
        
      </View>
    )
  }

}


const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  btn: {
    width: width/2,
    height: width/2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc'
  }
})


export default VirtualActuators