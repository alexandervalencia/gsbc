import React from 'react';

import { AddBookModal, AddMemberModal, SignInModal } from 'components';

import { signOut } from '../../../firebase';

import './Navbar.css';
const NavBar = ({ currentUser = null }) => {
  if (currentUser) {
    // const isAdmin = currentUser.data_.supportedScopes === 'admin' ? true : false;

    return (
      <div className="Navbar">
        {/* {isAdmin && <AddMemberModal />} */}

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
