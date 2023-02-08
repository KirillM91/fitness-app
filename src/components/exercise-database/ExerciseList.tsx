import React from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import BackButton from '../reusables/BackButton';

function ExerciseList() {
  const muscle = useParams();
  const API_URL = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${muscle.target}`;
  const { data, loading, error } = useApi(API_URL);

  return (
    <div className="exeecise-list">
      <p className="exercise-list-title">{muscle.target}</p>
      <BackButton x={5} y={75} />

      {loading && <p>Loading. . .</p>}

      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {error && <p>Error: {error}</p>}

      {data && data?.map((exercise, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="exercise-list-exercise-container">
          <p className="exercise-list-exercise-name">{exercise.name.replace(/_/g, ' ')}</p>
          <p className="exercise-list-target">{exercise.muscle.replace(/_/g, ' ')}</p>
          <p className="exercise-list-equipment">{exercise.equipment.replace(/_/g, ' ')}</p>

          <img
            src=""
            alt={exercise.name}
            loading="lazy"
            className="exercise-list-exercise-image"
          />
        </div>
      ))}
    </div>
  );
}
export default ExerciseList;
