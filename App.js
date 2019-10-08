import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import EnvironmentScreen from './src/screens/EnvironmentScreen';
import DashboardScreen from './src/screens/DashboardScreen';

const MainNavigator = createStackNavigator(
  {
    Dashboard: DashboardScreen,
    Environment: EnvironmentScreen
  },
  {
    initialRouteName: 'Dashboard',
  }
);

const App = createAppContainer(MainNavigator);

export default App;