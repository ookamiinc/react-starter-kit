/* eslint-disable import/prefer-default-export */

import { CALL_API, SET_STREAM } from '../constants/actionType';
import { GET_METHOD } from '../constants/api';
import { API_URL_PATH_LIVE } from '../constants/url';
import { getDatabase } from '../firebase';

let streamRef;

const getStream = streamId => ({
  [CALL_API]: {
    method: GET_METHOD,
    type: SET_STREAM,
    url: API_URL_PATH_LIVE,
    params: {
      stream_id: streamId,
    },
  },
});

const setStream = stream => ({
  type: SET_STREAM,
  payload: stream,
});

export const loadStream = id => async (dispatch, getState) => {
  const { stream } = getState().live;
  if (stream && stream.id) return null;
  return dispatch(getStream(id));
};

export const watchStream = id => dispatch => {
  streamRef = getDatabase().ref(`v1/streams/${id}`);
  streamRef.on('value', snapshot => {
    if (snapshot.exists()) {
      dispatch(setStream(snapshot.val()));
    }
  });
};
