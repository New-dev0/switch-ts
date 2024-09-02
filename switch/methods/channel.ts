import Client from "../client/client";
import Channel from "../models/channel";
import { Endpoints } from "../client/endpoints";

export async function createChannel(client: Client, channel: Channel): Promise<Channel> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/channel`,
        {
            method: "POST",
            body: JSON.stringify(channel.convertToRequest()),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return Channel.parseFromData(response);
}

export async function getChannelByID(client: Client, channelId: string): Promise<Channel> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/channel?channelId=${channelId}`
    );
    return Channel.parseFromData(response?.result);
}

export async function getAllChannels(client: Client, communityId: string): Promise<Channel[]> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/channel/all?communityId=${communityId}`
    );
    return response?.result.map((channelData) => Channel.parseFromData(channelData)) || [];
}

export async function updateChannel(client: Client, channel: Channel): Promise<Channel> {
    const response = await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/channel`,
        {
            method: "PUT",
            body: JSON.stringify(channel.convertToRequest()),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return Channel.parseFromData(response);
}

export async function deleteChannel(client: Client, channelId: string): Promise<void> {
    await client.request(
        `${Endpoints.COMMUNITY_SERVICE_URL}/v1/community/channel/${channelId}`,
        {
            method: "DELETE",
        }
    );
}
