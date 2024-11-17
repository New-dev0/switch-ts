import Client from "../client/client";
import { Endpoints } from "../client/endpoints";
import { Media, UploadMediaResponse } from "../models/media";

export interface GetMediaParams {
  id: number;
}

export interface UpdateMediaParams {
  id: number;
  media: Media;
}

export interface DeleteMediaParams {
  id: number;
}

export async function getMediaByID(client: Client, params: GetMediaParams): Promise<Media> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/media/${params.id}`, {
    method: "GET",
  });
}

export async function updateMedia(client: Client, params: UpdateMediaParams): Promise<Media> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/media/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(params.media),
  });
}

export async function deleteMedia(client: Client, params: DeleteMediaParams): Promise<boolean> {
  return await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/media/${params.id}`, {
    method: "DELETE",
  });
}

export async function uploadMedia(client: Client, file: File): Promise<UploadMediaResponse> {
  // First get the upload URL
  const { url } = await client.request("https://storage.switch.click/get_upload_url", {
    method: "GET",
  });

  // Prepare form data
  const formData = new FormData();
  formData.append("file", file);

  // Upload the file
  return await fetch(`${url}/upload?blocking=true`, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
}