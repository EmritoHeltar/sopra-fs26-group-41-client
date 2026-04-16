"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Spin } from "antd";
import { TeamOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons";
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
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isLeaving, setIsLeaving] = useState<boolean>(false);
  const [leaveError, setLeaveError] = useState<string | null>(null);

  const [recommendations, setRecommendations] = useState<unknown[]>([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState<boolean>(true);
  const [recommendationsError, setRecommendationsError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) return;

    let isMounted = true;

    const fetchGroupDetails = async () => {
      try {
        setLoading(true);
        setRecommendationsLoading(true);

        const api = new ApiService();
        const data = await api.get<GroupDetails>(`/groups/${groupId}`);

        if (isMounted) {
          setGroup(data);
          setError(null);
        }
        try {
          const meData = await api.get<unknown>(`/users/me`);
          const currentUser = meData as { id?: number };

          if (isMounted) {
            setCurrentUserId(typeof currentUser.id === "number" ? currentUser.id : null);
          }
        } catch {
          if (isMounted) {
            setCurrentUserId(null);
          }
        }

        try {
          const recData = await api.get<unknown>(`/groups/${groupId}/recommendations`);
          const recommendationData = recData as { recommendations?: unknown[] };

          if (isMounted) {
            setRecommendations(recommendationData.recommendations ?? []);
            setRecommendationsError(null);
          }
        } catch (recErr: unknown) {
          if (isMounted) {
            setRecommendations([]);

            if (
              typeof recErr === "object" &&
              recErr !== null &&
              "response" in recErr &&
              typeof (recErr as { response?: unknown }).response === "object" &&
              (recErr as { response?: unknown }).response !== null
            ) {
              const response = (recErr as { response?: { status?: number; data?: { detail?: string; reason?: string } } }).response;
              const status = response?.status;

              if (status === 409) {
                setRecommendationsError(
                  "Recommendations will appear once at least one group member uploads Letterboxd data."
                );
              } else {
                setRecommendationsError(
                  "Recommendations will appear once at least one group member uploads Letterboxd data."
                );
              }
            } else {
              setRecommendationsError(
                "Recommendations will appear once at least one group member uploads Letterboxd data."
              );
            }
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Failed to load group details.");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setRecommendationsLoading(false);
        }
      }
    };

    fetchGroupDetails();

    return () => {
      isMounted = false;
    };
  }, [groupId]);

  const fullJoinUrl = typeof window !== "undefined" && group?.joinUrl?.startsWith("/")
    ? `${window.location.origin}${group.joinUrl}`
    : group?.joinUrl || "";

  const handleCopyLink = () => {
    if (fullJoinUrl) {
      navigator.clipboard.writeText(fullJoinUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      setIsLeaving(true);
      setLeaveError(null);

      const api = new ApiService();
      await api.post(`/groups/${groupId}/leave`);
      router.push("/users/me");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLeaveError(err.message);
      } else {
        setLeaveError("Failed to leave group.");
      }
    } finally {
      setIsLeaving(false);
    }
  };

  const owner = group?.members.find((member) => member.id === group.ownerId);

  const groupMatchReason = group && group.members.length < 2
    ? "Need at least 2 members to compare taste profiles."
    : "No group match yet because not enough members have uploaded Letterboxd data.";

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={styles.loadingWrap}>
            <p className={styles.helperText}>Loading group details...</p>
          </div>
        </div>
      </main>
    );
  }
  if (error || !group) {
    return (
      <main className={styles.page}>
        <div className={styles.content}>
          <div className={`${styles.warningBox} ${styles.shellCard}`}>
            <p className={styles.warningText}>
              <strong>Error:</strong> {error || "Group could not be found."}
            </p>
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
            <div className={styles.brandRow}>
              <img src="/logo.png" alt="logo" className={styles.logo} />
              <h1 className={styles.brand}>Movieblendr.</h1>
            </div>
          </div>
          <div className={styles.heroRight}>
            <Button className={styles.authButton} onClick={() => router.back()}>
              Back
            </Button>
            <Button
              className={styles.authButton}
              onClick={handleLeaveGroup}
              disabled={isLeaving}
              loading={isLeaving}
            >
              Leave Group
            </Button>
          </div>
        </div>

        {leaveError && (
          <div className={styles.section}>
            <div className={`${styles.warningBox} ${styles.shellCard}`}>
              <p className={styles.warningText}>
                <strong>Error:</strong> {leaveError}
              </p>
            </div>
          </div>
        )}

        <div className={styles.section}>
          <div className={`${styles.shellCard} ${styles.softCard} ${styles.groupInviteCard}`}>
            <div className={styles.groupSummaryLayout}>
              <div className={styles.groupSummaryMain}>
                <h2 className={`${styles.username} ${styles.groupSummaryTitle}`}>
                  {group.name}
                </h2>
                <p className={`${styles.helperText} ${styles.groupSummaryMeta}`}>
                  Owner: <span className={styles.username}>{owner?.username ?? "Unknown"}</span>
                </p>
                <p className={`${styles.helperText} ${styles.groupSummaryMeta}`}>
                  Group ID: <span className={styles.username}> {group.id} </span>
                </p>
                <div className={styles.groupSummaryMembersRow}>
                  <TeamOutlined className={styles.helperText} />
                  <p className={`${styles.helperText} ${styles.groupSummaryMembersText}`}>
                    {group.members.length} member{group.members.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className={`${styles.shellCard} ${styles.softCard} ${styles.groupMatchCard}`}>
                <p className={styles.label}>Group Match</p>
                <p className={`${styles.username} ${styles.groupMatchValue}`}>
                  {/* Temporary buffer for when we'll implement GroupMatch later on */}
                  N/A
                </p>
                <p className={`${styles.helperText} ${styles.groupMatchReason}`}>
                  {groupMatchReason}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={`${styles.shellCard} ${styles.softCard} ${styles.groupInviteCard}`}>
            <h2 className={styles.sectionTitle}>Invite Link</h2>
            <div className={styles.groupInviteRow}>
              <input
                type="text"
                value={fullJoinUrl}
                readOnly
                className={styles.groupInviteInput}
              />
              <Button
                className={`${styles.authButton} ${styles.groupCopyButton}`}
                onClick={handleCopyLink}
                icon={copied ? <CheckOutlined /> : <CopyOutlined />}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={`${styles.shellCard} ${styles.softCard} ${styles.groupRecommendationsCard}`}>
            <h2 className={styles.sectionTitle}>Members</h2>

            {group.members.length === 0 ? (
              <p className={styles.helperText}>No members found.</p>
            ) : (
              <div className={styles.groupRecommendationsList}>
                {group.members.map((member) => (
                  <div key={member.id} className={`${styles.softCard} ${styles.groupRecommendationItem}`}>
                    <div className={styles.groupMemberHeader}>
                      <div className={styles.groupMemberIdentityRow}>
                        <p className={styles.groupMemberName}>{member.username}</p>

                        {currentUserId === member.id && (
                          <span className={`${styles.genrePill} ${styles.groupMemberBadge} ${styles.groupYouBadge}`}>
                            You
                          </span>
                        )}

                        {group.ownerId === member.id && (
                          <span className={`${styles.genrePill} ${styles.groupMemberBadge} ${styles.groupOwnerBadge}`}>
                            Owner
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <div className={`${styles.shellCard} ${styles.softCard} ${styles.groupRecommendationsCard}`}>
            <h2 className={styles.sectionTitle}>Group Recommendations</h2>

            {recommendationsLoading ? (
              <div className={styles.groupRecommendationsLoading}>
                <Spin size="large" />
                <p className={styles.groupRecommendationsLoadingText}>
                  Loading recommendations...
                </p>
              </div>
            ) : (
              <>
                {recommendationsError && (
                  <p className={styles.helperText}>
                    {recommendationsError}
                  </p>
                )}

                {recommendations.length === 0 ? (
                  <p className={styles.helperText}>No recommendations available.</p>
                ) : (
                  <div className={styles.groupRecommendationsList}>
                    {recommendations.slice(0, 10).map((movie) => {
                      const recommendation = movie as {
                        movieId?: string;
                        title?: string;
                        year?: number;
                      };

                      return (
                        <Link
                          key={recommendation.movieId ?? recommendation.title ?? "recommendation"}
                          href={`/movies/${recommendation.movieId ?? ""}`}
                          className={styles.groupRecommendationLink}
                        >
                          <div className={`${styles.softCard} ${styles.groupRecommendationItem}`}>
                            <p className={styles.groupRecommendationTitle}>
                              {recommendation.title ?? "Untitled movie"}
                            </p>

                            <p className={styles.groupRecommendationYear}>
                              {recommendation.year ?? "Year unavailable"}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}