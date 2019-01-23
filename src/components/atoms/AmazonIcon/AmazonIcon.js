import React from 'react';
import PropTypes from 'prop-types';

import amazonLogo from '../../../assets/amazon_logo.svg';

import './AmazonIcon.scss';

const AmazonIcon = ({ amazonUrl }) => {
  return (
    <div className="AmazonIcon">
      <a className="amazon-link" href={amazonUrl} rel="noopener noreferrer" target="_blank">
        <img src={amazonLogo} className="amazon-logo" alt="logo" />
        <span className="mobile-link">Buy it on Amazon</span>
      </a>
    </div>
  );
};

AmazonIcon.propTypes = {
  amazonUrl: PropTypes.string,
};

export default AmazonIcon;
