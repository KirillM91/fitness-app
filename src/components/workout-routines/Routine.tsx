/* eslint-disable react/no-array-index-key */
import { useParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Workout } from '../../interfaces/interfaces';

function Routine() {
  // const navigate = useNavigate();
  const routine = useParams();
  const [workoutRoutine, setWorkoutRoutine] = useLocalStorage<Workout[]>('workoutRoutines', []);

  function handleDeleteWorkout(index: number) {
    // Create a new array that doesn't include the workout to be deleted
    const updatedWorkoutRoutines = workoutRoutine.filter(
      (workout: Workout, i: number) => i !== index
    );
    setWorkoutRoutine(updatedWorkoutRoutines);
  }

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
            <button type="button" onClick={() => handleDeleteWorkout(index)}>Delete</button>
          </div>
        ))}
    </>
  );
}

export default Routine;
