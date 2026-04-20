"use client";

import { useCallback, useEffect, useRef } from "react";
import { Button, notification } from "antd";
import { RiseOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";

type PollStartedEvent = {
  type: "poll";
  event: "started";
  message?: string;
  url?: string;
};

export default function PollNotificationListener() {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const socketRef = useRef<WebSocket | null>(null);
  const hasInitializedRef = useRef(false);

  const showPollStartedNotification = useCallback(
    (description: string, url?: string) => {
      api.info({
        title: "Poll started",
        description,
        placement: "topRight",
        duration: 15,
        icon: <RiseOutlined />,
        className: styles.pollNotification,
        style: {
          padding: 0,
          background: "transparent",
          boxShadow: "none",
          border: "none",
        },
        actions: (
          <Button
            size="small"
            type="primary"
            className={styles.pollNotificationButton}
            onClick={() => {
              api.destroy();
              if (url) {
                router.push(url);
              }
            }}
          >
            Join Poll
          </Button>
        ),
      });
    },
    [api, router],
  );

  useEffect(() => {
    if (hasInitializedRef.current) {
      return;
    }
    hasInitializedRef.current = true;

    const token = localStorage.getItem("token");

    if (!token) return;

    const socket = new WebSocket(`ws://localhost:8080/ws?token=${token}`);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      try {
        const data: unknown = JSON.parse(event.data);

        if (
          typeof data === "object" &&
          data !== null &&
          (data as PollStartedEvent).type === "poll" &&
          (data as PollStartedEvent).event === "started"
        ) {
          const pollEvent = data as PollStartedEvent;

          showPollStartedNotification(
            pollEvent.message ?? "A new poll has started.",
            pollEvent.url,
          );
        }
      } catch {
      }
    };

    socket.onclose = () => {
      socketRef.current = null;
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [showPollStartedNotification]);

  return <>{contextHolder}</>;
}