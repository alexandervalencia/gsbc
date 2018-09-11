import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';

import './BookCover.css';

const Cover = ({ coverImg, title }) => {
  return (
    <div className="BookCover">
      <Image
        alt={title}
        className="cover-img"
        cloudName="gsbc"
        publicId={coverImg}
      />
    </div>
  );
};

Cover.propTypes = {
  coverImg: PropTypes.string,
  title: PropTypes.string,
};

export default Cover;
