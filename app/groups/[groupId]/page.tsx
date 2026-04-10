"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "antd";
import { ApiService } from "@/api/apiService";
import { GroupDetails } from "@/types/group";
import styles from "@/styles/page.module.css";

export default function GroupOverview() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;

  const [group, setGroup] = useState<GroupDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

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

  const fullJoinUrl = typeof window !== 'undefined' && group?.joinUrl?.startsWith('/') 
    ? `${window.location.origin}${group.joinUrl}` 
    : group?.joinUrl || '';

  const handleCopyLink = () => {
    if (fullJoinUrl) {
      navigator.clipboard.writeText(fullJoinUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
  if (error || !group) {
    return (
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={styles.errorAlert} style={{ padding: '16px' }}>
            <strong>Error:</strong> {error || "Group could not be found."}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        {/* Dynamic Header */}
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <Link href="/users/me" style={{ textDecoration: 'none' }}>
              <div className={styles.brandRow}>
                <img src="/logo.png" alt="logo" className={styles.logo} style={{ width: '52px', height: '52px' }} />
                <h1 className={styles.brand} style={{ margin: 0 }}>Movieblendr.</h1>
              </div>
            </Link>
            <h2 className={styles.subtitle} style={{ marginTop: '12px' }}>{group.name}</h2>
            <p style={{ color: '#e5b8a7', marginTop: '4px', fontSize: '16px' }}>
              {group.members.length} Member{group.members.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className={styles.heroRight}>
            <Button className={styles.authButton} onClick={() => router.back()}>
              Back
            </Button>
          </div>
        </div>

        {/* Join URL Section */}
        <div className={styles.section}>
          <div className={`${styles.shellCard} ${styles.softCard}`} style={{ padding: '24px' }}>
            <h2 className={styles.sectionTitle} style={{ margin: '0 0 16px 0' }}>Invite Link</h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={fullJoinUrl}
                readOnly
                style={{ 
                  flex: 1, 
                  minWidth: '200px',
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  background: 'rgba(21, 18, 17, 0.94)', 
                  border: '1px solid rgba(255, 244, 235, 0.3)', 
                  color: '#fff4eb',
                  fontSize: '14px'
                }}
              />
              <Button
                onClick={handleCopyLink}
                className={styles.authButton}
                style={{ padding: '12px 24px', cursor: 'pointer', height: 'auto' }}
              >
                {copied ? "Copied!" : "Copy URL"}
              </Button>
            </div>
          </div>
        </div>
        {/* Member Directory */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Members</h2>
          
          {group.members.length === 0 ? (
            <p className={styles.helperText}>No members found.</p>
          ) : (
            <div className={styles.infoGrid}>
              {group.members.map((member) => (
                <div key={member.id} className={`${styles.shellCard} ${styles.softCard}`} style={{ padding: '20px' }}>
                  <p className={styles.username} style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {member.username}
                  </p>
                  {group.ownerId === member.id && (
                    <span className={styles.genrePill} style={{ marginTop: '12px' }}>
                      Owner
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
