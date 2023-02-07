import { useState, useEffect } from 'react';
import fuzzysort from 'fuzzysort';
import { ExcerciseData } from '../interfaces/interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useSearch(data: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    let APICallDelay: ReturnType<typeof setTimeout>;
    if (data) {
      APICallDelay = setTimeout(() => {
        const results = fuzzysort
          .go(searchTerm, data, { key: 'name' })
          .map((result) => result.target);
        setFilteredExercises(
          data?.filter((exercise: ExcerciseData) => results.includes(exercise.name))
        );
      }, 1000);
    }
    return () => {
      clearTimeout(APICallDelay);
    };
  }, [searchTerm, data]);

  return { searchTerm, setSearchTerm, filteredExercises };
}

export default useSearch;
