import PropTypes from 'prop-types';
import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

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


    const content = (
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => handleSelectTab('saved')}>
          <Animatable.Text transition="color" style={tab === 'saved' ? styles.selected : styles.disabled}>
              Saved
          </Animatable.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectTab('CNN')}>
          <Animatable.Text transition="color" style={tab === 'CNN' ? styles.selected : styles.disabled}>
              CNN
          </Animatable.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectTab('BBC')}>
          <Animatable.Text transition="color" style={tab === 'BBC' ? styles.selected : styles.disabled}>
              BBC
          </Animatable.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectTab('washingtonPost')}>
          <Animatable.Text transition="color" style={tab === 'washingtonPost' ? styles.selected : styles.disabled}>
              Washington Post
          </Animatable.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectTab('independent')}>
          <Animatable.Text transition="color" style={tab === 'independent' ? styles.selected : styles.disabled}>
              Independent
          </Animatable.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectTab('techRadar')}>
          <Animatable.Text transition="color" style={tab === 'techRadar' ? styles.selected : styles.disabled}>
              TechRadar
          </Animatable.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectTab('FIFA')}>
          <Animatable.Text transition="color" style={tab === 'FIFA' ? styles.selected : styles.disabled}>
              FIFA
          </Animatable.Text>
        </TouchableOpacity>
      </ScrollView>
    );


    return content;
  }
}

Menu.propTypes = {
  tab: PropTypes.string.isRequired,
  handleSelectTab: PropTypes.func.isRequired,
};

export default Menu;
