import { AuthUser } from "../models/user";
import { HandlerType, switchBaseClient } from "./baseClient";
import { Endpoints } from "./endpoints";
import User from "../models/user";
import * as messageMethods from "../methods/message";
import * as BotMethods from "../methods/bot";
import * as CommunityMethods from "../methods/community";
import * as ChannelMethods from "../methods/channel";
import * as GroupMethods from "../methods/group";
import * as GameMethods from "../methods/game";
import * as StickerMethods from "../methods/stickers";
import * as MediaMethods from "../methods/media";
import * as CallbackMethods from "../methods/callbacks";
import * as OrganizationMethods from "../methods/organization";
import * as SearchMethods from "../methods/search";
import * as InstantMessagingMethods from "../methods/instant_messaging";
import * as RestrictMethods from "../methods/restrict";
import * as ModerationMethods from "../methods/moderation";
import * as GuidelineMethods from "../methods/guidelines";

import Message from "../models/message";
import { BotCommand, BotInfo } from "../models/bot";
import Channel from "../models/channel";
import Group from "../models/group";
import { Community } from "../models/community";
import { Command } from "../models/command";
import { Media } from "../models/media";
import { GameInfo } from "../models/game";
import { Sticker } from "../models/sticker";

export default class Client extends switchBaseClient {
    private receiveUpdates: boolean;

    constructor(token: string, receiveUpdates: boolean = true) {
        super(token);
        this.receiveUpdates = receiveUpdates;
    }

    public async start() {
        if (this.receiveUpdates) await this.connect();
    }

    public async getMe(): Promise<User> {
        const user: AuthUser = await this.request(
            `${Endpoints.USER_SERVICE_URL}/api/user`,
        );
        return user;
    }

    public async sendMessage(params: messageMethods.sendMessageParams) {
        return await messageMethods.sendMessage(this, params);
    }

    public async editMessage(
        messageId: number,
        params: messageMethods.editMessageParams,
    ) {
        return await messageMethods.editMessage(this, messageId, params);
    }

    public async forwardMessage(params: messageMethods.ForwardMessageParams) {
        return await messageMethods.forwardMessage(this, params);
    }

    public async getMessage(messageId: number) {
        return await messageMethods.getMessage(this, messageId);
    }

    public async getBotInfo(botId: number) {
        return await BotMethods.getBotInfo(this, { botId });
    }

    public async setBotCommands(commands: Array<BotCommand>) {
        this._user = await this.getMe();
        const botinfo: BotInfo = { id: this._user.id, commands };
        return await BotMethods.updateBotInfo(this, botinfo);
    }

    public async getCommunityByID(communityId: string) {
        return await CommunityMethods.getCommunityById(this, communityId);
    }

    public async getCommunityByUsername(communityId: string) {
        return await CommunityMethods.getCommunityByUsername(this, communityId);
    }

    public async updateCommunity(community: Community) {
        return await CommunityMethods.updateCommunity(this, community);
    }

    public async isCommunityMember(communityId: string, userId: number) {
        return await CommunityMethods.isCommunityMember(
            this,
            communityId,
            userId,
        );
    }

    public async createChannel(channel: Channel) {
        return await ChannelMethods.createChannel(this, channel);
    }

    public async updateChannel(channel: Channel) {
        return await ChannelMethods.updateChannel(this, channel);
    }

    public async deleteChannel(channelId: string) {
        return await ChannelMethods.deleteChannel(this, {channelId});
    }

    public async getAllChannel(communityId: string) {
        return await ChannelMethods.getAllChannels(this, communityId);
    }

    public async getAllGroups(communityId: string) {
        return await GroupMethods.getAllGroups(this, communityId);
    }

    public async getGroupByID(groupId: string) {
        return await GroupMethods.getGroupByID(this, groupId);
    }

    public async deleteGroup(groupId: string) {
        return await GroupMethods.deleteGroup(this, {groupId});
    }

    public async createGroup(group: Group) {
        return await GroupMethods.createGroup(this, group);
    }

    public async updateGroup(group: Group) {
        return await GroupMethods.updateGroup(this, group);
    }

    // Game methods
    public async createLeaderboard(params: GameMethods.CreateLeaderboardParams): Promise<GameInfo> {
        return await GameMethods.createLeaderboard(this, params);
    }

    public async updateLeaderboard(params: GameMethods.UpdateLeaderboardParams): Promise<GameInfo> {
        return await GameMethods.updateLeaderboard(this, params);
    }

    public async getGlobalLeaderboard(botId?: number): Promise<GameInfo[]> {
        return await GameMethods.getGlobalLeaderboard(this, botId);
    }

    public async getCommunityLeaderboard(communityId: string, botId?: number): Promise<GameInfo[]> {
        return await GameMethods.getCommunityLeaderboard(this, communityId, botId);
    }

