/* eslint-disable max-len */
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Routines from '../../assets/Routines';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Exercise } from '../../interfaces/interfaces';
import BackButton from '../reusables/BackButton';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WorkoutStartedView({ currentWorkout }: any) {
  const navigate = useNavigate();
  const [exerciseProgress, setExerciseProgress] = useLocalStorage<Exercise[]>('exerciseProgress', []);
  const [newExercise, setNewExercise] = useState<Exercise>();
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const routinesTextClassName = 'workout-routines-text-bg';

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name } = event.target;
    const exercise = { name, weights: [{ date: new Date(), weight: +event.target.value }] };
    setNewExercise(exercise);
  }

  function handleExerciseDone(exercise: string) {
    setSelectedExercises([...selectedExercises, exercise]);
    if (!newExercise) return;

    const exerciseToUpdate = exerciseProgress.find((exe: Exercise) => exe.name === newExercise.name);
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
    <div className="workout-started-view">
      <form onSubmit={finishWorkout}>
        <h2>{currentWorkout.name}</h2>
        <BackButton x={2} y={65} />
        {currentWorkout.exercises.map((exercise: string) => (
          <div key={exercise} className="exercise">
            <p>{exercise}</p>
            <div>
              <input
                className="weight-input"
                type="number"
                name={exercise}
                onChange={handleChange}
                disabled={selectedExercises.includes(exercise)}
              />
              <button
                className="exercise-done-button"
                type="button"
                disabled={selectedExercises.includes(exercise)}
                onClick={() => handleExerciseDone(exercise)}
              >
                ✓
              </button>
            </div>
          </div>
        ))}
        <button type="submit" className="finish-workout-button">Finish Workout</button>
      </form>
      <Routines routinesTextClassName={routinesTextClassName} />
    </div>
  );
}

export default WorkoutStartedView;
