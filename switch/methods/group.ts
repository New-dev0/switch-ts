import Client from "../client/client";
import Group from "../models/group";
import { Endpoints } from "../client/endpoints";

export async function createGroup(client: Client, group: Group): Promise<Group> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/group`,
        {
            method: "POST",
            body: JSON.stringify(group.convertToRequest()),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return Group.parseFromData(response);
}

export async function getGroupByID(client: Client, groupId: string): Promise<Group> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/group?groupId=${groupId}`
    );
    return Group.parseFromData(response);
}

export async function getAllGroups(client: Client, communityId: string): Promise<Group[]> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/group/all?communityId=${communityId}`
    );
    return response?.result.map((groupData: Record<string, any>) => Group.parseFromData(groupData)) || [];
}

export async function updateGroup(client: Client, group: Group): Promise<Group> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/group`,
        {
            method: "PUT",
            body: JSON.stringify(group.convertToRequest()),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return Group.parseFromData(response);
}

export interface GetGroupParams {
  groupId: string;
}

export interface DeleteGroupParams {
  groupId: string;
}

export async function deleteGroup(client: Client, params: DeleteGroupParams): Promise<void> {
  await client.request(
    `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/group/${params.groupId}`,
    {
      method: "DELETE"
    }
  );
}
