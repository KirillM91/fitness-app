/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import Routines from '../../assets/Routines';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Workout } from '../../interfaces/interfaces';
import backArrow from '../../assets/icons8-back-24.png';

function WorkoutRoutines() {
  const [workoutRoutine, setWorkoutRoutine] = useLocalStorage<Workout[]>('workoutRoutines', []);
  const routinesTextClassName = 'workout-routines-text-bg';
  const navigate = useNavigate();

  return (
    <div className="workout-routines">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="reusable-back-button"
        style={{ left: '8px', top: '10px' }}
      >
        <img src={backArrow} alt="" />
        <span>Back</span>
      </button>

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
