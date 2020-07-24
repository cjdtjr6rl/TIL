import React from "react";
import classNames from "classnames";
import "./Button.scss";

// size: small, medium, large
// color: blue, pink, gray
function Button({ children, size, color, outline, fullWidth }) {
  return (
    <button
      className={classNames("Button", size, color, {
        outline,
        fullWidth,
      })}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: "medium",
};

export default Button;
