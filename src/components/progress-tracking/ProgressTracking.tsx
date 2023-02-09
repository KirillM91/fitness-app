/* eslint-disable max-len */
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
import BackButton from '../reusables/BackButton';

function ProgressTracking() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();
  const [exerciseProgress, setExerciseProgress] = useLocalStorage('exerciseProgress', []);

  // Converts the ugly default date format to a beautiful clean format :)
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
    <div className="progress-tracking">
      <BackButton x={1} y={10} />
      <select onChange={(e) => setSelectedExercise(exerciseProgress.find((exercise: Exercise) => exercise.name === e.target.value))}>
        <option value="">--Select an exercise--</option>
        {exerciseProgress.map((exercise: Exercise) => (
          <option key={exercise.name} value={exercise.name}>
            {exercise.name}
          </option>
        ))}
      </select>

      {selectedExercise && (
        <div className="graph">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={formattedExerciseData}
              margin={{
                top: 20,
                right: 20,
                bottom: 90,
                left: -18
              }}
            >
              <CartesianGrid horizontal={false} vertical={false} />
              <XAxis
                dataKey="date"
                padding={{ left: 0, right: 30 }}
                angle={270}
                dy={50}
                dx={-5}
                interval={0}
              />
              <YAxis
                dataKey="weight"
                padding={{ top: 50 }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#138500"
                strokeWidth={5}
                dot={{ stroke: '#0d5700', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  );
}

export default ProgressTracking;
