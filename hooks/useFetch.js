import React, {useState, useEffect} from 'react';

export const useFetchGet = ({ endpoint }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
          setIsLoading(true);
    try {
          const res = await fetch('https://dog.ceo/api/breeds/image/random')
          const json = await res.json();
          setResponse(json);
          console.log('nacitavam skoro?');
          setIsLoading(false);
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
    return { response, error, isLoading };
  };
