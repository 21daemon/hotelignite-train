import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Award, RotateCcw } from "lucide-react";
import { getModuleQuiz, issueCertificate } from "@/services/training-service";
import { useAuth } from "@/contexts/AuthContext";
import { Quiz } from "@/types/training";
import { toast } from "@/components/ui/use-toast";

interface CourseQuizProps {
  moduleId: string;
  onComplete: (score: number) => void;
}

export function CourseQuiz({ moduleId, onComplete }: CourseQuizProps) {
  const { user } = useAuth();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        const quizData = await getModuleQuiz(moduleId);
        setQuiz(quizData);
      } catch (error) {
        console.error("Failed to load quiz:", error);
        toast({
          title: "Error",
          description: "Failed to load quiz. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [moduleId]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleNext = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quiz || !user) return;

    setSubmitting(true);
    
    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      const correctOption = question.options.find(opt => opt.isCorrect);
      if (correctOption && userAnswer === correctOption.id) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);

    // Issue certificate if passed
    if (finalScore >= 70) {
      try {
        await issueCertificate(user.id, moduleId, finalScore);
        toast({
          title: "Certificate Earned!",
          description: `Congratulations! You've earned your certification with a score of ${finalScore}%.`,
        });
      } catch (error) {
        console.error("Failed to issue certificate:", error);
      }
    }

    setSubmitting(false);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const handleFinish = () => {
    onComplete(score);
  };

  if (loading) {
    return (
      <div className="container py-8 max-w-2xl mx-auto">
        <div className="flex justify-center py-10">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
            <p className="mt-2 text-sm text-muted-foreground">Loading quiz...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container py-8 max-w-2xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Quiz Not Available</h2>
          <p className="text-muted-foreground mt-2">No quiz found for this course.</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="container py-8 max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {score >= 70 ? (
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl">
              {score >= 70 ? "Congratulations!" : "Quiz Complete"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <div className="text-4xl font-bold mb-2">{score}%</div>
              <p className="text-muted-foreground">
                You answered {quiz.questions.filter(q => {
                  const userAnswer = answers[q.id];
                  const correctOption = q.options.find(opt => opt.isCorrect);
                  return correctOption && userAnswer === correctOption.id;
                }).length} out of {quiz.questions.length} questions correctly.
              </p>
            </div>

            {score >= 70 ? (
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  🎉 You've passed the quiz and earned your certification!
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                  Your certificate has been added to your profile.
                </p>
              </div>
            ) : (
              <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
                <p className="text-amber-800 dark:text-amber-200 font-medium">
                  You need 70% or higher to earn certification.
                </p>
                <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">
                  Review the course material and try again.
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              {score < 70 && (
                <Button onClick={handleRetake} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
              )}
              <Button onClick={handleFinish}>
                {score >= 70 ? "View Certificate" : "Back to Course"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const allQuestionsAnswered = quiz.questions.every(q => answers[q.id]);

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentQ.text}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={answers[currentQ.id] || ""}
            onValueChange={(value) => handleAnswerSelect(currentQ.id, value)}
          >
            {currentQ.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <div className="space-x-2">
              {currentQuestion === quiz.questions.length - 1 ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered || submitting}
                >
                  {submitting ? "Submitting..." : "Submit Quiz"}
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  disabled={!answers[currentQ.id]}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Navigation */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Question Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {quiz.questions.map((_, index) => (
              <Button
                key={index}
                variant={index === currentQuestion ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentQuestion(index)}
                className="relative"
              >
                {index + 1}
                {answers[quiz.questions[index].id] && (
                  <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-green-500" />
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}