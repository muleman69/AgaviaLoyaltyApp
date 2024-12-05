import { AnimationService } from '../services/animation.service';

export function useAnimation() {
  const animationService = new AnimationService();

  return {
    async playStampCollected(view: any) {
      await animationService.playStampAnimation(view);
    },
    
    async playRewardUnlocked(view: any) {
      await animationService.playRewardUnlockAnimation(view);
    },
    
    async playSuccess(view: any) {
      await animationService.playSuccessAnimation(view);
    }
  };
}