import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';

import './BookCover.css';
import noCover from '../../../assets/cover_na.jpg';

const Cover = ({ coverImg, title }) => {
  let image = coverImg ? (
    <Image
      alt={title}
      className="cover-img"
      cloudName="gsbc"
      publicId={coverImg}
    />
  ) : (
    <img alt="No Cover Available" className="cover-img" src={noCover} />
  );
  return <div className="BookCover">{image}</div>;
};

Cover.propTypes = {
  coverImg: PropTypes.string,
  title: PropTypes.string,
};

export default Cover;
