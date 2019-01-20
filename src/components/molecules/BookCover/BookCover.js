import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';

import './BookCover.css';

const Cover = ({ coverImg, title }) => {
  coverImg = coverImg || 'cover_na_fmljuu.jpg';

  return (
    <div className="BookCover">
      <Image alt={title} className="cover-img" cloudName="gsbc" publicId={coverImg}>
        <Transformation height="250" quality="auto:eco" crop="scale" />
      </Image>
    </div>
  );
};

Cover.propTypes = {
  coverImg: PropTypes.string,
  title: PropTypes.string,
};

export default Cover;
