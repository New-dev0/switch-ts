import { WebSocket } from "ws";

import { Endpoints } from "./endpoints";
import User from "../models/user";
import { v4 as uuid } from "uuid";
import { WsClient } from "./WsClient";
import Message from "../models/message";

export enum HandlerType {
    COMMAND,
    CALLBACK_QUERY,
    INLINE_QUERY,
    MESSAGE,
}

interface Handler {
    fn: (data: Message) => any;
    params: any;
    type: HandlerType;
}

export abstract class switchBaseClient {
    private _token: string;
    private _community_ws: WsClient;
    private _chat_ws: WsClient;

    public _handlers: Array<Handler> = [];
    private _community_handlers: Array<Handler>;

    public _user: User;

    constructor(
        token: string,
    ) {
        this._token = token;
    }

    public async request(url: string, params?: RequestInit) {
        const Params = {
            ...params,
            headers: {
                "authtoken": this._token,
                "Authorization": `Bearer ${this._token}`,
                "Content-Type": "application/json",
                ...params?.headers,
            },
        };
        const data = await fetch(url, Params);
        return await data.json();
    }

    async connect() {
        this._user = await this.getMe();

        this._chat_ws = new WsClient(
            Endpoints.CHAT_WS,
            this._token,
            `/topic/bot.chat.event.${this._user.id}`,
            this.parseChatEvents.bind(this),
        );
        this._community_ws = new WsClient(
            Endpoints.COMMUNITY_WS,
            this._token,
            `/topic/bot.community.event.${this._user.id}`,
            console.log,
        );

        this._chat_ws.connect();
        this._community_ws.connect();
    }

    abstract parseChatEvents(data: any);

    public abstract getMe(): Promise<User>;

    public onCommand(command: string, handler: (message: Message) => any) {
        this._handlers.push({
            fn: handler,
            params: { command },
            type: HandlerType.COMMAND,
        });
        console.log(this._handlers);
    }

    public onMessage(handler: (message: Message) => any) {
        this._handlers.push({
            fn: handler,
            params: {},
            type: HandlerType.MESSAGE,
        });
    }

    public onCallbackQuery(data: string, handler: any) {
        this._handlers.push(
            {
                fn: handler,
                type: HandlerType.CALLBACK_QUERY,
                params: { data: data },
            },
        );
    }
}
