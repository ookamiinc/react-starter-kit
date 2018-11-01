import { VERIFY_AUTH_TOKEN } from '../constants/actionType';

const UNAUTHORIZED = 401;
const initialState = {
  error: null,
  loggedIn: false,
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VERIFY_AUTH_TOKEN: {
      if (action.error) {
        return Object.assign({}, state, {
          error: action.payload,
          loggedIn: false,
          user: {},
        });
      }
      return Object.assign({}, state, {
        error: null,
        loggedIn: true,
        user: action.payload.user,
      });
    }
    default: {
      if (action.error && action.meta && action.meta.status === UNAUTHORIZED) {
        return Object.assign({}, state, {
          loggedIn: false,
          user: {},
        });
      }
      return state;
    }
  }
}
