import React from 'react';

import { AddBookModal, AddMemberModal, SignInModal } from 'components';

import './Navbar.css';

const NavBar = ({ currentUser, handleSignOut }) => {
  if (currentUser) {
    return (
      <div className="Navbar">
        <AddMemberModal />

        <AddBookModal />

        <button className="btn btn-primary" onClick={() => handleSignOut()}>
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
