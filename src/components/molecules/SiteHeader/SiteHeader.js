import React from 'react';

import './Header.css'

const title = 'Good Stuff';

const siteHeader = () => (
  <header className="Header">
    <div className="title-back">
      <h1>Book Club</h1>
    </div>

    <div className="title-front">
      <h2 className="align-middle">{title}</h2>
    </div>
  </header>
);

export default siteHeader;
