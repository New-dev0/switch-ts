type JSONDict = { [key: string]: any };

export default class Channel {
    botId: string;
    id: string;
    name: string;
    communityId: string;
    enabledFree: boolean;
    enabledPublic: boolean;
    defaultChannel: boolean;
    isPublic: boolean;
    createdBy: string;
    icon?: string;
    channelLogoUrl?: string;
    allowedContent?: string;
    createdAt?: Date;
    updatedAt?: Date;
    link?: string;
    isTwitter?: boolean;
    twitterUsername?: string;
    muted?: boolean;
    linkBased?: boolean;

    constructor(
        botId: string,
        id: string,
        name: string,
        communityId: string,
        enabledFree: boolean,
        enabledPublic: boolean,
        defaultChannel: boolean,
        isPublic: boolean,
        createdBy: string,
        icon?: string,
        channelLogoUrl?: string,
        allowedContent?: string,
        createdAt?: Date,
        updatedAt?: Date,
        link?: string,
        isTwitter?: boolean,
        twitterUsername?: string,
        muted?: boolean,
        linkBased?: boolean
    ) {
        this.botId = botId;
        this.id = id;
        this.name = name;
        this.communityId = communityId;
        this.enabledFree = enabledFree;
        this.enabledPublic = enabledPublic;
        this.defaultChannel = defaultChannel;
        this.isPublic = isPublic;
        this.createdBy = createdBy;
        this.icon = icon;
        this.channelLogoUrl = channelLogoUrl;
        this.allowedContent = allowedContent;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.link = link;
        this.isTwitter = isTwitter;
        this.twitterUsername = twitterUsername;
        this.muted = muted;
        this.linkBased = linkBased;
    }

    static parseFromData(data: JSONDict): Channel {
        return new Channel(
            data['botId'],
            data['channelId'],
            data['channelName'],
            data['communityId'],
            data['enabledFree'],
            data['enabledPublic'],
            data['defaultChannel'],
            data['isPublic'],
            data['createdBy'],
            data['icon'],
            data['channelLogoUrl'],
            data['allowedContent'],
            data['createdAt'] ? new Date(data['createdAt']) : undefined,
            data['updatedAt'] ? new Date(data['updatedAt']) : undefined,
            data['link'],
            data['isTwitter'],
            data['twitterUsername'],
            data['muted'],
            data['linkBased']
        );
    }

    convertToRequest(): JSONDict {
        return {
            "botId": this.botId,
            "channelId": this.id,
            "channelName": this.name,
            "communityId": this.communityId,
            "enabledFree": this.enabledFree,
            "enabledPublic": this.enabledPublic,
            "defaultChannel": this.defaultChannel,
            "isPublic": this.isPublic,
            "createdBy": this.createdBy,
            "icon": this.icon,
            "channelLogoUrl": this.channelLogoUrl,
            "allowedContent": this.allowedContent,
            "createdAt": this.createdAt?.toISOString(),
            "updatedAt": this.updatedAt?.toISOString(),
            "link": this.link,
            "isTwitter": this.isTwitter,
            "twitterUsername": this.twitterUsername,
            "muted": this.muted,
            "linkBased": this.linkBased,
        };
    }
}
