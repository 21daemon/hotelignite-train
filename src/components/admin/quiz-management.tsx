import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, HelpCircle } from "lucide-react";
import { getAllQuizzes, deleteQuiz, getAllTrainingModules } from "@/services/admin-service";
import { useToast } from "@/hooks/use-toast";

export function QuizManagement() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [quizzesData, modulesData] = await Promise.all([
        getAllQuizzes(),
        getAllTrainingModules()
      ]);
      setQuizzes(quizzesData || []);
      setModules(modulesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load quizzes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteQuiz = async (id: string) => {
    try {
      await deleteQuiz(id);
      toast({
        title: "Success",
        description: "Quiz deleted successfully.",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast({
        title: "Error",
        description: "Failed to delete quiz.",
        variant: "destructive",
      });
    }
  };

  const getModuleTitle = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    return module?.title || "Unknown Module";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quiz Management</h2>
          <p className="text-muted-foreground">Create and manage course quizzes</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Quiz
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg line-clamp-2">{quiz.title}</CardTitle>
                <Badge variant="secondary">
                  {quiz.questions?.length || 0} questions
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {getModuleTitle(quiz.module_id)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Questions:</span>
                  <span>{quiz.questions?.length || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{new Date(quiz.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteQuiz(quiz.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {quizzes.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No quizzes found</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create quizzes to test knowledge for your training courses.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Quiz
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}