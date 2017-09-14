import React from 'react';
import amazonLogo from '../assets/amazon_logo.svg'

const AmazonButton = ({amazonUrl}) => {
  return (
    <div className="amazon-button col-2">
      <a className="amazon-logo" href={amazonUrl} rel="noopener" target="_blank" >
        <img src={amazonLogo} className="amazon-logo" alt="logo" />
      </a>
    </div>
  )
}

export default AmazonButton;
