import { AuthClient } from '@dfinity/auth-client';

class InternetIdentityService {
  constructor() {
    this.client = null;
    this.identity = null;
    this.authenticated = false;
    this.userPrincipal = null;
  }

  async initialize() {
    this.client = await AuthClient.create();
    this.authenticated = await this.client.isAuthenticated();
    if (this.authenticated) {
      this.identity = this.client.getIdentity();
      try {
        this.userPrincipal = this.identity.getPrincipal();
      } catch (_e) {
        this.userPrincipal = null;
      }
    }
    return true;
  }

  async authenticate() {
    if (!this.client) {
      await this.initialize();
    }

    // Use the main Internet Identity for reliability
    const identityProvider = 'https://identity.ic0.app';

    if (await this.client.isAuthenticated()) {
      this.identity = this.client.getIdentity();
      this.authenticated = true;
      try {
        this.userPrincipal = this.identity.getPrincipal();
      } catch (_e) {
        this.userPrincipal = null;
      }
      return {
        success: true,
        principal: this.userPrincipal,
        identity: this.identity,
      };
    }

    await new Promise((resolve, reject) => {
      this.client.login({
        identityProvider,
        onSuccess: () => {
          this.identity = this.client.getIdentity();
          this.authenticated = true;
          try {
            this.userPrincipal = this.identity.getPrincipal();
          } catch (_e) {
            this.userPrincipal = null;
          }
          resolve();
        },
        onError: (err) => reject(err),
      });
    });

    return {
      success: this.authenticated,
      principal: this.userPrincipal,
      identity: this.identity,
    };
  }

  isAuthenticated() {
    return Boolean(this.authenticated && this.userPrincipal);
  }

  getUserPrincipal() {
    return this.userPrincipal;
  }

  async logout() {
    if (!this.client) {
      await this.initialize();
    }
    await this.client.logout();
    this.authenticated = false;
    this.identity = null;
    this.userPrincipal = null;
    return true;
  }

  getAuthStatus() {
    return {
      authenticated: this.authenticated,
      principal: this.userPrincipal,
    };
  }
}

const internetIdentityService = new InternetIdentityService();
export default internetIdentityService; 