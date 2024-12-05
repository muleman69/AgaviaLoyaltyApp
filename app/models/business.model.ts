export interface BusinessMetrics {
  totalCustomers: number;
  activeUsers: number;
  rewardsRedeemed: number;
  averageSpendPerVisit: number;
  customerRetentionRate: number;
}

export interface BusinessSettings {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  rewardProgram: {
    stampsRequired: number;
    pointsPerPurchase: number;
    tierThresholds: {
      SILVER: number;
      GOLD: number;
      PLATINUM: number;
    };
  };
}

export interface BusinessAnalytics {
  dailyVisits: number[];
  rewardRedemptions: number[];
  customerGrowth: number[];
  revenue: number[];
  timestamps: string[];
}