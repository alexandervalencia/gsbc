import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import './AmazonIcon.scss';

const AmazonIcon = ({ amazonUrl }) => {
  return (
    <div className="AmazonIcon">
      <a className="amazon-link" href={amazonUrl} rel="noopener noreferrer" target="_blank">
        <Icon className="amazon-logo" name="amazon" size="lg" />
        <span className="mobile-link">Buy it on Amazon</span>
      </a>
    </div>
  );
};

AmazonIcon.propTypes = {
  amazonUrl: PropTypes.string,
};

export default AmazonIcon;
