"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Spin, Typography, Button, Input } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { MyProfile, LetterboxdImportResponse } from "@/types/user";
import styles from "@/styles/page.module.css"

const { Title, Text } = Typography;

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
  const [searchQuery, setSearchQuery] = useState("");

  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHoveringLogout, setIsHoveringLogout] = useState(false);


  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleLogout = async () => {
    try {
      await apiService.post("/logout", {});
    } catch {
    } finally {
      clearToken();
      router.replace("/login");
    }
  };

  // to be called by upload dialog (#5)
  const handleLetterboxdUpload = async (file: File) => {
    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiService.upload<LetterboxdImportResponse>("/import", formData);

      const updatedProfile: MyProfile = {
        id: response.id,
        username: response.username,
        hasLetterboxdData: response.hasLetterboxdData,
        stats: {
          moviesLogged: response.stats?.moviesLogged ?? 0,
          highlyRatedMovies: response.stats?.highlyRatedMovies ?? 0,
          topGenres: response.stats?.topGenres ?? [],
        },
      };

      setProfile(updatedProfile);
      setError(null);
      setSelectedFile(null);
    } catch (err) {
      if (err instanceof Error) {
        setUploadError(err.message);
      } else {
        setUploadError("Upload failed. Please try again.");
      }
    } finally {
      setIsUploading(false);
    }
  };


  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

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
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          const status = (err as { status?: number }).status;

          if (status === 400 || status === 401 || status === 403) {
            clearToken();
            router.replace("/login");
            return;
          } else {
            setProfile(mockProfile);
            setError("Showing default data (backend not ready yet)");
          }
        } else {
          setProfile(mockProfile);
          setError("Using fallback data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

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

  if (!profile) {
    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <Card className={styles.shellCard}>
            <Text type="danger">{error ?? "Failed to load profile."}</Text>
          </Card>
        </div>
      </div>
    );
  }

  const isConnected = profile.hasLetterboxdData;

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <Title level={1} className={styles.brand}>
              Movieblendr.
            </Title>
            <Title level={3} className={styles.subtitle}>
              My Profile
            </Title>
          </div>

          <div className={styles.heroRight}>
            <Input
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className={styles.searchInput}
            />

            <Button
              onClick={handleLogout}
              onMouseEnter={() => setIsHoveringLogout(true)}
              onMouseLeave={() => setIsHoveringLogout(false)}
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(255, 244, 235, 0.68)",
                background: isHoveringLogout ? "#2a2422" : "#1a1615",
                color: "#fff4eb",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              Log out
            </Button>
          </div>
        </div>
        <Card className={styles.shellCard}>
          {error && (
            <div className={styles.warningBox}>
              <Text className={styles.warningLabel}>Fallback data</Text>
              <br />
              <Text className={styles.warningText}>{error}</Text>
            </div>
          )}

          <div className={styles.infoGrid}>
            <Card className={styles.softCard}>
              <div className={styles.label}>Username </div>
              <Title level={2} className={styles.username}>
                {profile.username}
              </Title>
              <Text className={styles.helperText} style={{ marginTop: "-9px", display: "block" }}>Your account</Text>
            </Card>

            <Card className={styles.softCard}>
              <div className={styles.label}>Letterboxd</div>
              <div className={styles.statusRow}>
                <span
                  className={isConnected ? styles.statusDotConnected : styles.statusDotNotConnected}
                />
                <Title
                  level={4}
                  className={isConnected ? styles.connected : styles.notConnected}
                >
                  {isConnected ? "Connected" : "Not connected"}
                </Title>
              </div>
              <Text className={styles.helperText} style={{ marginTop: "8px", display: "block" }}>
                {isConnected
                  ? "Your Letterboxd data is available and your homepage stats are shown below."
                  : "No Letterboxd data uploaded yet. Your stats are shown with default values for now."}
              </Text>
            </Card>
          </div>

          <div className={styles.section}>
            <Title level={3} className={styles.sectionTitle}>
              Stats
            </Title>

            <div className={styles.infoGrid}>
              <Card className={styles.softCard}>
                <div className={styles.label}>Movies logged</div>
                <div className={styles.statValue}>{profile.stats.moviesLogged}</div>
                <Text className={styles.helperText} style={{ marginTop: "9px", display: "block" }}>
                  {profile.stats.moviesLogged > 100
                    ? "That’s a lot of movies!"
                    : "Still warming up, keep watching!"}
                </Text>
              </Card>

              <Card className={styles.softCard}>
                <div className={styles.label}>Highly rated</div>
                <div className={styles.statValue}>{profile.stats.highlyRatedMovies}</div>
                <Text className={styles.helperText} style={{ marginTop: "9px", display: "block" }} >4.5★ and above</Text>
              </Card>
            </div>
          </div>

          <div className={styles.section}>
            <Title level={3} className={styles.sectionTitle}>
              Top Genres
            </Title>

            {profile.stats.topGenres.length > 0 ? (
              <div className={styles.genreWrap}>
                {profile.stats.topGenres.map((genre) => (
                  <span key={genre} className={styles.genrePill}>
                    {genre}
                  </span>
                ))}
              </div>
            ) : (
              <Text className={styles.helperText}>No genres available yet.</Text>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile; 