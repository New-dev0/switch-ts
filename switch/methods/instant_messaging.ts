import Client from "../client/client";
import { Endpoints } from "../client/endpoints";

export interface InstantMessagingConfig {
  id: string;
  botId: number;
  channelId?: string;
  groupId?: string;
  communityId: string;
  enabled: boolean;
}

export interface EnableInstantMessagingParams {
  botId: number;
  channelId?: string;
  groupId?: string;
  communityId: string;
}

export interface GetInstantMessagingParams {
  botId?: number;
  channelId?: string;
  groupId?: string;
  communityId: string;
}

export async function getBotsInstantMessagingConfig(client: Client, params: GetInstantMessagingParams): Promise<InstantMessagingConfig[]> {
  const queryParams = new URLSearchParams();
  queryParams.append('communityId', params.communityId);
  if (params.botId) queryParams.append('botId', params.botId.toString());
  if (params.channelId) queryParams.append('channelId', params.channelId);
  if (params.groupId) queryParams.append('groupId', params.groupId);

  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/instant/messaging/bots?${queryParams.toString()}`,
    {
      method: "GET"
    }
  );
}

export async function enableInstantBotMessaging(client: Client, params: EnableInstantMessagingParams): Promise<InstantMessagingConfig> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/instant/messaging/enable`,
    {
      method: "POST",
      body: JSON.stringify(params)
    }
  );
}

export async function disableInstantBotMessaging(client: Client, params: EnableInstantMessagingParams): Promise<InstantMessagingConfig> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/instant/messaging/disable`,
    {
      method: "POST", 
      body: JSON.stringify(params)
    }
  );
} 