import {
  VERIFY_AUTH_TOKEN_REQUEST,
  VERIFY_AUTH_TOKEN_SUCCESS,
  VERIFY_AUTH_TOKEN_FAILURE,
} from '../constants/actionType';

const UNAUTHORIZED = 401;
const initialState = {
  isFetching: false,
  loggedIn: false,
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VERIFY_AUTH_TOKEN_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }
    case VERIFY_AUTH_TOKEN_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        loggedIn: true,
        user: action.payload.user,
      });
    }
    case VERIFY_AUTH_TOKEN_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        loggedIn: false,
        user: {},
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
