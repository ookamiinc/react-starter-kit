import { combineReducers } from 'redux';
import authentication from './authentication';
import entities from './entities';
import errorMessage from './errorMessage';
import fixturesByCompetition from './fixturesByCompetition';
import resultsByCompetition from './resultsByCompetition';

// Updates the pagination data for different actions.
const pagination = combineReducers({
  fixturesByCompetition,
  resultsByCompetition,
});

export default combineReducers({
  authentication,
  errorMessage,
  entities,
  pagination,
});
