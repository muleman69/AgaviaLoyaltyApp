import { Reward } from '../models/reward.model';
import { TierLevel } from '../constants/tiers';

export function calculatePointsToNextTier(currentPoints: number, currentTier: TierLevel): number {
  const TIER_THRESHOLDS = {
    SILVER: 0,
    GOLD: 500,
    PLATINUM: 1000
  };

  if (currentTier === 'PLATINUM') return 0;
  
  const nextTier = currentTier === 'SILVER' ? 'GOLD' : 'PLATINUM';
  return TIER_THRESHOLDS[nextTier] - currentPoints;
}

export function canRedeemReward(reward: Reward, userPoints: number, userStamps: number): boolean {
  return userPoints >= reward.requiredPoints && userStamps >= reward.requiredStamps;
}