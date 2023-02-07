import { useState, useEffect } from 'react';
import EXERCISEDB_API_KEY from '../top-secret';
import { ApiResponse } from '../interfaces/interfaces';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': EXERCISEDB_API_KEY,
    'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com',
  },
};

function useApi(url: string): ApiResponse {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err);
      }
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useApi;
