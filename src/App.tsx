/* eslint-disable react/jsx-one-expression-per-line */
import './styling/main.scss';
import React from 'react';
import { Link } from 'react-router-dom';
// import EXERCISES from './assets/EXERCISES.svg';
import Exercise from './assets/Exercise';
import Progress from './assets/Progress';
import Routines from './assets/Routines';

function App() {
  const exerciseTextClassName = 'exercise-database-text';
  const routinesTextClassName = 'workout-routines-text';
  const progressTextClassName = 'progress-tracing-text';

  return (
    <div className="App">
      <div className="navigation">
        {/* <div className="navigation-text-container"> */}
        <Link to="/exercise_database">
          <Exercise exerciseTextClassName={exerciseTextClassName} />
        </Link>
        {/* </div> */}

        {/* <div className="navigation-text-container"> */}
        <Link to="/workout_routines">
          <Routines routinesTextClassName={routinesTextClassName} />
        </Link>
        {/* </div> */}

        {/* <div className="navigation-text-container"> */}
        <Link to="/progress_tracking">
          <Progress progressTextClassName={progressTextClassName} />
        </Link>
        {/* </div> */}
      </div>
    </div>
  );
}
export default App;
