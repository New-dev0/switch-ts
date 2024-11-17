import Client from "../client/client";
import { BotCommand } from "./bot";

export class OrganizationApp {
    constructor(
        public commands: BotCommand[],
        public createdAt: string,
        public id: string,
        public name: string,
        public orgId: string,
        public role: string,
        public status: string
    ) {}

    static parseFromJSON(data: any): OrganizationApp {
        return new OrganizationApp(
            data.commands || [],
            data.createdAt || "",
            data.id || "",
            data.name || "",
            data.orgId || "",
            data.role || "",
            data.status || ""
        );
    }

    fromJSON(data: any): OrganizationApp {
        if (data) {
            // this.commands = BotCommand.buildFromJsonList(data.commands, this.app);
            this.orgId = data.orgId;
            this.name = data.name;
            this.status = data.status;
            this.role = data.role;
            this.id = data.id;
            this.createdAt = data.createdAt;
        }
        return this;
    }

    toJSON(): any {
        return {
            status: this.status,
            commands: this.commands,
            name: this.name,
            role: this.role,
            orgId: this.orgId,
            id: this.id,
            createdAt: this.createdAt,
        };
    }
}