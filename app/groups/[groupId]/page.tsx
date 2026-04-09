"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import styles from "@/styles/page.module.css";

export default function GroupOverview() {
  const params = useParams();
  const groupId = params.groupId as string;

  // Placeholder states for Task 2
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={styles.loadingWrap} style={{ color: '#fff4eb' }}>
            Loading group details...
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={styles.errorAlert} style={{ padding: '16px' }}>
            <strong>Error:</strong> {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <h1 className={styles.brand}>Group Overview</h1>
            <p className={styles.subtitle}>ID: {groupId}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
