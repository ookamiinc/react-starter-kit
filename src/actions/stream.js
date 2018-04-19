/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import {
  SET_STREAM,
  API_URL_PATH_LIVE,
  API_OOKAMI_VERSION,
  API_OOKAMI_CLIENT_APPLICATION_VERSION,
  API_OOKAMI_CLIENT_OS,
  API_OOKAMI_CLIENT_OS_VERSION,
  API_OOKAMI_CLIENT_LOCALE,
  API_OOKAMI_WEB_TYPE_APP,
} from '../constants';
import { getDatabase } from '../firebase';
import { getTimezone } from '../utils/dateUtil';

let streamRef;

function setStream(stream) {
  return {
    type: SET_STREAM,
    payload: {
      stream,
    },
  };
}

export const getStreamOnServer = id => dispatch => {
  const API_URL = `${process.env.API_BASE_URL}${API_URL_PATH_LIVE}`;
  return axios
    .get(API_URL, {
      params: {
        stream_id: id,
        auth_token: process.env.API_AUTH_TOKEN,
      },
      headers: {
        'X-Ookami-Version': API_OOKAMI_VERSION,
        'X-Ookami-Client-Application-Version': API_OOKAMI_CLIENT_APPLICATION_VERSION,
        'X-Ookami-Client-OS': API_OOKAMI_CLIENT_OS,
        'X-Ookami-Client-OS-Version': API_OOKAMI_CLIENT_OS_VERSION,
        'X-Ookami-Client-Locale': API_OOKAMI_CLIENT_LOCALE,
        'X-Ookami-Client-Timezone': getTimezone(),
        'X-Ookami-Web-Type': API_OOKAMI_WEB_TYPE_APP,
      },
    })
    .then(response => {
      if (response.data.error) return {};
      return dispatch(setStream(response.data || {}));
    });
};

export const getStream = id => dispatch => {
  streamRef = getDatabase().ref(`v1/streams/${id}`);
  streamRef.on('value', snapshot => {
    if (snapshot.exists()) {
      dispatch(setStream(snapshot.val()));
    }
  });
};
