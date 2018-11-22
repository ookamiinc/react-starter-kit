/* eslint-disable import/prefer-default-export */

import { schema } from 'normalizr';
import category from './category';
import stream from './stream';

export const CATEGORY = category;
export const STREAM = stream;
export const STREAM_ARRAY = new schema.Object({
  streams: new schema.Array(stream),
});
