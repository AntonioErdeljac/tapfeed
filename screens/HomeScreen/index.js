import React from 'react';
import SwipeCards from 'react-native-swipe-cards';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import { CardItem, Body, Container, Title, Thumbnail, Left, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { WebBrowser } from 'expo';

import RSS from '../../constants/RSS';

import { FeedCard } from './components';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      cards: undefined,
    };

    this.handleMaybe = this.handleMaybe.bind(this);
    this.handleYup = this.handleYup.bind(this);
    this.handleNope = this.handleNope.bind(this);
  }

  componentDidMount() {
    axios({
      url: RSS.rss2json,
      method: 'GET',
      params: {
        rss_url: RSS.cnnEdition,
        api_key: '0zfazjfy2xpoevwvjfef4ceubojwlgz1zw1xrulk',
        count: 100,
      },
    }).then(data => this.setState({ cards: data.data.items }, () => {
      axios({
        url: RSS.rss2json,
        method: 'GET',
        params: {
          rss_url: RSS.foxMostPopular,
          api_key: '0zfazjfy2xpoevwvjfef4ceubojwlgz1zw1xrulk',
          count: 100,
        },
      }).then(foxData => this.setState({ cards: this.state.cards.concat(foxData.data.items) }));
    }));
  }

  handleMaybe(card) {
    WebBrowser.openBrowserAsync(card.link);
  }

  handleYup(card) {
    const { cards } = this.state;

    this.setState({
      cards: cards.filter(foundCard => foundCard.link !== card.link),
    });
  }

  handleNope(card) {
    const { cards } = this.state;

    this.setState({
      cards: cards.filter(foundCard => foundCard.link !== card.link),
    });
  }

  render() {
    const { cards } = this.state;

    let content = <ActivityIndicator size="large" color="#1fcf7c" />;

    if (cards) {
      content = (
        <SwipeCards
          cards={cards}
          renderCard={cardData => <FeedCard cardData={cardData} />}
          renderNoMoreCards={() => null}
          handleNope={this.handleNope}
          handleYup={this.handleYup}
          yupText="Save"
          nopeText="Ignore"
          yupTextStyle={{ color: '#fff', fontFamily: 'nunito-regular' }}
          yupStyle={{ backgroundColor: '#1fcf7c', borderColor: 'transparent', margin: 30 }}
          nopeTextStyle={{ color: '#fff', fontFamily: 'nunito-regular' }}
          nopeStyle={{ backgroundColor: '#EF4836', borderColor: 'transparent', margin: 30 }}
          showMaybe={false}
          handleMaybe={this.handleMaybe}
          hasMaybeAction
        />
      );
    }
    return (
      <Container style={{ paddingTop: 20, backgroundColor: '#fff' }}>
        <CardItem>
          <Left>
            <Thumbnail source={require('../../assets/images/iconnav.png')} />
            <Body>
              <Text style={{ color: '#1fcf7c', fontFamily: 'nunito-bold', fontSize: 25 }}>
                Trending
              </Text>
              <Text style={{
                color: 'rgba(0,0,0,.3)',
                fontFamily: 'nunito-regular',
                fontSize: 14,
              }}
              >
                {cards && cards.length} News
              </Text>
            </Body>
          </Left>
        </CardItem>
        <View style={{ flex: 1 }}>
          {content}
        </View>
      </Container>
    );
  }
}
