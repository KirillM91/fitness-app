export interface Workout {
  name: string;
  exercises: string[];
}

export interface ExcerciseData {
  bodyPart: 'string',
  equipment: 'string',
  gifUrl: 'string',
  id: 'string',
  name: 'string',
  target: 'string'
}

export interface ApiResponse {
data?: ExcerciseData[];
loading: boolean;
error: string;
}
