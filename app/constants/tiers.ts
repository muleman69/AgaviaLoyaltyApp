export const TIER_THRESHOLDS = {
  SILVER: 0,
  GOLD: 500,
  PLATINUM: 1000
} as const;

export const TIER_BENEFITS = {
  SILVER: {
    pointMultiplier: 1,
    description: 'Basic rewards and exclusive offers'
  },
  GOLD: {
    pointMultiplier: 1.5,
    description: 'Enhanced rewards, priority service, and special events'
  },
  PLATINUM: {
    pointMultiplier: 2,
    description: 'Premium rewards, VIP service, and exclusive tastings'
  }
} as const;

export type TierLevel = keyof typeof TIER_THRESHOLDS;