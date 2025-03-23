import { useState } from 'react';

export type CountriesLocalStorage = Record<string, boolean>;

export const useLocalStorage = () => {
  const [storedValue, setStoredValue] = useState<CountriesLocalStorage>(() => {
    const countries = JSON.parse(localStorage.getItem('countries') ?? '{}');

    if (!Object.keys(countries).length) {
      localStorage.setItem('countries', JSON.stringify({}));
      return {};
    }
    return countries;
  });

  const setValue = (value: string) => {
    try {
      setStoredValue((prev) => ({ ...prev, [value]: true }));
      localStorage.setItem(
        'countries',
        JSON.stringify({ ...storedValue, [value]: true }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};
