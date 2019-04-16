import React, { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';

import { Bookcase, BookSorter, Navbar } from 'components';

import './Home.scss';

const Home = () => {
  const user = useContext(UserContext);

  return (
    <div className="Home">
      <div className="control-box">
        <div className="Meeting">Next Meeting: 5/9 @ 1pm</div>
        <BookSorter />
        <Navbar currentUser={user} />
      </div>

      <Bookcase />
    </div>
  );
};

export default Home;
