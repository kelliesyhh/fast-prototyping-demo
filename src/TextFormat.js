import React from 'react';
import './App.css';

// Usage:
// for header1, use <TextFormat header1="texthere" />
// for header1, use <TextFormat header2="texthere" />
// and etc...

function TextFormat (props) {
  return (
    <div className="TextFormat">
      <h1 className="TextFormat-header1">
        {props.header1}
      </h1>
      <h2 className="TextFormat-header2">
        {props.header2}
      </h2>
      <h3 className="TextFormat-header3">
        {props.header3}
      </h3>
      <p className="TextFormat-normalText">
        {props.normalText}
      </p>
      <p className="TextFormat-credits">
        {props.credits}
      </p>
      {props.children}
    </div>
  );
}

export {TextFormat}