import { RESET_ERROR_MESSAGE } from '../constants/actionType';

const initialState = null;

// Updates error message to notify about the failed fetches.
export default function(state = initialState, action) {
  const { type, error } = action;

  if (type === RESET_ERROR_MESSAGE) {
    return null;
  }
  if (error) {
    return error;
  }

  return state;
}
