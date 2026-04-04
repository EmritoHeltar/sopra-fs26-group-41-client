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