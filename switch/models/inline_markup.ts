export interface KeyboardButton {
    text: string;
    url?: string;
    callbackData?: string;
}

export default class InlineMarkup {
    keyboard_buttons: Array<Array<KeyboardButton>>;

    constructor(buttons: Array<Array<KeyboardButton>>) {
        this.keyboard_buttons = buttons;
    }

    convertToRequest() {
        return {
            "inlineKeyboard": this.keyboard_buttons,
        };
    }
}

export class Button {
    markup: InlineMarkup;

    constructor() {
        this.markup = new InlineMarkup([]);
    }

    public url(text: string, url: string) {
        this.markup.keyboard_buttons.push([
            { "text": text, "url": url },
        ]);
        return this;
    }

    public callback(text: string, callbackData: string) {
        this.markup.keyboard_buttons.push([{
            "text": text,
            "callbackData": callbackData,
        }]);
        return this;
    }

    public _get_markup() {
        return this.markup;
    }
}
