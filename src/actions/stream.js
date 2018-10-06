/* eslint-disable import/prefer-default-export */

import { SET_STREAM } from '../constants/actionType';
import { API_URL_PATH_LIVE } from '../constants/url';
import { getDatabase } from '../firebase';
import { get } from '../utils/api';

let streamRef;

function setStream(stream) {
  return {
    type: SET_STREAM,
    payload: {
      stream,
    },
  };
}

export const getStreamOnServer = id => async dispatch => {
  const params = {
    stream_id: id,
  };
  const response = await get(API_URL_PATH_LIVE, params);
  if (!response) return null;
  dispatch(setStream(response));
  return response;
};

export const getStream = id => dispatch => {
  streamRef = getDatabase().ref(`v1/streams/${id}`);
  streamRef.on('value', snapshot => {
    if (snapshot.exists()) {
      dispatch(setStream(snapshot.val()));
    }
  });
};
