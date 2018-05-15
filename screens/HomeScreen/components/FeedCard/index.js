import PropTypes from 'prop-types';
import React from 'react';
import { View, Image, Text } from 'react-native';
import { CardItem, Body, Card } from 'native-base';
import { Entypo } from '@expo/vector-icons';

import Layout from '../../../../constants/Layout';

const FeedCard = (props) => {
  const { cardData } = props;

  let pic = 'https://www.rbs.ca/wp-content/themes/rbs/images/news-placeholder.png';

  if (cardData.enclosure) {
    if (cardData.enclosure.link) {
      if (cardData.enclosure.link.length > 0) {
        pic = cardData.enclosure.link;
      }
    } else if (cardData.enclosure.thumbnail) {
      if (cardData.enclosure.thumbnail.length > 0) {
        pic = cardData.enclosure.thumbnail;
      }
    }
  }

  const trimmedTitle = cardData.title.substring(0, 100).replace(/<\/?[^>]+(>|$)/g, '');
  const trimmedDescription = cardData.description.substring(0, 300).replace(/<\/?[^>]+(>|$)/g, '');

  return (
    <Card style={{
      marginRight: 30,
      marginLeft: 30,
      borderRadius: 20,
      elevation: 1,
      width: Layout.window.width - 50,
      marginBottom: 30,
    }}
    >
      <CardItem cardBody>
        <Image borderTopLeftRadius={20} borderTopRightRadius={20} source={{ uri: pic }} style={{ height: 200, width: null, flex: 1 }} />
      </CardItem>
      <CardItem style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <Body>
          <Text style={{ fontFamily: 'nunito-bold', fontSize: 16, marginBottom: 14 }}>{trimmedTitle}</Text>
          <Text style={{ fontFamily: 'nunito-regular', fontSize: 11, color: 'rgba(0,0,0,.6)' }}>
            {trimmedDescription}
          </Text>
        </Body>
      </CardItem>
      <CardItem
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
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
