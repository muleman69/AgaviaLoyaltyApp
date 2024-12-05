import { View, Animation, AnimationDefinition } from '@nativescript/core';

export class RewardAnimation {
    static async play(targetView: View): Promise<void> {
        const definitions: AnimationDefinition[] = [
            {
                opacity: 0,
                scale: { x: 0.5, y: 0.5 },
                duration: 0
            },
            {
                opacity: 1,
                scale: { x: 1.1, y: 1.1 },
                duration: 200,
                curve: 'easeOut'
            },
            {
                scale: { x: 1, y: 1 },
                duration: 100,
                curve: 'easeIn'
            }
        ];

        const animation = new Animation(definitions, false);
        await animation.play(targetView);
    }
}