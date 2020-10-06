import React, { Component } from "react";
import styled from "./button2.module.css";

class Button2 extends Component {
  render() {
    return (
      <div className={styled.button}>
        <span className={styled.text}>Button2</span>
      </div>
    );
  }
}

export default Button2;
