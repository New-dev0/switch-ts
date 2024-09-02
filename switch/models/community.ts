export class Community {
    id?: string;
    name?: string;
    username?: string;
    coverUrl?: string;
    profileUrl?: string;
    description?: string;
    category?: string;
    isPublic?: boolean;
    isFree?: boolean;
    link?: string;
    icon?: string;
    verified?: boolean;
    visible?: boolean;

    static parseFromData(data: any): Community {
        const response = new Community();
        response.id = data['communityId'];
        response.name = data['communityName'];
        response.username = data['communityUsername'];
        response.coverUrl = data['communityCoverUrl'];
        response.profileUrl = data['communityProfileUrl'];
        response.description = data['communityDescription'];
        response.category = data['communityCategory'];
        response.isPublic = data['isPublic'];
        response.isFree = data['isFree'];
        response.link = data['link'];
        response.icon = data['icon'];
        response.verified = data['verified'];
        response.visible = data['visible'];
        return response;
    }

    public convertToRequest() {
        return {
            "communityId": this.id,
            "communityName": this.name,
            "communityUsername": this.username,
            "communityCoverUrl": this.coverUrl,
            "communityProfileUrl": this.profileUrl,
            "communityDescription": this.description,
            "communityCategory": this.category,
            "isPublic": this.isPublic,
            "isFree": this.isFree,
            "link": this.link,
            "icon": this.icon,
            "verified": this.verified,
            "visible": this.visible
        };
    }
}
