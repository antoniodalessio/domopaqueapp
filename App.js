import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React, {Component} from 'react';
import {
  View,
} from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import IconFont from './src/components/iconFont'
import Ionicons from 'react-native-vector-icons/Ionicons';


import EnvironmentScreen from './src/screens/EnvironmentScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import GoogleHomeScreen from './src/screens/GoogleHomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';



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

const MainStack = createBottomTabNavigator(
  {
    Dashboard: DashboardStack,
    Settings: SettingsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName == "Settings") {
          return <Ionicons name={`ios-options`} size={25} color={tintColor} />;
        }
        if (routeName == "Dashboard") {
          return <IconFont name={`dashboard`} size={25} color={tintColor} />;
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

export default App;