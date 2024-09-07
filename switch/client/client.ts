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

import Message from "../models/message";
import { BotCommand, BotInfo } from "../models/bot";
import Channel from "../models/channel";
import Group from "../models/group";
import { Community } from "../models/community";
import { Command } from "../models/command";
import { Media } from "../models/media";

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
        return await ChannelMethods.deleteChannel(this, channelId);
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
        return await GroupMethods.deleteGroup(this, groupId);
    }

    public async createGroup(group: Group) {
        return await GroupMethods.createGroup(this, group);
    }

    public async updateGroup(group: Group) {
        return await GroupMethods.updateGroup(this, group);
    }

    // Game methods
    public async createLeaderboard(params: GameMethods.CreateLeaderboardParams) {
        return await GameMethods.createLeaderboard(this, params);
    }

    public async updateLeaderboard(params: GameMethods.UpdateLeaderboardParams) {
        return await GameMethods.updateLeaderboard(this, params);
    }

    public async getGlobalLeaderboard(botId?: number) {
        return await GameMethods.getGlobalLeaderboard(this, botId);
    }

    public async getCommunityLeaderboard(communityId: string, botId?: number) {
        return await GameMethods.getCommunityLeaderboard(this, communityId, botId);
    }

    public async getGameScore(params: GameMethods.GetGameScoreParams) {
        return await GameMethods.getGameScore(this, params);
    }

    // Sticker methods
    public async getStickerSet(params: StickerMethods.GetStickerSetParams) {
        return await StickerMethods.getStickerSet(this, params);
    }

    public async createStickerSet(params: StickerMethods.CreateStickerSetParams) {
        return await StickerMethods.createStickerSet(this, params);
    }

    public async addStickerToSet(params: StickerMethods.AddStickerToSetParams) {
        return await StickerMethods.addStickerToSet(this, params);
    }

    public async setStickerPositionInSet(params: StickerMethods.SetStickerPositionInSetParams) {
        return await StickerMethods.setStickerPositionInSet(this, params);
    }

    public async deleteStickerFromSet(params: StickerMethods.DeleteStickerFromSetParams) {
        return await StickerMethods.deleteStickerFromSet(this, params);
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
                            console.log(message.commandParams);
                            await handler.fn(message);
                        }
                    }
                });
            }
        }
    }
}
