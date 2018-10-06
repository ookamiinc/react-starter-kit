/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import {
  API_OOKAMI_CLIENT_APPLICATION_VERSION,
  API_OOKAMI_CLIENT_LOCALE,
  API_OOKAMI_CLIENT_OS,
  API_OOKAMI_CLIENT_OS_VERSION,
  API_OOKAMI_VERSION,
  API_OOKAMI_WEB_TYPE_APP,
} from '../constants/api';
import { getTimezone } from './date';

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'X-Ookami-Version': API_OOKAMI_VERSION,
    'X-Ookami-Client-Application-Version': API_OOKAMI_CLIENT_APPLICATION_VERSION,
    'X-Ookami-Client-OS': API_OOKAMI_CLIENT_OS,
    'X-Ookami-Client-OS-Version': API_OOKAMI_CLIENT_OS_VERSION,
    'X-Ookami-Client-Locale': API_OOKAMI_CLIENT_LOCALE,
    'X-Ookami-Client-Timezone': getTimezone(),
    'X-Ookami-Web-Type': API_OOKAMI_WEB_TYPE_APP,
  },
});

const getAuthToken = () => {
  if (!process.env.BROWSER) return process.env.API_AUTH_TOKEN;
  const token = localStorage.getItem('token');
  return token || process.env.API_AUTH_TOKEN;
};

export const get = async (url, params) => {
  const config = {
    params: {
      auth_token: getAuthToken(),
      ...params,
    },
  };
  const response = await instance.get(url, config).catch(() => null);
  if (!response) return null;
  return response.data;
};

export const post = async (url, params) => {
  const mergeParams = {
    auth_token: getAuthToken(),
    ...params,
  };
  const response = await instance.post(url, mergeParams).catch(() => null);
  if (!response || response.data.error) return null;
  return response.data;
};

export const del = async (url, params) => {
  const config = {
    params: {
      auth_token: getAuthToken(),
      ...params,
    },
  };
  const response = await instance.delete(url, config).catch(() => null);
  if (!response || response.data.error) return null;
  return response.data;
};
