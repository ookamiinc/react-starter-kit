import { SET_STREAM } from '../constants/actionType';

const initialState = {
  stream: {},
  error: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STREAM: {
      if (action.error) {
        return Object.assign({}, state, {
          error: action.error,
        });
      }
      return Object.assign({}, state, {
        stream: action.payload,
      });
    }
    default:
      return state;
  }
}
