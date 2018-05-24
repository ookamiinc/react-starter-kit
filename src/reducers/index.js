import { combineReducers } from 'redux';
import stream from './stream';
import categorySheet from './categorySheet';

export default combineReducers({
  stream,
  categorySheet,
});
