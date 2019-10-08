import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'

import Environment from './../model/environment'

interface Props {}

interface State {
  temperature: number,
  umidity: string,
  environments: Array<Environment>,
}


var { width } = Dimensions.get('window')

class DashboardScreen extends React.Component<Props, State> {
  
  state: State = {
    temperature: 0,
    umidity: '',
    environments: [
      {
        name: 'soggiorno',
        color: 'red',
      },
      {
        name: 'giardino',
        color: 'green',
      },
      {
        name: 'veranda',
        color: 'brown',
      },
      {
        name: 'cucina',
        color: 'orange',
      },
      {
        name: 'camera',
        color: 'purple',
      },
      {
        name: 'cameretta',
        color: 'pink',
      },
      {
        name: 'bagno',
        color: 'blue',
      }
    ]
  }

  interval;

  static navigationOptions = {
    title: 'Domopaque',
  };

  componentDidMount = () => {
    this.interval = setInterval(async () => await this.getTempUmidity(), 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  onPressEnvironment = (environment) => {
    this.props.navigation.navigate('Environment', {
      title: environment.name
    })
  }

  async getTempUmidity() {
    let res = await fetch('http://rondinino.addns.org:3001/temp-umidity');
    res = await res.json();
    this.setState({
      temperature: res.temperature,
      umidity: res.umidity,
    })
  }

  render() {

    const { temperature, umidity, environments } = this.state

    return (
      <View style={s.container}>
        <ScrollView>
          <View style={s.grid}>
          {environments.map((environment, index) => {
            return (
              <TouchableOpacity 
                key={"button" + index}style={[s.gridButton, {backgroundColor: environment.color}]}
                onPress={() => this.onPressEnvironment(environment) }
              >
                <Text>{environment.name}</Text>
              </TouchableOpacity>)
          })
          }
          </View>
        </ScrollView>
      </View>
    )
  }
}


const s = StyleSheet.create({
  container: {},
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridButton: {
    width: width/2,
    height: width/2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default DashboardScreen