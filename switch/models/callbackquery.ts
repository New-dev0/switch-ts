import Client from "../client/client";
import { AnswerCallbackParams } from "../methods/callbacks";

export default class CallbackQuery {
    private client?: Client;
    callbackId: string;

    constructor({
        callbackId,
    }) {
        this.callbackId = callbackId;
    };

    public async answer(params: AnswerCallbackParams) {
        if (this.client) {
            params.callbackId = this.callbackId;
            return await this.client.answerCallbackQuery(params);
        }
    }
}
