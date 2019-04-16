import React, { Component, createContext } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utils/firebaseUtil';

export const MembersContext = createContext();

class MembersProvider extends Component {
  state = { members: [] };

  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore.collection('members').onSnapshot(snapshot => {
      const members = snapshot.docs.map(collectIdsAndDocs);

      this.setState({ members });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { members } = this.state;
    const { children } = this.props;

    return <MembersContext.Provider value={members}>{children}</MembersContext.Provider>;
  }
}

export default MembersProvider;
