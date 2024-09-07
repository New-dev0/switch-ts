import Client from "../client/client";
import { Endpoints } from "../client/endpoints";

interface Sticker {
  id: string;
  setId: string;
  emoji?: string;
  fileId?: string;
  width?: number;
  height?: number;
  isAnimated?: boolean;
  isVideo?: boolean;
  type?: string;
  thumbnail?: {
    fileId: string;
    width: number;
    height: number;
  };
  thumbUrl?: string;
  setName?: string;
  maskPosition?: {
    point: string;
    xShift: number;
    yShift: number;
    scale: number;
  };
  customEmojiId?: string;
  needsRepainting?: boolean;
  premiumAnimation?: {
    fileId: string;
    width: number;
    height: number;
  };
}

export interface GetStickerSetParams {
  setId: string;
}

export interface CreateStickerSetParams {
  userId: number;
  name: string;
  title: string;
  stickers: Sticker[];
  stickerFormat?: string;
  stickerType?: string;
  needsRepainting?: boolean;
}

export interface AddStickerToSetParams {
  userId: number;
  name: string;
  sticker: Sticker;
}

export interface SetStickerPositionInSetParams {
  sticker: string;
  position: number;
}

export interface DeleteStickerFromSetParams {
  sticker: string;
}

export async function getStickerSet(client: Client, params: GetStickerSetParams): Promise<Sticker[]> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker/set?setId=${params.setId}`, {
    method: "GET",
  });
}

export async function createStickerSet(client: Client, params: CreateStickerSetParams): Promise<boolean> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker/set`, {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function addStickerToSet(client: Client, params: AddStickerToSetParams): Promise<boolean> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker`, {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function setStickerPositionInSet(client: Client, params: SetStickerPositionInSetParams): Promise<boolean> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker/position`, {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function deleteStickerFromSet(client: Client, params: DeleteStickerFromSetParams): Promise<boolean> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/sticker`, {
    method: "DELETE",
    body: JSON.stringify(params),
  });
}
