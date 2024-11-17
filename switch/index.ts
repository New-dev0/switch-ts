import Client from "./client/client";
import { HandlerType, switchBaseClient } from "./client/baseClient";
import { WsClient } from "./client/WsClient";
import { Endpoints } from "./client/endpoints";

import Message from "./models/message";
import User, { AuthUser, UserStatus, UserStatusInfo } from "./models/user";
import Channel from "./models/channel";
import Group from "./models/group";
import { Community } from "./models/community";
import { Command } from "./models/command";
import { Media, UploadMediaResponse } from "./models/media";
import { GameInfo } from "./models/game";
import { Sticker } from "./models/sticker";
import CallbackQuery from "./models/callbackquery";
import { CommunityMember } from "./models/community_member";
import { MemberRoleInfo, Role, RolePermissions } from "./models/role";
import { Timestamp } from "./models/timestamp";
import { Button } from "./models/inline_markup";
import InlineMarkup from "./models/inline_markup";
import { BotCommand, BotInfo } from "./models/bot";
import { Organization } from "./models/organization";
import { OrganizationApp } from "./models/organizationapp";

export * from "./methods/message";
export * from "./methods/bot";
export * from "./methods/community";
export * from "./methods/channel";
export * from "./methods/group";
export * from "./methods/game";
export * from "./methods/stickers";
export * from "./methods/media";
export * from "./methods/callbacks";
export * from "./methods/organization";
export * from "./methods/search";
export * from "./methods/instant_messaging";
export * from "./methods/restrict";
export * from "./methods/moderation";
export * from "./methods/guidelines";

export {
    Client,
    HandlerType,
    switchBaseClient,
    WsClient,
    Endpoints
};

export {
    Message,
    User,
    AuthUser,
    UserStatus,
    UserStatusInfo,
    Channel,
    Group,
    Community,
    Command,
    Media,
    UploadMediaResponse,
    GameInfo,
    Sticker,
    CallbackQuery,
    CommunityMember,
    MemberRoleInfo,
    Role,
    RolePermissions,
    Timestamp,
    Button,
    InlineMarkup,
    BotCommand,
    BotInfo,
    Organization,
    OrganizationApp
};

export default Client;