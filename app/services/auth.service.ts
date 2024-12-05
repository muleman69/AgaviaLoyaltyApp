import { SecureStorage } from '@nativescript/secure-storage';

export class AuthService {
    private secureStorage: SecureStorage;
    private readonly ADMIN_EMAIL = 'admin@agavia.com';
    private readonly ADMIN_PASSWORD = 'Admin123!';

    constructor() {
        this.secureStorage = new SecureStorage();
    }

    async login(email: string, password: string, isAdmin: boolean = false): Promise<boolean> {
        try {
            // For demo purposes, using hardcoded admin credentials
            // In production, this should validate against a secure backend
            if (isAdmin) {
                const isValidAdmin = email === this.ADMIN_EMAIL && password === this.ADMIN_PASSWORD;
                if (isValidAdmin) {
                    await this.secureStorage.set({
                        key: 'user_session',
                        value: JSON.stringify({ 
                            email, 
                            isAdmin: true,
                            timestamp: new Date()
                        })
                    });
                    return true;
                }
                return false;
            }

            // Mock customer login success
            // In production, this should validate against your backend
            const mockSuccess = true;
            if (mockSuccess) {
                await this.secureStorage.set({
                    key: 'user_session',
                    value: JSON.stringify({ 
                        email,
                        isAdmin: false,
                        timestamp: new Date()
                    })
                });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }

    async isAuthenticated(): Promise<boolean> {
        try {
            const session = await this.secureStorage.get({ key: 'user_session' });
            return !!session;
        } catch {
            return false;
        }
    }

    async isAdmin(): Promise<boolean> {
        try {
            const session = await this.secureStorage.get({ key: 'user_session' });
            if (session) {
                const { isAdmin } = JSON.parse(session);
                return isAdmin;
            }
            return false;
        } catch {
            return false;
        }
    }

    async logout(): Promise<void> {
        await this.secureStorage.remove({ key: 'user_session' });
    }
}