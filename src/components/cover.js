import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'cloudinary-react'

import '../styles/Cover.css'

const Cover = ({ coverImg, title }) => {
  return (
    <div className="Cover">
      <Image alt={title} className="img-fluid" cloudName="gsbc" publicId={coverImg} />
    </div>
  )
}

Cover.propTypes = {
  coverImg: PropTypes.string,
  title: PropTypes.string,
}

export default Cover
