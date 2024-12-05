import { User } from './user.model';

export interface UserSettings {
  notifications: {
    promotions: boolean;
    rewards: boolean;
    events: boolean;
  };
  language: 'en' | 'es';
  theme: 'light' | 'dark';
}

export interface TierHistoryEntry {
  tier: 'SILVER' | 'GOLD' | 'PLATINUM';
  achievedDate: Date;
}

export interface RewardHistory {
  rewardId: string;
  rewardName: string;
  redeemedDate: Date;
  points: number;
  stamps: number;
}