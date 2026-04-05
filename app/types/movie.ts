export interface MovieSearchDTO {
  id: string;
  title: string;
  year: number;
  posterUrl: string;
}

export interface MovieSearchResponse {
  results: MovieSearchDTO[];
}
