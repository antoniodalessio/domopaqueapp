import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native'


interface Props {}

interface State {
    value: string
}

class GoogleHomeScreen extends React.Component<Props, State> {
  
  state: State = {
    value: ''
  }


  sendToGoogle = async () => {
    let res = await fetch(`http://rondinino.addns.org:3001/google-home`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg: `${this.state.value}`
      }),
    });
  }

  render() {
    let { value } = this.state;
    return (
      <View style={s.container}>
          <TextInput
            style={s.textInput}
            value={value}
            onChangeText={text => this.setState({value: text})}
            placeholder="write here"
            multiline={true}
            >
            </TextInput>
          <TouchableOpacity style={s.button} onPress={() => {this.sendToGoogle()}}>
              <Text>SEND</Text>
          </TouchableOpacity>
      </View>
    )
  }
}


const s = StyleSheet.create({
  container: {},
  textInput: {
      borderWidth: 1,
      borderColor: '#ccc'
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'green',
    alignItems: 'center',
  }
})

export default GoogleHomeScreen