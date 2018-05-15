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

const CNN = {
  feed: () => axios({
    url: RSS.rss2json,
    method: 'GET',
    params: {
      rss_url: RSS.cnnEdition,
      api_key: API.rss2json,
      count: 100,
    },
  }).then(data => clearSeen(data)),
};

const BBC = {
  feed: () => axios({
    url: RSS.rss2json,
    method: 'GET',
    params: {
      rss_url: RSS.BBC,
      api_key: API.rss2json,
      count: 100,
    },
  }).then(data => clearSeen(data)),
};

const washingtonPost = {
  feed: () => axios({
    url: RSS.rss2json,
    method: 'GET',
    params: {
      rss_url: RSS.washingtonPost,
      api_key: API.rss2json,
      count: 100,
    },
  }).then(data => clearSeen(data)),
};

const independent = {
  feed: () => axios({
    url: RSS.rss2json,
    method: 'GET',
    params: {
      rss_url: RSS.independent,
      api_key: API.rss2json,
      count: 100,
    },
  }).then(data => clearSeen(data)),
};

const techRadar = {
  feed: () => axios({
    url: RSS.rss2json,
    method: 'GET',
    params: {
      rss_url: RSS.techRadar,
      api_key: API.rss2json,
      count: 100,
    },
  }).then(data => clearSeen(data)),
};

const FIFA = {
  feed: () => axios({
    url: RSS.rss2json,
    method: 'GET',
    params: {
      rss_url: RSS.FIFA,
      api_key: API.rss2json,
      count: 100,
    },
  }).then(data => clearSeen(data)),
};

export default {
  CNN, BBC, washingtonPost, independent, techRadar, FIFA,
};
