import Client from "../client/client";
import { Endpoints } from "../client/endpoints";

export type GuidelineType = "TF" | "ST";

export interface CommunityGuideline {
  id?: number;
  communityId: string;
  heading: string;
  description?: string;
  guidelineText: string;
  guidelineType: GuidelineType;
  enableGuideline: boolean;
}

export interface CommunityDefaultGuideline {
  id?: number;
  heading: string;
  description?: string;
  guidelineText: string;
  guidelineType: GuidelineType;
}

// Create a new guideline
export async function createGuideline(client: Client, guideline: CommunityGuideline): Promise<CommunityGuideline> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/guidelines`,
    {
      method: "POST",
      body: JSON.stringify(guideline)
    }
  );
}

// Update existing guideline
export async function updateGuideline(client: Client, guideline: CommunityGuideline): Promise<CommunityGuideline> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/guidelines`,
    {
      method: "PUT",
      body: JSON.stringify(guideline)
    }
  );
}

// Get guideline by ID
export async function getGuideline(client: Client, guidelineId: number): Promise<CommunityGuideline> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/guidelines/${guidelineId}`,
    {
      method: "GET"
    }
  );
}

// Get all guidelines for a community
export async function getGuidelinesForCommunity(client: Client, communityId: string): Promise<CommunityGuideline[]> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/guidelines/all/${communityId}`,
    {
      method: "GET"
    }
  );
}

// Delete a guideline
export async function deleteGuideline(client: Client, guidelineId: number): Promise<void> {
  await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/guidelines/${guidelineId}`,
    {
      method: "DELETE"
    }
  );
}

// Predefined guidelines methods
export async function createPredefinedGuideline(client: Client, guideline: CommunityDefaultGuideline): Promise<CommunityGuideline> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/guidelines/predefined`,
    {
      method: "POST",
      body: JSON.stringify(guideline)
    }
  );
}

export async function updatePredefinedGuideline(client: Client, guideline: CommunityDefaultGuideline): Promise<CommunityGuideline> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/guidelines/predefined`,
    {
      method: "PUT",
      body: JSON.stringify(guideline)
    }
  );
}

export async function getPredefinedGuideline(client: Client, guidelineId: number): Promise<CommunityDefaultGuideline> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/guidelines/predefined/${guidelineId}`,
    {
      method: "GET"
    }
  );
}

export async function getAllPredefinedGuidelines(client: Client): Promise<CommunityDefaultGuideline[]> {
  return await client.request(
    `${Endpoints.CHAT_SERVICE_URL}/v1/community/guidelines/predefined/all`,
    {
      method: "GET"
    }
  );
} 