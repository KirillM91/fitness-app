export interface Workout {
  name: string;
  exercises: string[];
}

export interface ExcerciseData {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

export interface ApiResponse {
data?: ExcerciseData[];
loading: boolean;
error: string;
}

export interface Exercise {
  name: string;
  weights: {
    date: Date;
    weight: number;
  }[];
}
