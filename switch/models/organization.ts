import Client from "../client/client";
import { OrganizationApp } from "./organizationapp";
import User from "./user";

export class Organization {
    constructor(
        public id: string,
        public communityIds: string[],
        public profilePic: string,
        public name: string,
        public telegram: string,
        public twitter: string,
        public followers: number,
        public thumbnail: string,
        public email: string,
        public description: string,
        public follower: boolean,
        public createdBy: number,
        public instagram: string,
        public sourceCodeLink: string,
        public website: string,
        public updatedAt: string,
        public createdAt: string
    ) {}

    static parseFromJSON(data: any): Organization {
        return new Organization(
            data.id || "",
            data.communityIds || [],
            data.profilePic || "",
            data.name || "",
            data.telegram || "",
            data.twitter || "",
            data.followers || 0,
            data.thumbnail || "",
            data.email || "",
            data.description || "",
            data.follower || false,
            data.createdBy || 0,
            data.instagram || "",
            data.sourceCodeLink || "",
            data.website || "",
            data.updatedAt || "",
            data.createdAt || ""
        );
    }

    fromJSON(data: any): Organization {
        if (data) {
            this.id = data.id;
            this.twitter = data.twitter;
            this.telegram = data.telegram;
            this.thumbnail = data.coverPic;
            this.sourceCodeLink = data.sourceCodeLink;
            this.communityIds = data.communityIds;
            this.profilePic = data.profilePic;
            this.createdAt = data.createdAt;
            this.updatedAt = data.updatedAt;
            this.description = data.description;
            this.name = data.name;
            this.website = data.websiteLink;
            this.createdBy = parseInt(data.createdBy, 10) || 0;
            this.followers = data.followers;
            this.email = data.email;
            this.follower = data.follower;
            this.instagram = data.instagram;
        }
        return this;
    }

    toJSON(): any {
        return {
            communityIds: this.communityIds,
            coverPic: this.thumbnail,
            createdAt: this.createdAt,
            createdBy: this.createdBy,
            description: this.description,
            email: this.email,
            follower: this.follower,
            followers: this.followers,
            id: this.id,
            instagram: this.instagram,
            name: this.name,
            profilePic: this.profilePic,
            sourceCodeLink: this.sourceCodeLink,
            telegram: this.telegram,
            twitter: this.twitter,
            updatedAt: this.updatedAt,
            websiteLink: this.website,
        };
    }
}
