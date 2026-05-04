export type PollResultMovie = {
  movieId: string;
  title: string;
  posterUrl?: string;
  votes: number;
};

export type PollResultsResponse = {
  topMovies?: PollResultMovie[];
};