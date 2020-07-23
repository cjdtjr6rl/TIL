import React from 'react';
import logo from './logo.svg';
import './App.css';
import User from './User';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <User />
    </ErrorBoundary>
  );
}

export default App;
