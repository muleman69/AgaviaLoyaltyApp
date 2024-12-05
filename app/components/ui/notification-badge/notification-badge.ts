import { Observable } from '@nativescript/core';

export class NotificationBadge extends Observable {
    private _count: number = 0;

    constructor(initialCount: number = 0) {
        super();
        this._count = initialCount;
    }

    get count(): number {
        return this._count;
    }

    get visible(): boolean {
        return this._count > 0;
    }

    get displayText(): string {
        return this._count > 99 ? '99+' : String(this._count);
    }

    get badgeClass(): string {
        return `bg-red-500 text-white text-xs rounded-full px-2 py-1 ${this.visible ? '' : 'hidden'}`;
    }

    increment(): void {
        this._count++;
        this.notifyPropertyChange('count', this._count);
        this.notifyPropertyChange('visible', this.visible);
        this.notifyPropertyChange('displayText', this.displayText);
        this.notifyPropertyChange('badgeClass', this.badgeClass);
    }

    reset(): void {
        this._count = 0;
        this.notifyPropertyChange('count', this._count);
        this.notifyPropertyChange('visible', this.visible);
        this.notifyPropertyChange('displayText', this.displayText);
        this.notifyPropertyChange('badgeClass', this.badgeClass);
    }
}