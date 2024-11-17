import Client from "../client/client";
import Message, { MessageParams } from "./message";
import { parseSender } from "./user";

export interface CommandParams extends MessageParams {
    _client: Client;
}

export class Command extends Message {
    commandParams!: string[];
    command!: string;

    constructor(params: CommandParams) {
        super(params);
        this._client = params._client;
    }

    static parseFromData(data: any, client: Client) {
        const message = data?.details ? data["details"]["message"] : data["message"];
        const response = new Command({
            message: message["message"],
            status: message["status"],
            communityId: message["communityId"],
            channelId: message["channelId"],
            groupId: message["groupId"],
            userId: message["userId"],
            _client: client
        });

        response.id = message["id"];
        response.userId = message["userId"];
        response.receiverId = message["receiverId"];
        response.personalChat = message["personalChat"];
        response.sender = parseSender(
            data?.details ? data["details"]["sender"] : message["senderInfo"],
        );
        response.receiverId = message["receiverId"];
        response.isCommand = message["command"];
        response.command = data["details"]["command"];
        response.commandParams = data["details"]["commandParams"];
        return response;
    }
}
