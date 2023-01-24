import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ExerciseInfo from './components/ExerciseInfo';
import ExerciseList from './components/ExerciseList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:target" element={<ExerciseList />} />
        <Route path="/:target/:id" element={<ExerciseInfo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
