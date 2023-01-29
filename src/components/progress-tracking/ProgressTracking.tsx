/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

// RECHART DOCUMENTATION: https://recharts.org/en-US/guide

import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Exercise } from '../../interfaces/interfaces';

function ProgressTracking() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();
  const [exerciseProgress, setExerciseProgress] = useLocalStorage('exerciseProgress', []);

  const formattedExerciseData = selectedExercise?.weights.map((item) => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    return { ...item, date: formattedDate };
  });

  return (
    <>
      {exerciseProgress.map((exercise: Exercise) => (
        <button
          key={exercise.name}
          onClick={() => setSelectedExercise(exercise)}
          type="button"
        >
          {exercise.name}
        </button>
      ))}
      {selectedExercise ? (
        <ResponsiveContainer width={700} height={400}>
          <LineChart
            data={formattedExerciseData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" padding={{ left: 50, right: 50 }} />
            <YAxis dataKey="weight" padding={{ top: 50 }} />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#850e0e" strokeWidth={5} dot={{ stroke: '#ff0000', strokeWidth: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Please select an exercise to view its progress</p>
      )}

    </>
  );
}

export default ProgressTracking;
