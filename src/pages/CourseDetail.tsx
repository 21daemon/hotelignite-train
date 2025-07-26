import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  PlayCircle, 
  Award,
  Target,
  Lightbulb,
  FileText
} from "lucide-react";
import { getTrainingModule, updateUserProgress, getUserProgress } from "@/services/training-service";
import { TrainingModule } from "@/types/training";
import { toast } from "@/components/ui/use-toast";
import { CourseQuiz } from "@/components/training/course-quiz";
import { CourseContent } from "@/components/training/course-content";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [module, setModule] = useState<TrainingModule | null>(null);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const loadModule = async () => {
      if (!id || !user) return;
      
      try {
        setLoading(true);
        const moduleData = await getTrainingModule(id);
        setModule(moduleData);
        
        // Load user progress
        const userProgress = await getUserProgress(user.id);
        const moduleProgress = userProgress.find(p => p.module_id === id);
        if (moduleProgress) {
          setProgress(moduleProgress.progress);
          setCompleted(moduleProgress.completed);
        }
      } catch (error) {
        console.error("Failed to load module:", error);
        toast({
          title: "Error",
          description: "Failed to load course. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadModule();
  }, [id, user]);

  const updateProgress = async (newProgress: number) => {
    if (!user || !id) return;
    
    try {
      await updateUserProgress(user.id, id, newProgress, newProgress === 100);
      setProgress(newProgress);
      setCompleted(newProgress === 100);
      
      if (newProgress === 100) {
        toast({
          title: "Course Completed!",
          description: "You can now take the quiz to earn your certification.",
        });
      }
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const handleSectionComplete = () => {
    if (!module?.content?.modules) return;
    
    const totalSections = module.content.modules.length;
    const newProgress = Math.min(((currentSection + 1) / totalSections) * 100, 100);
    updateProgress(newProgress);
    
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number) => {
    setShowQuiz(false);
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}%. ${score >= 70 ? "Certificate earned!" : "Try again to earn certification."}`,
      variant: score >= 70 ? "default" : "destructive"
    });
    
    if (score >= 70) {
      navigate("/certifications");
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center py-10">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
            <p className="mt-2 text-sm text-muted-foreground">Loading course...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Course Not Found</h2>
          <p className="text-muted-foreground mt-2">The requested course could not be found.</p>
          <Button onClick={() => navigate("/training")} className="mt-4">
            Back to Training
          </Button>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    return <CourseQuiz moduleId={module.id} onComplete={handleQuizComplete} />;
  }

  const currentSectionData = module.content?.modules?.[currentSection];

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/training")}>
            ← Back to Training
          </Button>
          <Badge variant="secondary">{module.level}</Badge>
          <Badge variant="outline">{module.category.replace("_", " ")}</Badge>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
        <p className="text-muted-foreground mb-4">{module.description}</p>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {module.duration} minutes
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {module.content?.modules?.length || 0} modules
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            {progress}% complete
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="objectives">Learning Objectives</TabsTrigger>
          <TabsTrigger value="exercises">Practical Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          {/* Current Module */}
          {currentSectionData && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Module {currentSection + 1}: {currentSectionData.title}
                  </CardTitle>
                  <Badge variant="outline">
                    {currentSection + 1} of {module.content?.modules?.length || 0}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose max-w-none dark:prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: currentSectionData.content }} />
                </div>

                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                  >
                    Previous
                  </Button>
                  
                  {currentSection === (module.content?.modules?.length || 0) - 1 ? (
                    <div className="space-x-2">
                      <Button onClick={handleSectionComplete}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete Course
                      </Button>
                      {completed && (
                        <Button onClick={handleStartQuiz} className="bg-green-600 hover:bg-green-700">
                          <Award className="h-4 w-4 mr-2" />
                          Take Quiz
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button onClick={handleSectionComplete}>
                      Complete Module
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Module Navigation */}
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {module.content?.modules?.map((section: any, index: number) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      index === currentSection 
                        ? "bg-primary/10 border border-primary/20" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setCurrentSection(index)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      index < currentSection ? "bg-green-500 text-white" :
                      index === currentSection ? "bg-primary text-primary-foreground" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {index < currentSection ? <CheckCircle className="h-3 w-3" /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <span className={index === currentSection ? "font-medium" : ""}>
                        {section.title}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        {section.duration} min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objectives">
          <Card>
            <CardHeader>
              <CardTitle>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {module.content?.learning_objectives?.map((objective: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Target className="h-5 w-5 mt-0.5 text-primary" />
                    <span>{objective}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises">
          <Card>
            <CardHeader>
              <CardTitle>Practical Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {module.content?.practical_exercises?.map((exercise: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Target className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <h4 className="font-medium">Exercise {index + 1}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{exercise}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}