export default (state = { source: { type: 'sport', name: 'foxSports' } }, action) => {
  switch (action.type) {
    case 'CHANGE_SOURCE':
      return {
        ...state,
        source: action.source,
      };
    default:
      return state;
  }
};
