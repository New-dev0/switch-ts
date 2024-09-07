import Client from "../client/client";
import { Endpoints } from "../client/endpoints";
import Message from "../models/message";
import InlineMarkup from "../models/inline_markup";
import { Button } from "../models/inline_markup";
import { Media } from "../models/media";

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

export async function sendMessage(client: Client, params: sendMessageParams) {
    const requestUrl = `${Endpoints.CHAT_SERVICE_URL}/v1/message/create`;
    const requestData = {
        ...params,
    };
    if (requestData.inlineMarkup) {
        let markup: InlineMarkup;
        if (requestData?.inlineMarkup instanceof InlineMarkup) {
            markup = requestData.inlineMarkup;
        } else {
            markup = requestData.inlineMarkup._get_markup();
        }
        requestData["inline_markup"] = markup.convertToRequest();
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
    const requestData = {
        ...params,
    };
    if (requestData.inlineMarkup) {
        let markup: InlineMarkup;
        if (requestData?.inlineMarkup instanceof InlineMarkup) {
            markup = requestData.inlineMarkup;
        } else {
            markup = requestData.inlineMarkup._get_markup();
        }
        requestData["inline_markup"] = markup.convertToRequest();
    }
    const response = await client.request(
        `${Endpoints.CHAT_SERVICE_URL}/v1/message?id=${messageId}`,
        { method: "PUT", body: JSON.stringify(requestData) },
    );
    return Message.parseMessageFromJson(response, client);
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
