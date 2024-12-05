import { Observable, View } from '@nativescript/core';
import { LoyaltyService } from '../../services/loyalty.service';
import { MOCK_REWARDS, Reward } from '../../models/reward.model';
import { NavigationService } from '../../services/navigation.service';
import { ModalService } from '../../services/modal.service';
import { AnimationService } from '../../services/animation.service';

export class DashboardViewModel extends Observable {
    private loyaltyService: LoyaltyService;
    private navigationService: NavigationService;
    private modalService: ModalService;
    private animationService: AnimationService;

    constructor() {
        super();
        this.loyaltyService = new LoyaltyService();
        this.navigationService = new NavigationService();
        this.modalService = new ModalService();
        this.animationService = new AnimationService();
        
        // Initialize with mock data
        this.set('points', 250);
        this.set('stamps', 3);
        this.set('tier', 'SILVER');
        this.set('userName', 'John');
        this.updateStampArray();
        this.updateAvailableRewards();
    }

    get userGreeting(): string {
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
        return `${greeting}, ${this.get('userName')}!`;
    }

    get tierStatus(): string {
        const nextTier = this.get('tier') === 'SILVER' ? 'GOLD' : 'PLATINUM';
        const pointsNeeded = this.get('tier') === 'SILVER' ? 500 : 1000;
        return `${this.get('tier')} Member • ${pointsNeeded - this.get('points')} points to ${nextTier}`;
    }

    get stampProgress(): string {
        return `${this.get('stamps')}/5 stamps to next reward`;
    }

    get stampArray(): boolean[] {
        const stamps = this.get('stamps');
        return Array(5).fill(false).map((_, index) => index < stamps);
    }

    async addStamp(stampView: View): Promise<void> {
        const currentStamps = this.get('stamps');
        if (currentStamps < 5) {
            await this.animationService.playStampAnimation(stampView);
            this.set('stamps', currentStamps + 1);
            this.updateStampArray();
            
            if (currentStamps + 1 === 5) {
                await this.modalService.showSuccessAnimation(stampView, {
                    message: '¡Felicidades! 🎉',
                    details: 'You\'ve earned a reward! Check your available rewards to redeem.'
                });
            }
        }
    }

    updateAvailableRewards(): void {
        const points = this.get('points');
        const stamps = this.get('stamps');
        
        const rewards = MOCK_REWARDS.map(reward => ({
            ...reward,
            canRedeem: points >= reward.requiredPoints && stamps >= reward.requiredStamps
        }));
        
        this.set('availableRewards', rewards);
    }

    async onRedeemReward(args: any): Promise<void> {
        const reward = args.object.bindingContext as Reward;
        const view = args.object as View;

        try {
            const result = await this.modalService.showRewardConfirmation(view, reward);
            
            if (result?.confirmed) {
                const success = await this.loyaltyService.redeemReward(reward);
                
                if (success) {
                    this.set('points', this.get('points') - reward.requiredPoints);
                    this.set('stamps', this.get('stamps') - reward.requiredStamps);
                    this.updateStampArray();
                    this.updateAvailableRewards();
                    
                    await this.animationService.playRewardUnlockAnimation(view);
                    await this.modalService.showSuccessAnimation(view, {
                        message: '¡Felicidades! 🎉',
                        details: `You've successfully redeemed ${reward.name}! Show this screen to the bartender to claim your reward.`
                    });
                }
            }
        } catch (error) {
            console.error('Error during reward redemption:', error);
            // TODO: Implement error handling
        }
    }

    onSettings(): void {
        this.navigationService.navigate('views/settings/settings-page');
    }

    private updateStampArray(): void {
        this.notifyPropertyChange('stampArray', this.stampArray);
    }
}