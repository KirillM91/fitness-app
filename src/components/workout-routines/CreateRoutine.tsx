/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Workout } from '../../interfaces/interfaces';

function CreateRoutine() {
  const [workoutRoutines, setWorkoutRoutines] = useLocalStorage<Workout[]>('workoutRoutines', []);
  const [newWorkout, setNewWorkout] = useState<Workout>({ name: '', exercises: [] });
  const [newExercise, setNewExercise] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setWorkoutRoutines([...workoutRoutines, newWorkout]);
    setNewWorkout({ name: '', exercises: [] });
  }

  function handleAddExercise(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setNewWorkout({ ...newWorkout, exercises: [...newWorkout.exercises, newExercise] });
    setNewExercise('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="workoutName">Workout Name: </label>
        <input
          id="workoutName"
          type="text"
          value={newWorkout.name}
          onChange={(event) => setNewWorkout({ ...newWorkout, name: event.target.value })}
        />
        <br />

        <label htmlFor="exercise">Exercise: </label>
        <input
          id="exercise"
          type="text"
          value={newExercise}
          onChange={(event) => setNewExercise(event.target.value)}
        />
        <br />

        <button type="submit" onClick={handleAddExercise}>Add Exercise</button>
        <br />

        <input type="submit" value="Save Workout" />

      </form>
    </div>
  );
}

export default CreateRoutine;
