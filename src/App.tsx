/* eslint-disable react/jsx-one-expression-per-line */
import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import targetMuscleList from './data/targetMuscleList';

function App() {
  return (
    <div className="App">

      {targetMuscleList.map((muscle, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Link to={`/${muscle}`} key={index}>
          <p>{muscle}</p>
        </Link>
      ))}

    </div>
  );
}
export default App;
