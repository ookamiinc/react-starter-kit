/* eslint-disable import/prefer-default-export */

import firebase from '@firebase/app';
import '@firebase/database';

let database;

export const getDatabase = () => {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  };

  if (!database) {
    firebase.initializeApp(config);
    database = firebase.database();
  }

  return database;
};
