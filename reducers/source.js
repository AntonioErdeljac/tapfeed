export default (state = { source: { type: 'politics', name: 'CNN' } }, action) => {
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
