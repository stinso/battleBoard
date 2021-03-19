import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/chaingames.png"
      width="180vw"
      {...props}
    />
  );
}

export default Logo;
