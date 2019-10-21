import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner'



interface Props {}

interface State {
}


class LoginScreen extends React.Component<Props, State>{
  componentDidMount = async () => {

    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then(() => {
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  }
  
  componentWillUnmount = () => {
    clearInterval(this.interval)
    FingerprintScanner.release();
  }

  handleAuthenticationAttempted = (error) => {
    this.setState({ errorMessage: error.message });
  };

  render() {
    return (
      <View>
        <Text>Login with FingerprintScanner</Text>
      </View>
    )
  }
}

export default LoginScreen;