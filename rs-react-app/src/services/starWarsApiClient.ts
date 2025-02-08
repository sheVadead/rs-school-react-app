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
