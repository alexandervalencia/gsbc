import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';

import './BookCover.scss';

const Cover = ({ coverImg, size = 'small', title }) => {
  let height = 250;
  const publicId = coverImg || 'cover_na_fmljuu.jpg';

  if (size === 'large') {
    height = 500;
  }

  return (
    <div className="BookCover">
      <Image alt={title} className={`cover-img ${size}`} cloudName="gsbc" publicId={publicId}>
        <Transformation height={height} quality="auto:eco" crop="scale" />
      </Image>
    </div>
  );
};

Cover.propTypes = {
  coverImg: PropTypes.string,
  title: PropTypes.string,
};

export default Cover;
