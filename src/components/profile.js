import React from 'react';

const Profile = ({userPhotoUrl, userPicked}) => {
  return (
    <div className="col-2 col-xl-3">
      <div className="book-member-profile">
        <img alt={userPicked} className="img-fluid" src={userPhotoUrl} />
        <span className="book-member-name">{userPicked}</span>
      </div>
    </div>
  )
}

export default Profile;
