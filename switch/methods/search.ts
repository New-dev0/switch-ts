import Client from "../client/client";
import { Endpoints } from "../client/endpoints";
import Message from "../models/message";
import { Media } from "../models/media";
import Channel from "../models/channel";
import Group from "../models/group";
import User from "../models/user";

export type SearchItemType = "MESSAGE" | "MEDIA" | "LINK" | "GROUP" | "CHANNEL" | "MEMBER";

export interface SearchParams {
  communityId: string;
  searchString: string;
  item: SearchItemType;
  limit?: number;
  page?: number;
}

export interface SearchMatchedData {
  id: string;
  communityId: string;
  communityName: string;
  communityProfileUrl: string;
  channelId?: string;
  groupId?: string;
  message?: string;
  mediaLink?: string;
  messageType?: "MESSAGE" | "POST_MESSAGE" | "PERSONAL";
  maxId: number;
  rowNumber: number;
  status: string;
  adjacentMsg?: any[];
}

export interface SearchResponse {
  count: number;
  start: number;
  end: number;
  matches: SearchMatchedData[];
}

type ParsedSearchResult<T extends SearchItemType> = 
  T extends "MESSAGE" ? Message[] :
  T extends "MEDIA" ? Media[] :
  T extends "LINK" ? SearchMatchedData[] :
  T extends "GROUP" ? Group[] :
  T extends "CHANNEL" ? Channel[] :
  T extends "MEMBER" ? User[] :
  never;

export async function searchInCommunity<T extends SearchItemType>(
  client: Client, 
  params: SearchParams & { item: T }
): Promise<ParsedSearchResult<T>> {
  const queryParams = new URLSearchParams({
    communityId: params.communityId,
    searchString: params.searchString,
    item: params.item,
    limit: (params.limit || 10).toString(),
    page: (params.page || 0).toString()
  });

  const response: SearchResponse = await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/search/community-data?${queryParams.toString()}`,
    {
      method: "GET"
    }
  );

  // Parse response based on item type
  switch(params.item) {
    case "MESSAGE":
      return response.matches.map(match => Message.parseMessageFromJson(match, client)) as ParsedSearchResult<T>;
    
    case "MEDIA":
      return response.matches.map(match => Media.parseFromData(match)) as ParsedSearchResult<T>;
    
    case "GROUP":
      return response.matches.map(match => Group.parseFromData(match)) as ParsedSearchResult<T>;
    
    case "CHANNEL":
      return response.matches.map(match => Channel.parseFromData(match)) as ParsedSearchResult<T>;
    
    case "MEMBER":
      return response.matches as ParsedSearchResult<T>;
    
    case "LINK":
      return response.matches as ParsedSearchResult<T>;
    
    default:
      throw new Error(`Unknown search item type: ${params.item}`);
  }
} 