
import { supabase } from "@/integrations/supabase/client";
import { TrainingModule, Quiz, Certificate, UserProgress } from "@/types/training";

// Get all training modules
export async function getTrainingModules() {
  const { data, error } = await supabase
    .from('training_modules')
    .select('*');
  
  if (error) {
    console.error("Error fetching training modules:", error);
    throw error;
  }
  
  // Convert snake_case to camelCase for compatibility with existing code
  return data.map(module => ({
    ...module,
    imageUrl: module.image_url
  })) as TrainingModule[];
}

// Get a specific training module by ID
export async function getTrainingModule(id: string) {
  const { data, error } = await supabase
    .from('training_modules')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching training module ${id}:`, error);
    throw error;
  }
  
  // Convert snake_case to camelCase for compatibility
  return { ...data, imageUrl: data.image_url } as TrainingModule;
}

// Get user progress for modules
export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select(`
      *,
      training_modules(*)
    `)
    .eq('user_id', userId);
  
  if (error) {
    console.error("Error fetching user progress:", error);
    throw error;
  }
  
  return data as unknown as UserProgress[];
}

// Update user progress for a module
export async function updateUserProgress(userId: string, moduleId: string, progress: number, completed: boolean = false) {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert(
      { 
        user_id: userId,
        module_id: moduleId,
        progress,
        completed,
        last_accessed: new Date().toISOString()
      },
      { onConflict: 'user_id,module_id' }
    );
  
  if (error) {
    console.error("Error updating user progress:", error);
    throw error;
  }
  
  return data;
}

// Get quizzes for a specific module
export async function getModuleQuiz(moduleId: string) {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('module_id', moduleId)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // No quiz found
      return null;
    }
    console.error("Error fetching module quiz:", error);
    throw error;
  }
  
  return data as Quiz;
}

// Get user certificates
export async function getUserCertificates(userId: string) {
  const { data, error } = await supabase
    .from('certificates')
    .select(`
      *,
      training_modules(title, category, level)
    `)
    .eq('user_id', userId);
  
  if (error) {
    console.error("Error fetching user certificates:", error);
    throw error;
  }
  
  return data as Certificate[];
}

// Create a certificate for a user
export async function issueCertificate(userId: string, moduleId: string, score: number) {
  // Set expiration date to 1 year from now
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  
  const { data, error } = await supabase
    .from('certificates')
    .upsert({
      user_id: userId,
      module_id: moduleId,
      score,
      expiration_date: expirationDate.toISOString()
    }, 
    { onConflict: 'user_id,module_id' });
  
  if (error) {
    console.error("Error issuing certificate:", error);
    throw error;
  }
  
  return data;
}

// Import initial training modules into the database
export async function importInitialTrainingModules(modules: TrainingModule[]) {
  // Only proceed if we need to (if there are no modules in the DB)
  const { count, error: countError } = await supabase
    .from('training_modules')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error("Error checking modules count:", countError);
    throw countError;
  }
  
  if (count && count > 0) {
    console.log(`Database already contains ${count} modules, skipping import`);
    return;
  }
  
  // Insert modules
  const { error } = await supabase
    .from('training_modules')
    .insert(modules.map(module => ({
      title: module.title,
      description: module.description,
      duration: module.duration,
      image_url: module.imageUrl || module.image_url,
      level: module.level,
      category: module.category,
      content: module.content || {}
    })));
  
  if (error) {
    console.error("Error importing initial modules:", error);
    throw error;
  }
  
  console.log("Successfully imported initial training modules");
}
