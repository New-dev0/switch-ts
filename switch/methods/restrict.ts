import Client from "../client/client";
import { Endpoints } from "../client/endpoints";
import type { Timestamp } from "../models/timestamp";
import type User from "../models/user";

export interface RestrictedUser {
  communityId: string;
  userId: number;
  restricted: boolean;
  restrictedTillTimestamp: Timestamp;
  userInfo?: User;
}

export interface RestrictUserRequest {
  communityId: string;
  userId: number;
  restricted: boolean;
  restrictedTillTimestamp: Timestamp;
}

export async function restrictUser(client: Client, request: RestrictUserRequest): Promise<void> {
  await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/restrict/user`,
    {
      method: "POST",
      body: JSON.stringify(request)
    }
  );
}

export async function updateRestrictedUser(client: Client, request: RestrictUserRequest): Promise<void> {
  await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/restrict/user`,
    {
      method: "PUT",
      body: JSON.stringify(request)
    }
  );
}

export async function getRestrictedUser(client: Client, communityId: string, userId: number): Promise<RestrictedUser> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/restrict/user?communityId=${communityId}&userId=${userId}`,
    {
      method: "GET"
    }
  );
}

export async function getRestrictedUsers(client: Client, communityId: string): Promise<RestrictedUser[]> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/restrict/users?communityId=${communityId}`,
    {
      method: "GET"
    }
  );
} 