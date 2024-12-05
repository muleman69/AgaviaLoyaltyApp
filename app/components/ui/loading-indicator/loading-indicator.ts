import { Observable } from '@nativescript/core';

export class LoadingIndicator extends Observable {
    private _isLoading: boolean = false;
    private _message: string = '';

    constructor(message: string = 'Loading...') {
        super();
        this._message = message;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get message(): string {
        return this._message;
    }

    show(message?: string): void {
        this._isLoading = true;
        if (message) {
            this._message = message;
        }
        this.notifyPropertyChange('isLoading', true);
        this.notifyPropertyChange('message', this._message);
    }

    hide(): void {
        this._isLoading = false;
        this.notifyPropertyChange('isLoading', false);
    }
}