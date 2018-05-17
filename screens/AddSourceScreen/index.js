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

import changeSource from '../LinksScreen/actions';
import { loadFeed, loadSaved } from '../HomeScreen/actions';

import Layout from '../../constants/Layout';

import Agent from '../../agent';

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
    this.handleCustomSourceChange = this.handleCustomSourceChange.bind(this);
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

  handleCustomSourceChange(source) {
    const {
      onLoadFeed,
      onChangeSource,
      navigation,
    } = this.props;


    return AsyncStorage.setItem('savedSource', JSON.stringify(source))
      .then(async () => onLoadFeed(Agent.CustomFeed.feed(source.url))
        .then(() => {
          onChangeSource(source);
          navigation.navigate('Home');
        }));
  }

  async handleSubmitSource() {
    const { rssLink, rssTitle } = this.state;
    const { navigation, onLoadFeed } = this.props;

    onLoadFeed(Agent.CustomFeed.feed(rssLink))
      .then(async () => {
        const savedSources = await AsyncStorage.getItem('savedSources');

        const parsedSavedSources = JSON.parse(savedSources);

        if (parsedSavedSources) {
          const sourceExists = find(parsedSavedSources, { url: rssLink });

          if (!sourceExists) {
            parsedSavedSources.push({ title: rssTitle, url: rssLink });
            return AsyncStorage.setItem('savedSources', JSON.stringify(parsedSavedSources))
              .then(() => this.handleCustomSourceChange({ type: 'custom', name: rssTitle, url: rssLink }));
          }
        }
        const sources = [];
        sources.push({ title: rssTitle, url: rssLink });
        return AsyncStorage.setItem('savedSources', JSON.stringify(sources))
          .then(() => this.handleCustomSourceChange({ type: 'custom', name: rssTitle, url: rssLink }));
      });
  }

  render() {
    const { rssTitle, rssLink } = this.state;

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
              <Input value={rssTitle} onChangeText={text => this.setState({ rssTitle: text })} placeholderTextColor="rgba(0,0,0,.3)" placeholder="Title" style={{ fontFamily: 'nunito-regular', borderRadius: 5 }} />
            </Item>
            <Item regular style={{ width: Layout.window.width - 20, borderRadius: 5, marginTop: 15 }}>
              <Input value={rssLink} onChangeText={text => this.setState({ rssLink: text })} placeholderTextColor="rgba(0,0,0,.3)" placeholder="RSS link" style={{ fontFamily: 'nunito-regular', borderRadius: 5 }} />
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
  onChangeSource: source => dispatch(changeSource(source)),
  onLoadFeed: payload => payload.then(data => dispatch(loadFeed(data))),
  onLoadSaved: cards => dispatch(loadSaved(cards)),
});

AddSourceScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSourceScreen);
