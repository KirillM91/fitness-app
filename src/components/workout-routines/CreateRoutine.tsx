/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Workout } from '../../interfaces/interfaces';
import AddExerciseView from './AddExerciseView';
import trash from '../../assets/trash.png';
import BackButton from '../reusables/BackButton';

function CreateRoutine() {
  const navigate = useNavigate();
  const [workoutRoutines, setWorkoutRoutines] = useLocalStorage<Workout[]>('workoutRoutines', []);
  const [newWorkout, setNewWorkout] = useState<Workout>({ name: '', exercises: [] });
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
    <div className="create-routine">

      <BackButton x={8} y={10} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newWorkout.name}
          onChange={(event) => setNewWorkout({ ...newWorkout, name: event.target.value })}
          placeholder="Workout Name"
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

          : (
            <>
              <button
                type="submit"
                className="add-exercise-button"
                onClick={() => setAddExerciseView(true)}
              >
                Add Exercise
              </button>
              {newWorkout.exercises.map((exercise: string, index: number) => (
                <div className="create-routine-exercise-container">
                  <p key={index} className="exercise-name">{exercise}</p>
                  <button type="button" onClick={() => handleDeleteExercise(index)}>
                    <img src={trash} alt="trash can" />
                  </button>
                </div>
              ))}
              <button
                type="submit"
                className="save-workout-button"
              >
                Save Workout
              </button>
            </>
          )}

      </form>
    </div>
  );
}

export default CreateRoutine;
