import { View, ShowModalOptions } from '@nativescript/core';

export class ModalService {
    async showModal(parent: View, options: ShowModalOptions): Promise<any> {
        return await parent.showModal(options);
    }

    async showRewardConfirmation(parent: View, reward: any): Promise<any> {
        return await parent.showModal('views/modals/reward-confirmation/reward-confirmation-page', {
            context: reward,
            fullscreen: true,
            animated: true
        });
    }

    async showSuccessAnimation(parent: View, params: { message: string; details: string }): Promise<void> {
        await parent.showModal('views/modals/success-animation/success-animation-page', {
            context: params,
            fullscreen: true,
            animated: true
        });
    }
}