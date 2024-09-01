
export enum UserStatusInfo {
    OFFLINE, ONLINE
};

export interface UserStatus {
    status: UserStatusInfo
};

export interface User {
    id: number;
    name?: string;
    username?: string;
    link?: string;
    profileImage?: string;
    botPrivacy?: string;
    isGame?: boolean;
    isApp?: boolean;
    isBot?: boolean;
    creationDate?: string;
    bio?: string;
    active?: boolean
    deleted?: boolean
}

export interface AuthUser extends User {
    email: string;
}

export function parseSender(data: any): User {
    const keyValueMap: { [key: string]: keyof User } = {
        "user_name": "username",
        "bot_privacy": "botPrivacy",
        "imageurl": "profileImage",
        "imageUrl": "profileImage",
        "creation_date": "creationDate",
        "is_bot": "isBot",
        "bot": "isBot",
        "is_app": "isApp",
        "is_game": "isGame",
    };

    let transformedData = {};
    Object.entries(keyValueMap).forEach(([oldKey, newKey]) => {
        if (data[oldKey] !== undefined) {
            transformedData[newKey] = data[oldKey];
        }
    });
    const allowedKeys: Array<keyof User> = [
        "id",
        "name",
        "username",
        "active",
        "deleted",
        "link",
        "profileImage",
        "botPrivacy",
        "isGame",
        "isApp",
        "isBot",
        "creationDate",
        "bio",
    ];

    allowedKeys.forEach((key) => {
        if (data[key] !== undefined) {
            transformedData[key] = data[key];
        }
    });
    return transformedData as User;
}
