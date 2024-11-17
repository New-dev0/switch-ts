import { Endpoints } from "../client/endpoints";
import Client from "../client/client";
import { Community } from "../models/community";
import { CommunityMember } from "../models/community_member";
import User from "../models/user";

export async function isCommunityMember(client: Client, communityId: string, userId: number): Promise<boolean> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/validate/user/member?communityId=${communityId}&user_id=${userId}`
    );

    return response.result?.member ?? false;
}

export async function createCommunity(client: Client, community: Community): Promise<Community> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community`,
        {
            method: "POST",
            body: JSON.stringify(community.convertToRequest()),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (!response || !response.result) {
        throw new Error('Failed to create community');
    }

    return Community.parseFromData(response.result);
}

export async function getCommunityById(client:Client, communityId: string): Promise<Community> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community?communityId=${communityId}`
    );

    if (!response || !response.result) {
        throw new Error('Community not found');
    }

    return Community.parseFromData(response.result);
}

export async function getCommunityByUsername(client: Client, username: string): Promise<Community> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/communityusername?communityUsername=${username}`
    );

    if (!response || !response.result) {
        throw new Error('Community not found');
    }

    return Community.parseFromData(response.result);
}

export async function updateCommunity(client: Client, community: Community): Promise<Community> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community`,
        {
            method: "PUT",
            body: JSON.stringify(community.convertToRequest()),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (!response || !response.result) {
        throw new Error('Failed to update community');
    }

    return Community.parseFromData(response.result);
}

export interface DeleteCommunityParams {
  communityId: string;
}

export async function deleteCommunity(client: Client, params: DeleteCommunityParams): Promise<string> {
  const response = await client.request(
    `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/delete?communityId=${params.communityId}`,
    {
      method: "POST"
    }
  );
  return response?.result;
}

export interface GetCommunityMembersParams {
  communityId: string;
  userIds: string[];
}

export async function getCommunityMembers(client: Client, params: GetCommunityMembersParams): Promise<CommunityMember[]> {
  const queryParams = new URLSearchParams();
  queryParams.append('communityId', params.communityId);
  params.userIds.forEach(id => queryParams.append('userIds', id));

  const response = await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/members?${queryParams.toString()}`,
    {
      method: "GET"
    }
  );

  return response?.result || [];
}

export interface AdminTaskInfo {
  adminRole: string;
  adminTasks: {
    addNewAdmins: boolean;
    addNewMembers: boolean;
    banUsers: boolean;
    changeCommunityInfo: boolean;
    deletePostsAndMessages: boolean;
    pinMessages: boolean;
  };
  communityId: string;
  userId: string;
}

export interface BotCommandInfo {
  active: boolean;
  botId: number;
  command: string;
  commandDescription: string;
  channel: boolean;
  subCommands?: { [key: string]: string[] };
}

export async function isUserAdmin(client: Client, communityId: string, userId?: string): Promise<boolean> {
  const response = await client.request(
    `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/user/isAdmin?communityId=${communityId}${userId ? `&userId=${userId}` : ''}`,
    {
      method: "GET"
    }
  );
  return response?.result || false;
}

export async function getAvailableCommands(client: Client, params: {
  botId: number;
  communityId: string;
}): Promise<BotCommandInfo[]> {
  const response = await client.request(
    `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/availablecommands?botId=${params.botId}&communityId=${params.communityId}`,
    {
      method: "GET"
    }
  );
  return response?.result || [];
}

export interface CommunityMemberInfo {
  communityMembers: CommunityMember[];
  userInfoList: User[];
}

export async function getBotCommunityMembers(client: Client, communityId: string): Promise<CommunityMemberInfo> {
  const response = await client.request(
    `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/bots?communityId=${communityId}`,
    {
      method: "GET"
    }
  );
  return response?.result;
}