/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import Routines from '../../assets/Routines';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Workout } from '../../interfaces/interfaces';
import BackButton from '../reusables/BackButton';

function WorkoutRoutines() {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [workoutRoutine, setWorkoutRoutine] = useLocalStorage<Workout[]>('workoutRoutines', []);
  const routinesTextClassName = 'workout-routines-text-bg';

  return (
    <div>
      <BackButton x={8} y={10} />

      <Link to="/workout_routines/create_workout">
        <button type="button" className="create-new-workout-button">
          <span className="create-new-workout-button-plus-sign">
            +
          </span>
        </button>

      </Link>

      {workoutRoutine.map((workout: Workout, index: number) => (
        <Link to={`/workout_routines/${workout.name}`} key={index}>
          <div className="workout-routine-box">
            <h3>{workout.name}</h3>
            <ul>
              {workout.exercises.map((exercise, i) => (
                <li key={i}>{exercise}</li>
              ))}
            </ul>
          </div>
        </Link>
      ))}

      <Routines routinesTextClassName={routinesTextClassName} />
    </div>
  );
}

export default WorkoutRoutines;
