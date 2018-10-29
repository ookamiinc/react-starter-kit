import { SET_SHEET } from '../constants/actionType';

const initialState = {
  sheet: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SHEET:
      return Object.assign({}, state, {
        sheet: action.payload.sheet,
      });
    default:
      return state;
  }
}
