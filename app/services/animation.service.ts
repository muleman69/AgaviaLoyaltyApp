import { View } from '@nativescript/core';
import { StampAnimation } from '../components/ui/animations/stamp-animation';
import { RewardAnimation } from '../components/ui/animations/reward-animation';
import { LottieView } from '@nativescript-community/lottie';

export class AnimationService {
    async playStampAnimation(targetView: View): Promise<void> {
        return StampAnimation.play(targetView);
    }

    async playRewardUnlockAnimation(targetView: View): Promise<void> {
        return RewardAnimation.play(targetView);
    }

    async playSuccessAnimation(lottieView: LottieView): Promise<void> {
        lottieView.loop = false;
        lottieView.src = '~/animations/success.json';
        lottieView.playAnimation();

        return new Promise((resolve) => {
            lottieView.on('completed', () => {
                resolve();
            });
        });
    }
}