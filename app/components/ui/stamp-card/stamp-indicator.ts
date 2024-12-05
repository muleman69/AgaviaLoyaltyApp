import { Observable } from '@nativescript/core';

export class StampIndicator extends Observable {
    private _isStamped: boolean;
    private _index: number;

    constructor(index: number, isStamped: boolean = false) {
        super();
        this._index = index;
        this._isStamped = isStamped;
    }

    get isStamped(): boolean {
        return this._isStamped;
    }

    get index(): number {
        return this._index;
    }

    get displayText(): string {
        return this._isStamped ? '✓' : '○';
    }

    get styleClass(): string {
        return this._isStamped ? 'text-amber-600' : 'text-gray-300';
    }

    stamp(): void {
        this._isStamped = true;
        this.notifyPropertyChange('isStamped', true);
        this.notifyPropertyChange('displayText', this.displayText);
        this.notifyPropertyChange('styleClass', this.styleClass);
    }

    reset(): void {
        this._isStamped = false;
        this.notifyPropertyChange('isStamped', false);
        this.notifyPropertyChange('displayText', this.displayText);
        this.notifyPropertyChange('styleClass', this.styleClass);
    }
}