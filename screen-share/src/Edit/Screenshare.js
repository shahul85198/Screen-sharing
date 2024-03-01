import React from 'react';

const ScreenSharingButton = ({ onClick }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Start Screen Sharing
    </button>
  );
};

export default ScreenSharingButton;