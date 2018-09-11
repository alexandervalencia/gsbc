import React from 'react';

import './SiteFooter.css';

const year = new Date().getFullYear();

const siteFooter = () => (
  <footer className="Footer">Alex Valencia &copy; {year}</footer>
);

export default siteFooter;
