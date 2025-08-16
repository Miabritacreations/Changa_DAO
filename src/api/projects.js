// Projects API with Internet Identity verification
// This handles project creation, funding, and impact tracking

import internetIdentityService from '../services/internetIdentity';

// Project categories
export const PROJECT_CATEGORIES = {
  EDUCATION: 'education',
  WATER: 'water',
  HEALTH: 'health',
  ENVIRONMENT: 'environment',
  INFRASTRUCTURE: 'infrastructure',
  AGRICULTURE: 'agriculture'
};

// Project status
export const PROJECT_STATUS = {
  DRAFT: 'draft',
  PENDING_APPROVAL: 'pending_approval',
  ACTIVE: 'active',
  FUNDED: 'funded',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Milestone status
export const MILESTONE_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  VERIFIED: 'verified'
};

// Mock project data (in real implementation, this would come from the backend canister)
const mockProjects = [
  {
    id: '1',
    name: 'Borehole for 500 Families in Kisumu',
    description: 'Building a sustainable water source for 500 families in Kisumu, Kenya. This project will provide clean drinking water and reduce water-borne diseases.',
    category: PROJECT_CATEGORIES.WATER,
    location: {
      country: 'Kenya',
      city: 'Kisumu',
      coordinates: { lat: -0.1022, lng: 34.7617 }
    },
    funding: {
      target: 25000,
      raised: 17500,
      currency: 'USD'
    },
    status: PROJECT_STATUS.ACTIVE,
    milestones: [
      {
        id: '1-1',
        title: 'Land Acquisition',
        description: 'Secure land rights and permits',
        status: MILESTONE_STATUS.COMPLETED,
        completionDate: '2024-01-15',
        budget: 5000
      },
      {
        id: '1-2',
        title: 'Construction',
        description: 'Build borehole and water distribution system',
        status: MILESTONE_STATUS.IN_PROGRESS,
        completionDate: '2024-03-30',
        budget: 15000
      },
      {
        id: '1-3',
        title: 'Testing & Commissioning',
        description: 'Water quality testing and system commissioning',
        status: MILESTONE_STATUS.PENDING,
        completionDate: '2024-04-15',
        budget: 5000
      }
    ],
    team: [
      {
        principal: '2vxsx-fae',
        name: 'John Doe',
        role: 'Project Lead',
        avatar: 'https://i.pravatar.cc/150?u=john'
      }
    ],
    impact: {
      peopleImpacted: 2500,
      households: 500,
      sustainability: 'High'
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-20',
    backers: 45,
    nftPrice: 100,
    totalNfts: 250
  },
  {
    id: '2',
    name: 'Solar Power for Rural School',
    description: 'Installing solar panels to provide electricity for a rural school in Tanzania, enabling evening classes and computer education.',
    category: PROJECT_CATEGORIES.EDUCATION,
    location: {
      country: 'Tanzania',
      city: 'Arusha',
      coordinates: { lat: -3.3731, lng: 36.6823 }
    },
    funding: {
      target: 15000,
      raised: 12000,
      currency: 'USD'
    },
    status: PROJECT_STATUS.ACTIVE,
    milestones: [
      {
        id: '2-1',
        title: 'Site Assessment',
        description: 'Technical assessment and planning',
        status: MILESTONE_STATUS.COMPLETED,
        completionDate: '2024-01-10',
        budget: 2000
      },
      {
        id: '2-2',
        title: 'Solar Installation',
        description: 'Install solar panels and electrical systems',
        status: MILESTONE_STATUS.IN_PROGRESS,
        completionDate: '2024-02-28',
        budget: 10000
      },
      {
        id: '2-3',
        title: 'Training & Handover',
        description: 'Staff training and system handover',
        status: MILESTONE_STATUS.PENDING,
        completionDate: '2024-03-15',
        budget: 3000
      }
    ],
    team: [
      {
        principal: '2vxsx-fae',
        name: 'Sarah Johnson',
        role: 'Project Manager',
        avatar: 'https://i.pravatar.cc/150?u=sarah'
      }
    ],
    impact: {
      peopleImpacted: 300,
      students: 250,
      teachers: 15,
      sustainability: 'High'
    },
    createdAt: '2024-01-05',
    updatedAt: '2024-01-18',
    backers: 32,
    nftPrice: 75,
    totalNfts: 200
  }
];

// Verify Internet Identity authentication
const verifyAuth = () => {
  if (!internetIdentityService.isAuthenticated()) {
    throw new Error('Authentication required');
  }
  return internetIdentityService.getUserPrincipal();
};

// Get all projects
export async function getAllProjects(filters = {}) {
  try {
    // In real implementation, this would call the backend canister
    // const backend = await getBackend();
    // const projects = await backend.getAllProjects(filters);
    
    // For now, return mock data
    let projects = [...mockProjects];
    
    // Apply filters
    if (filters.category) {
      projects = projects.filter(p => p.category === filters.category);
    }
    
    if (filters.status) {
      projects = projects.filter(p => p.status === filters.status);
    }
    
    if (filters.country) {
      projects = projects.filter(p => p.location.country === filters.country);
    }
    
    return projects;
  } catch (error) {
    console.error('Failed to get projects:', error);
    throw error;
  }
}

// Get project by ID
export async function getProjectById(projectId) {
  try {
    // In real implementation, this would call the backend canister
    // const backend = await getBackend();
    // const project = await backend.getProject(projectId);
    
    const project = mockProjects.find(p => p.id === projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    
    return project;
  } catch (error) {
    console.error('Failed to get project:', error);
    throw error;
  }
}

// Create new project (requires authentication)
export async function createProject(projectData) {
  try {
    const principal = verifyAuth();
    
    // Validate project data
    if (!projectData.name || !projectData.description || !projectData.category) {
      throw new Error('Missing required project fields');
    }
    
    // In real implementation, this would call the backend canister
    // const backend = await getBackend();
    // const newProject = await backend.createProject({
    //   ...projectData,
    //   creator: principal.toString(),
    //   createdAt: new Date().toISOString()
    // });
    
    // For now, create mock project
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      creator: principal.toString(),
      status: PROJECT_STATUS.DRAFT,
      funding: {
        target: projectData.funding?.target || 0,
        raised: 0,
        currency: 'USD'
      },
      milestones: projectData.milestones || [],
      team: [{
        principal: principal.toString(),
        name: 'Project Creator',
        role: 'Project Lead',
        avatar: `https://i.pravatar.cc/150?u=${principal.toString()}`
      }],
      impact: projectData.impact || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      backers: 0,
      nftPrice: projectData.nftPrice || 50,
      totalNfts: projectData.totalNfts || 100
    };
    
    mockProjects.push(newProject);
    
    return newProject;
  } catch (error) {
    console.error('Failed to create project:', error);
    throw error;
  }
}

// Fund a project (requires authentication)
export async function fundProject(projectId, amount, fundingType = 'donation') {
  try {
    const principal = verifyAuth();
    
    // In real implementation, this would call the backend canister
    // const backend = await getBackend();
    // const result = await backend.fundProject(projectId, amount, fundingType);
    
    // For now, update mock data
    const project = mockProjects.find(p => p.id === projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    
    project.funding.raised += amount;
    project.backers += 1;
    
    // If fully funded, update status
    if (project.funding.raised >= project.funding.target) {
      project.status = PROJECT_STATUS.FUNDED;
    }
    
    return {
      success: true,
      projectId,
      amount,
      fundingType,
      newTotal: project.funding.raised,
      backer: principal.toString()
    };
  } catch (error) {
    console.error('Failed to fund project:', error);
    throw error;
  }
}

// Update project milestone (requires authentication and project ownership)
export async function updateMilestone(projectId, milestoneId, updateData) {
  try {
    const principal = verifyAuth();
    
    const project = mockProjects.find(p => p.id === projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    
    // Check if user is project creator or team member
    const isTeamMember = project.team.some(member => member.principal === principal.toString());
    if (!isTeamMember) {
      throw new Error('Unauthorized: Only team members can update milestones');
    }
    
    const milestone = project.milestones.find(m => m.id === milestoneId);
    if (!milestone) {
      throw new Error('Milestone not found');
    }
    
    // Update milestone
    Object.assign(milestone, updateData, {
      updatedAt: new Date().toISOString()
    });
    
    project.updatedAt = new Date().toISOString();
    
    return milestone;
  } catch (error) {
    console.error('Failed to update milestone:', error);
    throw error;
  }
}

// Get user's funded projects
export async function getUserFundedProjects() {
  try {
    const principal = verifyAuth();
    
    // In real implementation, this would call the backend canister
    // const backend = await getBackend();
    // const projects = await backend.getUserFundedProjects(principal.toString());
    
    // For now, return mock data
    return mockProjects.filter(p => p.backers > 0).slice(0, 3);
  } catch (error) {
    console.error('Failed to get user funded projects:', error);
    throw error;
  }
}

// Get user's created projects
export async function getUserCreatedProjects() {
  try {
    const principal = verifyAuth();
    
    // In real implementation, this would call the backend canister
    // const backend = await getBackend();
    // const projects = await backend.getUserCreatedProjects(principal.toString());
    
    // For now, return mock data
    return mockProjects.filter(p => p.team.some(member => member.principal === principal.toString()));
  } catch (error) {
    console.error('Failed to get user created projects:', error);
    throw error;
  }
}

// Get project statistics
export async function getProjectStats() {
  try {
    const totalProjects = mockProjects.length;
    const activeProjects = mockProjects.filter(p => p.status === PROJECT_STATUS.ACTIVE).length;
    const completedProjects = mockProjects.filter(p => p.status === PROJECT_STATUS.COMPLETED).length;
    const totalFunding = mockProjects.reduce((sum, p) => sum + p.funding.raised, 0);
    const totalImpact = mockProjects.reduce((sum, p) => sum + (p.impact.peopleImpacted || 0), 0);
    
    return {
      totalProjects,
      activeProjects,
      completedProjects,
      totalFunding,
      totalImpact,
      averageFunding: totalFunding / totalProjects || 0
    };
  } catch (error) {
    console.error('Failed to get project stats:', error);
    throw error;
  }
}
