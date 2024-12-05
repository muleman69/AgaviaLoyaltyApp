import { Observable } from '@nativescript/core';

export interface ActivityItem {
    type: 'REWARD' | 'TIER' | 'VISIT';
    description: string;
    timestamp: string;
    amount?: string;
}

export class ActivityList extends Observable {
    private items: ActivityItem[];

    constructor(items: ActivityItem[]) {
        super();
        this.items = items;
    }

    getActivityIcon(type: ActivityItem['type']): string {
        const icons = {
            REWARD: '🎁',
            TIER: '⭐',
            VISIT: '👤'
        };
        return icons[type] || '📝';
    }

    get activities(): ActivityItem[] {
        return this.items;
    }
}