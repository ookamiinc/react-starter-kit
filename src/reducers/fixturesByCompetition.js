import paginate from './paginate';
import {
  FIXTURES_REQUEST,
  FIXTURES_SUCCESS,
  FIXTURES_FAILURE,
} from '../constants/actionType';

const fixturesByCompetition = paginate({
  mapActionToKey: action => action.competitionId,
  types: [FIXTURES_REQUEST, FIXTURES_SUCCESS, FIXTURES_FAILURE],
});

export default fixturesByCompetition;
