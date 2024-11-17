export interface MemberRoleInfo {
  id: number;
  roles: { [key: string]: boolean };
}

export interface Role {
  communityId: string;
  id: number;
  noOfMembers: number;
  permissions: string;
  roleColour: string;
  roleName: string;
}

export interface RolePermissions {
  addNewMembers: boolean;
  addNewRoles: boolean;
  allowedToSendMessageInChannels: boolean;
  banUsers: boolean;
  canDeductXPFromUser: boolean;
  canRemoveUser: boolean;
  changeCommunityInfo: boolean;
  deletePostsAndMessages: boolean;
  hasDMPermission: boolean;
  pinMessages: boolean;
  restrictMessaging: boolean;
} 