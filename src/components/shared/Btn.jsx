import React from 'react';
import './shared.css';

const Button = ({ label, outline, bgColor, width, color, onClick }) => {
  const btnClass = outline ? 'outline-btn' : 'regular-btn';
  const style = {};

  if (!outline && bgColor) {
    style.backgroundColor = bgColor;
  }

  if (width) {
    style.width = width;
  }

  if (color) {
    style.color = color;
  }

  return <button onClick={onClick} className={btnClass} style={style}>{label}</button>;
};

export default Button;
