import React, { useState, useEffect } from 'react';
import { create } from 'apisauce';

/*
 * v komponente pouzivam tak :
 * const hook = useFetchGet('/pridavnyEndpoint')
 * const { payload, error, isLoading } = hook
 * a nasledne uz viem pouzivat napriklad payload.ziak, ...
 */

export const useFetchGet = ({ endpoint }) => {
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
        const res = await api.get(endpoint);
        // const res = await fetch(`http://147.175.121.250:80/info${endpoint}`);
        //const json = await res.json();
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
