import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ExerciseList from './components/exercise-database/ExerciseList';
import ExerciseDatabase from './components/exercise-database/ExerciseDatabase';
import WorkoutRoutines from './components/workout-routines/WorkoutRoutines';
import ProgressTracking from './components/progress-tracking/ProgressTracking';
import CreateRoutine from './components/workout-routines/CreateRoutine';
import Routine from './components/workout-routines/Routine';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        {/* Workout Routines */}
        <Route path="/workout_routines/" element={<WorkoutRoutines />} />
        <Route path="/workout_routines/:workout" element={<Routine />} />
        <Route path="/workout_routines/create_workout" element={<CreateRoutine />} />

        {/* Progress Tracking */}
        <Route path="/progress_tracking" element={<ProgressTracking />} />

        {/* Excercise database */}
        <Route path="/exercise_database" element={<ExerciseDatabase />} />
        <Route path="/exercise_database/:target" element={<ExerciseList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