    public async getGameScore(params: GameMethods.GetGameScoreParams): Promise<GameInfo> {
        return await GameMethods.getGameScore(this, params);
    }

    // Sticker methods
    public async getStickersFromPack(params: StickerMethods.GetStickerPackParams): Promise<Sticker[]> {
        return await StickerMethods.getStickersFromPack(this, params);
    }

    public async createSticker(sticker: Sticker): Promise<Sticker> {
        return await StickerMethods.createSticker(this, sticker);
    }

    public async removeSticker(stickerId: string): Promise<void> {
        return await StickerMethods.removeSticker(this, stickerId);
    }

    public async getStickerPacks(): Promise<any[]> {
        return await StickerMethods.getStickerPacks(this);
    }

    public async createStickerPack(params: StickerMethods.CreateStickerPackParams): Promise<any> {
        return await StickerMethods.createStickerPack(this, params);
    }

    public async deleteStickerPack(packId: string): Promise<void> {
        return await StickerMethods.deleteStickerPack(this, packId);
    }

    public async installStickerPack(params: StickerMethods.InstallStickerParams): Promise<void> {
        return await StickerMethods.installStickerPack(this, params);
    }

    public async getInstalledStickerPacks(): Promise<any[]> {
        return await StickerMethods.getInstalledStickerPacks(this);
    }

    public async searchStickerPacks(query: string): Promise<any[]> {
        return await StickerMethods.searchStickerPacks(this, query);
    }

    public async sortStickersInPack(params: StickerMethods.SortStickersParams): Promise<void> {
        return await StickerMethods.sortStickersInPack(this, params);
    }

    public async uninstallStickerPack(params: StickerMethods.InstallStickerParams): Promise<void> {
        return await StickerMethods.uninstallStickerPack(this, params);
    }

    // Media methods
    public async getMediaByID(params: MediaMethods.GetMediaParams) {
        return await MediaMethods.getMediaByID(this, params);
    }

    public async updateMedia(params: MediaMethods.UpdateMediaParams) {
        return await MediaMethods.updateMedia(this, params);
    }

    public async deleteMedia(params: MediaMethods.DeleteMediaParams) {
        return await MediaMethods.deleteMedia(this, params);
    }

    public async uploadMedia(file: File) {
        return await MediaMethods.uploadMedia(this, file);
    }

    // Add this new method
    public async answerCallbackQuery(params: CallbackMethods.AnswerCallbackParams): Promise<boolean> {
        return await CallbackMethods.answerCallbackQuery(this, params);
    }

    // Organization methods
    public async getOrganizations(params: OrganizationMethods.GetOrganizationsParams) {
        return await OrganizationMethods.getOrganizations(this, params);
    }

    public async getOrganizationById(id: string) {
        return await OrganizationMethods.getOrganizationById(this, id);
    }

    public async getOrganizationApps(id: string) {
        return await OrganizationMethods.getOrganizationApps(this, id);
    }

    public async getOrganizationFollowers(id: string) {
        return await OrganizationMethods.getOrganizationFollowers(this, id);
    }

    public async pinMessage(params: messageMethods.PinMessageParams) {
        return await messageMethods.pinMessage(this, params);
    }

    public async getMessageReactions(params: messageMethods.GetReactionsParams) {
        return await messageMethods.getMessageReactions(this, params);
    }

    public async addReaction(reaction: messageMethods.EmojiReaction) {
        return await messageMethods.addReaction(this, reaction);
    }

    public async removeReaction(reaction: messageMethods.EmojiReaction) {
        return await messageMethods.removeReaction(this, reaction);
    }

    public async getOrganizationMembers(orgId: string) {
        return await OrganizationMethods.getOrganizationMembers(this, orgId);
    }

    public async searchInCommunity(params: SearchMethods.SearchParams) {
        return await SearchMethods.searchInCommunity(this, params);
    }


    public async deleteCommunity(params: CommunityMethods.DeleteCommunityParams) {
        return await CommunityMethods.deleteCommunity(this, params);
    }

    public async getBotsInstantMessagingConfig(params: InstantMessagingMethods.GetInstantMessagingParams) {
        return await InstantMessagingMethods.getBotsInstantMessagingConfig(this, params);
    }

    public async enableInstantBotMessaging(params: InstantMessagingMethods.EnableInstantMessagingParams) {
        return await InstantMessagingMethods.enableInstantBotMessaging(this, params);
    }

    public async disableInstantBotMessaging(params: InstantMessagingMethods.EnableInstantMessagingParams) {
        return await InstantMessagingMethods.disableInstantBotMessaging(this, params);
    }

    public async getCommunityMembers(params: CommunityMethods.GetCommunityMembersParams) {
        return await CommunityMethods.getCommunityMembers(this, params);
    }

