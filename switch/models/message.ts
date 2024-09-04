import Client from "../client/client";
import { editMessageParams, sendMessageParams } from "../methods/message";
import { parseSender } from "./user";
import User from "./user";

type MessageParams = {
    message: string;
    communityId?: string | null;
    channelId?: string | null;
    groupId?: string | null;
    status?: number;
    userId?: number | null;
};

export default class Message {
    private _client?: Client | null;

    message: string;
    id: number | null = null;
    communityId?: string | null;
    channelId?: string | null;
    groupId?: string | null;
    userId?: number | null;
    status: number;
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
        let message = data?.details
            ? data["details"]["message"]
            : data["message"];
        const response = new Message({
            message: message["message"],
            status: message["status"],
        });
        response._client = client;
        response.id = message["id"];
        response.userId = message["userId"];
        response.receiverId = message["receiverId"];
        response.personalChat = message["personalChat"];
        response.sender = parseSender(
            data?.details ? data["details"]["sender"] : message["senderInfo"],
        );
        if (data?.details?.receiver) {
            response.receiver = parseSender(data["details"]["receiver"]);
        }
        response.receiverId = message["receiverId"];
        response.isCommand = message["command"];
        response.groupChat = message["groupChat"];
        response.channelChat = message["channelChat"];

        return response;
    }
}
