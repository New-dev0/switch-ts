import Client from "../client/client";
import { Endpoints } from "../client/endpoints";
import { Timestamp } from "../models/timestamp";
import User from "../models/user";

// Ban interfaces
export interface BanUserRequest {
  communityId: string;
  userId: string;
}

export interface BanUserResponse {
  isBanned: boolean;
  message: string;
}

export interface UnbanRequest {
  communityId: string;
  id: number;
  requestDate: Timestamp;
  userId: string;
}

export interface UnbanRequestAction {
  approveUnban: boolean;
  communityId: string;
  id: number;
  userId: string;
}

// Role interfaces
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

export interface RoleMember {
  communityId: string;
  id: number;
  memberId: number;
  roleId: number;
  userId: number;
  userInfo?: User;
}

// Ban methods
export async function banUser(client: Client, request: BanUserRequest): Promise<BanUserResponse> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/ban`,
    {
      method: "POST",
      body: JSON.stringify(request)
    }
  );
}

export async function unbanUser(client: Client, request: UnbanRequestAction): Promise<string> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/ban/unban`,
    {
      method: "PUT",
      body: JSON.stringify(request)
    }
  );
}

export async function getBannedUsers(client: Client, communityId: string): Promise<UnbanRequest[]> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/ban/details/${communityId}`,
    {
      method: "GET"
    }
  );
}

// Role methods
export async function createRole(client: Client, communityId: string, role: Role): Promise<string> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/roles/add?communityId=${communityId}`,
    {
      method: "POST",
      body: JSON.stringify(role)
    }
  );
}

export async function getRoles(client: Client, communityId: string): Promise<Role[]> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/roles/getAll?communityId=${communityId}`,
    {
      method: "GET"
    }
  );
}

export async function deleteRole(client: Client, roleId: number): Promise<void> {
  await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/roles/delete/${roleId}`,
    {
      method: "DELETE"
    }
  );
}

// Role member methods
export async function addMemberToRole(client: Client, roleMember: RoleMember): Promise<string> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/member/add`,
    {
      method: "POST",
      body: JSON.stringify(roleMember)
    }
  );
}

export async function getRoleMembers(client: Client, roleId: number): Promise<RoleMember[]> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/member/getAll?roleId=${roleId}`,
    {
      method: "GET"
    }
  );
}

export async function removeMemberFromRole(client: Client, roleId: number, memberId: number): Promise<void> {
  await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/member/remove?roleId=${roleId}&memberId=${memberId}`,
    {
      method: "DELETE"
    }
  );
} 