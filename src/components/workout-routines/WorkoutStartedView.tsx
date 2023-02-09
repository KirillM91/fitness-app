/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Routines from '../../assets/Routines';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Exercise } from '../../interfaces/interfaces';
import BackButton from '../reusables/BackButton';

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
    // Array with names of finished exercises, to disable the corresponding inputs and buttons
    setSelectedExercises([...selectedExercises, exercise]);
    if (!newExercise) return;

    // Black magic ritual fueld by sweat and tears
    // Checks if an exercise with the same name as newExercise exists in the exerciseProgress
    // If it exists, finds the index of that exercise object in the exerciseProgress array
    // This index is then used to access the same object in the updatedExercises array
    // The weights property  is then updated
    // If it doesnt exist, newExercise is added to the exerciseProgress
    const exerciseToUpdate = exerciseProgress.find((exe: Exercise) => exe.name === newExercise.name);
    if (exerciseToUpdate) {
      const updatedExercises = [...exerciseProgress];
      const index = exerciseProgress.indexOf(exerciseToUpdate);
      updatedExercises[index].weights = [...exerciseToUpdate.weights, ...newExercise.weights];
      setExerciseProgress(updatedExercises);
    } else {
      setExerciseProgress([...exerciseProgress, newExercise]);
    }

    setNewExercise({ name: '', weights: [{ date: new Date(), weight: 0 }] });
  }

  function finishWorkout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
