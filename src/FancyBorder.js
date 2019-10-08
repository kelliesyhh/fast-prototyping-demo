import React from 'react';
import './App.css';

// Usage:
// to get a white border, use <FancyBorder color="white"/>

function FancyBorder (props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
export {FancyBorder}