import React from 'react';
import { Link } from 'react-router-dom';

import './SiteHeader.scss';

const title = 'Good Stuff';

const siteHeader = () => (
  <header className="Header">
    <Link to="/">
      <div className="title-back">
        <h1>Book Club</h1>
      </div>

      <div className="title-front">
        <h2>{title}</h2>
      </div>
    </Link>
  </header>
);

export default siteHeader;
