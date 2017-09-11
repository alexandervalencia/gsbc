import React from 'react';

const Cover = ({bookCoverUrl, bookTitle}) => {
  return (
    <div className="cover-wrapper col-2">
      <div className="cover">
        <img alt={bookTitle} className="img-fluid" src={bookCoverUrl} />
      </div>
    </div>
  )
};

export default Cover;
