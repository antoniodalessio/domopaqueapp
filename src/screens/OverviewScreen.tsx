import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'

import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'

import { config } from './../config/config'


interface Props {}

interface State {
  inside: any,
  outside: any,
}

const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
const data2 = [ 60, 20, 30, 5, -8, -28, 86, 9, 3, 58, -53, 28, 58, -28, -40 ]
const contentInset = { top: 20, bottom: 20 }

class OverviewScreen extends React.Component<Props, State> {
  
  state: State = {
    inside: {},
    outside: {}
  }

  static navigationOptions = {
    title: 'Domopaque Overview',
  };



  componentDidMount = async () => {
    
  }

  componentWillUnmount = () => {
    
  }

  
  render() {

    let { inside, outside } = this.state;

    console.log(inside)

    return (
      <View style={{ height: 200, padding: 20 }}>
        <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
              data={ data }
              contentInset={ contentInset }
              svg={{
                  fill: 'grey',
                  fontSize: 10,
              }}
              numberOfTicks={ 10 }
              formatLabel={ value => `${value}ºC` }
          />
          <LineChart
              style={{ flex: 1, marginLeft: 16 }}
              data={ data }
              gridMin={ 0 }
              svg={{ stroke: 'rgb(134, 65, 244)' }}
              contentInset={ contentInset }
          >
            <Grid/>
          </LineChart>
        </View>
        <XAxis
            style={{ marginHorizontal: -10 }}
            data={ data }
            formatLabel={ (value, index) => index }
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: 'black' }}
        />
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