
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/contexts/AuthContext";

// Sign up a new user
export async function signUp(name: string, email: string, password: string, role: UserRole) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role
      }
    }
  });
  
  if (error) {
    console.error("Error signing up:", error);
    throw error;
  }
  
  return data;
}

// Sign in an existing user
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    console.error("Error signing in:", error);
    throw error;
  }
  
  return data;
}

// Sign out the current user
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

// Get the current session
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error("Error getting session:", error);
    throw error;
  }
  
  return data.session;
}

// Get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
  
  return data;
}
