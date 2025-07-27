import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import { createTrainingModule, updateTrainingModule } from "@/services/admin-service";
import { useToast } from "@/hooks/use-toast";
import { TrainingModule } from "@/types/training";

const ROLE_OPTIONS = [
  { value: "admin", label: "Administrator" },
  { value: "manager", label: "Manager" },
  { value: "receptionist", label: "Receptionist" },
  { value: "housekeeping", label: "Housekeeping" },
  { value: "security", label: "Security" },
  { value: "maintenance", label: "Maintenance" },
  { value: "food_service", label: "Food Service" },
];

const CATEGORY_OPTIONS = [
  { value: "fire_safety", label: "Fire Safety" },
  { value: "emergency_response", label: "Emergency Response" },
  { value: "equipment", label: "Equipment" },
  { value: "evacuation", label: "Evacuation" },
  { value: "first_aid", label: "First Aid" },
] as const;

const LEVEL_OPTIONS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

interface CourseModule {
  title: string;
  duration: number;
  content: string;
}

interface CourseFormProps {
  course?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CourseForm({ course, onSuccess, onCancel }: CourseFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState(60);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [learningObjectives, setLearningObjectives] = useState<string[]>([""]);
  const [practicalExercises, setPracticalExercises] = useState<string[]>([""]);

  // Initialize form with course data if editing
  useEffect(() => {
    if (course) {
      setTitle(course.title || "");
      setDescription(course.description || "");
      setCategory(course.category || "");
      setLevel(course.level || "");
      setDuration(course.duration || 60);
      setImageUrl(course.image_url || "");
      setSelectedRoles(course.roles || []);
      
      // Parse content if it exists
      if (course.content) {
        setModules(course.content.modules || []);
        setLearningObjectives(course.content.learning_objectives || [""]);
        setPracticalExercises(course.content.practical_exercises || [""]);
      } else {
        setModules([]);
        setLearningObjectives([""]);
        setPracticalExercises([""]);
      }
    }
  }, [course]);

  const handleRoleChange = (roleValue: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles([...selectedRoles, roleValue]);
    } else {
      setSelectedRoles(selectedRoles.filter(role => role !== roleValue));
    }
  };

  const addModule = () => {
    setModules([...modules, { title: "", duration: 20, content: "" }]);
  };

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const updateModule = (index: number, field: keyof CourseModule, value: string | number) => {
    const updatedModules = [...modules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    setModules(updatedModules);
  };

  const addObjective = () => {
    setLearningObjectives([...learningObjectives, ""]);
  };

  const removeObjective = (index: number) => {
    setLearningObjectives(learningObjectives.filter((_, i) => i !== index));
  };

  const updateObjective = (index: number, value: string) => {
    const updated = [...learningObjectives];
    updated[index] = value;
    setLearningObjectives(updated);
  };

  const addExercise = () => {
    setPracticalExercises([...practicalExercises, ""]);
  };

  const removeExercise = (index: number) => {
    setPracticalExercises(practicalExercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, value: string) => {
    const updated = [...practicalExercises];
    updated[index] = value;
    setPracticalExercises(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !level || selectedRoles.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const courseData = {
        title,
        description,
        category: category as TrainingModule['category'],
        level: level as TrainingModule['level'],
        duration,
        imageUrl,
        roles: selectedRoles as TrainingModule['roles'],
        content: {
          modules: modules.filter(m => m.title.trim()),
          learning_objectives: learningObjectives.filter(obj => obj.trim()),
          practical_exercises: practicalExercises.filter(ex => ex.trim()),
        },
      };

      if (course) {
        await updateTrainingModule(course.id, courseData);
        toast({
          title: "Success",
          description: "Course updated successfully.",
        });
      } else {
        await createTrainingModule(courseData);
        toast({
          title: "Success", 
          description: "Course created successfully.",
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error("Error saving course:", error);
      toast({
        title: "Error",
        description: "Failed to save course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="objectives">Objectives & Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes) *</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                min="1"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Level *</Label>
              <Select value={level} onValueChange={setLevel} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVEL_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Target Roles *</Label>
            <div className="grid grid-cols-2 gap-2">
              {ROLE_OPTIONS.map((role) => (
                <div key={role.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={role.value}
                    checked={selectedRoles.includes(role.value)}
                    onCheckedChange={(checked) => handleRoleChange(role.value, checked as boolean)}
                  />
                  <Label htmlFor={role.value} className="text-sm">
                    {role.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Course Modules</h3>
            <Button type="button" onClick={addModule} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Module
            </Button>
          </div>

          {modules.map((module, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Module {index + 1}</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeModule(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label>Module Title</Label>
                    <Input
                      value={module.title}
                      onChange={(e) => updateModule(index, "title", e.target.value)}
                      placeholder="Enter module title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (min)</Label>
                    <Input
                      type="number"
                      value={module.duration}
                      onChange={(e) => updateModule(index, "duration", parseInt(e.target.value))}
                      min="1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Module Content (HTML)</Label>
                  <Textarea
                    value={module.content}
                    onChange={(e) => updateModule(index, "content", e.target.value)}
                    placeholder="Enter module content (HTML supported)"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {modules.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground mb-4">No modules added yet</p>
                <Button type="button" onClick={addModule} variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Module
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="objectives" className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Learning Objectives</h3>
              <Button type="button" onClick={addObjective} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Objective
              </Button>
            </div>
            {learningObjectives.map((objective, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={objective}
                  onChange={(e) => updateObjective(index, e.target.value)}
                  placeholder="Enter learning objective"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeObjective(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Practical Exercises</h3>
              <Button type="button" onClick={addExercise} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Exercise
              </Button>
            </div>
            {practicalExercises.map((exercise, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Textarea
                  value={exercise}
                  onChange={(e) => updateExercise(index, e.target.value)}
                  placeholder="Enter practical exercise description"
                  rows={2}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeExercise(index)}
                  className="mt-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : course ? "Update Course" : "Create Course"}
        </Button>
      </div>
    </form>
  );
}