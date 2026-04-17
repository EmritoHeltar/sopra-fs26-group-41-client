"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Card, Spin, Typography } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import styles from "@/styles/page.module.css";

const { Title } = Typography;

const GroupsOverview: React.FC = () => {
  const router = useRouter();
  const apiService = useApi();
  const { clear: clearToken } = useLocalStorage<string>("token", "");

  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    clearToken();
    router.replace("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <Link href="/users/me" style={{ textDecoration: "none", color: "inherit" }}>
              <div className={styles.brandRow}>
                <img src="/logo.png" alt="logo" className={styles.logo} />
                <Title level={1} className={styles.brand}>
                  Movieblendr.
                </Title>
              </div>
            </Link>
            <Title level={3} className={styles.subtitle}>
              My Groups
            </Title>
          </div>
          <div className={styles.heroRight}>
            <Button className={styles.authButton} onClick={() => router.push("/users/me")}>
              Back
            </Button>
            <Button className={styles.authButton} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <Card className={styles.shellCard}>
          {isLoading && (
            <div className={styles.loadingWrap}>
              <Spin size="large" />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default GroupsOverview;
