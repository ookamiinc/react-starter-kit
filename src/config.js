/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

module.exports = {
  // Node.js app
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // Global variables
  env: {
    API_AUTH_TOKEN: `"${process.env.API_AUTH_TOKEN}"`,
    API_BASE_URL: `"${process.env.API_BASE_URL}"`,
    AWS_ASSETS_URL: `"${process.env.AWS_ASSETS_URL}"`,
    BASE_URL: `"${process.env.BASE_URL}"`,
    FIREBASE_API_KEY: `"${process.env.FIREBASE_API_KEY}"`,
    FIREBASE_DATABASE_URL: `"${process.env.FIREBASE_DATABASE_URL}"`,
  },
};
