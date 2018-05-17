import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import AddSourceScreen from '../screens/AddSourceScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Feed: LinksScreen,
  AddSource: AddSourceScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarVisible: false,
};


export default createBottomTabNavigator({
  HomeStack,
});
