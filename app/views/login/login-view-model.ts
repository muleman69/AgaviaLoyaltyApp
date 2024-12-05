import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';
import { validateEmail, validatePassword } from '../../utils/validation';

export class LoginViewModel extends Observable {
    private authService: AuthService;
    private navigationService: NavigationService;
    
    email: string = '';
    password: string = '';
    errorMessage: string = '';
    isLoading: boolean = false;
    userType: number = 0; // 0 for customer, 1 for business admin

    constructor() {
        super();
        this.authService = new AuthService();
        this.navigationService = new NavigationService();
        
        // Initialize help text based on user type
        this.updateHelpText();
    }

    get helpText(): string {
        return this.userType === 0 
            ? 'Login to access your rewards, track stamps, and redeem exclusive offers.'
            : 'Business admin access. Login to manage rewards, view analytics, and customize your loyalty program.';
    }

    async onLogin() {
        try {
            if (!this.validateInput()) return;

            this.set('isLoading', true);
            this.set('errorMessage', '');

            const success = await this.authService.login(this.email, this.password, this.userType === 1);
            
            if (success) {
                // Navigate to appropriate dashboard
                const destination = this.userType === 0 
                    ? 'views/dashboard/dashboard-page'
                    : 'views/business/dashboard/business-dashboard-page';
                    
                this.navigationService.navigate(destination, { clearHistory: true });
            } else {
                this.set('errorMessage', 'Invalid credentials');
            }
        } catch (error) {
            this.set('errorMessage', 'An error occurred during login');
            console.error('Login error:', error);
        } finally {
            this.set('isLoading', false);
        }
    }

    onSignUp() {
        const destination = this.userType === 0 
            ? 'views/signup/customer-signup-page'
            : 'views/signup/business-signup-page';
            
        this.navigationService.navigate(destination);
    }

    private validateInput(): boolean {
        if (!this.email || !this.password) {
            this.set('errorMessage', 'Please enter both email and password');
            return false;
        }

        if (!validateEmail(this.email)) {
            this.set('errorMessage', 'Please enter a valid email address');
            return false;
        }

        const passwordValidation = validatePassword(this.password);
        if (!passwordValidation.isValid) {
            this.set('errorMessage', passwordValidation.message);
            return false;
        }

        return true;
    }

    private updateHelpText(): void {
        this.notifyPropertyChange('helpText', this.helpText);
    }
}