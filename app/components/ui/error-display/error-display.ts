import { Observable } from '@nativescript/core';

export class ErrorDisplay extends Observable {
    private _error: string | null = null;
    private _visible: boolean = false;

    get error(): string | null {
        return this._error;
    }

    get visible(): boolean {
        return this._visible;
    }

    show(error: string): void {
        this._error = error;
        this._visible = true;
        this.notifyPropertyChange('error', this._error);
        this.notifyPropertyChange('visible', this._visible);
    }

    hide(): void {
        this._error = null;
        this._visible = false;
        this.notifyPropertyChange('error', this._error);
        this.notifyPropertyChange('visible', this._visible);
    }
}