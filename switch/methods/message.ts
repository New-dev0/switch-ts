import Client from "../client/client";
import { Endpoints } from "../client/endpoints";
import Message from "../models/message";
import InlineMarkup from "../models/inline_markup";
import { Button } from "../models/inline_markup";
import { Media } from "../models/media";
import { uploadMedia } from "./media";

export interface sendMessageParams {
    message: string;
    receiverId?: number | null;
    channelId?: string | null;
    groupId?: string | null;
    communityId?: string | null;
    repliedTo?: number | null;
    inlineMarkup?: InlineMarkup | Button;
    mediaInfo?: Media
}

export interface editMessageParams {
    message: string;
    inlineMarkup?: InlineMarkup | Button;
}

export interface SendMediaParams {
  file: File;
  caption?: string;
  receiverId?: number | null;
  channelId?: string | null;
  groupId?: string | null;
  communityId?: string | null;
  repliedTo?: number | null;
  inlineMarkup?: InlineMarkup | Button;
}

export async function sendMessage(client: Client, params: sendMessageParams) {
    const requestUrl = `${Endpoints.CHAT_SERVICE_URL}/v1/message/create`;
    const requestData: any = { ...params };

    if (requestData.inlineMarkup) {
        let markup: InlineMarkup;
        if (requestData.inlineMarkup instanceof InlineMarkup) {
            markup = requestData.inlineMarkup;
        } else {
            markup = requestData.inlineMarkup._get_markup();
        }
        requestData.inlineMarkup = markup.convertToRequest();
    }

    const message = await client.request(requestUrl, {
        method: "POST",
        body: JSON.stringify(requestData),
    });
    return Message.parseMessageFromJson(message, client);
}

export async function editMessage(
    client: Client,
    messageId: number,
    params: editMessageParams,
) {
    const requestData: any = { ...params };
    
    // Handle inline markup
    if (requestData.inlineMarkup) {
        let markup: InlineMarkup;
        if (requestData.inlineMarkup instanceof InlineMarkup) {
            markup = requestData.inlineMarkup;
        } else if (requestData.inlineMarkup instanceof Button) {
            markup = requestData.inlineMarkup._get_markup();
        } else {
            throw new Error("Invalid inline markup type");
        }
        requestData.inlineMarkup = markup.convertToRequest();
    }

    try {
        const response = await client.request(
            `${Endpoints.CHAT_SERVICE_URL}/v1/message?id=${messageId}`,
            { 
                method: "PUT", 
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response) {
            throw new Error("Failed to edit message");
        }

        return Message.parseMessageFromJson(response, client);
    } catch (error) {
        throw new Error(`Failed to edit message: ${error}`);
    }
}

export async function sendMedia(client: Client, params: SendMediaParams) {
  // First upload the media
  const uploadResponse = await uploadMedia(client, params.file);
  
  // Create media info from upload response
  const mediaInfo = new Media(
    uploadResponse.fileId,
    params.caption,
    undefined, // checksum
    undefined, // description
    undefined, // thumbnailUrl
    undefined, // sourceUri
    undefined, // mediaType
    undefined, // mimeType
    uploadResponse.file_name,
    uploadResponse.file_size,
    undefined, // typeName
    undefined, // ownerId
    undefined, // ownerType
    uploadResponse.downloadUrl
  );

  // Send message with media
  return await sendMessage(client, {
    message: params.caption || "",
    receiverId: params.receiverId,
    channelId: params.channelId,
    groupId: params.groupId,
    communityId: params.communityId,
    repliedTo: params.repliedTo,
    inlineMarkup: params.inlineMarkup,
    mediaInfo
  });
}

export interface ForwardMessageParams {
    messageId: number | number[];
    groupChannelId?: string;
    receiverId?: number;
}

export async function forwardMessage(client: Client, params: ForwardMessageParams): Promise<Message | Message[]> {
    const messageIdList = Array.isArray(params.messageId);
    const messageId = messageIdList ? (params.messageId as number[]).join(',') : params.messageId.toString();

    const queryParams = new URLSearchParams();
    if (params.groupChannelId) queryParams.append('groupChannelId', params.groupChannelId);
    if (params.receiverId) queryParams.append('receiverId', params.receiverId.toString());

    const response = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/message/forward/${messageId}?${queryParams.toString()}`, {
        method: "PUT",
    });

    const messages = Array.isArray(response) ? response.map(msg => Message.parseMessageFromJson(msg, client)) : [Message.parseMessageFromJson(response, client)];

    return messageIdList ? messages : messages[0];
}

export async function getMessage(client: Client, messageId: number): Promise<Message> {
    const response = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/message/${messageId}`, {
        method: "GET",
    });

    return Message.parseMessageFromJson(response, client);
}

export interface PinMessageParams {
    messageId: number;
    channelId?: string;
    communityId: string;
    groupId?: string;
    messageType: "MESSAGE" | "POST_MESSAGE" | "PERSONAL";
    userId: number;
    pinDetails?: string;
}

export async function pinMessage(client: Client, params: PinMessageParams): Promise<void> {
    await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/message/pin`, {
        method: "POST",
        body: JSON.stringify({
            messageId: params.messageId,
            channelId: params.channelId,
            communityId: params.communityId, 
            groupId: params.groupId,
            messageType: params.messageType,
            userId: params.userId,
            pinDetails: params.pinDetails,
            status: 1
        }),
    });
}

export interface GetReactionsParams {
    messageId: number;
}

export interface EmojiReaction {
    emojiUnicode: string;
    messageId: number;
    userId: number;
}

export async function getMessageReactions(client: Client, params: GetReactionsParams): Promise<EmojiReaction[]> {
    return await client.request(
        `${Endpoints.CHAT_SERVICE_URL}/v1/message/react/${params.messageId}`,
        {
            method: "GET",
        }
    );
}

export async function addReaction(client: Client, reaction: EmojiReaction): Promise<{[key: string]: number[]}> {
    return await client.request(
        `${Endpoints.CHAT_SERVICE_URL}/v1/message/react/create`,
        {
            method: "POST",
            body: JSON.stringify(reaction)
        }
    );
}

export async function removeReaction(client: Client, reaction: EmojiReaction): Promise<{[key: string]: number[]}> {
    return await client.request(
        `${Endpoints.CHAT_SERVICE_URL}/v1/message/react/delete`,
        {
            method: "POST", 
            body: JSON.stringify(reaction)
        }
    );
}
