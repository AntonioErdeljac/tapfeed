import PropTypes from 'prop-types';
import React from 'react';
import {
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
  View,
} from 'react-native';
import { CardItem, Body, Container, Thumbnail, Left, Text, Content, Input, Item } from 'native-base';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { find } from 'lodash';
import * as Animatable from 'react-native-animatable';

import { loadFeed, loadSaved } from '../HomeScreen/actions';

import Agent from '../../agent';
import Layout from '../../constants/Layout';

const AnimatableThumbnail = Animatable.createAnimatableComponent(Thumbnail);

class AddSourceScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      rssLink: '',
      rssTitle: '',
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleSubmitSource = this.handleSubmitSource.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Feed');
    return true;
  }

  async handleSubmitSource() {
    const { rssLink, rssTitle } = this.state;
    const { navigation } = this.props;

    const savedSources = await AsyncStorage.getItem('savedSources');

    const parsedSavedSources = JSON.parse(savedSources);

    if (parsedSavedSources) {
      const sourceExists = find(parsedSavedSources, { url: rssLink });

      if (!sourceExists) {
        parsedSavedSources.push({ title: rssTitle, url: rssLink });
        return AsyncStorage.setItem('savedSources', JSON.stringify(parsedSavedSources))
          .then(() => navigation.navigate('Feed'));
      }
    }
    const sources = [];
    sources.push({ title: rssTitle, url: rssLink });
    return AsyncStorage.setItem('savedSources', JSON.stringify(sources))
      .then(() => navigation.navigate('Feed'));
  }

  render() {
    const { source, navigation } = this.props;

    return (
      <Container style={{ paddingTop: 20, backgroundColor: '#fff' }}>
        <CardItem>
          <Left>
            <AnimatableThumbnail ref={(ref) => { this.logo = ref; }} source={require('../../assets/images/iconnav.png')} />
            <Body>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Feed')}>
                <Text style={{ color: '#1fcf7c', fontFamily: 'nunito-bold', fontSize: 25 }}>
                  Add a source&nbsp;
                  <Entypo
                    name="chevron-up"
                    size={20}
                    style={{ paddingLeft: 10 }}
                    color="#1fcf7c"
                  />
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'rgba(0,0,0,.3)',
                  fontFamily: 'nunito-regular',
                  fontSize: 14,
                }}
              >
                Add your own feed
              </Text>
            </Body>
          </Left>
        </CardItem>
        <Content>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
            <Item regular style={{ width: Layout.window.width - 20, borderRadius: 5 }}>
              <Input onChangeText={text => this.setState({ rssTitle: text })} placeholderTextColor="rgba(0,0,0,.3)" placeholder="Title" style={{ fontFamily: 'nunito-regular', borderRadius: 5 }} />
            </Item>
            <Item regular style={{ width: Layout.window.width - 20, borderRadius: 5, marginTop: 15 }}>
              <Input onChangeText={text => this.setState({ rssLink: text })} placeholderTextColor="rgba(0,0,0,.3)" placeholder="RSS link" style={{ fontFamily: 'nunito-regular', borderRadius: 5 }} />
            </Item>
            <TouchableOpacity
              style={{
                width: Layout.window.width - 20,
                backgroundColor: '#1fcf7c',
                borderRadius: 5,
                marginTop: 30,
                padding: 12,
              }}
              onPress={this.handleSubmitSource}
            >
              <Text style={{
                color: '#fff',
                fontFamily: 'nunito-regular',
                fontSize: 18,
                textAlign: 'center',
              }}
              >Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  source: state.source.source,
});

const mapDispatchToProps = dispatch => ({
  onLoadFeed: payload => payload.then(data => dispatch(loadFeed(data))),
  onLoadSaved: cards => dispatch(loadSaved(cards)),
});

AddSourceScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onLoadFeed: PropTypes.func.isRequired,
  onLoadSaved: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSourceScreen);
