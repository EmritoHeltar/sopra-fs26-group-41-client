export interface GroupMember {
  id: number;
  username: string;
}

export interface GroupOwner {
  id: number;
  username: string;
  status: string;
}

export interface GroupDetails {
  id: number;
  name: string;
  ownerId: number;
  joinUrl: string;
  groupProfilePicture: string | null;
  members: GroupMember[];
}

export interface GroupCreateResponse {
  id: number;
  name: string;
  owner: GroupOwner;
  groupProfilePicture: string | null;
  joinUrl: string;
}

export interface JoinGroupResponse {
  groupId: number;
}

export interface GroupSummary {
  id: number;
  name: string;
  groupProfilePicture: string | null;
  memberCount: number;
}

export interface GroupsListResponse {
  groups: GroupSummary[];
}
