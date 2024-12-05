import { Observable, View } from '@nativescript/core';
import { StampIndicator } from './stamp-indicator';
import { StampAnimation } from '../animations/stamp-animation';

export class StampCard extends Observable {
    private _indicators: StampIndicator[];
    private _maxStamps: number = 5;

    constructor() {
        super();
        this._indicators = Array(this._maxStamps)
            .fill(null)
            .map((_, index) => new StampIndicator(index));
    }

    get indicators(): StampIndicator[] {
        return this._indicators;
    }

    get stampCount(): number {
        return this._indicators.filter(indicator => indicator.isStamped).length;
    }

    get progress(): string {
        return `${this.stampCount}/${this._maxStamps} stamps to next reward`;
    }

    async addStamp(stampView: View): Promise<boolean> {
        if (this.stampCount >= this._maxStamps) return false;

        const nextIndex = this.stampCount;
        await StampAnimation.play(stampView);
        this._indicators[nextIndex].stamp();
        
        this.notifyPropertyChange('stampCount', this.stampCount);
        this.notifyPropertyChange('progress', this.progress);
        
        return this.stampCount === this._maxStamps;
    }

    reset(): void {
        this._indicators.forEach(indicator => indicator.reset());
        this.notifyPropertyChange('stampCount', 0);
        this.notifyPropertyChange('progress', this.progress);
    }
}