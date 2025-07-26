// Mock backend API for user profile with Internet Identity integration

import internetIdentityService from '../services/internetIdentity';

const PROFILE_KEY = "user_profile";

export async function getUserProfile() {
  // Check if user is authenticated
  if (!internetIdentityService.isAuthenticated()) {
    throw new Error('User must be authenticated to access profile');
  }

  const principal = internetIdentityService.getUserPrincipal();
  const userKey = `${PROFILE_KEY}_${principal.toString()}`;
  
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));
  
  const data = localStorage.getItem(userKey);
  if (data) return JSON.parse(data);
  
  // Default profile if none saved
  return {
    name: "New User",
    email: `${principal.toString().slice(0, 8)}@ic0.app`,
    avatar: `https://i.pravatar.cc/150?u=${principal.toString()}`,
    principal: principal.toString(),
  };
}

export async function updateUserProfile(profile) {
  if (!internetIdentityService.isAuthenticated()) {
    throw new Error('User must be authenticated to update profile');
  }

  const principal = internetIdentityService.getUserPrincipal();
  const userKey = `${PROFILE_KEY}_${principal.toString()}`;
  
  await new Promise((res) => setTimeout(res, 500));
  
  // Add principal to profile
  const updatedProfile = { ...profile, principal: principal.toString() };
  localStorage.setItem(userKey, JSON.stringify(updatedProfile));
  
  return updatedProfile;
} 