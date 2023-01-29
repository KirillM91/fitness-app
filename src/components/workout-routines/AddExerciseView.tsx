import React, { useState } from 'react';
import useApi from '../../hooks/useApi';

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-explicit-any
function AddExerciseView({ setAddExerciseView, newWorkout, setNewWorkout }: any) {
  const API_URL = 'https://exercisedb.p.rapidapi.com/exercises';
  const { data, loading, error } = useApi(API_URL);
  const [clicked, setClicked] = useState(false);

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
    <>
      <button type="button" onClick={() => setAddExerciseView(false)}>Done</button>

      {loading && <p>Loading. . .</p>}

      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {error && <p>Error: {error}</p>}

      {data && data?.map((exercise, index) => (
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={(event) => handleAddExercise(event, exercise.name)}
          className={(newWorkout.exercises.find((exe: string) => exe === exercise.name)) ? 'clicked' : ''}
        >
          <p>
            {exercise.name}
            {exercise.equipment}
            {exercise.target}
          </p>
          <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" className="paused" />
        </div>
      ))}
    </>
  );
}

export default AddExerciseView;
