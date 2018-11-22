import union from 'lodash/union';

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = ({ types, mapActionToKey }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [requestType, successType, failureType] = types;

  const updatePagination = (
    state = {
      ids: [],
      isFetching: false,
      liveCount: 0,
      page: 0,
      totalPages: 0,
    },
    action,
  ) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true,
        };
      case successType:
        return {
          ...state,
          ids: union(
            state.ids,
            action.payload.result[Object.keys(action.payload.entities)[0]],
          ),
          isFetching: false,
          liveCount: action.payload.result.liveCount || 0,
          page: action.payload.result.page,
          totalPages: action.payload.result.totalPages,
        };
      case failureType:
        return {
          ...state,
          isFetching: false,
        };
      default:
        return state;
    }
  };

  return (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType: {
        const key = mapActionToKey(action);
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }
        return {
          ...state,
          [key]: updatePagination(state[key], action),
        };
      }
      default:
        return state;
    }
  };
};

export default paginate;
