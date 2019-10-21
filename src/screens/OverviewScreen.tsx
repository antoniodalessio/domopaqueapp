import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'

import { config } from './../config/config'

interface Props {}

interface State {
  inside: any,
  outside: any,
}


class OverviewScreen extends React.Component<Props, State> {
  
  state: State = {
    inside: {},
    outside: {}
  }

  static navigationOptions = {
    title: 'Domopaque Overview',
  };

  componentDidMount = async () => {
    //await fetch(`${config.basePathUrl}refresh`)
    let environments = await fetch(`${config.basePathUrl}environments`)
    environments = await environments.json();

    let stats = environments.environments.reduce((acc, currValue) => {
      if (currValue.inside) {
        acc.inside.push(currValue)
      }else{
        acc.outside.push(currValue)
      }
      return acc;
    }, { inside: [], outside: []})

    this.setState({
      inside: {
        temp: stats.inside.reduce((acc, curr) => {
          console.log(parseFloat(curr.devices[0].sensors[0].value))
          acc = acc + parseFloat(curr.devices[0].sensors[0].value); 
          return acc 
        }, 0)/stats.inside.length,

        umidity: stats.inside.reduce((acc, curr) => {
          console.log(parseFloat(curr.devices[0].sensors[1].value))
          acc = acc + parseFloat(curr.devices[0].sensors[1].value); 
          return acc 
        }, 0)/stats.inside.length
      },

      outside: {
        temp: stats.outside.reduce((acc, curr) => {
          console.log(parseFloat(curr.devices[0].sensors[0].value))
          acc = acc + parseFloat(curr.devices[0].sensors[0].value); 
          return acc 
        }, 0)/stats.outside.length,

        umidity: stats.outside.reduce((acc, curr) => {
          console.log(parseFloat(curr.devices[0].sensors[1].value))
          acc = acc + parseFloat(curr.devices[0].sensors[1].value); 
          return acc 
        }, 0)/stats.outside.length
      }
    })

  }

  componentWillUnmount = () => {
    
  }

  
  render() {

    let { inside, outside } = this.state;

    console.log(inside)

    return (
      <View style={s.container}>
        <ScrollView>
          <View style={s.grid}>
            <Text>INSIDE</Text>
            <View>
              <Text>TEmperature</Text>
              <Text>{inside.temp}</Text>
            </View>
            <View>
              <Text>Umidity</Text>
              <Text>{inside.umidity}</Text>
            </View>
          </View>
          <View style={s.grid}>
            <Text>OUTSIDE</Text>
            <View>
              <Text>TEmperature</Text>
              <Text>{outside.temp}</Text>
            </View>
            <View>
              <Text>Umidity</Text>
              <Text>{outside.umidity}</Text>
            </View>
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
})

export default OverviewScreen