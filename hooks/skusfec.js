import React, { useState, useEffect } from 'react';
import { create } from 'apisauce';

/*
 * v komponente pouzivam tak :
 * const hook = useFetchGet('/pridavnyEndpoint')
 * const { payload, error, isLoading } = hook
 * a nasledne uz viem pouzivat napriklad payload.ziak, ...
 */

export const skusfec = () => {
  const api = create({
    baseURL: 'http://147.175.121.250:80/info/listOfUsers'
  });
  return async () => {
      try {
        const res = await api.get(url);
        setResponse(res);
        console.log('nacitavam skoro?');
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return [{ response, error, isLoading }, setUrl];
};
const [url, setUrl] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = 