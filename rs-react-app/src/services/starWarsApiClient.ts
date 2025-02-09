export type StarWarsPerson = {
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

export type StarWarsApiResponse = {
  count: number;
  next: string | undefined;
  previous: StarWarsPerson[] | null;
  results: StarWarsPerson[];
};

export const fetchItems = async (searchValue: string, pageNumber: number) => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${searchValue}&page=${pageNumber}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return await response.json();
};

export const fetchItemByURL = async (id: string) => {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return await response.json();
};
