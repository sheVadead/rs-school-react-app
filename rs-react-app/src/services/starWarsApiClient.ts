import { DatabaseService } from './db/db.service';

type IStarWarsClient = {
  search: (search: string) => Promise<SearchResponse>;
};

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
};

type StarWarsApiResponse = {
  count: number;
  next: string | undefined;
  previous: StarWarsPerson[] | null;
  results: StarWarsPerson[];
};

type SearchResponse = {
  items: StarWarsPerson[];
  isLoading: boolean;
  isError?: boolean;
};

const LAST_SEARCH_TERM_KEY = 'lastSearchTerm';

class StarWarsClient implements IStarWarsClient {
  private baseUrl = 'https://swapi.dev/api/people/';

  private db: DatabaseService = new DatabaseService();

  public async search(searchTerm: string): Promise<SearchResponse> {
    try {
      const response = await this.fetchJson(
        searchTerm ? { search: searchTerm } : undefined
      );

      this.saveToLocalStorage(searchTerm);

      return { isLoading: false, items: response.results };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { isLoading: false, items: [], isError: true };
    }
  }
  private saveToLocalStorage(searchTerm: string) {
    localStorage.setItem(LAST_SEARCH_TERM_KEY, searchTerm);
  }

  private async fetchJson(params?: {
    search?: string;
  }): Promise<StarWarsApiResponse> {
    const newUrl = new URL(this.baseUrl);

    if (params?.search) {
      newUrl.searchParams.set('search', params.search);
    }

    const response = await fetch(newUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json() as Promise<StarWarsApiResponse>;
  }
}
export const starWarsApiClient = new StarWarsClient();
