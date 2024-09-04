import { parseSender, UserStatus, UserStatusInfo } from "./user";
import User from "./user";

export interface BotCommand {
    command: string,
    botId?: number,
    description?: string | null,
    channel?: boolean,
    subCommands?: {};
}


export interface BotInfo extends User {
    commands?: Array<BotCommand>;
    status?: UserStatus;
}

export function parseBotInfo(data: any): BotInfo {
    const user: BotInfo = parseSender(data);
    if (data?.status) {
        user.status = {
            status: data?.status?.status === "OFFLINE"
                ? UserStatusInfo.OFFLINE
                : UserStatusInfo.ONLINE,
        };
    }
    user.commands = data?.commands?.map((cmd) => {
        return { "command": cmd.command, "description": cmd.description };
    });
    return user;
}
