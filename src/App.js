import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as authActions from './store/actions/auth';
import * as membersActions from './store/actions/members';
import Bookcase from './containers/Bookcase/Bookcase';
import { SiteFooter, SiteHeader } from 'components';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.initCurrentUser();
  }

  componentDidUpdate() {
    if (this.props.currentUser && !this.props.currentMember) {
      this.props.initCurrentMember(this.props.currentUser);
    }
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
    currentMember: state.members.currentMember,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initCurrentUser: () => dispatch(authActions.setCurrentUser()),
    initCurrentMember: currentUser => dispatch(membersActions.setCurrentMember(currentUser)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
