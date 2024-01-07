import React from "react";

const Button = ({ type, className, color, size, children }) => {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      style={{ backgroundColor: color, fontSize: size }}
    >
      {children}
    </button>
  );
};

export default Button;
