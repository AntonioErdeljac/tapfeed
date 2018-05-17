import PropTypes from 'prop-types';
import React from 'react';
import SwipeCards from 'react-native-swipe-cards';
import {
  View,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import { CardItem, Body, Container, Thumbnail, Left, Text } from 'native-base';
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { find, remove } from 'lodash';
import * as Animatable from 'react-native-animatable';

import { saveCard, ignoreCard, loadSaved, loadFeed } from './actions';
import { FeedCard, Empty } from './components';

import Names from '../../constants/Names';

const AnimatableThumbnail = Animatable.createAnimatableComponent(Thumbnail);

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);

    this.handleYup = this.handleYup.bind(this);
    this.handleNope = this.handleNope.bind(this);
  }

  async handleYup(card) {
    const { onSaveCard, source } = this.props;

    if (Names[source.type][source.name]) {
      if (Names[source.type][source.name].name !== 'saved') {
        const seenCards = await AsyncStorage.getItem('seenCards');
        const parsedSeenCards = JSON.parse(seenCards);

        const updatedSeen = (parsedSeenCards || []).concat(card);
        AsyncStorage.setItem('seenCards', JSON.stringify(updatedSeen));
      }

      if (Names[source.type][source.name].name !== 'saved') {
        this.logo.rotate(500);
        const item = await AsyncStorage.getItem('savedCards');
        if (item) {
          const parsedItem = JSON.parse(item);
          const alreadyExists = find(parsedItem, { link: card.link });
          if (!alreadyExists) {
            const updatedSaved = (JSON.parse(item) || []).concat([card]);
            return AsyncStorage.setItem('savedCards', JSON.stringify(updatedSaved))
              .then(() => onSaveCard(card));
          }
          return onSaveCard(card);
        }
        const updatedSaved = (JSON.parse(item) || []).concat([card]);
        return AsyncStorage.setItem('savedCards', JSON.stringify(updatedSaved))
          .then(() => onSaveCard(card));
      }
    } else {
      this.logo.rotate(500);
      const item = await AsyncStorage.getItem('savedCards');
      if (item) {
        const parsedItem = JSON.parse(item);
        const alreadyExists = find(parsedItem, { link: card.link });
        if (!alreadyExists) {
          const updatedSaved = (JSON.parse(item) || []).concat([card]);
          return AsyncStorage.setItem('savedCards', JSON.stringify(updatedSaved))
            .then(() => onSaveCard(card));
        }
        return onSaveCard(card);
      }
      const updatedSaved = (JSON.parse(item) || []).concat([card]);
      return AsyncStorage.setItem('savedCards', JSON.stringify(updatedSaved))
        .then(() => onSaveCard(card));
    }
    return onSaveCard(card);
  }

  async handleNope(card) {
    const { onIgnoreCard, source } = this.props;

    if (Names[source.type][source.name]) {
      if (Names[source.type][source.name].name === 'Saved') {
        const savedCards = await AsyncStorage.getItem('savedCards');
        const parsedSavedCards = JSON.parse(savedCards);

        remove(parsedSavedCards, {
          link: card.link,
        });

        AsyncStorage.setItem('savedCards', JSON.stringify(parsedSavedCards));
      }

      if (Names[source.type][source.name].name !== 'Saved') {
        const seenCards = await AsyncStorage.getItem('seenCards');
        const parsedSeenCards = JSON.parse(seenCards);

        const updatedSeen = (parsedSeenCards || []).concat(card);
        AsyncStorage.setItem('seenCards', JSON.stringify(updatedSeen));
      }
    } else {
      const seenCards = await AsyncStorage.getItem('seenCards');
      const parsedSeenCards = JSON.parse(seenCards);

      const updatedSeen = (parsedSeenCards || []).concat(card);
      AsyncStorage.setItem('seenCards', JSON.stringify(updatedSeen));
    }

    return onIgnoreCard(card);
  }

  render() {
    const { cards, source } = this.props;

    let content = <ActivityIndicator size="large" color="#1fcf7c" />;

    if (cards) {
      content = (
        <SwipeCards
          cards={cards}
          renderCard={cardData => <FeedCard cardData={cardData} sourceType={source.type} />}
          handleNope={this.handleNope}
          handleYup={this.handleYup}
          yupText={source.name !== 'saved' ? 'Save' : 'Keep'}
          nopeText={source.name !== 'saved' ? 'Ignore' : 'Remove'}
          onClickHandler={() => null}
          yupTextStyle={{ color: '#fff', fontFamily: 'nunito-regular' }}
          yupStyle={{
            backgroundColor: '#1fcf7c',
            borderColor: 'transparent',
            margin: 30,
          }}
          smoothTransition
          nopeTextStyle={{ color: '#fff', fontFamily: 'nunito-regular' }}
          nopeStyle={{ backgroundColor: '#EF4836', borderColor: 'transparent', margin: 30 }}
          showMaybe={false}
          handleMaybe={card => WebBrowser.openBrowserAsync(card.link)}
          hasMaybeAction
          loop={false}
          renderNoMoreCards={() => <Empty />}
        />
      );
    }

    return (
      <Container style={{ paddingTop: 20, backgroundColor: '#fff' }}>
        <CardItem>
          <Left>
            <AnimatableThumbnail ref={(ref) => { this.logo = ref; }} source={require('../../assets/images/iconnav.png')} />
            <Body>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Feed')}>
                <Text style={{ color: '#1fcf7c', fontFamily: 'nunito-bold', fontSize: 25 }}>
                  {Names[source.type][source.name] ? Names[source.type][source.name].name : source.name}&nbsp;
                  <Entypo
                    name="chevron-down"
                    size={20}
                    style={{ paddingLeft: 10 }}
                    color="#1fcf7c"
                  />
                </Text>
              </TouchableOpacity>
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

const mapStateToProps = state => ({
  cards: state.home.cards,
  source: state.source.source,
});

const mapDispatchToProps = dispatch => ({
  onLoadFeed: payload => payload.then(data => dispatch(loadFeed(data))),
  onSaveCard: card => dispatch(saveCard(card)),
  onIgnoreCard: card => dispatch(ignoreCard(card)),
  onLoadSaved: cards => dispatch(loadSaved(cards)),
});

HomeScreen.defaultProps = {
  cards: undefined,
};

HomeScreen.propTypes = {
  source: PropTypes.shape({}).isRequired,
  onIgnoreCard: PropTypes.func.isRequired,
  onSaveCard: PropTypes.func.isRequired,
  cards: PropTypes.instanceOf(Array),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
