import React, { Component } from 'react';
import { connect } from 'react-redux';
import wedeploy from 'wedeploy';

import { initAppState } from './store/actions/init';
import Bookcase from './containers/Bookcase/Bookcase';
import { SiteFooter, SiteHeader } from 'components';
import './App.scss';

const auth = wedeploy.auth('https://auth-gsbc.wedeploy.io');
const data = wedeploy.data(process.env.REACT_APP_DATABASE);

class App extends Component {
  componentDidMount() {
    this.initApp();
  }

  async initApp() {
    try {
      const [currentUser, books, members, ratings] = await Promise.all([
        auth.currentUser,
        data.orderBy('datePicked', 'desc').get('books'),
        data.get('members'),
        data.get('ratings'),
      ]);

      this.props.onInitAppState(currentUser, books, members, ratings);
    } catch (error) {
      throw error;
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
    onInitAppState: (currentUser, books, members, ratings) =>
      dispatch(initAppState(currentUser, books, members, ratings)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
