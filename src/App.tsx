/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
import './App.css';
import React from 'react';
// eslint-disable-next-line import/extensions, import/no-unresolved
import useApi from './hooks/useApi';

function App() {
  const API_URL = 'https://exercisedb.p.rapidapi.com/exercises/targetList';
  const { data, loading, error } = useApi(API_URL);
  return (
    <div className="App">

      {loading && <p>Loading. . .</p>}

      {error && <p>Error: {error}</p>}

      {/* eslint-disable-next-line react/no-array-index-key */}
      {data && data.map((item, index) => <p key={index}>{item}</p>)}

    </div>
  );
}
export default App;
