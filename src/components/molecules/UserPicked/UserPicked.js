import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';

import './UserPicked.css';

const UserPicked = ({ userImg, userNameFirst }) => {
  return (
    <div className="UserPicked">
      <Image
        alt={userNameFirst}
        className="img-fluid user-img"
        cloudName="gsbc"
        publicId={userImg}
        width="100"
      />
      <span className="user-name">{userNameFirst}</span>
    </div>
  );
};

UserPicked.propTypes = {
  userImg: PropTypes.string,
  userNameFirst: PropTypes.string,
};

export default UserPicked;
