import React, { Component } from "react";

class Habit extends Component {
  state = {
    count: 0,
  };
  handleIncreament = () => {
    // state 오브젝트 안에 있는 count를 증가 한 뒤 state 업데이트한다.
    this.setState({ count: this.state.count + 1 });
  };
  handleDecrement = () => {
    if (this.state.count === 0) {
      return;
    } else {
      const count = this.state.count - 1;
      this.setState({ count: count < 0 ? 0 : count });
    }
  };
  render() {
    const { name, count } = this.props.habit;
    return (
      <li className="habit">
        <span className="habit-name">{name}</span>
        <span className="habit-count">{count}</span>
        <button
          className="habit-button habit-increase"
          onClick={this.handleIncreament}
        >
          <i className="fas fa-plus-square"></i>
        </button>
        <button
          className="habit-button habit-decrease"
          onClick={this.handleDecrement}
        >
          <i className="fas fa-minus-square"></i>
        </button>
        <button className="habit-button habit-delete">
          <i className="fas fa-trash"></i>
        </button>
      </li>
    );
  }
}

export default Habit;
