import PropTypes from 'prop-types';
import React from 'react';
import { View, Image, Text } from 'react-native';
import { CardItem, Body, Card } from 'native-base';
import { Entypo } from '@expo/vector-icons';

import Layout from '../../../../constants/Layout';

const FeedCard = (props) => {
  const { cardData } = props;

  return (
    <Card style={{
      marginRight: 20,
      marginLeft: 20,
      borderRadius: 10,
      elevation: 1,
      width: Layout.window.width - 20,
    }}
    >
      <CardItem cardBody>
        <Image borderTopLeftRadius={10} borderTopRightRadius={10} source={{ uri: cardData.enclosure ? cardData.enclosure.link : 'https://www.rbs.ca/wp-content/themes/rbs/images/news-placeholder.png' }} style={{ height: 200, width: null, flex: 1 }} />
      </CardItem>
      <CardItem style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
        <Body>
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 18, marginBottom: 14 }}>{cardData.title}</Text>
          <Text style={{ fontFamily: 'nunito-regular', fontSize: 13, color: 'rgba(0,0,0,.6)' }}>
            {cardData.description}
          </Text>
        </Body>
      </CardItem>
      <CardItem
        style={{
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          margin: 0,
          padding: 0,
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Entypo
            name="chevron-thin-up"
            size={35}
            color="rgba(0,0,0,.3)"
          />
          <Text style={{ textAlign: 'center', fontFamily: 'nunito-regular', color: 'rgba(0,0,0,.3)' }}>Swipe to read</Text>
        </View>
      </CardItem>
    </Card>
  );
};

FeedCard.propTypes = {
  cardData: PropTypes.shape({}).isRequired,
};

export default FeedCard;
