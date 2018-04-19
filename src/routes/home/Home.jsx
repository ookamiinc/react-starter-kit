/* eslint-disable no-shadow */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { getStream } from '../../actions/stream';
import { getSheet } from '../../actions/categorySheet';
import { getThumbnail } from '../../actions/thumbnail';
import s from './Home.scss';

class Home extends React.Component {
  static propTypes = {
    stream: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    sheet: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    thumbnail: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    getStream: PropTypes.func.isRequired,
    getSheet: PropTypes.func.isRequired,
    getThumbnail: PropTypes.func.isRequired,
  };

  static defaultProps = {
    thumbnail: null,
  };

  componentDidMount() {
    const { getStream, getSheet, getThumbnail } = this.props;
    getStream(428);
    getSheet('staging-test');
    getThumbnail('http://localhost:3000');
  }

  render() {
    const { stream, sheet, thumbnail } = this.props;
    let Thumb;
    const thumbnailUrl = thumbnail ? window.URL.createObjectURL(thumbnail) : '';
    if (thumbnailUrl) Thumb = <img src={thumbnailUrl} alt="Sample" />;
    return (
      <article className={s.root}>
        <div className={s.container}>
          <h1>React.js News</h1>
          <h2>{stream.id || 0}</h2>
          <p>{sheet.name || 'no name'}</p>
          {Thumb}
        </div>
      </article>
    );
  }
}

const mapState = state => ({
  stream: state.stream.stream,
  sheet: state.categorySheet.sheet,
  thumbnail: state.thumbnail.thumbnail,
});

const mapDispatch = {
  getStream,
  getSheet,
  getThumbnail,
};

export default connect(mapState, mapDispatch)(withStyles(s)(Home));
