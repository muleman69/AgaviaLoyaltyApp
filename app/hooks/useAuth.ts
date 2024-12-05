import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

export function useAuth() {
  const authService = new AuthService();
  const navigationService = new NavigationService();

  return {
    async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
      try {
        const success = await authService.login(email, password);
        if (success) {
          navigationService.navigate('views/dashboard/dashboard-page', { clearHistory: true });
          return { success: true };
        }
        return { success: false, error: 'Invalid credentials' };
      } catch (error) {
        return { success: false, error: 'An error occurred during login' };
      }
    },

    async logout(): Promise<void> {
      await authService.logout();
      navigationService.navigate('views/login/login-page', { clearHistory: true });
    }
  };
}