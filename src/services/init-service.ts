
import { trainingModules } from "@/data/training-modules";
import { importInitialTrainingModules } from "./training-service";

export async function initializeApp() {
  try {
    // Import initial training modules if needed
    await importInitialTrainingModules(trainingModules);
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}
