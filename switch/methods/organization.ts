import Client from "../client/client";
import { Endpoints } from "../client/endpoints";
import { Organization } from "../models/organization";
import { OrganizationApp } from "../models/organizationapp";
import User from "../models/user";

export interface GetOrganizationsParams {
  botId?: number;
  communityId?: string;
  userId?: string;
}

export async function getOrganizations(client: Client, params: GetOrganizationsParams): Promise<Organization[]> {
  const queryParams = new URLSearchParams();
  if (params.botId) queryParams.append('botId', params.botId.toString());
  if (params.communityId) queryParams.append('communityId', params.communityId);
  if (params.userId) queryParams.append('userId', params.userId);

  const response = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/organization/get-organizations?${queryParams.toString()}`);
  return response.map((org: any) => Organization.parseFromJSON(org));
}

export async function getOrganizationById(client: Client, id: string): Promise<Organization> {
  const response = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/organization/${id}`);
  return Organization.parseFromJSON(response);
}

export async function getOrganizationApps(client: Client, id: string): Promise<OrganizationApp[]> {
  const response = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/organization/apps?orgId=${id}`);
  return response.map((app: any) => OrganizationApp.parseFromJSON(app));
}

export async function getOrganizationFollowers(client: Client, id: string): Promise<User[]> {
  const response = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/organization/followers?orgId=${id}`);
  return response;
}

export interface OrganizationMember {
  id: string;
  name: string;
  username: string;
  profilePic: string;
  profileColor: string;
  role: string;
  orgId: string;
  userId: string;
  app: boolean;
  oneLiner?: string;
  commands?: any[];
  status?: any;
  createdAt: Date;
  updatedAt: Date;
}

export async function getOrganizationMembers(client: Client, orgId: string): Promise<OrganizationMember[]> {
  const response = await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/organization/members?orgId=${orgId}`
  );
  return response;
}
