import React, { useState, useEffect } from 'react';
import { create } from 'apisauce';

export const useFetchPost = ({ endpoint, data }) => {
  const api = create({
    baseURL: 'http://147.175.121.250:80'
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log(data);
        const res = await api.post(endpoint, data);
        setResponse(res);
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
