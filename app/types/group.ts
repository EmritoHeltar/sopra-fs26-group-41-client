export interface GroupMember {
  id: number;
  username: string;
}

export interface GroupDetails {
  id: number;
  name: string;
  ownerId: number;
  joinUrl: string;
  groupProfilePicture?: string;
  members: GroupMember[];
}
