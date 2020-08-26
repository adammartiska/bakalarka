import React, { useState, useEffect } from 'react';
import { create } from 'apisauce';
import { useSelector } from 'react-redux';

/*
 * v komponente pouzivam tak :
 * const hook = useFetchGet('/pridavnyEndpoint')
 * const { payload, error, isLoading } = hook
 * a nasledne uz viem pouzivat napriklad payload.ziak, ...
 */

export const useFetchGet = url => {
  const jwt = useSelector(state => state.auth.token);
  const relationId = useSelector(state => state.auth.relationId);
  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
      Relation: relationId
    }
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(url);
        setResponse(res);
        ('nacitavam skoro?');
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return { response, error, isLoading };
};
