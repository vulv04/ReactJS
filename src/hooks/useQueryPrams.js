// src/hooks/useQueryParam.js
import { useSearchParams } from "react-router-dom";

export const useQueryParam = (key, defaultValue) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(key) || defaultValue;

  const setValue = (newValue) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, newValue);
    setSearchParams(updatedParams);
  };

  return [value, setValue];
};
