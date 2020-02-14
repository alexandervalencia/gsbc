import React from 'react';

import { AddBookModal, SignInModal } from 'components';

import { signOut } from '../../../firebase';

import './Navbar.scss';

const NavBar = ({ user = null }) => {
  if (user) {
    return (
      <div className="Navbar">
        <AddBookModal />
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
