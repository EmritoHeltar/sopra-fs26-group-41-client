"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";
import styles from "@/styles/page.module.css";

export default function CanvasPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = params.groupId as string;
  const sessionId = searchParams.get("sessionId");

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.brandRow}>
              <img src="/logo.png" alt="logo" className={styles.logo} />
              <h1 className={styles.brand}>Movieblendr.</h1>
            </div>
          </div>
          <div className={styles.heroRight}>
            <Button className={styles.authButton} onClick={() => router.push(`/groups/${groupId}`)}>
              Back to Group
            </Button>
          </div>
        </div>

        <div className={styles.section}>
          <div className={`${styles.shellCard} ${styles.softCard}`} style={{ padding: "48px", textAlign: "center" }}>
            <h2 className={styles.sectionTitle}>Drawing Canvas</h2>
            <p className={styles.helperText} style={{ marginTop: 12 }}>
              Drawing canvas coming soon.
            </p>
            {sessionId && (
              <p className={styles.helperText} style={{ marginTop: 8, fontSize: 12 }}>
                Session: {sessionId}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
