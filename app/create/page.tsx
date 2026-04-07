"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import styles from "@/styles/page.module.css";

const { Title, Text } = Typography;

const CreateGroup: React.FC = () => {
  const router = useRouter();
  const apiService = useApi();
  const { clear: clearToken } = useLocalStorage<string>("token", "");

  const [groupName, setGroupName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    clearToken();
    router.replace("/login");
  };

  const handleCreateGroup = async () => {
    const trimmedName = groupName.trim();

    if (!trimmedName) {
      setError("Please enter a group name.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await apiService.post<{ id: number; name: string }>("/groups", {
        name: trimmedName,
      });

      router.push(`/groups/${response.id}`);
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
        setError("Failed to create group.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.brandRow}>
              <img src="/logo.png" alt="logo" className={styles.logo} />
              <Title level={1} className={styles.brand}>
                Movieblendr.
              </Title>
            </div>
            <div style={{ marginTop: "70px", marginLeft: "285px", marginBottom: "-17px" }} >
              <Title
                level={3}
                className={styles.subtitle}
                style={{ textAlign: "center", width: "100%" }}
              >
                Create Group
              </Title>
            </div>
          </div>

          <div className={styles.heroRight}>
            <Button className={styles.authButton} onClick={() => router.back()}>
              Back
            </Button>
            <Button className={styles.authButton} onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
        <div>
          <Card className={`${styles.shellCard} ${styles.createGroupCard}`}>
            <div className={styles.createGroupForm}>
              <div className={styles.label}>Group Name</div>

              <Input
                className={styles.createGroupInput}
                placeholder="Enter group name"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                onPressEnter={handleCreateGroup}
                maxLength={50}
              />

              {error && <Text className={styles.createGroupError}>{error}</Text>}

              <div className={styles.createGroupSubmitWrap}>
                <Button
                  className={styles.createGroupSubmit}
                  onClick={handleCreateGroup}
                  loading={isSubmitting}
                  icon={<TeamOutlined />}
                >
                  Create Group
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;