import Client from "../client/client";
import { BotCommand, BotInfo, parseBotInfo } from "../models/bot";
import { Endpoints } from "../client/endpoints";

export async function updateBotInfo(client: Client, botInfo: BotInfo) {
    botInfo.commands = botInfo.commands?.map(command => {
        if (!command.description) command.description = '';
        if (!command.channel) command.channel = true;
        return command;
    })

    const data = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/bots/update`, {
        method: "PUT",
        body: JSON.stringify(botInfo)
    });

    return parseBotInfo(data);
}

export async function getBotInfo(client: Client, params: {botId: number}) {
    const data = await client.request(`${Endpoints.CHAT_SERVICE_URL}/v1/bots?botId=${params.botId}`);
    return parseBotInfo(data);
}
