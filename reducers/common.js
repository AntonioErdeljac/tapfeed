export default (state = {}, action) => {
  switch (action.type) {
    case 'APP_LOADED':
      return {
        ...state,

      };
    default:
      return state;
  }
};
