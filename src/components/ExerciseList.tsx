import React from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';

function ExerciseList() {
  const muscle = useParams();
  const API_URL = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${muscle.target}`;
  const { data, loading, error } = useApi(API_URL);

  // const [page, setPage] = useState(1);
  // const perPage = 10;

  // const handleLoadMore = () => {
  //   setPage(page + 1);
  // };

  // const start = (page - 1) * perPage;
  // const end = page * perPage;
  // const startData = data?.slice(0, 10);
  // const currentData = data?.slice(start, end);
  // let newData: ExcerciseData[] | undefined = [];
  // if (currentData) {
  //   newData = startData?.concat(currentData);
  // }

  return (
    <div className="App">

      {loading && <p>Loading. . .</p>}

      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {error && <p>Error: {error}</p>}

      {data && data?.map((exercise, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <p>{exercise.bodyPart}</p>
          <p>{exercise.equipment}</p>
          <p>{exercise.name}</p>
          <p>{exercise.target}</p>
          <img src={exercise.gifUrl} alt={exercise.name} />
        </div>
      ))}
      {/* <button type="button" onClick={handleLoadMore}>Load More</button> */}

    </div>
  );
}
export default ExerciseList;
