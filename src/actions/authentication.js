/* eslint-disable import/prefer-default-export */

import {
  CALL_API,
  VERIFY_AUTH_TOKEN_REQUEST,
  VERIFY_AUTH_TOKEN_SUCCESS,
  VERIFY_AUTH_TOKEN_FAILURE,
} from '../constants/actionType';
import { POST_METHOD } from '../constants/api';
import { USERS_VERIFY_CREDENTIALS } from '../constants/url';

export const verifyAuthToken = (authEmail, authToken) => dispatch =>
  dispatch({
    [CALL_API]: {
      method: POST_METHOD,
      params: {
        auth_email: authEmail,
        auth_token: authToken,
      },
      types: [
        VERIFY_AUTH_TOKEN_REQUEST,
        VERIFY_AUTH_TOKEN_SUCCESS,
        VERIFY_AUTH_TOKEN_FAILURE,
      ],
      url: USERS_VERIFY_CREDENTIALS,
    },
  });
