import React from 'react';

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

  return <div className="Navbar" />;
};

export default NavBar;
