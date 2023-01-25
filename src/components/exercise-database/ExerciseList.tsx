import React from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';

function ExerciseList() {
  const muscle = useParams();
  const API_URL = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${muscle.target}`;
  const { data, loading, error } = useApi(API_URL);

  return (
    <div className="App">

      {loading && <p>Loading. . .</p>}

      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {error && <p>Error: {error}</p>}

      {data && data?.map((exercise, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <p>{exercise.bodyPart}</p>
          <p>{exercise.equipment}</p>
          <p>{exercise.name}</p>
          <p>{exercise.target}</p>
          <img src={exercise.gifUrl} alt={exercise.name} />
        </div>
      ))}

    </div>
  );
}
export default ExerciseList;
