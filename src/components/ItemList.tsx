import React from "react";
import { StyleSheet, FlatList, View, Text, TouchableOpacity} from "react-native";
import { connect } from "react-redux";


interface Props {
    dataSource: any,
    dispatch: any
}
interface State {}

class ItemList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleDestroyItem = this.handleDestroyItem.bind(this);
  }

  handleDestroyItem(id) {
    this.props.dispatch({ type: "REMOVE_ITEM", id });
  }

  render() {

    return (
        <View>
            { this.props.dataSource.map((item) => {
                return (
                    <TouchableOpacity 
                        onPress={() => {this.handleDestroyItem(item.id)}} style={[styles.test, {backgroundColor: item.bgColor}]}>
                        <Text>{item.id}</Text>
                    </TouchableOpacity>
                )
            } ) }
        </View>
      
    );
  }
}




// Handle data source change from redux store

/*const dataSource = FlatList.Data({
  rowHasChanged: (r1, r2) => r1 !== r2
});*/

function mapStateToProps(state) {
  return {
    dataSource: state.items
  };
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#efefef"
  },
  test: {
      width: 100,
      height: 100,
  }
});

export default connect(mapStateToProps)(ItemList);