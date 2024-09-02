// Import relevant types and interfaces
import User from "./user"; // Adjust the import path according to your project structure

export default class CommunityMember {
    admin: boolean;
    communityId: string;
    enableNotificationOnMentionAndPin: boolean;
    id: string;
    muteChannels: string[];
    muteGroups: string[];
    muteNotification: boolean;
    mutePeriod: number;
    roleInfo: string;
    userId: string;
    user?: User;
    userName: string;
    requestStatus: string;
    xp: number;
    xpSpend: number;

    constructor(data: any) {
        this.admin = data.admin;
        this.communityId = data.communityId;
        this.enableNotificationOnMentionAndPin = data.enableNotificationOnMentionAndPin;
        this.id = data.id;
        this.muteChannels = data.muteChannels || [];
        this.muteGroups = data.muteGroups || [];
        this.muteNotification = data.muteNotification;
        this.mutePeriod = data.mutePeriod;
        this.roleInfo = data.roleInfo;
        this.userId = data.userId;
        this.userName = data.userName;
        this.requestStatus = data.requestStatus;
        this.xp = data.xp;
        this.xpSpend = data.xpSpend;
        this.user = data.userInfo || undefined;
    }

    toJson(): object {
        return {
            admin: this.admin,
            communityId: this.communityId,
            enableNotificationOnMentionAndPin: this.enableNotificationOnMentionAndPin,
            id: this.id,
            muteChannels: this.muteChannels,
            muteGroups: this.muteGroups,
            muteNotification: this.muteNotification,
            mutePeriod: this.mutePeriod,
            roleInfo: this.roleInfo,
            userId: this.userId,
            userName: this.userName,
            requestStatus: this.requestStatus,
            xp: this.xp,
            xpSpend: this.xpSpend,
            userInfo: this.user || undefined,
        };
    }

    static parseFromData(data: any): CommunityMember {
        return new CommunityMember(data);
    }

    static parseList(dataArray: any[]): CommunityMember[] {
        return dataArray.map(data => new CommunityMember(data));
    }
}
