/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Workout } from '../../interfaces/interfaces';
import WorkoutStartedView from './WorkoutStartedView';

function Routine() {
  // const navigate = useNavigate();
  const routine = useParams();
  const [workoutRoutine, setWorkoutRoutine] = useLocalStorage<Workout[]>('workoutRoutines', []);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);

  function handleDeleteWorkout(index: number) {
    // Create a new array that doesn't include the workout to be deleted
    const updatedWorkoutRoutines = workoutRoutine.filter(
      (workout: Workout, i: number) => i !== index
    );
    setWorkoutRoutine(updatedWorkoutRoutines);
    // navigate('/workout_routines/');
  }

  if (!currentWorkout) {
    return (
      <>
        {workoutRoutine.filter((workout: Workout) => workout.name === routine.workout)
          .map((workout: Workout, index: number) => (
            <div key={index}>
              <h2>{workout.name}</h2>
              <h3>Exercises:</h3>
              <ul>
                {workout.exercises.map((exercise, i) => (
                  <li key={i}>{exercise}</li>
                ))}
              </ul>
              <button type="button" onClick={() => setCurrentWorkout(workout)}>Start Workout</button>
              <button type="button" onClick={() => handleDeleteWorkout(index)}>Delete</button>
            </div>
          ))}
      </>
    );
  }
  return (
    <WorkoutStartedView currentWorkout={currentWorkout} setCurrentWorkout={setCurrentWorkout} />
  );
}

export default Routine;
