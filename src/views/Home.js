import React, { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import SiteSettingsProvider from '../providers/SiteSettingsProvider';

import { Bookcase, BookSorter, MeetingInfo, Navbar } from 'components';

import './Home.scss';

const Home = () => {
  const user = useContext(UserContext);

  return (
    <div className="Home">
      <div className="control-box">
        <BookSorter />
        <Navbar user={user} />
      </div>

      {user && (
        <SiteSettingsProvider>
          <MeetingInfo />
        </SiteSettingsProvider>
      )}

      <Bookcase />
    </div>
  );
};

export default Home;
