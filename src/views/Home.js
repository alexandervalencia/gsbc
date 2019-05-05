import React, { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';

import { Bookcase, BookSorter, Navbar } from 'components';

import './Home.scss';

const Home = () => {
  const user = useContext(UserContext);

  return (
    <div className="Home">
      <div className="control-box">
        <BookSorter />
        <Navbar cuser={user} />
      </div>

      {user && <div className="Meeting">Next Meeting: 5/9 @ 1pm</div>}

      <Bookcase />
    </div>
  );
};

export default Home;
