import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { find } from 'lodash';
import RSS from '../constants/RSS';
import API from '../constants/API';

async function clearSeen(data) {
  const seenItems = await AsyncStorage.getItem('seenCards');

  if (seenItems) {
    const newData = [];
    data.data.items.map((item) => {
      const isSeen = find(JSON.parse(seenItems), { link: item.link });

      if (!isSeen) {
        newData.push(item);
      }
      return null;
    });
    return {
      data: {
        items: newData,
      },
    };
  }
  return data;
}

const Feed = {
  feed: name => axios({
    url: RSS.rss2json,
    method: 'GET',
    params: {
      rss_url: RSS[name],
      api_key: API.rss2json,
      count: 100,
    },
  }).then(data => clearSeen(data)),
};

const CustomFeed = {
  feed: url => axios({
    url: RSS.rss2json,
    method: 'GET',
    params: {
      rss_url: url,
      api_key: API.rss2json,
      count: 100,
    },
  }).then(data => clearSeen(data)),
};


export default {
  Feed, CustomFeed,
};
