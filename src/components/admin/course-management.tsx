import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, BookOpen } from "lucide-react";
import { getAllTrainingModules, deleteTrainingModule } from "@/services/admin-service";
import { useToast } from "@/hooks/use-toast";
import { CourseForm } from "./course-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function CourseManagement() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getAllTrainingModules();
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast({
        title: "Error",
        description: "Failed to load courses.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteTrainingModule(id);
      toast({
        title: "Success",
        description: "Course deleted successfully.",
      });
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      toast({
        title: "Error",
        description: "Failed to delete course.",
        variant: "destructive",
      });
    }
  };

  const handleEditCourse = (course: any) => {
    setSelectedCourse(course);
    setShowForm(true);
  };

  const handleCreateCourse = () => {
    setSelectedCourse(null);
    setShowForm(true);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-700 hover:bg-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-700 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
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
          <h2 className="text-2xl font-bold">Course Management</h2>
          <p className="text-muted-foreground">Create and manage training courses</p>
        </div>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateCourse}>
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedCourse ? "Edit Course" : "Create New Course"}
              </DialogTitle>
              <DialogDescription>
                {selectedCourse 
                  ? "Update the course details below." 
                  : "Fill in the details to create a new training course."
                }
              </DialogDescription>
            </DialogHeader>
            <CourseForm 
              course={selectedCourse} 
              onSuccess={() => {
                setShowForm(false);
                fetchCourses();
              }}
              onCancel={() => setShowForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              {course.image_url && (
                <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                  <img 
                    src={course.image_url} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <Badge variant="secondary" className={getLevelColor(course.level)}>
                  {course.level}
                </Badge>
              </div>
              <CardDescription className="line-clamp-3">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{course.duration} minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="capitalize">{course.category.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Roles:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {course.roles?.slice(0, 3).map((role: string) => (
                      <Badge key={role} variant="outline" className="text-xs">
                        {role.replace('_', ' ')}
                      </Badge>
                    ))}
                    {course.roles?.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.roles.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditCourse(course)}
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Course</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{course.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteCourse(course.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {courses.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground text-center mb-4">
                Get started by creating your first training course.
              </p>
              <Button onClick={handleCreateCourse}>
                <Plus className="mr-2 h-4 w-4" />
                Create Course
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}