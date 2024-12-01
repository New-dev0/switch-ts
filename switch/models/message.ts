import Client from "../client/client";
import { editMessageParams, sendMessageParams } from "../methods/message";
import { parseSender } from "./user";
import User from "./user";
import InlineMarkup from "./inline_markup";
import { Button } from "./inline_markup";
import { Endpoints } from "../client/endpoints";

export type MessageParams = {
    message: string;
    communityId?: string | null;
    channelId?: string | null;
    groupId?: string | null;
    status?: number;
    userId?: number | null;
};

export default class Message {
    protected _client?: Client | null;

    message: string;
    id: number | null = null;
    communityId?: string | null;
    channelId?: string | null;
    groupId?: string | null;
    userId?: number | null;
    status: number = 0;
    sender?: User | null;
    receiver?: User | null;
    receiverId?: number;
    personalChat?: boolean;
    isCommand?: boolean;
    sentDate?: string;
    groupChat?: boolean;
    channelChat?: boolean;

    constructor(
        params: MessageParams,
    ) {
        this.message = params.message;
        this.communityId = params.communityId;
        this.channelId = params.channelId;
        this.userId = params.userId;
        this.groupId = params.groupId;
        this.status = params.status || 0;
    }

    async replyMedia(params: {
        file: File;
        caption?: string;
        inlineMarkup?: InlineMarkup | Button;
    }) {
        return await this._client?.sendMedia({
            file: params.file,
            caption: params.caption,
            repliedTo: this.id,
            channelId: this.channelId,
            groupId: this.groupId,
            communityId: this.communityId,
            receiverId: this.receiverId,
            inlineMarkup: params.inlineMarkup
        });
    }

    async replyText(params: sendMessageParams) {
        params.receiverId = this.userId;
        params.communityId = this.communityId;
        params.groupId = this.groupId;
        params.channelId = this.channelId;
        if (!params.repliedTo) {
            params.repliedTo = this.id;
        }
        return await this._client?.sendMessage(params);
    }

    async editText(params: editMessageParams) {
        if (this.id) {
            return await this._client?.editMessage(this.id, params);
        }
    }

    static parseMessageFromJson(data: any, client: Client) {
        let message = data?.id ? data : (data?.details
            ? data["details"]["message"]
            : data["message"]);
        const response = new Message({
            message: message["message"],
            status: message["status"],
        });
        response._client = client;
        response.id = message["id"];
        response.userId = message["userId"];
        response.receiverId = message["receiverId"];
        response.personalChat = message["personalChat"];
        if (data?.details?.sender || message.senderInfo) {
            response.sender = parseSender(data?.details?.sender || message.senderInfo);
        }
        if (data?.details?.receiver) {
            response.receiver = parseSender(data["details"]["receiver"]);
        }
        response.receiverId = message["receiverId"];
        response.isCommand = message["command"];
        response.groupChat = message["groupChat"];
        response.channelChat = message["channelChat"];

        return response;
    }

    async pin() {
        if (!this.id) return;
        if (!this.channelId || !this.groupId || !this.communityId) return;
        return await this._client?.pinMessage({
            messageId: this.id,
            communityId: this.communityId!,
            channelId: this.channelId,
            groupId: this.groupId,
            messageType: this.channelChat ? "POST_MESSAGE" : "MESSAGE",
            userId: this.userId!
        });
    }

    async unpin() {
        if (!this.id) return;
        if (!this.channelId || !this.groupId || !this.communityId) return;
        return await this._client?.pinMessage({
            messageId: this.id,
            communityId: this.communityId!,
            channelId: this.channelId,
            groupId: this.groupId,
            messageType: this.channelChat ? "POST_MESSAGE" : "MESSAGE",
            userId: this.userId!,
        });
    }

    async addReaction(emoji: string) {
        if (!this.id || !this.userId) return;
        
        return await this._client?.addReaction({
            emojiUnicode: emoji,
            messageId: this.id,
            userId: this.userId
        });
    }

    async removeReaction(emoji: string) {
        if (!this.id || !this.userId) return;
        
        return await this._client?.removeReaction({
            emojiUnicode: emoji,
            messageId: this.id,
            userId: this.userId
        });
    }

    async getReactions() {
        if (!this.id) return;
        
        return await this._client?.getMessageReactions({
            messageId: this.id
        });
    }

    async delete() {
        if (!this.id) return;
        
        return await this._client?.request(
            `${Endpoints.CHAT_SERVICE_URL}/v1/message/${this.id}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    async forward(params: {
        groupChannelId?: string;
        receiverId?: number;
    }) {
        if (!this.id) return;
        
        return await this._client?.forwardMessage({
            messageId: this.id,
            ...params
        });
    }
}
