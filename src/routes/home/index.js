/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import { loadStream } from '../../actions/live';

async function action({ store }) {
  await store.dispatch(loadStream(428));
  const { stream } = store.getState().live;
  return {
    title: 'Home',
    chunks: ['home'],
    component: (
      <Layout>
        <Home stream={stream} />
      </Layout>
    ),
  };
}

export default action;
