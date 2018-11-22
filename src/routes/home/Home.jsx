/* eslint-disable no-shadow */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { loadFixtures, loadResults, watchStream } from '../../actions/stream';
import { getSheet } from '../../actions/category';
import s from './Home.scss';

class Home extends React.Component {
  static propTypes = {
    category: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    stream: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    loadFixtures: PropTypes.func.isRequired,
    loadResults: PropTypes.func.isRequired,
    watchStream: PropTypes.func.isRequired,
    getSheet: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { loadFixtures, loadResults, watchStream, getSheet } = this.props;
    loadFixtures('4');
    loadResults('4');
    watchStream('428');
    getSheet('staging-test');
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  render() {
    const { category, stream } = this.props;
    return (
      <article className={s.root}>
        <div className={s.container}>
          <h1>React.js News</h1>
          <h2>{stream.id || 0}</h2>
          <p>{category.name || 'no name'}</p>
        </div>
      </article>
    );
  }
}

const mapState = (state, ownProps) => {
  const {
    entities: { categories, streams },
  } = state;
  const { stream } = ownProps;
  return {
    category: categories['staging-test'] || {},
    stream: streams[stream.id],
  };
};

const mapDispatch = {
  loadFixtures,
  loadResults,
  watchStream,
  getSheet,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Home));
