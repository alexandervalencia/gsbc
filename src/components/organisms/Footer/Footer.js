import React from 'react';

import './Footer.css'

const year = new Date().getFullYear();

const footer = () => (
  <footer className="Footer">
    Alex Valencia &copy; {year}
  </footer>
);

export default footer;
