import { Observable, EventData } from '@nativescript/core';
import { Reward } from '../../../models/reward.model';

export class RewardConfirmationViewModel extends Observable {
    private closeCallback: Function;
    reward: Reward;

    constructor(reward: Reward, closeCallback: Function) {
        super();
        this.reward = reward;
        this.closeCallback = closeCallback;
    }

    onConfirm() {
        this.closeCallback({ confirmed: true, reward: this.reward });
    }

    onCancel() {
        this.closeCallback({ confirmed: false });
    }
}