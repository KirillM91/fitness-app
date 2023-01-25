import { Link } from 'react-router-dom';
import targetMuscleList from '../../data/targetMuscleList';

function ExerciseDatabase() {
  return (
    <div>
      {targetMuscleList.map((muscle, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Link to={`/exercise_database/${muscle}`} key={index}>
          <p>{muscle}</p>
        </Link>
      ))}
    </div>
  );
}

export default ExerciseDatabase;
