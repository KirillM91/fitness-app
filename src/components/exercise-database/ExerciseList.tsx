/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import BackButton from '../reusables/BackButton';

function ExerciseList() {
  const muscle = useParams();
  const API_URL = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${muscle.target}`;
  const { data, loading, error } = useApi(API_URL);
  // Keeps track off what exercise is clicked
  const [descriptionView, setDescriptionView] = useState<string>();
  // Dynamic top offset for the description div, to ensure that it always pops up on screen
  const descriptionOffsetTop = ((window.pageYOffset) + 50);

  return (
    <div className="exercise-list">
      <p className="exercise-list-title">{muscle.target}</p>
      <BackButton x={2} y={65} />

      {loading && <p>Loading. . .</p>}

      {error && <p>Error: {error}</p>}

      {/* When an exercise is clicked, a description text pops up */}
      {descriptionView
      && (
      <div
        className="exercise-description-container"
        onClick={() => setDescriptionView('')}
        style={{ top: `${descriptionOffsetTop}px` }}
      >
        <p className="exercise-description-name">{data?.find((exe) => exe.name === descriptionView)?.name}</p>
        <p className="exercise-description">{data?.find((exe) => exe.name === descriptionView)?.instructions}</p>
      </div>
      )}

      {data && data?.map((exercise, index) => (
        <div
          key={index}
          className="exercise-list-exercise-container"
          onClick={() => setDescriptionView(exercise.name)}
        >
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
