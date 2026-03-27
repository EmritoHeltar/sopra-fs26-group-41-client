"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Spin, Typography } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { MyProfile } from "@/types/user";


const { Text } = Typography;


const mockProfile: MyProfile = {
  id: 0,
  username: "User",
  hasLetterboxdData: false,
  stats: {
    moviesLogged: 0,
    highlyRatedMovies: 0,
    topGenres: [],
  },
};

const Profile: React.FC = () => {
  const router = useRouter();
  const apiService = useApi();
  const { clear: clearToken } = useLocalStorage<string>("token", "");

  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiService.get<Partial<MyProfile>>("/users/me");

        const safeProfile: MyProfile = {
          id: response.id ?? 0,
          username: response.username ?? "User",
          hasLetterboxdData: response.hasLetterboxdData ?? false,
          stats: {
            moviesLogged: response.stats?.moviesLogged ?? 0,
            highlyRatedMovies: response.stats?.highlyRatedMovies ?? 0,
            topGenres: response.stats?.topGenres ?? [],
          },
        };

        setProfile(safeProfile);
      } catch (err) {
        if (err instanceof Error) {
          const status = (err as { status?: number }).status;

          if (status === 401) {
            clearToken();
            router.replace("/login");
            return;
          }

          setProfile(mockProfile);
          setError("Using fallback data (backend not ready)");
        } else {
          setProfile(mockProfile);
          setError("Using fallback data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [apiService, clearToken, router]);

  if (isLoading) {
    return (
      <div className="card-container">
        <Spin size="large" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="card-container">
        <Card title="Homepage">
          <Text type="danger">{error ?? "Failed to load profile."}</Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="card-container">
      <Card title="Homepage">
        {error && <Text type="warning">{error}</Text>}
        <p>
          <strong>{profile.username}</strong>
        </p>
        <p>Letterboxd connected: {profile.hasLetterboxdData ? "Yes" : "No"}</p>
        <p>Movies logged: {profile.stats.moviesLogged}</p>
        <p>Highly rated movies: {profile.stats.highlyRatedMovies}</p>
        <p>
          Top genres:{" "}
          {profile.stats.topGenres.length > 0
            ? profile.stats.topGenres.join(", ")
            : "No genres available"}
        </p>
      </Card>
    </div>
  );
};

export default Profile;
