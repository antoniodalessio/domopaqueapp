import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator
} from 'react-native'

import Environment from './../model/environment'

interface Props {}

interface State {
  temperature: number,
  umidity: string,
}

var { width } = Dimensions.get('window')

class EnvironmentScreen extends React.Component<Props, State> {
  
  state: State = {
    temperature: null,
    umidity: null
  }

  interval;

  componentDidMount = () => {
    this.interval = setInterval(async () => await this.getTempUmidity(), 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  getTempUmidity = async () => {

    let title = this.props.navigation.getParam('title')

    let res = await fetch('http://rondinino.addns.org:3001/temp-umidity');
    res = await res.json();
    this.setState({
      temperature: res[title].temperature,
      umidity: res[title].umidity,
    })
  }

  render() {

    const { temperature, umidity } = this.state

    return (
      <View style={s.container}>
          {temperature == null &&
            <ActivityIndicator></ActivityIndicator>
          }
          {temperature != null &&
          <View style={s.rowContainer}>
            <View style={[s.cell, {backgroundColor: 'red'}]}>
              <Text>Temperature: {temperature}° </Text>
            </View>
            <View style={[s.cell, {backgroundColor: 'green'}]}>
              <Text>Umidity: {umidity}%</Text>
            </View>
          </View>
          }
      </View>
    )
  }
}


const s = StyleSheet.create({
  container: {},
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cell: {
    width: width/2,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }

})

export default EnvironmentScreen