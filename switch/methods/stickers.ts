import Client from "../client/client";
import { Endpoints } from "../client/endpoints";
import { Sticker } from "../models/sticker";

export interface GetStickerPackParams {
  packId: string;
}

export interface CreateStickerPackParams {
  name: string;
  title: string;
  stickers: Sticker[];
}

export interface SortStickersParams {
  packId: string;
  stickers: string[];  // Array of sticker IDs in desired order
}

export interface InstallStickerParams {
  packId: string;
}

export async function getStickersFromPack(client: Client, params: GetStickerPackParams): Promise<Sticker[]> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker?packId=${params.packId}`, {
    method: "GET"
  });
}

export async function createSticker(client: Client, sticker: Sticker): Promise<Sticker> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker`, {
    method: "POST",
    body: JSON.stringify(sticker)
  });
}

export async function removeSticker(client: Client, stickerId: string): Promise<void> {
  await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker?stickerId=${stickerId}`, {
    method: "DELETE"
  });
}

export async function getStickerPacks(client: Client): Promise<any[]> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker/pack`, {
    method: "GET"
  });
}

export async function createStickerPack(client: Client, params: CreateStickerPackParams): Promise<any> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker/pack`, {
    method: "POST",
    body: JSON.stringify(params)
  });
}

export async function deleteStickerPack(client: Client, packId: string): Promise<void> {
  await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker/pack?packId=${packId}`, {
    method: "DELETE"
  });
}

export async function installStickerPack(client: Client, params: InstallStickerParams): Promise<void> {
  await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker/pack/install`, {
    method: "POST",
    body: JSON.stringify(params)
  });
}

export async function getInstalledStickerPacks(client: Client): Promise<any[]> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker/pack/installed`, {
    method: "GET"
  });
}

export async function searchStickerPacks(client: Client, query: string): Promise<any[]> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker/pack/search?query=${query}`, {
    method: "GET"
  });
}

export async function sortStickersInPack(client: Client, params: SortStickersParams): Promise<void> {
  await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker/pack/sort`, {
    method: "POST",
    body: JSON.stringify(params)
  });
}

export async function uninstallStickerPack(client: Client, params: InstallStickerParams): Promise<void> {
  await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker/pack/uninstall`, {
    method: "POST",
    body: JSON.stringify(params)
  });
}
