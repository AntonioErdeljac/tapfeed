import PropTypes from 'prop-types';
import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { Container, Content } from 'native-base';
import * as Animatable from 'react-native-animatable';
import Names from '../../../../constants/Names';
import Layout from '../../../../constants/Layout';


const styles = {
  selected: {
    color: 'rgba(31, 207, 124,1)',
    fontFamily: 'nunito-bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  disabled: {
    color: 'rgba(31, 207, 124, .5)',
    fontFamily: 'nunito-bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
};

class Menu extends React.Component {
  render() {
    const { tab, handleSelectTab } = this.props;

    const list = Object.keys(Names).map(name => (
      <TouchableOpacity key={name} onPress={() => handleSelectTab(name)}>
        <Animatable.Text transition="color" style={tab === name ? styles.selected : styles.disabled}>
          {Names[name]}
        </Animatable.Text>
      </TouchableOpacity>
    ));

    const content = (
      <View style={{ flex: 1, height: Layout.window.height }}>
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => handleSelectTab('saved')}>
            <Animatable.Text transition="color" style={tab === 'saved' ? styles.selected : styles.disabled}>
            Saved
            </Animatable.Text>
          </TouchableOpacity>
          {list}
          {list}
        </ScrollView>
      </View>
    );


    return content;
  }
}

Menu.propTypes = {
  tab: PropTypes.string.isRequired,
  handleSelectTab: PropTypes.func.isRequired,
};

export default Menu;
