import merge from 'lodash/merge';

const initialState = {
  categories: {},
  streams: {},
};

// Updates an entity cache in response to any action with response.entities.
export default function(state = initialState, action) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }

  return state;
}
