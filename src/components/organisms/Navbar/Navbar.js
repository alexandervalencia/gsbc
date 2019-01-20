import React from 'react';

import { AddBookModal, AddMemberModal, SignInModal } from 'components';

import './Navbar.css';

const NavBar = ({ currentUser, handleSignOut }) => {
  if (currentUser) {
    const isAdmin = currentUser.data_.supportedScopes;

    return (
      <div className="Navbar">
        {isAdmin && isAdmin[0] === 'admin' && <AddMemberModal />}

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
