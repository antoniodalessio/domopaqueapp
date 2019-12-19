import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import IconFont from './../components/iconFont'

import { config } from './../config/config'
import I18n from './../config/i18n';
import { httpService } from '../services/httpServices'
var { width } = Dimensions.get('window')

interface Props {}

interface State {
  scenery
}


class SceneryScreen extends React.Component<Props, State> {
  
  state: State = {
    scenery: []
  }

  static navigationOptions = {
    title: 'Domopaque Scenery',
  };

  componentDidMount = async () => {
    let res = await httpService(`${config.baseApiPathUrl}scenery/`);
    res = await res.json();
    this.setState({
      scenery: res
    })
  }

  async put(url, params) {
    return await httpService(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  }

  componentWillUnmount = () => {
    
  }

  onPress = (id: string) => {
    this.put(`${config.baseApiPathUrl}scenery/${id}`, {})
  }

  
  render() {

    let { scenery } = this.state

    return (
      <View style={s.container}>
        <ScrollView>
        <View style={s.container}>
        {scenery.map((scenario) => {
          return( 
            <View key={scenario.name}>
              <TouchableOpacity style={[s.btn, this.state.scenery[scenario.name]  ? {backgroundColor: 'yellow'} : {}]}onPress={() => this.onPress(scenario.id)}>
                  <IconFont name="switch" size={50}></IconFont>
                  <Text>{I18n.t(scenario.name)}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
        
      </View>
        </ScrollView>
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


export default SceneryScreen