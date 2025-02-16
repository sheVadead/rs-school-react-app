import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type StarWarsPerson = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  url: string;
};

interface SearchParams {
  searchValue: string;
  pageNumber: number;
}

export type StarWarsApiResponse = {
  count: number;
  next: string | undefined;
  previous: string | undefined;
  results: StarWarsPerson[];
};

type TransformedStarWorsReponse = {
  results: StarWarsPerson[];
  pageCount: number;
};
export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people/' }),
  endpoints: (builder) => ({
    getStarWarsPersonById: builder.query<StarWarsPerson, string>({
      query: (id) => `${id}`,
    }),

    getStarWarsPersonsBySearch: builder.query<
      TransformedStarWorsReponse,
      SearchParams
    >({
      query: ({ searchValue, pageNumber }) =>
        `?search=${searchValue}&page=${pageNumber}`,
      transformResponse: (
        response: StarWarsApiResponse
      ): { results: StarWarsPerson[]; pageCount: number } => {
        return {
          results: response.results,
          pageCount: Math.ceil(response.count / 10),
        };
      },
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const {
  useGetStarWarsPersonByIdQuery,
  useGetStarWarsPersonsBySearchQuery,
} = starWarsApi;
