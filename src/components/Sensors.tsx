import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native'

import Sensor from './../model/sensor'
import IconFont from './iconFont'

var { width } = Dimensions.get('window')

interface Props {
  sensors: Sensor[]
}

interface State {}


class Sensors extends React.Component<Props, State> {

  _renderUnitOfMeasure = (type) => {
    switch(type) {
      case "temperature":
        return "°C"
      case "umidity":
        return "%"
      case "humidity":
        return "%"
    }
  }

  _renderIcon = (type, value) => {
    switch(type) {
      case "temperature":
        return <IconFont name={"temperature"} size={30} color={"black"} ></IconFont>
      case "umidity":
        return <IconFont name={"umidity2"} size={30} color={"black"} ></IconFont>
      case "humidity":
        return <IconFont name={"umidity2"} size={30} color={"black"} ></IconFont>
      case "lightSensor":
        if (value == "1") {
          return <IconFont name={"moon"} size={30} color={"black"} ></IconFont>
        }else{
          return <IconFont name={"sun"} size={30} color={"black"} ></IconFont>
        }
      case "raindrop":
        return <IconFont name={"umidity"} size={30} color={"black"} ></IconFont>
    }
  }

  _parseRaindrop = (value) => {
    switch(value) {
      case "very_dry_not_raining":
        return 'It\'s Not raining'
      case "not_raining":
        return 'It\'s Not raining'
      case "rain_warning":
        return "It's going to rain"
      case "flood":
        return "diluvia"
    }
  }

  _renderSensors = (sensors: Sensor[]) => {

    if (sensors.length % 2 != 0) {
      sensors.push({
        type: '',
        name: '',
        value: ''
      })
    }

    return sensors.map((sensor) => {
      return(
        <View style={s.rowContainer} key={sensor.name}>
          <View style={[s.cell]}>
            <View style={s.metaContainer}>
              {this._renderIcon(sensor.type, sensor.value)}  
            </View>
            {sensor.type == 'raindrop' &&
              <Text style={{fontSize: 20}}>
              {this._parseRaindrop(sensor.value)}
              </Text>
            }
            {sensor.type != 'raindrop' && sensor.type != 'lightSensor' &&
              <Text style={{fontSize: 20, fontWeight: 'bold'}}> {sensor.value} {this._renderUnitOfMeasure(sensor.type)}</Text>
            }
          </View>
        </View>
      )
    })
  }

  render() {

    let { sensors } = this.props;

    return(
      <View style={s.container}>
        { this._renderSensors(sensors) }
      </View>
    )
  }

}


const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  rowContainer: {
    width: width/2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexWrap: 'wrap',
    backgroundColor: '#eee'
  },
  metaContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  cell: {
    width: width/2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc'
  },
})


export default Sensors