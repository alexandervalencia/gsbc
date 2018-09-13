import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as authActions from './store/actions/auth';
import Bookcase from './containers/Bookcase/Bookcase';
import { SiteFooter, SiteHeader } from 'components';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.initCurrentUser();
  }

  render() {
    return (
      <div className="App">
        <SiteHeader />
        <Bookcase />
        <SiteFooter />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initCurrentUser: () => dispatch(authActions.getCurrentUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
