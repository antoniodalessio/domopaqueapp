import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import { httpService } from '../services/httpServices'

import Actuator from './../model/actuator'
import IconFont from './iconFont'

var { width } = Dimensions.get('window')

import { config } from './../config/config'
import I18n from './../config/i18n';

import AppStore from './../AppStore'

interface Props {
  actuators: Actuator[]
}

interface State {
  actuators
}


class Actuators extends React.Component<Props, State> {

  state: State = {
    actuators: {}
  }

  _interval;

  async post(url, params) {
    return await httpService(url, {
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

    AppStore.socket.on('actuator change', (obj) => {
      console.log(obj)

      let name = obj.name
      let state = obj.value

      this.state.actuators[name] = state

      this.setState({})
    })

    //this._interval = setInterval(await this.refresh, 1000)
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
    
    try {
      let url = `${config.baseApiPathUrl}home/actuators/${name}`
      let res:any = await httpService(url)
      res = await res.json();
      return res.value
    } catch(e) {
      console.log(e)
    }
  }

  async onPress(name: string) {
    let state = await this.getState(name)
    state = state == 0 ? 1 : 0
    this.setActuatorState(name, state)
  }

  async setActuatorState(name, state) {
    let url = `${config.baseApiPathUrl}home/actuators`
    console.log(url)
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
              <TouchableOpacity style={[s.btn, this.state.actuators[actuator.name]  ? {backgroundColor: 'yellow'} : {}]}onPress={() => this.onPress(actuator.name)}>
                  <IconFont name="switch" size={50}></IconFont>
                  <Text>{I18n.t(actuator.friendlyName)}</Text>
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


export default Actuators