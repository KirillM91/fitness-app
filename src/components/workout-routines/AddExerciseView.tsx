/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import useApi from '../../hooks/useApi';
import useSearch from '../../hooks/useSearch';
import { ExcerciseData } from '../../interfaces/interfaces';

function AddExerciseView({ setAddExerciseView, newWorkout, setNewWorkout }: any) {
  const API_URL = 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=';
  const { data, loading, error } = useApi(API_URL);
  const [clicked, setClicked] = useState(false);
  const { searchTerm, setSearchTerm, filteredExercises } = useSearch(data);

  function handleAddExercise(e: React.MouseEvent<HTMLDivElement>, name: string) {
    e.preventDefault();
    setClicked(!clicked);
    if (newWorkout.exercises.includes(name)) {
      setNewWorkout({
        ...newWorkout,
        exercises: newWorkout.exercises.filter((exe: string) => exe !== name)
      });
    } else {
      setNewWorkout({ ...newWorkout, exercises: [...newWorkout.exercises, name] });
    }
  }

  return (
    <div className="add-exercise-view">
      <button type="button" onClick={() => setAddExerciseView(false)} className="done-button">Done</button>
      <br />

      <input
        className="search-exercise"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="🔍 Search for an exercise"
      />

      {loading && <p>Loading. . .</p>}

      {error && <p>Error: {error}</p>}

      {data && (searchTerm.length > 0 ? filteredExercises : data).map((exercise: ExcerciseData, index: number) => (
        <div
          key={index}
          onClick={(event) => handleAddExercise(event, exercise.name)}
          className={`exercise-list-exercise-container ${(newWorkout.exercises.find((exe: string) => exe === exercise.name)) ? 'clicked' : ''}`}
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

export default AddExerciseView;
