import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock, CheckCircle } from "lucide-react";

interface CourseModule {
  title: string;
  duration: number;
  content: string;
}

interface CourseContentProps {
  modules: CourseModule[];
  onComplete: () => void;
}

export function CourseContent({ modules, onComplete }: CourseContentProps) {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const handleModuleComplete = () => {
    const newCompleted = [...completedModules, currentModule];
    setCompletedModules(newCompleted);

    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
    } else {
      // All modules completed
      onComplete();
    }
  };

  const isModuleCompleted = (index: number) => completedModules.includes(index);
  const canAccessModule = (index: number) => index === 0 || isModuleCompleted(index - 1);
  const progressPercent = (completedModules.length / modules.length) * 100;

  const currentModuleData = modules[currentModule];

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Course Content</h1>
          <Badge variant="outline">
            Module {currentModule + 1} of {modules.length}
          </Badge>
        </div>
        <Progress value={progressPercent} className="h-2" />
        <p className="text-sm text-muted-foreground mt-1">
          {completedModules.length} of {modules.length} modules completed
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Module Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Course Modules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {modules.map((module, index) => (
                <Button
                  key={index}
                  variant={
                    index === currentModule
                      ? "default"
                      : isModuleCompleted(index)
                      ? "secondary"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => canAccessModule(index) && setCurrentModule(index)}
                  disabled={!canAccessModule(index)}
                  className="w-full justify-start text-left h-auto p-3"
                >
                  <div className="flex items-start gap-2 w-full">
                    <div className="flex-shrink-0 mt-0.5">
                      {isModuleCompleted(index) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : index === currentModule ? (
                        <PlayCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs">{module.title}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        {module.duration} min
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Module Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{currentModuleData.title}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {currentModuleData.duration} minutes
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Content */}
              <div 
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: currentModuleData.content }}
              />

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentModule(Math.max(0, currentModule - 1))}
                  disabled={currentModule === 0}
                >
                  Previous Module
                </Button>

                <div className="space-x-2">
                  {!isModuleCompleted(currentModule) && (
                    <Button onClick={handleModuleComplete}>
                      {currentModule === modules.length - 1 ? "Complete Course" : "Complete Module"}
                    </Button>
                  )}
                  
                  {isModuleCompleted(currentModule) && currentModule < modules.length - 1 && (
                    <Button onClick={() => setCurrentModule(currentModule + 1)}>
                      Next Module
                    </Button>
                  )}

                  {isModuleCompleted(currentModule) && currentModule === modules.length - 1 && (
                    <Button onClick={onComplete}>
                      Take Quiz
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}