import internetIdentityService from '../services/internetIdentity';
import { getBackendActor } from "./canister";

const PROFILE_KEY = "user_profile";

export async function getUserProfile() {
  // Check if user is authenticated
  if (!internetIdentityService.isAuthenticated()) {
    throw new Error('User must be authenticated to access profile');
  }

  const principal = internetIdentityService.getUserPrincipal();
  const userKey = `${PROFILE_KEY}_${principal.toString()}`;
  
  // Try backend first, fallback to localStorage
  try {
    const backend = await getBackendActor();
    const res = await backend.getProfile();
    if (res && 'ok' in res) {
      return res.ok;
    }
  } catch (_e) {
    // Fallback to localStorage
  }
  
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 300));
  
  const data = localStorage.getItem(userKey);
  if (data) return JSON.parse(data);
  
  // Default profile if none saved
  return {
    name: "New User",
    email: `${principal.toString().slice(0, 8)}@ic0.app`,
    avatar: `https://i.pravatar.cc/150?u=${principal.toString()}`,
    principal: principal.toString(),
    bio: "",
    location: "",
    phone: "",
    organization: "",
  };
}

export async function updateUserProfile(profile) {
  if (!internetIdentityService.isAuthenticated()) {
    throw new Error('User must be authenticated to update profile');
  }

  const principal = internetIdentityService.getUserPrincipal();
  const userKey = `${PROFILE_KEY}_${principal.toString()}`;
  
  // Try backend first, fallback to localStorage
  try {
    const backend = await getBackendActor();
    const safe = {
      name: profile.name || "",
      email: profile.email || "",
      avatar: profile.avatar || "",
      bio: profile.bio || "",
      location: profile.location || "",
      phone: profile.phone || "",
      organization: profile.organization || "",
      principal: principal.toString(),
      createdAt: profile.createdAt || Date.now(),
      updatedAt: Date.now(),
    };
    const res = await backend.setProfile(safe);
    if (res && 'ok' in res) {
      return res.ok;
    }
  } catch (_e) {
    // Fallback to localStorage
  }
  
  await new Promise((res) => setTimeout(res, 300));
  
  // Add principal to profile
  const updatedProfile = { 
    ...profile, 
    principal: principal.toString(),
    updatedAt: Date.now()
  };
  localStorage.setItem(userKey, JSON.stringify(updatedProfile));
  
  return updatedProfile;
} 