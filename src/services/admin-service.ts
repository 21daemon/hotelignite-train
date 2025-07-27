import { supabase } from "@/integrations/supabase/client";
import { TrainingModule, Quiz } from "@/types/training";

// Check if user is admin
export async function isUserAdmin(): Promise<boolean> {
  const { data, error } = await supabase.rpc('is_admin');
  if (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
  return data;
}

// Get admin configuration
export async function getAdminConfig() {
  const { data, error } = await supabase
    .from('admin_config')
    .select('*')
    .single();
  
  if (error) {
    console.error("Error fetching admin config:", error);
    throw error;
  }
  
  return data;
}

// Create a new training module
export async function createTrainingModule(moduleData: Omit<TrainingModule, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('training_modules')
    .insert({
      title: moduleData.title,
      description: moduleData.description,
      category: moduleData.category,
      level: moduleData.level,
      duration: moduleData.duration,
      roles: moduleData.roles,
      image_url: moduleData.imageUrl,
      content: moduleData.content
    })
    .select()
    .single();
  
  if (error) {
    console.error("Error creating training module:", error);
    throw error;
  }
  
  return data;
}

// Update a training module
export async function updateTrainingModule(id: string, moduleData: Partial<TrainingModule>) {
  const { data, error } = await supabase
    .from('training_modules')
    .update({
      title: moduleData.title,
      description: moduleData.description,
      category: moduleData.category,
      level: moduleData.level,
      duration: moduleData.duration,
      roles: moduleData.roles,
      image_url: moduleData.imageUrl,
      content: moduleData.content
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating training module:", error);
    throw error;
  }
  
  return data;
}

// Delete a training module
export async function deleteTrainingModule(id: string) {
  const { error } = await supabase
    .from('training_modules')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error("Error deleting training module:", error);
    throw error;
  }
}

// Create a quiz for a module
export async function createQuiz(quizData: Omit<Quiz, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('quizzes')
    .insert({
      module_id: quizData.module_id,
      title: quizData.title,
      questions: quizData.questions
    })
    .select()
    .single();
  
  if (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
  
  return data;
}

// Update a quiz
export async function updateQuiz(id: string, quizData: Partial<Quiz>) {
  const { data, error } = await supabase
    .from('quizzes')
    .update({
      title: quizData.title,
      questions: quizData.questions
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
  
  return data;
}

// Delete a quiz
export async function deleteQuiz(id: string) {
  const { error } = await supabase
    .from('quizzes')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
}

// Get all training modules for admin
export async function getAllTrainingModules() {
  const { data, error } = await supabase
    .from('training_modules')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Error fetching training modules:", error);
    throw error;
  }
  
  return data;
}

// Get all quizzes for admin
export async function getAllQuizzes() {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
  
  return data;
}