export interface Reward {
  id: string;
  name: string;
  description: string;
  requiredPoints: number;
  requiredStamps: number;
  validUntil?: Date;
  tier: 'SILVER' | 'GOLD' | 'PLATINUM';
  imageUrl?: string;
}

export const MOCK_REWARDS: Reward[] = [
  {
    id: '1',
    name: 'Free Classic Margarita',
    description: 'Enjoy our signature margarita on the house!',
    requiredPoints: 100,
    requiredStamps: 5,
    tier: 'SILVER',
    imageUrl: '~/images/rewards/margarita.png'
  },
  {
    id: '2',
    name: 'Premium Tequila Tasting',
    description: 'Sample three of our finest tequilas',
    requiredPoints: 300,
    requiredStamps: 8,
    tier: 'GOLD',
    imageUrl: '~/images/rewards/tasting.png'
  },
  {
    id: '3',
    name: 'Private Tequila Masterclass',
    description: 'Learn the art of tequila with our master distiller',
    requiredPoints: 1000,
    requiredStamps: 15,
    tier: 'PLATINUM',
    imageUrl: '~/images/rewards/masterclass.png'
  }
];