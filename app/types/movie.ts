export interface MovieSearchDTO {
  id: string;
  title: string;
  year: number;
  posterUrl: string;
}

export interface MovieSearchResponse {
  results: MovieSearchDTO[];
}

export interface MovieDetails {
  id: string;
  title: string;
  year: number;
  posterUrl: string;
  description: string;
  director: string;
  genres: string;
  runtime: string;
  imdbRating: string;
  tasteOverlap?: number;
}