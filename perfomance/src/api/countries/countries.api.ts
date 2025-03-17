import { fetchJson } from '..';
import { Country } from '../../types/country';

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetchJson('https://restcountries.com/v3.1/all');
  return response;
};

export const fetchByName = async (
  name: string,
): Promise<() => Promise<Country[]>> => {
  return async () => {
    const response = await fetchJson(
      `https://restcountries.com/v3.1/name/${name}`,
    );
    return response;
  };
};
