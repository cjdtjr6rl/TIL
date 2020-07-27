import React from "react";
import Button from "./component/Button";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="buttons">
        <Button color="blue" size="large">
          BUTTON
        </Button>
        <Button color="blue">BUTTON</Button>
        <Button color="blue" size="small">
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button color="gray" size="large">
          BUTTON
        </Button>
        <Button color="gray">BUTTON</Button>
        <Button color="gray" size="small">
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button color="pink" size="large">
          BUTTON
        </Button>
        <Button color="pink">BUTTON</Button>
        <Button color="pink" size="small">
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button color="blue" size="large" outline={true}>
          BUTTON
        </Button>
        <Button color="gray" outline={true}>
          BUTTON
        </Button>
        <Button color="pink" size="small" outline={true}>
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button
          color="blue"
          size="large"
          fullWidth={true}
          className="customized-button"
        >
          BUTTON
        </Button>
        <Button color="gray" fullWidth={true}>
          BUTTON
        </Button>
        <Button
          color="pink"
          size="small"
          fullWidth={true}
          onClick={() => {
            console.log("클릭!");
          }}
          onMouseMove={() => {
            console.log("마우스무브!");
          }}
        >
          BUTTON
        </Button>
      </div>
    </div>
  );
}

export default App;
