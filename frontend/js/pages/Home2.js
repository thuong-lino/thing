import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DjangoImgSrc from '../../assets/images/django-logo-negative.png';
import { creators } from '../store/rest_check';

const propTypes = {
  result: PropTypes.string,
  fetchRestCheck: PropTypes.func,
};

class Home2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchRestCheck } = this.props;
    fetchRestCheck();
  }

  render() {
    const { result } = this.props;
    return (
      <>
        <div id="django-background">
          If you are seeing the green Django logo on a white background and this text color is
          #092e20, frontend static files serving is working
        </div>
        <div id="django-logo-wrapper">
          <div>
            Below this text, you should see an img tag with the white Django logo on a green
            background
          </div>
          <img alt="Django Negative Logo" src={DjangoImgSrc} />
        </div>
        <div>{result}</div>
      </>
    );
  }
}
Home2.propTypes = propTypes;
const mapStateToProps = (state) => {
  return {
    result: state.restCheck.result,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRestCheck: () => {
      dispatch(creators.fetchRestCheck());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home2);
