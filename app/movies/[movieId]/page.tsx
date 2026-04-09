"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Card, Input, Spin, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { MovieDetails } from "@/types/movie";
import styles from "@/styles/page.module.css";

const { Title, Text, Paragraph } = Typography;

const MoviePage: React.FC = () => {

  const router = useRouter();
  const params = useParams();
  const apiService = useApi();
  const { clear: clearToken } = useLocalStorage<string>("token", "");

  const movieId = useMemo(() => {
    const value = params?.movieId;
    return Array.isArray(value) ? value[0] : value;
  }, [params]);

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");


  const handleLogout = () => {
    clearToken();
    router.replace("/login");
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      return;
    }

    router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      if (!movieId) {
        setError("Movie id is missing.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiService.get<MovieDetails>(`/movies/${movieId}`);

        //**const fakeResponse = {
        //...response,
        //tasteOverlap: 72, //using this for testing rn since backend not ready yet
        //};
        //setMovie(fakeResponse);

        setMovie(response)
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          const status = (err as { status?: number }).status;

          if (status === 401 || status === 403) {
            clearToken();
            router.replace("/login");
            return;
          }

          setError(err.message);
        } else {
          setError("Failed to load movie details.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [apiService, clearToken, movieId, router]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <div className={styles.loadingWrap}>
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <div className={styles.hero}>
            <div className={styles.heroLeft}>
              <Link href="/users/me" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.brandRow}>
                  <img src="/logo.png" alt="logo" className={styles.logo} />
                  <Title level={1} className={styles.brand}>
                    Movieblendr.
                  </Title>
                </div>
              </Link>
              <Title level={3} className={styles.subtitle}>
                Movie Details
              </Title>
            </div>

            <div className={styles.heroRight}>
              <Input.Search
                className={styles.searchInput}
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearch}
                enterButton
              />
              <Button className={styles.authButton} onClick={() => router.back()}>
                Back
              </Button>
              <Button className={styles.authButton} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>

          <Card className={styles.shellCard}>
            <Text type="danger">{error ?? "Failed to load movie details."}</Text>

            <div className={styles.errorActions}>
              <Button className={styles.authButton} onClick={() => router.back()}>
                Go back
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const genreList =
    movie.genres
      ?.split(",")
      .map((genre) => genre.trim())
      .filter(Boolean) ?? [];

  const hasPoster =
    movie.posterUrl && movie.posterUrl !== "N/A" && movie.posterUrl.trim() !== "";

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <Link href="/users/me" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className={styles.brandRow}>
                <img src="/logo.png" alt="logo" className={styles.logo} />
                <Title level={1} className={styles.brand}>
                  Movieblendr.
                </Title>
              </div>
            </Link>
            <Title level={3} className={styles.subtitle}>
              Movie Details
            </Title>
          </div>

          <div className={styles.heroRight}>
            <Input.Search
              className={styles.searchInput}
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
              enterButton
            />
            <Button className={styles.authButton} onClick={() => router.back()}>
              Back
            </Button>
            <Button className={styles.authButton} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <Card className={styles.shellCard}>
          <div className={styles.movieLayout}>
            <div>
              {hasPoster ? (
                <img
                  src={movie.posterUrl}
                  alt={`${movie.title} poster`}
                  className={styles.moviePoster}
                />
              ) : (
                <div className={styles.posterFallback}>No poster available</div>
              )}
            </div>

            <div>
              <div className={styles.label}>Title</div>
              <Title level={2} className={styles.movieTitle}>
                {movie.title}
              </Title>

              <div className={styles.movieInfoGrid}>
                <Card className={styles.softCard}>
                  <div className={styles.label}>Year</div>
                  <div className={styles.statValue}>{movie.year ?? "-"}</div>
                </Card>

                <Card className={styles.softCard}>
                  <div className={styles.label}>IMDb Rating</div>
                  <div className={styles.statValue}>{movie.imdbRating || "-"}</div>
                </Card>

                <Card className={styles.softCard}>
                  <div className={styles.label}>Runtime</div>
                  <div className={styles.runtimeValue}>{movie.runtime || "-"}</div>
                </Card>

                <Card className={styles.softCard}>
                  <div className={styles.label}>Director</div>
                  <Text className={styles.directorText}>{movie.director || "-"}</Text>
                </Card>
              </div>

              {typeof movie.tasteOverlap === "number" && (
                <div className={styles.section}>
                  <div className={styles.tasteMatchBanner}>
                    <UserOutlined style={{ fontSize: 16, color: "#86fd80" }} />
                    <span className={styles.tasteMatchValue}>{movie.tasteOverlap}% Match</span>
                    <span className={styles.tasteMatchText}>with your Letterboxd taste profile</span>
                  </div>
                </div>
              )}

              <div className={styles.section}>
                <Title level={3} className={styles.sectionTitle}>
                  Genres
                </Title>

                {genreList.length > 0 ? (
                  <div className={styles.genreWrap}>
                    {genreList.map((genre) => (
                      <span key={genre} className={styles.genrePill}>
                        {genre}
                      </span>
                    ))}
                  </div>
                ) : (
                  <Text className={styles.helperText}>No genres available.</Text>
                )}
              </div>

              <div className={styles.section}>
                <Title level={3} className={styles.sectionTitle}>
                  Description
                </Title>
                <Paragraph className={styles.descriptionText}>
                  {movie.description || "No description available."}
                </Paragraph>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MoviePage;