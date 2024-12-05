import { Observable } from '@nativescript/core';
import type { User, Reward } from '../models/user.model';

export class LoyaltyService extends Observable {
  private currentUser: User | null = null;

  async addStamp(): Promise<void> {
    if (!this.currentUser) return;
    
    this.currentUser.stamps++;
    // TODO: Implement server sync
    this.notifyPropertyChange('currentUser', this.currentUser);
  }

  async redeemReward(reward: Reward): Promise<boolean> {
    if (!this.currentUser) return false;

    if (this.currentUser.points >= reward.requiredPoints && 
        this.currentUser.stamps >= reward.requiredStamps) {
      this.currentUser.points -= reward.requiredPoints;
      this.currentUser.stamps -= reward.requiredStamps;
      // TODO: Implement server sync
      this.notifyPropertyChange('currentUser', this.currentUser);
      return true;
    }
    return false;
  }

  calculateTier(points: number): 'SILVER' | 'GOLD' | 'PLATINUM' {
    if (points >= 1000) return 'PLATINUM';
    if (points >= 500) return 'GOLD';
    return 'SILVER';
  }
}