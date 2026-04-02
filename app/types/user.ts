export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  token: string;
}

export interface UserStats {
  moviesLogged: number;
  highlyRatedMovies: number;
  topGenres: string[];
}

export interface MyProfile {
  id: number;
  username: string;
  hasLetterboxdData: boolean;
  stats: UserStats;
}

export interface LetterboxdImportResponse {
  id: number;
  username: string;
  hasLetterboxdData: boolean;
  stats: UserStats;
}