type IStarWarsClient = {
  search: (search: string) => Promise<any>;
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

const LAST_SEARCH_TERM_KEY = 'lastSearchTerm';
class StarWarsClient implements IStarWarsClient {
  private baseUrl = 'https://swapi.dev/api/people/';

  public async search(searchTerm: string) {
    const response = await this.fetchJson(
      searchTerm ? { search: searchTerm } : undefined
    );

    this.saveToLocalStorage(searchTerm);

    return response.results;
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

    const response = (await (
      await fetch(newUrl)
    ).json()) as StarWarsApiResponse;

    return response;
  }
}
export const starWarsApiClient = new StarWarsClient();
