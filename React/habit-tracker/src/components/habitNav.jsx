import React, { PureComponent } from "react";

class HabitNav extends PureComponent {
  render() {
    console.log("navBar");
    return (
      <div className="navbar">
        <i className="navbar-logo fas fa-leaf"></i>
        <span>Habit Tracker</span>
        <span className="navbar-count">{this.props.totalCount}</span>
      </div>
    );
  }
}

export default HabitNav;
