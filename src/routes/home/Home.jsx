/* eslint-disable no-shadow */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { getStream } from '../../actions/stream';
import { getSheet } from '../../actions/categorySheet';
import s from './Home.scss';

class Home extends React.Component {
  static propTypes = {
    stream: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    sheet: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    getStream: PropTypes.func.isRequired,
    getSheet: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getStream, getSheet } = this.props;
    getStream(428);
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
  stream: state.stream.stream,
  sheet: state.categorySheet.sheet,
});

const mapDispatch = {
  getStream,
  getSheet,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Home));
