function getCNN(payload) {
  return {
    type: 'GET_CNN_EDITION',
    payload,
  };
}

function saveCard(card) {
  return {
    type: 'REMOVE_CARD',
    card,
  };
}

function ignoreCard(card) {
  return {
    type: 'REMOVE_CARD',
    card,
  };
}

function loadSaved(cards) {
  return {
    type: 'SET_SAVED',
    cards,
  };
}

function getBBC(payload) {
  return {
    type: 'GET_BBC',
    payload,
  };
}

function getWashingtonPost(payload) {
  return {
    type: 'GET_WASHINGTON_POST',
    payload,
  };
}

function getIndependent(payload) {
  return {
    type: 'GET_INDEPENDENT',
    payload,
  };
}

export { getCNN, saveCard, ignoreCard, loadSaved, getBBC, getWashingtonPost, getIndependent };
