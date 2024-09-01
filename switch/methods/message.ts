import Client from "../client/client";
import { Endpoints } from "../client/endpoints";
import Message from "../models/message";

export interface sendMessageParams {
    message: string;
    receiverId?: number | null;
    channelId?: string | null;
    groupId?: string | null;
    communityId?: string | null;
    repliedTo?: number | null;
}

export interface editMessageParams {
    message: string
}

export async function sendMessage(client: Client, params: sendMessageParams) {
    const requestUrl = `${Endpoints.CHAT_SERVICE_URL}/v1/message/create`;

    const message = await client.request(requestUrl, {
        method: "POST",
        body: JSON.stringify(params),
    });
    return Message.parseMessageFromJson(message, client);
}

export async function editMessage(client: Client, messageId: number, params: editMessageParams) {
    const response = await client.request(
        `${Endpoints.CHAT_SERVICE_URL}/v1/message?id=${messageId}`,
        { method: "PUT", body: JSON.stringify(params) },
    );
    return Message.parseMessageFromJson(response, client);
}
