import React, { Component, createContext } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utils/firebaseUtil';

export const UsersContext = createContext();

class UsersProvider extends Component {
  state = { users: [] };

  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore.collection('users').onSnapshot(snapshot => {
      const users = snapshot.docs.map(collectIdsAndDocs);

      this.setState({ users });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { users } = this.state;
    const { children } = this.props;

    return <UsersContext.Provider value={users}>{children}</UsersContext.Provider>;
  }
}

export default UsersProvider;
