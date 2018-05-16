import PropTypes from 'prop-types';
import React from 'react';
import {
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import { CardItem, Body, Container, Thumbnail, Left, Text, Tabs, Tab, ScrollableTab, Content, Card } from 'native-base';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import changeSource from './actions';
import { loadFeed, loadSaved } from '../HomeScreen/actions';

import Names from '../../constants/Names';
import TabsPosition from '../../constants/TabsPosition';

import Agent from '../../agent';

const AnimatableThumbnail = Animatable.createAnimatableComponent(Thumbnail);

class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      activePage: 0,
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidMount() {
    const { source } = this.props;

    setTimeout(() => {
      this.setState({ activePage: TabsPosition[source.type] });
    }, 0);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Home');
    return true;
  }

  handleSourceChange(source) {
    const {
      onLoadFeed, onChangeSource, navigation, onLoadSaved,
    } = this.props;


    return AsyncStorage.setItem('savedSource', JSON.stringify(source))
      .then(async () => {
        if (source.name === 'saved') {
          const savedCards = await AsyncStorage.getItem('savedCards');

          return Promise.resolve(onLoadSaved(JSON.parse(savedCards)))
            .then(() => {
              onChangeSource(source);
              navigation.navigate('Home');
            });
        }

        return onLoadFeed(Agent.Feed.feed(source.name))
          .then(() => {
            onChangeSource(source);
            navigation.navigate('Home');
          });
      });
  }

  render() {
    const { source } = this.props;
    const { activePage } = this.state;

    return (
      <Container style={{ paddingTop: 20, backgroundColor: '#fff' }}>
        <CardItem>
          <Left>
            <AnimatableThumbnail ref={(ref) => { this.logo = ref; }} source={require('../../assets/images/iconnav.png')} />
            <Body>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                <Text style={{ color: '#1fcf7c', fontFamily: 'nunito-bold', fontSize: 25 }}>
                  Pick a source&nbsp;
                  <Entypo
                    name="chevron-up"
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
                Updated every week
              </Text>
            </Body>
          </Left>
        </CardItem>
        <Tabs
          page={activePage}
          tabBarUnderlineStyle={{ borderBottomColor: '#fff', elevation: 0, borderBottomWidth: 0 }}
          style={{ borderBottomWidth: 0, borderBottomColor: '#fff', elevation: 0 }}
          renderTabBar={() => (<ScrollableTab style={{
            backgroundColor: '#fff', elevation: 0, borderBottomColor: '#fff', borderWidth: 0,
          }}
          />)}
        >
          <Tab tabStyle={{ backgroundColor: '#fff', borderColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff', borderColor: '#fff' }} activeTextStyle={{ color: '#1fcf7c', fontFamily: 'nunito-bold', fontWeight: 'normal' }} textStyle={{ color: '#1fcf7c', fontFamily: 'nunito-regular' }} heading="Sport">
            <Content>
              <Card style={{ elevation: 0, borderColor: '#fff' }}>
                {Object.keys(Names.sport).map(feed => (
                  <CardItem button onPress={() => this.handleSourceChange({ type: 'sport', name: `${feed}` })} key={Names.sport[feed].name} style={{ elevation: 0, borderColor: '#fff' }}>
                    <Thumbnail source={{ uri: Names.sport[feed].img }} />
                    <Text style={{ color: 'rgba(0,0,0,.5)', fontFamily: 'nunito-regular', paddingLeft: 20 }}>{Names.sport[feed].name}</Text>
                  </CardItem>
                ))}
              </Card>
            </Content>
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#fff', borderColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff', borderColor: '#fff' }} activeTextStyle={{ color: '#1fcf7c', fontFamily: 'nunito-bold', fontWeight: 'normal' }} textStyle={{ color: '#1fcf7c', fontFamily: 'nunito-regular' }} heading="Politics">
            <Content>
              <Card style={{ elevation: 0, borderColor: '#fff' }}>
                {Object.keys(Names.politics).map(feed => (
                  <CardItem button onPress={() => this.handleSourceChange({ type: 'politics', name: `${feed}` })} key={Names.politics[feed].name} style={{ elevation: 0, borderColor: '#fff' }}>
                    <Thumbnail source={{ uri: Names.politics[feed].img }} />
                    <Text style={{ color: 'rgba(0,0,0,.5)', fontFamily: 'nunito-regular', paddingLeft: 20 }}>{Names.politics[feed].name}</Text>
                  </CardItem>
              ))}
              </Card>
            </Content>
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#fff', borderColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff', borderColor: '#fff' }} activeTextStyle={{ color: '#1fcf7c', fontFamily: 'nunito-bold', fontWeight: 'normal' }} textStyle={{ color: '#1fcf7c', fontFamily: 'nunito-regular' }} heading="Technology">
            <Content>
              <Card style={{ elevation: 0, borderColor: '#fff' }}>
                {Object.keys(Names.technology).map(feed => (
                  <CardItem button onPress={() => this.handleSourceChange({ type: 'technology', name: `${feed}` })} key={Names.technology[feed].name} style={{ elevation: 0, borderColor: '#fff' }}>
                    <Thumbnail source={{ uri: Names.technology[feed].img }} />
                    <Text style={{ color: 'rgba(0,0,0,.5)', fontFamily: 'nunito-regular', paddingLeft: 20 }}>{Names.technology[feed].name}</Text>
                  </CardItem>
              ))}
              </Card>
            </Content>
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#fff', borderColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff', borderColor: '#fff' }} activeTextStyle={{ color: '#1fcf7c', fontFamily: 'nunito-bold', fontWeight: 'normal' }} textStyle={{ color: '#1fcf7c', fontFamily: 'nunito-regular' }} heading="Entertainment">
            <Content>
              <Card style={{ elevation: 0, borderColor: '#fff' }}>
                {Object.keys(Names.entertainment).map(feed => (
                  <CardItem button onPress={() => this.handleSourceChange({ type: 'entertainment', name: `${feed}` })} key={Names.entertainment[feed].name} style={{ elevation: 0, borderColor: '#fff' }}>
                    <Thumbnail source={{ uri: Names.entertainment[feed].img }} />
                    <Text style={{ color: 'rgba(0,0,0,.5)', fontFamily: 'nunito-regular', paddingLeft: 20 }}>{Names.entertainment[feed].name}</Text>
                  </CardItem>
              ))}
              </Card>
            </Content>
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#fff', borderColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff', borderColor: '#fff' }} activeTextStyle={{ color: '#1fcf7c', fontFamily: 'nunito-bold', fontWeight: 'normal' }} textStyle={{ color: '#1fcf7c', fontFamily: 'nunito-regular' }} heading="Custom">
            <Content>
              <Card style={{ elevation: 0, borderColor: '#fff' }}>
                <CardItem button onPress={() => this.handleSourceChange({ type: 'custom', name: 'saved' })} key="saved" style={{ elevation: 0, borderColor: '#fff' }}>
                  <Thumbnail source={require('../../assets/images/iconnav.png')} />
                  <Text style={{ color: 'rgba(0,0,0,.5)', fontFamily: 'nunito-regular', paddingLeft: 20 }}>Saved</Text>
                </CardItem>
              </Card>
            </Content>
          </Tab>
        </Tabs>
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

LinksScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onLoadFeed: PropTypes.func.isRequired,
  onChangeSource: PropTypes.func.isRequired,
  onLoadSaved: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinksScreen);
