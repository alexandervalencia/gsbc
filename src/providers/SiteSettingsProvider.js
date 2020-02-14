import React, { Component, createContext } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utils/firebaseUtil';

export const SiteSettingsContext = createContext();

class SiteSettingsProvider extends Component {
  state = { siteSettings: [] };

  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore.collection('site-settings').onSnapshot(snapshot => {
      const siteSettings = snapshot.docs.map(collectIdsAndDocs);

      this.setState({ siteSettings });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { siteSettings } = this.state;
    const { children } = this.props;

    return <SiteSettingsContext.Provider value={siteSettings}>{children}</SiteSettingsContext.Provider>;
  }
}

export default SiteSettingsProvider;
