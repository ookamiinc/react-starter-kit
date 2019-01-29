/* eslint-disable import/prefer-default-export */

import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import {
  CALL_API,
  FIXTURES_REQUEST,
  FIXTURES_SUCCESS,
  FIXTURES_FAILURE,
  RESULTS_REQUEST,
  RESULTS_SUCCESS,
  RESULTS_FAILURE,
  SET_STREAM,
  STREAM_REQUEST,
  STREAM_SUCCESS,
  STREAM_FAILURE,
} from '../constants/actionType';
import { GET_METHOD } from '../constants/api';
import {
  STREAMS_FIXTURES,
  STREAMS_RESULTS,
  STREAMS_SHOW,
} from '../constants/url';
import { getDatabase } from '../firebase';
import { STREAM, STREAM_ARRAY } from '../schemas';

const PER_PAGE = 6;
let streamRef;

const fetchStream = streamId => ({
  [CALL_API]: {
    method: GET_METHOD,
    params: {
      stream_id: streamId,
    },
    schema: STREAM,
    types: [STREAM_REQUEST, STREAM_SUCCESS, STREAM_FAILURE],
    url: STREAMS_SHOW,
  },
});

const fetchFixtures = (competitionId, page) => ({
  competitionId,
  [CALL_API]: {
    method: GET_METHOD,
    params: {
      competition_id: competitionId,
      page,
      per_page: PER_PAGE,
    },
    schema: STREAM_ARRAY,
    types: [FIXTURES_REQUEST, FIXTURES_SUCCESS, FIXTURES_FAILURE],
    url: STREAMS_FIXTURES,
  },
});

const fetchResults = (competitionId, page) => ({
  competitionId,
  [CALL_API]: {
    method: GET_METHOD,
    params: {
      competition_id: competitionId,
      page,
      per_page: PER_PAGE,
    },
    schema: STREAM_ARRAY,
    types: [RESULTS_REQUEST, RESULTS_SUCCESS, RESULTS_FAILURE],
    url: STREAMS_RESULTS,
  },
});

const setStream = stream => ({
  type: SET_STREAM,
  payload: stream,
});

export const loadStream = id => async (dispatch, getState) => {
  const stream = getState().entities.streams[id];
  if (stream && stream.id) return null;
  return dispatch(fetchStream(id));
};

export const loadFixtures = competitionId => async (dispatch, getState) => {
  const { page = 0, totalPages = 0 } =
    getState().pagination.fixturesByCompetition || {};
  if (page > 0 && page >= totalPages) return null;
  return dispatch(fetchFixtures(competitionId, page + 1));
};

export const loadResults = competitionId => async (dispatch, getState) => {
  const { page = 0, totalPages = 0 } =
    getState().pagination.resultsByCompetition || {};
  if (page > 0 && page >= totalPages) return null;
  return dispatch(fetchResults(competitionId, page + 1));
};

export const watchStream = id => dispatch => {
  streamRef = getDatabase().ref(`v1/streams/${id}`);
  streamRef.on('value', snapshot => {
    if (snapshot.exists()) {
      const camelizedJson = camelizeKeys(snapshot.val());
      dispatch(setStream(normalize(camelizedJson, STREAM)));
    }
  });
};
