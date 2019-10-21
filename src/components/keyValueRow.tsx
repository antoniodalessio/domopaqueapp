import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Switch
} from 'react-native'



interface Props {
  label:  string
  type: string
  switchValue?: boolean
  odd?: boolean
}

interface State {
  
}


class KeyValueRow extends React.Component<Props, State> {
  
  state: State = {
    
  }

  componentDidMount = async () => {
    
  }

  componentWillUnmount = () => {
    
  }

  
  render() {

    let { label, type, switchValue, odd} = this.props;

    return (
      <View style={[s.row, odd ? s.rowOdd : {}]}>
        <View>
          <Text>{label}</Text>
        </View>
        <View>
          {type == 'switch' &&
            <Switch  value={switchValue} />
          }
        </View>
      </View>
    )
  }
}


const s = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowOdd: {
    backgroundColor: '#eee'
  }
})

export default KeyValueRow