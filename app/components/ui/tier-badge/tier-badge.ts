import { Observable } from '@nativescript/core';
import { TierLevel } from '../../../constants/tiers';

export class TierBadge extends Observable {
    private _tier: TierLevel;
    private _progress: number;

    constructor(tier: TierLevel, progress: number) {
        super();
        this._tier = tier;
        this._progress = progress;
    }

    get tier(): TierLevel {
        return this._tier;
    }

    get progress(): number {
        return this._progress;
    }

    get badgeClass(): string {
        const colors = {
            SILVER: 'bg-gray-200',
            GOLD: 'bg-amber-400',
            PLATINUM: 'bg-slate-300'
        };
        return `${colors[this._tier]} rounded-full px-3 py-1`;
    }

    get icon(): string {
        const icons = {
            SILVER: '🥈',
            GOLD: '🥇',
            PLATINUM: '💎'
        };
        return icons[this._tier];
    }
}