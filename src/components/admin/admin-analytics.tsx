import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, BookOpen, Award, Clock } from "lucide-react";

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Track training progress and platform performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Learners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">187</div>
              <Badge variant="default" className="bg-green-100 text-green-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Course Completions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">342</div>
              <Badge variant="default" className="bg-green-100 text-green-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4" />
              Certifications Issued
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">156</div>
              <Badge variant="default" className="bg-green-100 text-green-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Avg. Completion Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2.3h</div>
              <Badge variant="secondary" className="bg-red-100 text-red-700">
                <TrendingDown className="h-3 w-3 mr-1" />
                -5%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Completion rates by course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fire Safety Fundamentals</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Emergency Response</span>
                <span>87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Kitchen Fire Safety</span>
                <span>79%</span>
              </div>
              <Progress value={79} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Evacuation Procedures</span>
                <span>84%</span>
              </div>
              <Progress value={84} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Progress</CardTitle>
            <CardDescription>Training completion by department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Front Desk</span>
                <span>95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Housekeeping</span>
                <span>88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Food Service</span>
                <span>82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Maintenance</span>
                <span>76%</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest training activities across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Smith completed "Fire Safety Fundamentals"</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Sarah Johnson started "Emergency Response"</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
              <Badge variant="outline">In Progress</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New course "Kitchen Fire Safety" was published</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
              <Badge variant="outline">Published</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Mike Davis earned certification in "Basic Fire Safety"</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
              <Badge variant="outline">Certified</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}