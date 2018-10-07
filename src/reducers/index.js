import { combineReducers } from 'redux';
import live from './live';
import category from './category';

export default combineReducers({
  live,
  category,
});
