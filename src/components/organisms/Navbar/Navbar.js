import React from 'react';

import { ModalSignIn } from 'components';

import './Navbar.css';

const NavBar = ({ currentUser, handleSignOut }) => {
  if (currentUser) {
    return (
      <div className="Navbar">
        <button className="btn btn-primary" onClick={() => handleSignOut()}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="Navbar">
      <ModalSignIn />
    </div>
  );
};

export default NavBar;
