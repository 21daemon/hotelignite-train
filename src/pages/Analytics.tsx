import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Target, 
  Users, 
  BookOpen,
  Calendar,
  BarChart3
} from "lucide-react";
import { getUserProgress, getUserCertificates } from "@/services/training-service";
import { format, subDays, eachDayOfInterval } from "date-fns";

export default function Analytics() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const [progress, certificates] = await Promise.all([
          getUserProgress(user.id),
          getUserCertificates(user.id)
        ]);

        // Calculate analytics data
        const totalModules = progress.length;
        const completedModules = progress.filter(p => p.completed).length;
        const inProgressModules = progress.filter(p => p.progress > 0 && !p.completed).length;
        const averageProgress = progress.reduce((sum, p) => sum + p.progress, 0) / totalModules;
        const totalTimeSpent = progress.reduce((sum, p) => sum + (p.training_modules?.duration || 0), 0);
        
        // Category breakdown
        const categoryData = progress.reduce((acc: any, p) => {
          const category = p.training_modules?.category || 'Unknown';
          const formattedCategory = category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
          
          if (!acc[formattedCategory]) {
            acc[formattedCategory] = { total: 0, completed: 0 };
          }
          acc[formattedCategory].total++;
          if (p.completed) acc[formattedCategory].completed++;
          return acc;
        }, {});

        const categoryChartData = Object.entries(categoryData).map(([name, data]: [string, any]) => ({
          name,
          completed: data.completed,
          total: data.total,
          percentage: Math.round((data.completed / data.total) * 100)
        }));

        // Level breakdown
        const levelData = progress.reduce((acc: any, p) => {
          const level = p.training_modules?.level || 'Unknown';
          const formattedLevel = level.charAt(0).toUpperCase() + level.slice(1);
          
          if (!acc[formattedLevel]) {
            acc[formattedLevel] = { total: 0, completed: 0 };
          }
          acc[formattedLevel].total++;
          if (p.completed) acc[formattedLevel].completed++;
          return acc;
        }, {});

        const levelChartData = Object.entries(levelData).map(([name, data]: [string, any]) => ({
          name,
          completed: data.completed,
          total: data.total,
          percentage: Math.round((data.completed / data.total) * 100)
        }));

        // Recent activity (simulated)
        const last7Days = eachDayOfInterval({
          start: subDays(new Date(), 6),
          end: new Date()
        });

        const activityData = last7Days.map(date => ({
          date: format(date, 'MMM dd'),
          progress: Math.floor(Math.random() * 30) + 10,
          timeSpent: Math.floor(Math.random() * 60) + 15
        }));

        // Certificate performance
        const certificateData = certificates.map(cert => ({
          module: cert.training_modules?.title || 'Unknown',
          score: cert.score,
          date: format(new Date(cert.issue_date), 'MMM dd')
        }));

        setAnalytics({
          overview: {
            totalModules,
            completedModules,
            inProgressModules,
            averageProgress: Math.round(averageProgress),
            totalTimeSpent,
            certificatesEarned: certificates.length
          },
          categoryData: categoryChartData,
          levelData: levelChartData,
          activityData,
          certificateData
        });
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [user]);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center py-10">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
            <p className="mt-2 text-sm text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">No Data Available</h2>
          <p className="text-muted-foreground mt-2">Start completing training modules to see your analytics.</p>
        </div>
      </div>
    );
  }

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Learning Analytics</h1>
        <p className="text-muted-foreground">Track your training progress and performance</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.totalModules}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.overview.completedModules} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.averageProgress}%</div>
            <Progress value={analytics.overview.averageProgress} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(analytics.overview.totalTimeSpent / 60)}h</div>
            <p className="text-xs text-muted-foreground">
              {analytics.overview.totalTimeSpent % 60}m additional
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.certificatesEarned}</div>
            <p className="text-xs text-muted-foreground">Earned to date</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList>
          <TabsTrigger value="progress">Progress Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Progress by Category</CardTitle>
                <CardDescription>Completion status across different training categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="hsl(var(--primary))" />
                    <Bar dataKey="total" fill="hsl(var(--muted))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Level Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Training by Level</CardTitle>
                <CardDescription>Distribution of completed training by difficulty level</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics.levelData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="completed"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {analytics.levelData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Progress</CardTitle>
              <CardDescription>Individual module completion status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.categoryData.map((category: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="outline">
                          {category.completed}/{category.total}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {category.percentage}%
                      </span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Certificate Scores */}
          <Card>
            <CardHeader>
              <CardTitle>Certificate Performance</CardTitle>
              <CardDescription>Your quiz scores and certification achievements</CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.certificateData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.certificateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="module" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12">
                  <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium">No certificates yet</p>
                  <p className="text-sm text-muted-foreground">Complete training modules and pass quizzes to earn certificates</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Activity</CardTitle>
              <CardDescription>Your training activity over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Progress Made (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="timeSpent" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    name="Time Spent (min)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}