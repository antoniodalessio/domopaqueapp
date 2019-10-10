import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'

import IconFont from './../components/iconFont'

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
    environments: []
  }

  interval;

  static navigationOptions = {
    title: 'Domopaque Dashboard',
  };

  componentDidMount = async () => {
    let environments = await fetch("http://rondinino.addns.org:3001/environments")
    environments = await environments.json();
    this.setState({environments: environments.environments})
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  onPressEnvironment = (environment) => {
    this.props.navigation.navigate('Environment', {
      title: environment.name,
      envirnmentName: environment.name
    })
  }

  onPressGoogleHome = () => {
    this.props.navigation.navigate('GoogleHome', {
      title: 'Google home',
    })
  }

  render() {

    const { environments } = this.state

    return (
      <View style={s.container}>
        <ScrollView>
          
          <View style={s.grid}>
          {environments.length > 0 && environments.map((environment, index) => {
            return (
              <TouchableOpacity 
                key={"button" + index} style={[s.gridButton]}
                onPress={() => this.onPressEnvironment(environment) }
              >
                <IconFont name="bulb" size={50} ></IconFont>
                <Text>{environment.name}</Text>
              </TouchableOpacity>)
          })
          }
          <TouchableOpacity 
                style={[s.gridButton, {backgroundColor: 'black'}]}
                onPress={() => this.onPressGoogleHome() }
              >
                <IconFont name="bulb" size={30} color={"#fff"}></IconFont>
                <Text style={{color: 'white'}}>Google home</Text>
              </TouchableOpacity>
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
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  }
})

export default DashboardScreen