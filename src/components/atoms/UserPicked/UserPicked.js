import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';

import './UserPicked.scss';

const UserPicked = ({ userImg, userNameFirst }) => {
  userImg = userImg || 'defaultuser_tqu61h';

  return (
    <div className="UserPicked">
      <Image
        alt={userNameFirst}
        className="img-fluid user-img"
        cloudName="gsbc"
        publicId={`${userImg}.png`}
        width="100"
      >
        <Transformation crop="fill" gravity="face" height="100" quality="auto:eco" radius="max" width="100" />
      </Image>
      <span className="user-info">Picked By: </span>
      <span className="user-name">{userNameFirst}</span>
    </div>
  );
};

UserPicked.propTypes = {
  userImg: PropTypes.string,
  userNameFirst: PropTypes.string,
};

export default UserPicked;
