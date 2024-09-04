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
