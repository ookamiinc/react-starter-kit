import { SET_THUMBNAIL } from '../constants';

const initialState = {
  thumbnail: null,
};

export default function thumbnail(state = initialState, action) {
  switch (action.type) {
    case SET_THUMBNAIL:
      return Object.assign({}, state, {
        thumbnail: action.payload.thumbnail,
      });
    default:
      return state;
  }
}
