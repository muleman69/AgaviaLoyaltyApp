export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  tier: 'SILVER' | 'GOLD' | 'PLATINUM';
  points: number;
  stamps: number;
  preferences: {
    favoriteSpirits: string[];
    preferredLanguage: 'en' | 'es';
  };
  joinDate: Date;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  requiredPoints: number;
  requiredStamps: number;
  validUntil?: Date;
  tier: 'SILVER' | 'GOLD' | 'PLATINUM';
}