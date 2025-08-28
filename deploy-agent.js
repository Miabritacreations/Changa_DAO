#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class DeploymentAgent {
  constructor() {
    this.projectRoot = path.join(__dirname);
    this.frontendPath = path.join(this.projectRoot, 'src', 'Changa_DAO_frontend');
  }

  async deploy(platform = 'vercel') {
    console.log(`🤖 AI Agent deploying to ${platform}...`);
    
    try {
      // Build the project
      await this.build();
      
      // Deploy based on platform
      switch (platform.toLowerCase()) {
        case 'vercel':
          return await this.deployToVercel();
        case 'netlify':
          return await this.deployToNetlify();
        case 'github-pages':
          return await this.deployToGitHubPages();
        case 'icp':
          return await this.deployToICP();
        default:
          throw new Error(`Unknown platform: ${platform}`);
      }
    } catch (error) {
      console.error(`❌ Deployment failed: ${error.message}`);
      throw error;
    }
  }

  async build() {
    console.log('🔨 Building project...');
    execSync('npm run build', { 
      cwd: this.frontendPath, 
      stdio: 'inherit' 
    });
    console.log('✅ Build completed');
  }

  async deployToVercel() {
    console.log('🚀 Deploying to Vercel...');
    const result = execSync('npx vercel --prod --yes', { 
      cwd: this.frontendPath,
      encoding: 'utf8'
    });
    
    // Extract URL from output
    const urlMatch = result.match(/https:\/\/[^\s]+/);
    const url = urlMatch ? urlMatch[0] : 'Deployment URL not found';
    
    console.log(`✅ Deployed to Vercel: ${url}`);
    return { platform: 'vercel', url };
  }

  async deployToNetlify() {
    console.log('🌐 Deploying to Netlify...');
    // This would require Netlify CLI and authentication
    console.log('⚠️  Netlify deployment requires manual setup');
    return { platform: 'netlify', status: 'requires_manual_setup' };
  }

  async deployToGitHubPages() {
    console.log('📄 Deploying to GitHub Pages...');
    execSync('npm run deploy', { 
      cwd: this.frontendPath,
      stdio: 'inherit'
    });
    
    const url = 'https://miabritacreations.github.io/Changa_DAO/';
    console.log(`✅ Deployed to GitHub Pages: ${url}`);
    return { platform: 'github-pages', url };
  }

  async deployToICP() {
    console.log('🔗 Deploying to Internet Computer...');
    execSync('dfx deploy --network ic', { 
      cwd: this.projectRoot,
      stdio: 'inherit'
    });
    
    console.log('✅ Deployed to ICP');
    return { platform: 'icp', status: 'deployed' };
  }
}

// CLI Interface for AI Agents
if (require.main === module) {
  const platform = process.argv[2] || 'vercel';
  const agent = new DeploymentAgent();
  
  agent.deploy(platform)
    .then(result => {
      console.log('🎉 Deployment successful!');
      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Deployment failed!');
      console.error(error.message);
      process.exit(1);
    });
}

module.exports = DeploymentAgent;
