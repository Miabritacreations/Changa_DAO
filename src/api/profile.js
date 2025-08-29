import { getBackendActor } from "./canister";

const PROFILE_KEY = "user_profile";

export async function getUserProfile() {
  // This function should be called from components that have access to AuthContext
  // The authentication check should be done at the component level
  
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
  
  // For now, return a default profile since we don't have the principal here
  // Components should pass the principal if needed
  return {
    name: "New User",
    email: "user@ic0.app",
    avatar: "https://i.pravatar.cc/150?u=user",
    principal: "user-principal",
    bio: "",
    location: "",
    phone: "",
    organization: "",
  };
}

export async function updateUserProfile(profile) {
  // Try backend first, fallback to localStorage
  try {
    const backend = await getBackendActor();
    const res = await backend.updateProfile(profile);
    if (res && 'ok' in res) {
      return res.ok;
    }
  } catch (_e) {
    // Fallback to localStorage
  }
  
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));
  
  // Store in localStorage as fallback
  const userKey = `${PROFILE_KEY}_${profile.principal || 'default'}`;
  localStorage.setItem(userKey, JSON.stringify(profile));
  
  return profile;
} 