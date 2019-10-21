import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import {
  View,
} from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import IconFont from './components/iconFont'
import Ionicons from 'react-native-vector-icons/Ionicons';


import EnvironmentScreen from './screens/EnvironmentScreen';
import DashboardScreen from './screens/DashboardScreen';
import GoogleHomeScreen from './screens/GoogleHomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import OverviewScreen from './screens/OverviewScreen';


const DashboardStack = createStackNavigator(
  {
    Dashboard: DashboardScreen,
    Environment: EnvironmentScreen,
    GoogleHome: GoogleHomeScreen
  },
  {
    initialRouteName: 'Dashboard',
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  }
);

const OverviewStack = createStackNavigator(
  {
    Overview: OverviewScreen
  }
)

const MainStack = createBottomTabNavigator(
  {
    Dashboard: DashboardStack,
    Overview: OverviewStack,
    Settings: SettingsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName == "Dashboard") {
          return <IconFont name={`home`} size={25} color={tintColor} />;
        }
        if (routeName == "Overview") {
          return <IconFont name={`dashboard`} size={25} color={tintColor} />;
        }
        if (routeName == "Settings") {
          return <Ionicons name={`ios-options`} size={25} color={tintColor} />;
          
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const App = createAppContainer(MainStack)

interface Props {}

interface State {
  
}


class AppNavigator extends React.Component<Props, State> {
  
  state: State = {}

  render() {
    return <App />;
  }

}


export default AppNavigator;