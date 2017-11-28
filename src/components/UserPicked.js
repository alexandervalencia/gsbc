import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'cloudinary-react'

import '../styles/UserPicked.css'

const Profile = ({ userImg, userNameFirst }) => {
  return (
    <div className="UserPicked">
      <Image alt={userNameFirst} className="img-fluid user-img" cloudName="gsbc" publicId={userImg} />
      <span className="text-center user-name">{userNameFirst}</span>
    </div>
  )
}

Profile.propTypes = {
  userImg: PropTypes.string,
  userNameFirst: PropTypes.string,
}

export default Profile
