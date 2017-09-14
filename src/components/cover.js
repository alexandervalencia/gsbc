import React from 'react';

const Cover = ({coverUrl, title}) => {
  return (
    <div className="cover-wrapper col-2">
      <div className="cover">
        <img alt={title} className="img-fluid" src={coverUrl} />
      </div>
    </div>
  )
};

export default Cover;
