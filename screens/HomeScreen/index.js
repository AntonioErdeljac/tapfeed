import PropTypes from 'prop-types';
import React from 'react';
import SwipeCards from 'react-native-swipe-cards';
import {
  View,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { CardItem, Body, Container, Thumbnail, Left, Text } from 'native-base';
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { find } from 'lodash';
import * as Animatable from 'react-native-animatable';


import { saveCard, ignoreCard, loadSaved, loadFeed } from './actions';
import { FeedCard, Empty, Menu } from './components';

import Agent from '../../agent';
import Layout from '../../constants/Layout';
import Names from '../../constants/Names';

const AnimatableThumbnail = Animatable.createAnimatableComponent(Thumbnail);

const styles = {
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    zIndex: 100000,
    height: Layout.window.height,
    width: Layout.window.width,
    backgroundColor: 'white',
    opacity: 0.98,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      tab: 'CNN',
      showMenu: false,
    };

    this.handleYup = this.handleYup.bind(this);
    this.handleNope = this.handleNope.bind(this);
    this.handleToggleTab = this.handleToggleTab.bind(this);
    this.handleSelectTab = this.handleSelectTab.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }


  componentDidMount() {
    const { onLoadFeed } = this.props;

    onLoadFeed(Agent.CNN.feed());
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    const { showMenu } = this.state;

    if (showMenu) {
      return this.menu.fadeOutUp(800)
        .then(() => this.setState({ showMenu: false }, () => true));
    }
    return false;
  }

  handleToggleTab() {
    this.setState({
      showMenu: true,
    }, () => {
      this.menu.fadeInDown(800);
    });
  }

  handleSelectTab(tab) {
    const {
      onLoadSaved,
      onLoadFeed,
    } = this.props;


    if (tab !== 'saved') {
      this.setState({
        tab,
      }, () => {
        onLoadFeed(Agent[tab].feed())
          .then(() => {
            this.menu.fadeOutUp(800)
              .then(() => {
                this.setState({
                  showMenu: false,
                });
              });
          });
      });
    }

    if (tab === 'saved') {
      this.setState({
        tab: 'saved',
      }, () => {
        this.menu.fadeOutUp(800)
          .then(() => {
            this.setState({
              showMenu: false,
            });
          });
      });
      AsyncStorage.getItem('savedCards')
        .then((savedItems) => {
          onLoadSaved(JSON.parse(savedItems));
        });
    }
  }

  async handleYup(card) {
    const { onSaveCard } = this.props;
    const { tab } = this.state;

    if (tab !== 'saved') {
      const seenCards = await AsyncStorage.getItem('seenCards');
      const parsedSeenCards = JSON.parse(seenCards);

      const updatedSeen = (parsedSeenCards || []).concat(card);
      AsyncStorage.setItem('seenCards', JSON.stringify(updatedSeen));
    }

    if (tab !== 'saved') {
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
    const { onIgnoreCard } = this.props;
    const { tab } = this.state;

    if (tab !== 'saved') {
      const seenCards = await AsyncStorage.getItem('seenCards');
      const parsedSeenCards = JSON.parse(seenCards);

      const updatedSeen = (parsedSeenCards || []).concat(card);
      AsyncStorage.setItem('seenCards', JSON.stringify(updatedSeen));
    }

    return onIgnoreCard(card);
  }

  render() {
    const { cards } = this.props;
    const { tab, showMenu } = this.state;

    let content = <ActivityIndicator size="large" color="#1fcf7c" />;

    if (cards) {
      content = (
        <SwipeCards
          cards={cards}
          renderCard={cardData => <FeedCard cardData={cardData} />}
          handleNope={this.handleNope}
          handleYup={this.handleYup}
          yupText="Save"
          nopeText="Ignore"
          onClickHandler={() => null}
          yupTextStyle={{ color: '#fff', fontFamily: 'nunito-regular' }}
          yupStyle={{
            backgroundColor: '#1fcf7c',
            borderColor: 'transparent',
            margin: 30,
          }}
          nopeTextStyle={{ color: '#fff', fontFamily: 'nunito-regular' }}
          nopeStyle={{ backgroundColor: '#EF4836', borderColor: 'transparent', margin: 30 }}
          showMaybe={false}
          showYup={tab !== 'saved'}
          showNope={tab !== 'saved'}
          handleMaybe={card => WebBrowser.openBrowserAsync(card.link)}
          hasMaybeAction
          loop={tab === 'saved'}
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
              <TouchableOpacity onPress={() => this.handleToggleTab()}>
                <Text style={{ color: '#1fcf7c', fontFamily: 'nunito-bold', fontSize: 25 }}>
                  {Names[tab]}&nbsp;
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
        {showMenu &&
          <Animatable.View
            ref={(ref) => { this.menu = ref; }}
            style={styles.menu}
          >
            <Menu handleSelectTab={this.handleSelectTab} tab={tab} show={showMenu} />
          </Animatable.View>
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.home.cards,
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
  onLoadSaved: PropTypes.func.isRequired,
  onIgnoreCard: PropTypes.func.isRequired,
  onSaveCard: PropTypes.func.isRequired,
  cards: PropTypes.instanceOf(Array),
  onLoadFeed: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
