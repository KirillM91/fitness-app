import { Link } from 'react-router-dom';
import Exercise from '../../assets/Exercise';
import targetMuscleList from '../../data/targetMuscleList';
import BackButton from '../reusables/BackButton';

function ExerciseDatabase() {
  const exerciseTextClassName = 'exercise-database-text-bg';

  return (
    <div className="exercise-database">
      <BackButton x={2} y={10} />
      {targetMuscleList.map((muscle, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Link to={`/exercise_database/${muscle}`} key={index}>
          <p>{muscle}</p>
        </Link>
      ))}
      <Exercise exerciseTextClassName={exerciseTextClassName} />
    </div>
  );
}

export default ExerciseDatabase;
