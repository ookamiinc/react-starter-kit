/* eslint-disable no-shadow */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { watchStream } from '../../actions/live';
import { getSheet } from '../../actions/category';
import s from './Home.scss';

class Home extends React.Component {
  static propTypes = {
    stream: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    sheet: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    watchStream: PropTypes.func.isRequired,
    getSheet: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { watchStream, getSheet } = this.props;
    watchStream(428);
    getSheet('staging-test');
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  render() {
    const { stream, sheet } = this.props;
    return (
      <article className={s.root}>
        <div className={s.container}>
          <h1>React.js News</h1>
          <h2>{stream.id || 0}</h2>
          <p>{sheet.name || 'no name'}</p>
        </div>
      </article>
    );
  }
}

const mapState = state => ({
  stream: state.live.stream,
  sheet: state.category.sheet,
});

const mapDispatch = {
  watchStream,
  getSheet,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Home));
