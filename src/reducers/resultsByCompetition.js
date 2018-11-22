import paginate from './paginate';
import {
  RESULTS_REQUEST,
  RESULTS_SUCCESS,
  RESULTS_FAILURE,
} from '../constants/actionType';

const resultsByCompetition = paginate({
  mapActionToKey: action => action.competitionId,
  types: [RESULTS_REQUEST, RESULTS_SUCCESS, RESULTS_FAILURE],
});

export default resultsByCompetition;
