import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Shield, Mail } from "lucide-react";

export function UserManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-2">
              <CardTitle className="text-lg">John Smith</CardTitle>
              <Badge variant="default">Admin</Badge>
            </div>
            <CardDescription>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                john.smith@hotel.com
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Courses Completed:</span>
                <span>12/15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Active:</span>
                <span>2 hours ago</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-2">
              <CardTitle className="text-lg">Sarah Johnson</CardTitle>
              <Badge variant="secondary">Manager</Badge>
            </div>
            <CardDescription>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                sarah.johnson@hotel.com
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Courses Completed:</span>
                <span>8/10</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Active:</span>
                <span>1 day ago</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-2">
              <CardTitle className="text-lg">Mike Davis</CardTitle>
              <Badge variant="outline">Receptionist</Badge>
            </div>
            <CardDescription>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                mike.davis@hotel.com
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Courses Completed:</span>
                <span>5/8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Active:</span>
                <span>3 days ago</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">245</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Admins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">28</div>
              <div className="text-sm text-muted-foreground">Managers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">205</div>
              <div className="text-sm text-muted-foreground">Staff</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}