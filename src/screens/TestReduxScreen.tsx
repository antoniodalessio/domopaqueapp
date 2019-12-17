import React from 'react'
import {
    View,
    StyleSheet
  } from 'react-native'

import Header from "./../components/Header";
import ItemList from "./../components/ItemList";

interface Props {}
interface State {}

class TestReduxScreen extends React.Component<Props, State> {

  render() {

    return (
        <View>
          <View style={styles.container}>
            <Header />
            <ItemList />
          </View>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default TestReduxScreen;