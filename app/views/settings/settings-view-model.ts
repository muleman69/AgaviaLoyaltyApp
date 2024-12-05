import { Observable } from '@nativescript/core';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';
import type { User } from '../../models/user.model';
import type { UserSettings, TierHistoryEntry, RewardHistory } from '../../models/settings.model';

export class SettingsViewModel extends Observable {
    private navigationService: NavigationService;
    private authService: AuthService;
    private settingsService: SettingsService;

    user: User;
    settings: UserSettings;
    tierHistory: TierHistoryEntry[];
    rewardHistory: RewardHistory[];
    languages: string[] = ['English', 'Español'];

    constructor() {
        super();
        this.navigationService = new NavigationService();
        this.authService = new AuthService();
        this.settingsService = new SettingsService();

        this.loadUserData();
    }

    get selectedLanguageIndex(): number {
        return this.settings?.language === 'es' ? 1 : 0;
    }

    set selectedLanguageIndex(index: number) {
        this.settings.language = index === 1 ? 'es' : 'en';
        this.notifyPropertyChange('selectedLanguageIndex', index);
    }

    async loadUserData() {
        try {
            // Load user profile
            const userData = await this.settingsService.getUserProfile();
            this.set('user', userData);

            // Load settings
            const userSettings = await this.settingsService.getSettings();
            this.set('settings', userSettings);

            // Load histories
            const tierHistory = await this.settingsService.getTierHistory();
            this.set('tierHistory', tierHistory);

            const rewardHistory = await this.settingsService.getRewardHistory();
            this.set('rewardHistory', rewardHistory);
        } catch (error) {
            console.error('Error loading user data:', error);
            // TODO: Show error message to user
        }
    }

    async saveSettings() {
        try {
            await this.settingsService.saveSettings(this.settings);
            await this.settingsService.updateUserProfile(this.user);
            // TODO: Show success message
        } catch (error) {
            console.error('Error saving settings:', error);
            // TODO: Show error message
        }
    }

    async logout() {
        await this.authService.logout();
        this.navigationService.navigate('views/login/login-page', {
            clearHistory: true
        });
    }

    goBack() {
        this.navigationService.goBack();
    }
}