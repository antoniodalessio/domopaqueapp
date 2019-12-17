import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native'

import { config } from './../config/config'
import I18n from './../config/i18n';
import AppStore from '../AppStore'

import IconFont from './../components/iconFont'

import Environment from './../model/environment'


interface Props {}

interface State {
  temperature: number,
  umidity: string,
  environments: Array<Environment>,
  loading: boolean,
  log: String
}


var { width } = Dimensions.get('window')

class DashboardScreen extends React.Component<Props, State> {
  
  state: State = {
    temperature: 0,
    umidity: '',
    environments: [],
    loading: false,
    log: ''
  }

  interval;

  static navigationOptions = {
    title: 'Domopaque Dashboard',
  };

  componentDidMount = async () => {

    AppStore.eventEmitter.on('@home', () => { this.setState({log: this.state.log + 'sono nella rete di  casa\n'});  })
    AppStore.eventEmitter.on('outOfHome', () => { this.setState({log: this.state.log + 'sono fuori la rete di casa\n'});  })

    console.log(config)

    this.setState({loading: true})
    await this.loadEnvironments();

    /*AppStore.socket.on('actuator change', (obj) => {
      console.log(obj)
      this.setState({
        log: this.state.log + obj.name + ": " + obj.value + "\n"
      })
    })*/

  }

  async loadEnvironments() {
    console.log(`${config.baseApiPathUrl}home/environments`)
    await fetch(`${config.baseApiPathUrl}home/refresh`)
    let environments = await fetch(`${config.baseApiPathUrl}home/environments`)
    environments = await environments.json();

    environments = environments.environments.map((environment) => {
      switch(environment.name){
        case 'soggiorno':
            environment.icon = 'sofa'
            environment.iconSize = 50
            environment.color = '#9c9c9c'
          break;
        case 'veranda':
            environment.icon = 'veranda'
            environment.iconSize = 50
            environment.color = '#bababa'
          break;
        case 'backyard':
          environment.icon = 'backyard'
          environment.iconSize = 50
          environment.color = 'green'
        break;
        case 'corridoio_piano_primo':
            environment.icon = 'aisle'
            environment.iconSize = 35
            environment.color = '#bababa'
          break;
        case 'corridoio_piano_terra':
            environment.icon = 'aisle'
            environment.iconSize = 35
            environment.color = 'tomato'
          break;
      }
      return environment
    })

    this.setState({environments: environments, loading: false})
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

  onRefresh = async () => {
    this.setState({loading: true})
    await this.loadEnvironments();
  }

  render() {

    const { environments, loading, log } = this.state

    return (
      <View style={s.container}>
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
          
          <View style={s.grid}>
          {environments.length > 0 && environments.map((environment, index) => {
            return (
              <TouchableOpacity 
                key={"button" + index} style={[s.gridButton, {backgroundColor: environment.color}]}
                onPress={() => this.onPressEnvironment(environment) }
              >
                <IconFont name={environment.icon} size={environment.iconSize} color={"white"} ></IconFont>
                <Text style={{color: 'white'}}>{I18n.t(environment.name)}</Text>
              </TouchableOpacity>)
          })
          }
          <TouchableOpacity 
                style={[s.gridButton, {backgroundColor: 'black'}]}
                onPress={() => this.onPressGoogleHome() }
              >
                <IconFont name="google" size={30} color={"#fff"}></IconFont>
                <Text style={{color: 'white'}}>Google home</Text>
              </TouchableOpacity>
          </View>
          <View>
            <Text>{log}</Text>
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
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  }
})

export default DashboardScreen