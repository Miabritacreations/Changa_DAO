// Crowdfunding-specific color utilities and gradients
export const crowdfundingColors = {
  // Trust & Professionalism
  trust: {
    primary: '#1E40AF', // Navy Blue
    secondary: '#3B82F6', // Royal Blue
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
  },
  
  // Energy & Call-to-Action
  energy: {
    primary: '#F97316', // Vibrant Orange
    secondary: '#EAB308', // Optimistic Yellow
    gradient: 'linear-gradient(135deg, #F97316 0%, #EAB308 100%)',
  },
  
  // Growth & Success
  growth: {
    primary: '#10B981', // Success Green
    secondary: '#059669', // Dark Green
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
  
  // Progress & Funding
  progress: {
    success: '#10B981', // Green for achieved goals
    warning: '#F59E0B', // Orange for near goals
    danger: '#EF4444', // Red for shortfalls
    remaining: '#64748B', // Gray for remaining
  },
  
  // Innovation & Creativity
  innovation: {
    teal: '#0D9488', // Modern Teal
    purple: '#7C3AED', // Creative Purple
    gradient: 'linear-gradient(135deg, #0D9488 0%, #7C3AED 100%)',
  },
};

// Crowdfunding-specific gradients
export const crowdfundingGradients = {
  // Trust gradients for headers and navigation
  trustGradient: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
  
  // Energy gradients for CTAs and buttons
  energyGradient: 'linear-gradient(135deg, #F97316 0%, #EAB308 100%)',
  
  // Success gradients for progress bars
  successGradient: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
  
  // Innovation gradients for creative elements
  innovationGradient: 'linear-gradient(135deg, #0D9488 0%, #7C3AED 100%)',
  
  // Hero section gradient
  heroGradient: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #10B981 100%)',
};

// Crowdfunding-specific shadows
export const crowdfundingShadows = {
  // Trust shadows for cards and containers
  trust: '0 4px 20px rgba(30, 64, 175, 0.15)',
  
  // Energy shadows for CTAs
  energy: '0 8px 25px rgba(249, 115, 22, 0.25)',
  
  // Success shadows for progress elements
  success: '0 4px 20px rgba(16, 185, 129, 0.2)',
  
  // Innovation shadows for creative elements
  innovation: '0 4px 20px rgba(124, 58, 237, 0.15)',
};

// Crowdfunding-specific spacing and sizing
export const crowdfundingSpacing = {
  // Progress bar heights
  progressBar: {
    small: 8,
    medium: 12,
    large: 16,
  },
  
  // Card padding for different contexts
  cardPadding: {
    compact: 16,
    standard: 24,
    spacious: 32,
  },
  
  // Button sizes for different actions
  buttonSize: {
    small: { padding: '8px 16px', fontSize: '0.875rem' },
    medium: { padding: '12px 24px', fontSize: '1rem' },
    large: { padding: '16px 32px', fontSize: '1.125rem' },
  },
};

// Utility functions for crowdfunding colors
export const getProgressColor = (percentage) => {
  if (percentage >= 100) return crowdfundingColors.progress.success;
  if (percentage >= 80) return crowdfundingColors.progress.warning;
  if (percentage >= 50) return crowdfundingColors.energy.primary;
  return crowdfundingColors.progress.danger;
};

export const getFundingStatusColor = (raised, goal) => {
  const percentage = (raised / goal) * 100;
  return getProgressColor(percentage);
};

export const getUrgencyColor = (daysLeft) => {
  if (daysLeft <= 3) return crowdfundingColors.progress.danger;
  if (daysLeft <= 7) return crowdfundingColors.progress.warning;
  return crowdfundingColors.progress.success;
};
