/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Routines from '../../assets/Routines';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Workout } from '../../interfaces/interfaces';
import BackButton from '../reusables/BackButton';
import WorkoutStartedView from './WorkoutStartedView';

function Routine() {
  const routine = useParams();
  const [workoutRoutine, setWorkoutRoutine] = useLocalStorage<Workout[]>('workoutRoutines', []);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const routinesTextClassName = 'workout-routines-text-bg';

  // Creates a new array that doesnt include the workout to be deleted
  function handleDeleteWorkout(index: number) {
    const updatedWorkoutRoutines = workoutRoutine.filter(
      (workout: Workout, i: number) => i !== index
    );
    setWorkoutRoutine(updatedWorkoutRoutines);
  }

  // If no workout state is set, a routine view is shown. Else WorkoutStartedView view is shown
  if (!currentWorkout) {
    return (
      <div className="routine">
        {/* Filters out a routine with the same name as the path and maps that routine out  */}
        {workoutRoutine.filter((workout: Workout) => workout.name === routine.workout)
          .map((workout: Workout, index: number) => (
            <div key={index}>
              <h2>{workout.name}</h2>
              <BackButton x={2} y={65} />
              <ul>
                {workout.exercises.map((exercise, i) => (
                  <li key={i}>{exercise}</li>
                ))}
              </ul>

              <button
                className="start-workout-button"
                type="button"
                onClick={() => setCurrentWorkout(workout)}
              >
                Start Workout
              </button>

              <button
                className="delete-workout-button"
                type="button"
                onClick={() => handleDeleteWorkout(index)}
              >
                Delete
              </button>

            </div>
          ))}

        <Routines routinesTextClassName={routinesTextClassName} />
      </div>
    );
  }
  return (
    <WorkoutStartedView currentWorkout={currentWorkout} setCurrentWorkout={setCurrentWorkout} />
  );
}

export default Routine;
