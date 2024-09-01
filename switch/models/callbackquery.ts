import Client from "../client/client";

export default class CallbackQuery {
    private client?: Client;
    private callbackId: string;

    constructor({
        callbackId: string,
    }) {
        this.callbackId = this.callbackId;
    }

    public answer() {
    }
}
