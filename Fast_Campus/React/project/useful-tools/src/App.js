import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <div>gjdsagdsa</div>
      <ul>
        <li>gjdkg</li>
      </ul>
    </div>
  );
}

export default App;
