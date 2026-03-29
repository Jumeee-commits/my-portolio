import { useState, useEffect } from 'react';

export const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL || 'https://my-portolio-ulg3.vercel.app'}${endpoint}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return { data, loading };
};
