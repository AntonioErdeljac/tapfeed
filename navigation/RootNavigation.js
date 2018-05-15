import React from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import Agent from '../agent';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import changeSource from '../screens/LinksScreen/actions';
import { loadFeed, loadSaved } from '../screens/HomeScreen/actions';

const AppNavigator = createSwitchNavigator({
  Main: MainTabNavigator,
});

class RootNavigation extends React.Component {
  async componentDidMount() {
    const { onChangeSource, onLoadFeed, onLoadSaved } = this.props;
    const savedSource = await AsyncStorage.getItem('savedSource');
    const parsedSavedSource = JSON.parse(savedSource);

    if (parsedSavedSource) {
      onChangeSource(parsedSavedSource);

      if (parsedSavedSource.name === 'saved') {
        const savedCards = await AsyncStorage.getItem('savedCards');
        onLoadSaved(JSON.parse(savedCards));
      } else {
        onLoadFeed(Agent.Feed.feed(parsedSavedSource.name));
      }
    }

    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    if (this._notificationSubscription) {
      this._notificationSubscription.remove();
    }
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };

  render() {
    return <AppNavigator />;
  }
}

const mapDispatchToProps = dispatch => ({
  onChangeSource: source => dispatch(changeSource(source)),
  onLoadFeed: payload => payload.then(data => dispatch(loadFeed(data))),
  onLoadSaved: cards => dispatch(loadSaved(cards)),
});

export default connect(null, mapDispatchToProps)(RootNavigation);
