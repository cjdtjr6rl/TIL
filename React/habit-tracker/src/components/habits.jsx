import React, { Component } from "react";
import Habit from "./habit";
import HabitNav from "./habitNav";

class Habits extends Component {
  state = {
    habits: [
      { id: 1, name: "Reading", count: 0 },
      { id: 2, name: "Studing", count: 0 },
      { id: 3, name: "Coding", count: 0 },
    ],
  };

  handleIncreament = (habit) => {
    const habits = [...this.state.habits];
    const index = habits.indexOf(habit);
    habits[index].count++;
    this.setState({ habits });
  };
  handleDecrement = (habit) => {
    const habits = [...this.state.habits];
    const index = habits.indexOf(habit);
    const count = habits[index].count - 1;
    habits[index].count = count < 0 ? 0 : count;
    this.setState({ habits });
  };
  handleDelete = (habit) => {
    const habits = this.state.habits.filter((itme) => itme.id !== habit.id);
    this.setState({ habits });
  };

  render() {
    return (
      <>
        <HabitNav habits={this.state.habits.length} />
        <ul>
          {this.state.habits.map((habit) => (
            <Habit
              key={habit.id}
              habit={habit}
              onIncrement={this.handleIncreament}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
            />
          ))}
        </ul>
      </>
    );
  }
}

export default Habits;
