"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, Card, Spin, Typography } from "antd";
import { CheckOutlined, TeamOutlined } from "@ant-design/icons";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { JoinGroupResponse } from "@/types/group";
import styles from "@/styles/page.module.css";

const { Title, Text } = Typography;

type JoinStatus = "loading" | "success" | "alreadyMember" | "invalidToken" | "error";

const JoinGroup: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const apiService = useApi();
  const { clear: clearToken } = useLocalStorage<string>("token", "");

  const token = params.token as string;

  const [status, setStatus] = useState<JoinStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resolvedGroupUrl, setResolvedGroupUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const attemptJoin = async () => {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        localStorage.setItem("pendingRedirect", `/join/${token}`);
        router.replace("/login");
        return;
      }

      if (!token) {
        if (isMounted) setStatus("invalidToken");
        return;
      }

      try {
        const response = await apiService.post<JoinGroupResponse>(`/groups/join/${token}`);
        if (!isMounted) return;

        let resolved = "/users/me";
        if (response.groupUrl.startsWith("/")) {
          resolved = response.groupUrl;
        } else {
          try {
            resolved = new URL(response.groupUrl).pathname;
          } catch {
            // keep fallback
          }
        }

        setResolvedGroupUrl(resolved);
        setStatus("success");

        setTimeout(() => {
          if (isMounted) router.push(resolved);
        }, 1500);
      } catch (err) {
        if (!isMounted) return;

        const error = err as { status?: number; message?: string };

        if (error.status === 401) {
          clearToken();
          router.replace("/login");
        } else if (error.status === 403) {
          setErrorMessage(error.message ?? "You are already a member of this group.");
          setStatus("alreadyMember");
        } else if (error.status === 404) {
          setStatus("invalidToken");
        } else {
          setErrorMessage(error.message ?? "An unexpected error occurred. Please try again.");
          setStatus("error");
        }
      }
    };

    attemptJoin();

    return () => {
      isMounted = false;
    };
  }, [token, router, apiService, clearToken]);

  if (status === "loading") {
    return (
      <main className={styles.page}>
        <div className={styles.loadingWrap}>
          <Spin size="large" />
        </div>
      </main>
    );
  }

  const renderCardBody = () => {
    if (status === "success") {
      return (
        <>
          <CheckOutlined className={styles.joinIcon} style={{ color: "#2f7a32" }} />
          <Title level={4} className={styles.joinCardTitle}>
            You joined the group!
          </Title>
          <Text className={styles.joinCardText}>Taking you there now…</Text>
          {resolvedGroupUrl && (
            <div className={styles.joinActionWrap}>
              <Button
                className={styles.createGroupSubmit}
                onClick={() => router.push(resolvedGroupUrl)}
              >
                Go to Group
              </Button>
            </div>
          )}
        </>
      );
    }

    if (status === "alreadyMember") {
      return (
        <>
          <TeamOutlined className={styles.joinIcon} style={{ color: "#e5b8a7" }} />
          <Title level={4} className={styles.joinCardTitle}>
            Already a member
          </Title>
          <Text className={styles.joinCardText}>
            {errorMessage ?? "You are already a member of this group."}
          </Text>
          <div className={styles.joinActionWrap}>
            <Button
              className={styles.createGroupSubmit}
              onClick={() => router.push("/users/me")}
            >
              Go to my profile
            </Button>
          </div>
        </>
      );
    }

    if (status === "invalidToken") {
      return (
        <>
          <Title level={4} className={styles.joinCardTitle}>
            Invalid invite link
          </Title>
          <Text className={styles.joinCardText}>
            This invite link is invalid or has expired.
          </Text>
          <div className={styles.joinActionWrap}>
            <Button
              className={styles.createGroupSubmit}
              onClick={() => router.push("/users/me")}
            >
              Go home
            </Button>
          </div>
        </>
      );
    }

    return (
      <>
        <Title level={4} className={styles.joinCardTitle}>
          Something went wrong
        </Title>
        <Text className={styles.joinCardText}>
          {errorMessage ?? "An unexpected error occurred. Please try again."}
        </Text>
        <div className={styles.joinActionWrap}>
          <Button
            className={styles.createGroupSubmit}
            onClick={() => router.push("/users/me")}
          >
            Go home
          </Button>
        </div>
      </>
    );
  };

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Card className={`${styles.shellCard} ${styles.createGroupCard}`}>
          <div className={styles.joinCardBody}>
            {renderCardBody()}
          </div>
        </Card>
      </div>
    </main>
  );
};

export default JoinGroup;
