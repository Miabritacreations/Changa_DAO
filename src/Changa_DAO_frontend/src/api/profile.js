// Mock backend API for user profile

const PROFILE_KEY = "user_profile";

export async function getUserProfile() {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));
  const data = localStorage.getItem(PROFILE_KEY);
  if (data) return JSON.parse(data);
  // Default profile if none saved
  return {
    name: "Bridgit Nyambeka",
    email: "nyambeka.bridgit@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=nyambeka.bridgit@gmail.com",
  };
}

export async function updateUserProfile(profile) {
  await new Promise((res) => setTimeout(res, 500));
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  return profile;
} 