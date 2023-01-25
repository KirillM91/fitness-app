/* eslint-disable react/jsx-one-expression-per-line */
import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Link to="/exercise_database">
        <p>exercise database</p>
      </Link>

      <Link to="/workout_routines">
        <p>workout routines</p>
      </Link>

      <Link to="/progress_tracking">
        <p>progress tracking</p>
      </Link>

    </div>
  );
}
export default App;
