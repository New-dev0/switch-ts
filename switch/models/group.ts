export default class Group {
    id: string;
    name: string;
    communityId: string;
    enabledFree: boolean;
    enabledPublic: boolean;
    defaultGroup: boolean;
    isPublic: boolean;
    createdBy: string;
    icon?: string;
    groupLogoUrl?: string;
    allowedContent?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id?: string,
        name?: string,
        communityId?: string,
        enabledFree?: boolean,
        enabledPublic?: boolean,
        defaultGroup?: boolean,
        isPublic?: boolean,
        createdBy?: string,
        icon?: string,
        groupLogoUrl?: string,
        allowedContent?: string,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.id = id || '';
        this.name = name || '';
        this.communityId = communityId || '';
        this.enabledFree = enabledFree || false;
        this.enabledPublic = enabledPublic || false;
        this.defaultGroup = defaultGroup || false;
        this.isPublic = isPublic || false;
        this.createdBy = createdBy || '';
        this.icon = icon;
        this.groupLogoUrl = groupLogoUrl;
        this.allowedContent = allowedContent;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static parseFromData(data: Record<string, any>): Group {
        return new Group(
            data.id,
            data.name,
            data.communityId,
            data.enabledFree,
            data.enabledPublic,
            data.defaultGroup,
            data.isPublic,
            data.createdBy,
            data.icon,
            data.groupLogoUrl,
            data.allowedContent,
            data.createdAt ? new Date(data.createdAt) : undefined,
            data.updatedAt ? new Date(data.updatedAt) : undefined
        );
    }

    convertToRequest() {
        return {
            "groupId": this.id,
            "groupName": this.name,
            "communityId": this.communityId,
            "enabledFree": this.enabledFree,
            "enabledPublic": this.enabledPublic,
            "defaultGroup": this.defaultGroup,
            "isPublic": this.isPublic,
            "createdBy": this.createdBy,
            "icon": this.icon,
            "groupLogoUrl": this.groupLogoUrl,
            "allowedContent": this.allowedContent,
            "createdAt": this.createdAt?.toISOString(),
            "updatedAt": this.updatedAt?.toISOString(),
        };
    }
}
