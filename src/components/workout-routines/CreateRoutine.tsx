/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Workout } from '../../interfaces/interfaces';
import AddExerciseView from './AddExerciseView';

function CreateRoutine() {
  const [workoutRoutines, setWorkoutRoutines] = useLocalStorage<Workout[]>('workoutRoutines', []);
  const [newWorkout, setNewWorkout] = useState<Workout>({ name: 'Workout Name', exercises: [] });

  const [addExerciseView, setAddExerciseView] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setWorkoutRoutines([...workoutRoutines, newWorkout]);
    setNewWorkout({ name: '', exercises: [] });
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
          <p key={index}>{exercise}</p>
        ))}

        <button type="submit">Save Workout</button>

      </form>
    </div>
  );
}

export default CreateRoutine;
