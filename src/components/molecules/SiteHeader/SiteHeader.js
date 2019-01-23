import React from 'react';

import './SiteHeader.scss';

const title = 'Good Stuff';

const siteHeader = () => (
  <header className="Header">
    <div className="title-back">
      <h1>Book Club</h1>
    </div>

    <div className="title-front">
      <h2>{title}</h2>
    </div>
  </header>
);

export default siteHeader;
