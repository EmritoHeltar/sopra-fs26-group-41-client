"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button, Card, Spin, Typography } from "antd";
import { ArrowLeftOutlined, TeamOutlined } from "@ant-design/icons";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { JoinGroupResponse } from "@/types/group";
import styles from "@/styles/page.module.css";

const { Title, Text } = Typography;

type JoinStatus = "loading" | "success" | "alreadyMember" | "invalidToken" | "error";

const getReadableErrorMessage = (error: { status?: number; message?: string }) => {
  if (error.status === 403) return "You are already a member of this group.";
  if (error.status === 404) return "This invite link is invalid or has expired.";
  if (error.status === 401) return "Please log in again to join this group.";

  return "An unexpected error occurred. Please try again.";
};

const JoinGroup: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const apiService = useApi();
  const { clear: clearToken } = useLocalStorage<string>("token", "");

  const token = params.token as string;

  const [status, setStatus] = useState<JoinStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resolvedGroupUrl, setResolvedGroupUrl] = useState<string | null>(null);

  const navigateToTarget = (target: string) => {
    if (!target) return;

    try {
      const url = new URL(target, window.location.origin);
      const isSameOrigin = url.origin === window.location.origin;

      if (isSameOrigin) {
        router.push(`${url.pathname}${url.search}${url.hash}`);
        return;
      }

      window.location.assign(url.toString());
    } catch {
      router.push(target);
    }
  };

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

        const joinResponse = response as JoinGroupResponse & {
          groupId?: number | string;
          groupUrl?: string;
        };
        const resolved = joinResponse.groupUrl
          ?? (joinResponse.groupId ? `/groups/${joinResponse.groupId}` : null)
          ?? "/users/me";

        setResolvedGroupUrl(resolved);
        setStatus("success");

        setTimeout(() => {
          if (isMounted) navigateToTarget(resolved);
        }, 1500);
      } catch (err) {
        if (!isMounted) return;

        const error = err as { status?: number; message?: string };

        if (error.status === 401) {
          clearToken();
          router.replace("/login");
        } else if (error.status === 403) {
          const alreadyMemberError = error as {
            status?: number;
            message?: string;
            groupUrl?: string;
          };

          setResolvedGroupUrl(alreadyMemberError.groupUrl ?? null);
          setErrorMessage(getReadableErrorMessage(error));
          setStatus("alreadyMember");
        } else if (error.status === 404) {
          setStatus("invalidToken");
        } else {
          setErrorMessage(getReadableErrorMessage(error));
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
          <Text className={styles.helperText}>Joining group...</Text>
        </div>
      </main>
    );
  }

  const renderCardBody = () => {
    if (status === "success") {
      return (
        <>
          <TeamOutlined className={styles.joinIcon} style={{ color: "#e5b8a7" }} />
          <Title level={4} className={styles.joinCardTitle}>
            You joined the group!
          </Title>
          <Text className={styles.joinCardText}>Taking you there now…</Text>
          {resolvedGroupUrl && (
            <div className={styles.joinActionWrap}>
              <Button
                className={styles.createGroupSubmit}
                onClick={() => navigateToTarget(resolvedGroupUrl)}
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
              onClick={() => navigateToTarget(resolvedGroupUrl ?? "/users/me")}
            >
              {resolvedGroupUrl ? "Go to Group" : "Go to my profile"}
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
              onClick={() => navigateToTarget("/users/me")}
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
            onClick={() => navigateToTarget("/users/me")}
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
          </div>

          <div className={styles.heroRight}>
            <Button className={styles.authButton} onClick={() => navigateToTarget("/users/me")}>
              <ArrowLeftOutlined />
              Home
            </Button>
          </div>
        </div>

        <Card className={`${styles.shellCard} ${styles.createGroupCard}`}>
          <Card className={styles.softCard}>
            <div className={styles.joinCardBody}>
              {renderCardBody()}
            </div>
          </Card>
        </Card>
      </div>
    </main>
  );
};

export default JoinGroup;
