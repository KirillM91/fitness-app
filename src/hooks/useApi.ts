/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { ApiResponse } from '../interfaces/interfaces';

const API_KEY = process.env.EXERCISEDB_API_KEY;

if (!API_KEY) {
  throw new Error('API_KEY is not defined');
}

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': API_KEY,
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
