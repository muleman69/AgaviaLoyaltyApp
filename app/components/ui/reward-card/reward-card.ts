import { Observable } from '@nativescript/core';
import { Reward } from '../../../models/reward.model';

export class RewardCard extends Observable {
    private _reward: Reward;
    private _canRedeem: boolean;

    constructor(reward: Reward, userPoints: number, userStamps: number) {
        super();
        this._reward = reward;
        this.updateRedeemStatus(userPoints, userStamps);
    }

    get reward(): Reward {
        return this._reward;
    }

    get canRedeem(): boolean {
        return this._canRedeem;
    }

    get redeemButtonClass(): string {
        return this._canRedeem ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-500';
    }

    updateRedeemStatus(userPoints: number, userStamps: number): void {
        this._canRedeem = userPoints >= this._reward.requiredPoints && 
                         userStamps >= this._reward.requiredStamps;
        this.notifyPropertyChange('canRedeem', this._canRedeem);
        this.notifyPropertyChange('redeemButtonClass', this.redeemButtonClass);
    }
}