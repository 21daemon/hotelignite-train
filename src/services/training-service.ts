import { supabase } from "@/integrations/supabase/client";
import { TrainingModule, Quiz, Certificate, UserProgress } from "@/types/training";

// Use a more complete type assertion to bypass TypeScript restrictions
// This is needed because our Supabase schema definition doesn't include our new tables yet
type SupabaseClient = typeof supabase;

// Get all training modules
export async function getTrainingModules() {
  const { data, error } = await (supabase as any)
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
  const { data, error } = await (supabase as any)
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
  const { data, error } = await (supabase as any)
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
  const { data, error } = await (supabase as any)
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
  const { data, error } = await (supabase as any)
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
  try {
    const { data, error } = await (supabase as any)
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
    
    // If no certificates found and we're in development, return mock certificates
    if ((!data || data.length === 0) && import.meta.env.DEV) {
      return getMockCertificates(userId);
    }
    
    return data as Certificate[];
  } catch (error) {
    console.error("Error in getUserCertificates:", error);
    // In development, return mock data as fallback
    if (import.meta.env.DEV) {
      return getMockCertificates(userId);
    }
    throw error;
  }
}

// Helper function to get mock certificates for development
function getMockCertificates(userId: string): Certificate[] {
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(now.getMonth() - 2);
  
  // One year from now
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(now.getFullYear() + 1);
  
  // 3 months ago for expiration (expired certificate)
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);
  
  return [
    {
      id: "cert-1",
      user_id: userId,
      module_id: "module-1",
      issue_date: sixMonthsAgo.toISOString(),
      expiration_date: oneYearFromNow.toISOString(),
      score: 92,
      training_modules: {
        title: "Fire Safety Fundamentals",
        category: "fire_safety",
        level: "intermediate"
      }
    },
    {
      id: "cert-2",
      user_id: userId,
      module_id: "module-2",
      issue_date: twoMonthsAgo.toISOString(),
      expiration_date: oneYearFromNow.toISOString(),
      score: 85,
      training_modules: {
        title: "Emergency Response Protocol",
        category: "emergency_response",
        level: "advanced"
      }
    },
    {
      id: "cert-3",
      user_id: userId,
      module_id: "module-3",
      issue_date: oneYearAgo.toISOString(),
      expiration_date: threeMonthsAgo.toISOString(),
      score: 78,
      training_modules: {
        title: "Equipment Handling",
        category: "equipment",
        level: "beginner"
      }
    }
  ];
}

// Create a certificate for a user
export async function issueCertificate(userId: string, moduleId: string, score: number) {
  // Set expiration date to 1 year from now
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  
  const { data, error } = await (supabase as any)
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

// Schedule a certification session
export async function scheduleCertification(userId: string, moduleId: string, date: Date) {
  const { data, error } = await (supabase as any)
    .from('certification_schedules')
    .insert({
      user_id: userId,
      module_id: moduleId,
      scheduled_date: date.toISOString(),
      status: 'scheduled'
    });
  
  if (error) {
    console.error("Error scheduling certification:", error);
    throw error;
  }
  
  return data;
}

// Get scheduled certifications for a user
export async function getScheduledCertifications(userId: string) {
  const { data, error } = await (supabase as any)
    .from('certification_schedules')
    .select(`
      *,
      training_modules(title, category, level)
    `)
    .eq('user_id', userId)
    .eq('status', 'scheduled');
  
  if (error) {
    console.error("Error fetching scheduled certifications:", error);
    throw error;
  }
  
  return data;
}

// Cancel a scheduled certification
export async function cancelCertification(certificationId: string) {
  const { data, error } = await (supabase as any)
    .from('certification_schedules')
    .update({ status: 'cancelled' })
    .eq('id', certificationId);
  
  if (error) {
    console.error("Error cancelling certification:", error);
    throw error;
  }
  
  return data;
}

// Import initial training modules into the database
export async function importInitialTrainingModules(modules: TrainingModule[]) {
  // Only proceed if we need to (if there are no modules in the DB)
  const { count, error: countError } = await (supabase as any)
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
  const { error } = await (supabase as any)
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
