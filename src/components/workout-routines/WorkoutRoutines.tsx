/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Workout } from '../../interfaces/interfaces';

function WorkoutRoutines() {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [workoutRoutine, setWorkoutRoutine] = useLocalStorage<Workout[]>('workoutRoutines', []);

  return (
    <div>

      <h2>Saved Workouts:</h2>

      {workoutRoutine.map((workout: Workout, index: number) => (
        <Link to={`/workout_routines/${workout.name}`} key={index}>
          <div style={{ border: '1px solid red' }}>
            <h3>{workout.name}</h3>
            <ul>
              {workout.exercises.map((exercise, i) => (
                <li key={i}>{exercise}</li>
              ))}
            </ul>
          </div>
        </Link>
      ))}

      <Link to="/workout_routines/create_workout">
        Create a new workout
      </Link>

    </div>
  );
}

export default WorkoutRoutines;
