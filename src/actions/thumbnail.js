/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import { SET_THUMBNAIL, API_URL_PATH_THUMBNAIL } from '../constants';

function setThumbnail(thumbnail) {
  return {
    type: SET_THUMBNAIL,
    payload: {
      thumbnail,
    },
  };
}

export const getThumbnail = url => dispatch => {
  const API_URL = `${process.env.BASE_URL}${API_URL_PATH_THUMBNAIL}`;
  return axios({
    method: 'get',
    url: API_URL,
    responseType: 'arraybuffer',
    params: {
      url,
    },
  })
    .then(response => {
      if (response.data.error) return;
      const arrayBuffer = response.data;
      const blob = new Blob([arrayBuffer], { type: 'image/png' });
      dispatch(setThumbnail(blob));
    })
    .catch(() => {});
};
