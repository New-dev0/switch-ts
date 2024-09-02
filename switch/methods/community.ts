import { Endpoints } from "../client/endpoints";
import Client from "../client/client";
import { Community } from "../models/community";
import CommunityMember from "../models/community_member";

export async function isCommunityMember(client: Client, communityId: string, userId: number): Promise<boolean> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/validate/user/member?communityId=${communityId}&user_id=${userId}`
    );

    return response.result?.member ?? false;
}

export async function createCommunity(client, community: Community): Promise<Community> {
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

export async function getCommunityByUsername(client, username: string): Promise<Community> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/communityusername?communityUsername=${username}`
    );

    if (!response || !response.result) {
        throw new Error('Community not found');
    }

    return Community.parseFromData(response.result);
}

export async function updateCommunity(client, community: Community): Promise<Community> {
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