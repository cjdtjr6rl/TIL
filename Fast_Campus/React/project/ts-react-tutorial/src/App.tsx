import React from "react";
import Greetings from "./Greetings";

const App: React.FC = () => {
  const onClick = (name: string) => {
    console.log({ name });
  };
  return <Greetings name="Junnna" onClick={onClick} />;
};

export default App;
