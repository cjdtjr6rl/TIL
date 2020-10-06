import React, { Component } from "react";
import styled from "./button1.module.css";

class Button1 extends Component {
  render() {
    return (
      <div className={styled.button}>
        <span className={styled.text}>Button1</span>
      </div>
    );
  }
}

export default Button1;
