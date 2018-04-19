const throng = require('throng');

const WORKERS = process.env.WEB_CONCURRENCY || 1;

throng(
  {
    workers: WORKERS,
    lifetime: Infinity,
  },
  () => require('./server'), // eslint-disable-line global-require, import/no-unresolved
);
