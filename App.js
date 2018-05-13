import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import RootNavigation from './navigation/RootNavigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
    };
  }

  _loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
      require('./assets/images/iconnav.png'),
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      muli: require('./assets/fonts/Muli-Regular.ttf'),
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
      'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
      'lato-light': require('./assets/fonts/Lato-Light.ttf'),
      'muli-regular': require('./assets/fonts/Muli-Regular.ttf'),
      'nanumgothic-regular': require('./assets/fonts/NanumGothic-Regular.ttf'),
      'nanumgothic-bold': require('./assets/fonts/NanumGothic-Bold.ttf'),
      'nanumgothic-extraBold': require('./assets/fonts/NanumGothic-ExtraBold.ttf'),
      'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
      'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
      'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
      'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    }),
  ]);

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <RootNavigation />
      </View>
    );
  }
}

App.defaultProps = {
  skipLoadingScreen: false,
};

App.propTypes = {
  skipLoadingScreen: PropTypes.bool,
};
