import React, { memo } from "react";

const HabitInsert = memo((props) => {
  const inputRef = React.createRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const name = inputRef.current.value;
    name && props.onAdd(name);
    inputRef.current.value = "";
    inputRef.current.focus();
  };
  console.log("HabitInsert");
  return (
    <div>
      <form className="add-form" onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="add-input"
          placeholder="Habit"
        />
        <button className="add-button">Add</button>
      </form>
    </div>
  );
});

export default HabitInsert;
