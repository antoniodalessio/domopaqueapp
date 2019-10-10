import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'



interface Props {}

interface State {
  
}


class SettingsScreen extends React.Component<Props, State> {
  
  state: State = {
    
  }

  static navigationOptions = {
    title: 'Domopaque Settings',
  };

  componentDidMount = async () => {
    
  }

  componentWillUnmount = () => {
    
  }

  
  render() {

    return (
      <View style={s.container}>
        <ScrollView>
          
          <View style={s.grid}>
            <Text>Settings</Text>
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

export default SettingsScreen