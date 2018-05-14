import { find } from 'lodash';

export default (state = { seenCards: [] }, action) => {
  switch (action.type) {
    case 'GET_INDEPENDENT':
      return {
        ...state,
        cards: action.payload.data.items.map((card) => {
          const isSeen = find(state.seenCards, { link: card.link });

          if (!isSeen) {
            return card;
          }
          return null;
        }).filter(card => card !== null),
      };
    case 'GET_WASHINGTON_POST':
      return {
        ...state,
        cards: action.payload.data.items.map((card) => {
          const isSeen = find(state.seenCards, { link: card.link });

          if (!isSeen) {
            return card;
          }
          return null;
        }).filter(card => card !== null),
      };
    case 'GET_BBC':
      return {
        ...state,
        cards: action.payload.data.items.map((card) => {
          const isSeen = find(state.seenCards, { link: card.link });

          if (!isSeen) {
            return card;
          }
          return null;
        }).filter(card => card !== null),
      };
    case 'GET_CNN_EDITION':
      return {
        ...state,
        cards: action.payload.data.items.map((card) => {
          const isSeen = find(state.seenCards, { link: card.link });

          if (!isSeen) {
            return card;
          }
          return null;
        }).filter(card => card !== null),
      };
    case 'REMOVE_CARD':
      return {
        ...state,
        seenCards: state.seenCards.concat(action.card),
        cards: state.cards.filter(foundCard => foundCard.link !== action.card.link),
      };
    case 'SET_SAVED':
      return {
        ...state,
        cards: action.cards,
      };
    default:
      return state;
  }
};
