import React from 'react';
import { View, Text } from 'react-native';
import { CardItem, Card } from 'native-base';

import Layout from '../../../../constants/Layout';

const Empty = () => (
  <Card style={{
      marginRight: 20,
      marginLeft: 20,
      borderRadius: 10,
      borderColor: 'transparent',
      elevation: 0,
      width: Layout.window.width - 20,
    }}
  >
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
        <Text style={{
          textAlign: 'center',
          fontFamily: 'nunito-regular',
          color: 'rgba(0,0,0,.3)',
          fontSize: 25,
          marginBottom: 20,
        }}
        >
          Come back later for more!
        </Text>
        <Text style={{
          textAlign: 'center',
          fontFamily: 'nunito-regular',
          color: 'rgba(0,0,0,.3)',
          fontSize: 12,
        }}
        >
          Want to contact me?
        </Text>

        <Text style={{
          textAlign: 'center',
          fontFamily: 'nunito-regular',
          color: 'rgba(0,0,0,.3)',
          fontSize: 12,
        }}
        >
          erdeljacapps@gmail.com
        </Text>
      </View>
    </CardItem>
  </Card>
);

export default Empty;
