import React from 'react';
import { Link } from 'react-router-dom';

import { SignInModal } from 'components';

import { signOut } from '../../../firebase';

import './Navbar.scss';

const NavBar = ({ user = null }) => {
  if (user) {
    return (
      <div className="Navbar">
        <Link className="btn btn-primary" to="/add">
          Add Book
        </Link>

        <button className="btn btn-primary" onClick={signOut}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="Navbar">
      <SignInModal />
    </div>
  );
};

export default NavBar;
