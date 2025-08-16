// Mock Internet Identity service for testing
// This allows the frontend to work while we resolve backend dependencies

class InternetIdentityService {
  constructor() {
    this.identity = null;
    this.authenticated = false;
    this.userPrincipal = null;
  }

  async initialize() {
    console.log('Mock Internet Identity initialized');
    return true;
  }

  async authenticate() {
    // Simulate authentication delay
    await new Promise((res) => setTimeout(res, 1000));
    
    this.authenticated = true;
    this.userPrincipal = {
      toString: () => 'mock-principal-123456789'
    };
    
    return {
      success: true,
      principal: this.userPrincipal,
      identity: this.identity
    };
  }

  isAuthenticated() {
    return this.authenticated && this.userPrincipal;
  }

  getUserPrincipal() {
    return this.userPrincipal;
  }

  async logout() {
    await new Promise((res) => setTimeout(res, 500));
    this.authenticated = false;
    this.identity = null;
    this.userPrincipal = null;
    return true;
  }

  getAuthStatus() {
    return {
      authenticated: this.authenticated,
      principal: this.userPrincipal
    };
  }
}

const internetIdentityService = new InternetIdentityService();
export default internetIdentityService; 