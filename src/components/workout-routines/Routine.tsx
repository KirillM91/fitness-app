/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Routines from '../../assets/Routines';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Workout } from '../../interfaces/interfaces';
import WorkoutStartedView from './WorkoutStartedView';

function Routine() {
  // const navigate = useNavigate();
  const routine = useParams();
  const [workoutRoutine, setWorkoutRoutine] = useLocalStorage<Workout[]>('workoutRoutines', []);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const routinesTextClassName = 'workout-routines-text-bg';

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
      <div className="routine">
        {workoutRoutine.filter((workout: Workout) => workout.name === routine.workout)
          .map((workout: Workout, index: number) => (
            <div key={index}>
              <h2>{workout.name}</h2>
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
