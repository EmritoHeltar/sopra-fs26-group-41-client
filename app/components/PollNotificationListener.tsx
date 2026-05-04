"use client";

import React, { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { App, Button } from "antd";
import { getApiDomain } from "@/utils/domain";

type PollStartedEvent = {
  type: "poll";
  event: "started";
  message?: string;
  url?: string;
};

type PollFinishedEvent = {
  type: "poll";
  event: "finished";
  pollId?: number;
  groupId?: number;
  pollResultsUrl?: string;
};

type PollWebSocketEvent = PollStartedEvent | PollFinishedEvent;

function getWsDomain(): string {
  return getApiDomain().replace(/^http/, "ws");
}

export default function PollNotificationListener() {
  const router = useRouter();
  const pathname = usePathname();
  const { notification } = App.useApp();

  const routerRef = useRef(router);
  const notificationRef = useRef(notification);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    notificationRef.current = notification;
  }, [notification]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    const socket = new WebSocket(
      `${getWsDomain()}/ws?token=${encodeURIComponent(token)}`,
    );
    socketRef.current = socket;

    socket.onmessage = (messageEvent) => {
      try {
        if (typeof messageEvent.data !== "string") return;

        const data = JSON.parse(messageEvent.data) as PollWebSocketEvent;
        if (data.type !== "poll") return;

        const api = notificationRef.current;
        const nav = routerRef.current;

        if (data.event === "started") {
          const url = typeof data.url === "string" ? data.url.trim() : "";

          api.info({
            title: "Poll started",
            description: data.message ?? "A new poll has started for your group.",
            duration: 0,
            btn: url ? (
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  api.destroy();
                  nav.push(url);
                }}
              >
                Join Poll
              </Button>
            ) : undefined,
          });
        }

        if (data.event === "finished") {
          let redirectUrl: string | null = null;

          if (typeof data.pollResultsUrl === "string" && data.pollResultsUrl.trim()) {
            redirectUrl = data.pollResultsUrl.trim();
          } else if (typeof data.groupId === "number") {
            redirectUrl = `/groups/${data.groupId}`;
          }

          if (!redirectUrl) return;

          const finalUrl = redirectUrl;

          api.info({
            title: "Poll finished",
            description: "The group poll has finished. See what your group picked.",
            duration: 0,
            btn: (
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  api.destroy();
                  nav.push(finalUrl);
                }}
              >
                View Results
              </Button>
            ),
          });
        }
      } catch {
        // Ignore malformed websocket messages.
      }
    };

    socket.onclose = () => {
      socketRef.current = null;
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [pathname]);

  return null;
}