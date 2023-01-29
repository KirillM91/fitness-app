/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Workout } from '../../interfaces/interfaces';
import AddExerciseView from './AddExerciseView';

function CreateRoutine() {
  const navigate = useNavigate();
  const [workoutRoutines, setWorkoutRoutines] = useLocalStorage<Workout[]>('workoutRoutines', []);
  const [newWorkout, setNewWorkout] = useState<Workout>({ name: 'Workout Name', exercises: [] });
  const [addExerciseView, setAddExerciseView] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await setWorkoutRoutines([...workoutRoutines, newWorkout]);
    setNewWorkout({ name: '', exercises: [] });
    navigate('/workout_routines/');
  }

  function handleDeleteExercise(index: number) {
    const updatedExerciseList = newWorkout.exercises.filter(
      (exercise: string, i: number) => i !== index
    );
    setNewWorkout({ ...newWorkout, exercises: updatedExerciseList });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="workoutName"
          type="text"
          value={newWorkout.name}
          onChange={(event) => setNewWorkout({ ...newWorkout, name: event.target.value })}
        />
        <br />

        {addExerciseView
          ? (
            <AddExerciseView
              setAddExerciseView={setAddExerciseView}
              newWorkout={newWorkout}
              setNewWorkout={setNewWorkout}
            />
          )

          : <button type="submit" onClick={() => setAddExerciseView(true)}>Add Exercise</button>}

        <br />

        {newWorkout.exercises.map((exercise: string, index: number) => (
          <>
            <p key={index}>{exercise}</p>
            <button type="button" onClick={() => handleDeleteExercise(index)}>Remove</button>
          </>
        ))}
        <br />

        <button type="submit">Save Workout</button>

      </form>
    </div>
  );
}

export default CreateRoutine;
