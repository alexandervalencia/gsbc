import React from 'react'
import PropTypes from 'prop-types'

import amazonLogo from '../assets/amazon_logo.svg'

import '../styles/AmazonButton.css'

const AmazonButton = ({ amazonUrl }) => {
  return (
    <div className="AmazonButton">
      <a className="amazon-link" href={amazonUrl} rel="noopener" target="_blank" >
        <img src={amazonLogo} className="amazon-logo" alt="logo" />
      </a>
    </div>
  )
}

AmazonButton.propTypes = {
  amazonUrl: PropTypes.string,
}

export default AmazonButton
