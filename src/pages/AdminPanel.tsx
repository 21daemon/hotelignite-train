import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, BookOpen, HelpCircle, Users, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { isUserAdmin } from "@/services/admin-service";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CourseManagement } from "@/components/admin/course-management";
import { QuizManagement } from "@/components/admin/quiz-management";
import { UserManagement } from "@/components/admin/user-management";
import { AdminAnalytics } from "@/components/admin/admin-analytics";

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        navigate("/auth");
        return;
      }

      try {
        const adminStatus = await isUserAdmin();
        if (!adminStatus) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access the admin panel.",
            variant: "destructive",
          });
          navigate("/dashboard");
          return;
        }
        setIsAdmin(true);
      } catch (error) {
        console.error("Error checking admin status:", error);
        toast({
          title: "Error",
          description: "Failed to verify admin access.",
          variant: "destructive",
        });
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [user, navigate, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage courses, quizzes, users, and analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+18 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <CourseManagement />
        </TabsContent>

        <TabsContent value="quizzes">
          <QuizManagement />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="analytics">
          <AdminAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}