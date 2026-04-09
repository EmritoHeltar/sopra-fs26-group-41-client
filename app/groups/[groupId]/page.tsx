"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ApiService } from "@/api/apiService";
import { GroupDetails } from "@/types/group";
import styles from "@/styles/page.module.css";

export default function GroupOverview() {
  const params = useParams();
  const groupId = params.groupId as string;

  const [group, setGroup] = useState<GroupDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) return;

    let isMounted = true;
    
    const fetchGroupDetails = async () => {
      try {
        setLoading(true);
        const api = new ApiService();
        const data = await api.get<GroupDetails>(`/groups/${groupId}`);
        
        if (isMounted) {
          setGroup(data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to load group details.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGroupDetails();
    
    return () => {
      isMounted = false;
    };
  }, [groupId]);

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
