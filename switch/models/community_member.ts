import { Timestamp } from "./timestamp";
import User from "./user";
import { MemberRoleInfo } from "../models/role";

export interface CommunityMember {
  admin: boolean;
  communityId: string;
  createdAt: Timestamp;
  enableNotificationOnMentionAndPin: boolean;
  id: number;
  muteChannels: string[];
  muteGroups: string[];
  muteNotification: boolean;
  mutePeriod?: "HOUR_1" | "HOUR_12" | "DAY" | "WEEK" | "MONTH_1" | "MONTH_6" | "YEAR" | "FOREVER";
  muteTillDate?: Timestamp;
  referralCount: number;
  roleInfo?: MemberRoleInfo;
  updatedAt: Timestamp;
  userId: string;
  userInfo?: User;
  userName: string;
  xp: number;
  xpSpend: number;
}
