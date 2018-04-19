/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import {
  SET_SHEET,
  API_URL_PATH_CATEGORY_SHEET,
  CATEGORY_BASE_URL,
} from '../constants';

function createBreadcrumbs(breadcrumbs, id, name) {
  const resultList = [
    {
      id: process.env.BASE_URL,
      name: 'Player!',
    },
  ];
  breadcrumbs.forEach(breadcrumb => {
    resultList.push({
      id: `${process.env.BASE_URL}${breadcrumb.pathname}`,
      name: breadcrumb.name,
    });
  });
  resultList.push({
    id: `${CATEGORY_BASE_URL}/${id}`,
    name,
  });
  return resultList;
}

function setSheet(row = {}) {
  const breadcrumbs = (row.breadcrumbs && JSON.parse(row.breadcrumbs)) || [];
  const sheet = {
    id: row.id || '',
    name: row.name || '',
    streamIdList: (row.streamidlist && JSON.parse(row.streamidlist)) || [],
    newsIdList: (row.newsidlist && JSON.parse(row.newsidlist)) || [],
    links: (row.links && JSON.parse(row.links)) || [],
    breadcrumbs: createBreadcrumbs(breadcrumbs, row.id || '', row.name || ''),
    members: row.members || '',
    ranking: row.ranking || '',
    summary: row.summary || '',
    sportId: (row.sportid && parseInt(row.sportid, 10)) || 0,
  };

  return {
    type: SET_SHEET,
    payload: {
      sheet,
    },
  };
}

export const getSheet = id => dispatch => {
  const API_URL = `${process.env.BASE_URL}${API_URL_PATH_CATEGORY_SHEET}`;
  return axios
    .get(API_URL, {
      params: {
        id,
      },
    })
    .then(response => {
      const { row, error } = response.data;
      if (error) {
        return Promise.reject();
      }
      if (!row || !row.id) {
        return Promise.reject();
      }
      return Promise.resolve(dispatch(setSheet(row)));
    })
    .catch(() => Promise.reject());
};
