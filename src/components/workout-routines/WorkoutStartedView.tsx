/* eslint-disable max-len */
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Exercise } from '../../interfaces/interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WorkoutStartedView({ currentWorkout }: any) {
  const navigate = useNavigate();
  const [exerciseProgress, setExerciseProgress] = useLocalStorage<Exercise[]>('exerciseProgress', []);
  const [newExercise, setNewExercise] = useState<Exercise>();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name } = event.target;
    const exercise = { name, weights: [{ date: new Date(), weight: +event.target.value }] };
    setNewExercise(exercise);
  }

  function handleExerciseDone() {
    if (!newExercise) return;

    const exerciseToUpdate = exerciseProgress.find((exercise: Exercise) => exercise.name === newExercise.name);
    if (exerciseToUpdate) {
      const updatedExercises = [...exerciseProgress];
      updatedExercises[exerciseProgress.indexOf(exerciseToUpdate)].weights = [...exerciseToUpdate.weights, ...newExercise.weights];
      setExerciseProgress(updatedExercises);
    } else {
      setExerciseProgress([...exerciseProgress, newExercise]);
    }

    setNewExercise({ name: '', weights: [{ date: new Date(), weight: 0 }] });
  }

  function finishWorkout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    alert('Good Job!');
    navigate('/workout_routines/');
  }

  return (
    <div>
      <form onSubmit={finishWorkout}>
        {currentWorkout.exercises.map((exercise: string) => (
          <div key={exercise}>
            <p>{exercise}</p>
            <input
              type="number"
              name={exercise}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={handleExerciseDone}
            >
              Done
            </button>
          </div>
        ))}
        <button type="submit">Finish Workout</button>
      </form>
    </div>
  );
}

export default WorkoutStartedView;
