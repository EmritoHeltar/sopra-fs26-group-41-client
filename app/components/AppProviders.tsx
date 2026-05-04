"use client";

import PollNotificationListener from "./PollNotificationListener";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PollNotificationListener />
      {children}
    </>
  );
}