    public async restrictUser(request: RestrictMethods.RestrictUserRequest) {
        return await RestrictMethods.restrictUser(this, request);
    }

    public async updateRestrictedUser(request: RestrictMethods.RestrictUserRequest) {
        return await RestrictMethods.updateRestrictedUser(this, request);
    }

    public async getRestrictedUser(communityId: string, userId: number) {
        return await RestrictMethods.getRestrictedUser(this, communityId, userId);
    }

    public async getRestrictedUsers(communityId: string) {
        return await RestrictMethods.getRestrictedUsers(this, communityId);
    }

    public async banUser(request: ModerationMethods.BanUserRequest) {
        return await ModerationMethods.banUser(this, request);
    }

    public async unbanUser(request: ModerationMethods.UnbanRequestAction) {
        return await ModerationMethods.unbanUser(this, request);
    }

    public async getBannedUsers(communityId: string) {
        return await ModerationMethods.getBannedUsers(this, communityId);
    }

    public async createRole(communityId: string, role: ModerationMethods.Role) {
        return await ModerationMethods.createRole(this, communityId, role);
    }

    public async getRoles(communityId: string) {
        return await ModerationMethods.getRoles(this, communityId);
    }

    public async deleteRole(roleId: number) {
        return await ModerationMethods.deleteRole(this, roleId);
    }

    public async addMemberToRole(roleMember: ModerationMethods.RoleMember) {
        return await ModerationMethods.addMemberToRole(this, roleMember);
    }

    public async getRoleMembers(roleId: number) {
        return await ModerationMethods.getRoleMembers(this, roleId);
    }

    public async removeMemberFromRole(roleId: number, memberId: number) {
        return await ModerationMethods.removeMemberFromRole(this, roleId, memberId);
    }

    public async createGuideline(guideline: GuidelineMethods.CommunityGuideline) {
        return await GuidelineMethods.createGuideline(this, guideline);
    }

    public async updateGuideline(guideline: GuidelineMethods.CommunityGuideline) {
        return await GuidelineMethods.updateGuideline(this, guideline);
    }

    public async getGuideline(guidelineId: number) {
        return await GuidelineMethods.getGuideline(this, guidelineId);
    }

    public async getGuidelinesForCommunity(communityId: string) {
        return await GuidelineMethods.getGuidelinesForCommunity(this, communityId);
    }

    public async deleteGuideline(guidelineId: number) {
        return await GuidelineMethods.deleteGuideline(this, guidelineId);
    }

    public async createPredefinedGuideline(guideline: GuidelineMethods.CommunityDefaultGuideline) {
        return await GuidelineMethods.createPredefinedGuideline(this, guideline);
    }

    public async updatePredefinedGuideline(guideline: GuidelineMethods.CommunityDefaultGuideline) {
        return await GuidelineMethods.updatePredefinedGuideline(this, guideline);
    }

    public async getPredefinedGuideline(guidelineId: number) {
        return await GuidelineMethods.getPredefinedGuideline(this, guidelineId);
    }

    public async getAllPredefinedGuidelines() {
        return await GuidelineMethods.getAllPredefinedGuidelines(this);
    }

    public async sendMedia(params: messageMethods.SendMediaParams) {
        return await messageMethods.sendMedia(this, params);
    }

    public async deleteMessage(messageId: number) {
        return await this.request(
            `${Endpoints.CHAT_SERVICE_URL}/v1/message/${messageId}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    parseChatEvents(data: any) {
        {
            if (this._handlers) {
                this._handlers.forEach(async (handler) => {
                    if (
                        data["type"] === "MESSAGE" &&
                        handler.type === HandlerType.MESSAGE
                    ) {
                        const message: Message = Message.parseMessageFromJson(
                            data,
                            this,
                        );
                        await handler.fn(message);
                    } else if (
                        data["type"] === "COMMAND" &&
                        handler.type === HandlerType.COMMAND
                    ) {
                        if (
                            handler.params.command ===
                                data["details"]["command"]
                        ) {
                            const message: Command = Command
                                .parseFromData(data, this);
                            await handler.fn(message);
                        }
                    }
                });
            }
        }
    }

    public async isUserAdmin(communityId: string, userId?: string) {
        return await CommunityMethods.isUserAdmin(this, communityId, userId);
    }

    public async getAvailableCommands(params: {
        botId: number;
        communityId: string;
    }) {
        return await CommunityMethods.getAvailableCommands(this, params);
    }

    public async getBotCommunityMembers(communityId: string) {
        return await CommunityMethods.getBotCommunityMembers(this, communityId);
    }

    public async setBotIntroMessage(params: BotMethods.SetBotIntroMessageParams) {
        return await BotMethods.setBotIntroMessage(this, params);
    }
}
