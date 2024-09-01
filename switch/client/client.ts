import { AuthUser } from "../models/user";
import { switchBaseClient, HandlerType } from "./baseClient";
import { Endpoints } from "./endpoints";
import { User } from "../models/user";
import * as messageMethods from "../methods/message";
import * as BotMethods from "../methods/bot";
import Message from "../models/message";
import { BotCommand, BotInfo } from "../models/bot";

export default class Client extends switchBaseClient {
    private receiveUpdates: boolean;

    constructor(token: string, receiveUpdates: boolean = true) {
        super(token);
        this.receiveUpdates = receiveUpdates;
    }

    public async start() {
        if (this.receiveUpdates) await this.connect();
    }

    public async getMe(): Promise<User> {
        const user: AuthUser = await this.request(
            `${Endpoints.USER_SERVICE_URL}/api/user`,
        );
        return user;
    }

    public async sendMessage(params: messageMethods.sendMessageParams) {
        return await messageMethods.sendMessage(this, params);
    }

    public async editMessage(messageId: number, params: messageMethods.editMessageParams) {
        return await messageMethods.editMessage(this, messageId, params);
    };

    public async getBotInfo(botId: number) {
        return await BotMethods.getBotInfo(this, {botId})
    }

    public async setBotCommands(commands: Array<BotCommand>) {
        this._user = await this.getMe();
        const botinfo: BotInfo = {id: this._user.id, commands};
        return await BotMethods.updateBotInfo(this, botinfo);
    }

    parseChatEvents(data: any) {
        {
            if (this._handlers) {
                this._handlers.forEach(async (handler) => {
                    if (
                        data["type"] === "MESSAGE" &&
                        handler.type === HandlerType.MESSAGE
                    ) {
                        const message: Message = Message.parseMessageFromJson(data, this);
                        await handler.fn(message);
                    }
                });
            }
        }
    }
}
