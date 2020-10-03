import React, { Component } from "react";

class HabitNav extends Component {
  render() {
    const number = this.props.habits;
    return (
      <div>
        <i className="fas fa-leaf"></i>
        <span>Habit Tracker</span>
        <span className="habit-count">{number}</span>
      </div>
    );
  }
}

export default HabitNav;
