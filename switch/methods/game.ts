import Client from "../client/client";
import { Endpoints } from "../client/endpoints";

// Temporary GameInfo interface (replace with actual import when available)
interface GameInfo {
  id: string;
  userId: number;
  score: number;
  level: number;
  communityId?: string;
  botId?: number;
}

export interface CreateLeaderboardParams {
  userId: number;
  score?: number;
  level?: number;
  communityId?: string;
  botId?: number;
}

export interface UpdateLeaderboardParams {
  id: string;
  userId: number;
  score?: number;
  level?: number;
  communityId?: string;
  botId?: number;
}

export interface GetGameScoreParams {
  userId: number;
  communityId?: string;
  botId?: number;
}

export async function createLeaderboard(client: Client, params: CreateLeaderboardParams): Promise<GameInfo> {
  const response = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/bots/game/leaderboard`, {
    method: "POST",
    body: JSON.stringify(params),
  });
  return response;
}

export async function updateLeaderboard(client: Client, params: UpdateLeaderboardParams): Promise<GameInfo> {
  const response = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/bots/game/leaderboard`, {
    method: "PUT",
    body: JSON.stringify(params),
  });
  return response;
}

export async function getGlobalLeaderboard(client: Client, botId?: number): Promise<GameInfo[]> {
  const response = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/bots/game/leaderboard/global${botId ? `?botId=${botId}` : ''}`);
  return response;
}

export async function getCommunityLeaderboard(client: Client, communityId: string, botId?: number): Promise<GameInfo[]> {
  const response = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/bots/game/leaderboard/community?communityId=${communityId}${botId ? `&botId=${botId}` : ''}`);
  return response;
}

export async function getGameScore(client: Client, params: GetGameScoreParams): Promise<GameInfo> {
  const queryParams = new URLSearchParams();
  if (params.userId) queryParams.append('userId', params.userId.toString());
  if (params.communityId) queryParams.append('communityId', params.communityId);
  if (params.botId) queryParams.append('botId', params.botId.toString());
  
  const response = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/bots/game/score?${queryParams.toString()}`);
  return response;
}
