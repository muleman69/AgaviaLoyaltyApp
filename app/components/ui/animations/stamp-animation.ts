import { View, Animation, AnimationDefinition } from '@nativescript/core';

export class StampAnimation {
    static async play(targetView: View): Promise<void> {
        const definitions: AnimationDefinition[] = [
            {
                scale: { x: 1.2, y: 1.2 },
                duration: 200,
                curve: 'easeIn'
            },
            {
                scale: { x: 1, y: 1 },
                duration: 100,
                curve: 'easeOut'
            }
        ];

        const animation = new Animation(definitions, false);
        await animation.play(targetView);
    }
}