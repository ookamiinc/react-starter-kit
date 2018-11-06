import { combineReducers } from 'redux';
import authentication from './authentication';
import category from './category';
import live from './live';

export default combineReducers({
  authentication,
  category,
  live,
});
