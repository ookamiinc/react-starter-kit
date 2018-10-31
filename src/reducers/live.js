import { SET_STREAM } from '../constants/actionType';

const initialState = {
  error: null,
  stream: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STREAM: {
      if (action.error) {
        return Object.assign({}, state, {
          error: action.payload,
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
