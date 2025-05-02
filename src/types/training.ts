
import { UserRole } from "@/contexts/AuthContext";

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  imageUrl: string;
  level: "beginner" | "intermediate" | "advanced";
  category: "fire_safety" | "emergency_response" | "equipment" | "evacuation" | "first_aid";
  roles?: UserRole[];
  progress?: number; // 0-100
  completed?: boolean;
  content?: any;
}

export interface Quiz {
  id: string;
  moduleId: string;
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
  userId: string;
  moduleId: string;
  moduleName?: string;
  issueDate: Date;
  expirationDate: Date;
  score: number;
  training_modules?: {
    title: string;
    category: string;
    level: string;
  }
}

export interface UserProgress {
  id: string;
  userId: string;
  moduleId: string;
  progress: number;
  completed: boolean;
  lastAccessed: Date;
  training_modules: TrainingModule;
}
