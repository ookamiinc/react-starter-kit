import { SET_STREAM } from '../constants';

const initialState = {
  stream: {},
};

export default function stream(state = initialState, action) {
  switch (action.type) {
    case SET_STREAM:
      return Object.assign({}, state, {
        stream: action.payload.stream,
      });
    default:
      return state;
  }
}
