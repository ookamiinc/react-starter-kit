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
  port: process.env.PORT || 3000,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // Global variables
  globals: {
    'process.env.FIREBASE_API_KEY': JSON.stringify(
      process.env.FIREBASE_API_KEY,
    ),
    'process.env.FIREBASE_DATABASE_URL': JSON.stringify(
      process.env.FIREBASE_DATABASE_URL,
    ),
    'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
    'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
    'process.env.API_AUTH_TOKEN': JSON.stringify(process.env.API_AUTH_TOKEN),
    'process.env.GOOGLE_CLIENT_EMAIL': JSON.stringify(
      process.env.GOOGLE_CLIENT_EMAIL,
    ),
    'process.env.GOOGLE_PRIVATE_KEY': JSON.stringify(
      process.env.GOOGLE_PRIVATE_KEY,
    ),
    'process.env.GOOGLE_SPREAD_SHEET_ID_FOR_CATEGORY': JSON.stringify(
      process.env.GOOGLE_SPREAD_SHEET_ID_FOR_CATEGORY,
    ),
  },
};
