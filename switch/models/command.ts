import Client from "../client/client";
import Message from "./message";
import { MessageParams } from "./message";


export class Command extends Message {
    command?: string;
    commandParams?: string;

    constructor(params: MessageParams) {
        super(params);
    }

    static parseFromData(data, client: Client): Command {
        const message: Command = Message.parseMessageFromJson(data, client);
        message.command = data?.details?.command;
        message.commandParams = data?.details?.commandParams;

        return message;
    }
}
