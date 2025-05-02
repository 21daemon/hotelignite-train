
import { UserRole } from "@/contexts/AuthContext";

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  image_url?: string;
  imageUrl?: string; // For backwards compatibility with existing code
  level: "beginner" | "intermediate" | "advanced";
  category: "fire_safety" | "emergency_response" | "equipment" | "evacuation" | "first_aid";
  content?: any;
  created_at?: string;
  updated_at?: string;
  roles?: UserRole[];
  progress?: number; // 0-100
  completed?: boolean;
}

export interface Quiz {
  id: string;
  module_id: string;
  moduleId?: string; // For backwards compatibility
  title: string;
  questions: {
    id: string;
    text: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
  }[];
}

export interface Certificate {
  id: string;
  user_id: string;
  module_id: string;
  moduleId?: string; // For backwards compatibility
  moduleName?: string;
  issue_date: string;
  expiration_date: string;
  score: number;
  training_modules?: {
    title: string;
    category: string;
    level: string;
  }
}

export interface UserProgress {
  id: string;
  user_id: string;
  module_id: string;
  progress: number;
  completed: boolean;
  last_accessed: string;
  training_modules?: TrainingModule;
}
