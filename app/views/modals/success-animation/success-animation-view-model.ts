import { Observable } from '@nativescript/core';

export class SuccessAnimationViewModel extends Observable {
    private closeCallback: Function;
    message: string;
    details: string;

    constructor(params: { message: string; details: string }, closeCallback: Function) {
        super();
        this.message = params.message;
        this.details = params.details;
        this.closeCallback = closeCallback;
    }

    onClose() {
        this.closeCallback();
    }
}