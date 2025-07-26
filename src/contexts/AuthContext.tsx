import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from '@supabase/supabase-js';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { signIn, signOut, signUp, getUserProfile } from "@/services/auth-service";

export type UserRole = "admin" | "manager" | "receptionist" | "housekeeping" | "security" | "maintenance" | "food_service";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface ProfileUpdateData {
  name?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile from Supabase
  const fetchProfile = async (userId: string) => {
    try {
      const profileData = await getUserProfile(userId);
      
      if (profileData) {
        return {
          id: profileData.id,
          name: profileData.name,
          email: profileData.email,
          role: profileData.role as UserRole,
          avatarUrl: profileData.avatar_url
        } as UserProfile;
      }
      
      return null;
    } catch (error) {
      console.error("Error in fetchProfile:", error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // If user is logged in, fetch their profile
        if (session?.user) {
          // Use setTimeout to prevent potential deadlocks
          setTimeout(async () => {
            const profile = await fetchProfile(session.user.id);
            setUserProfile(profile);
          }, 0);
        } else {
          setUserProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUserProfile(profile);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signIn(email, password);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      await signUp(name, email, password, role);
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  // Add the updateProfile function
  const updateProfile = async (data: ProfileUpdateData) => {
    if (!user) {
      throw new Error("No user logged in");
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          avatar_url: data.avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Update local state
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          name: data.name || userProfile.name,
          avatarUrl: data.avatarUrl || userProfile.avatarUrl
        });
      }
      
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, session, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
