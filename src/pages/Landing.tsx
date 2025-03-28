
import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm, SignupForm } from "@/components/auth/auth-forms";
import { Flame, ShieldCheck, Clock, Award, Users } from "lucide-react";

export default function Landing() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 border-b flex items-center px-6 justify-between">
        <Logo />
        <div className="hidden sm:flex gap-4">
          <Button variant="ghost" onClick={() => setActiveTab("login")}>Login</Button>
          <Button variant="ghost" onClick={() => setActiveTab("signup")}>Sign Up</Button>
          <Button className="bg-gradient-fire">Get Started</Button>
        </div>
      </header>

      <main className="flex-1 grid lg:grid-cols-2 gap-4 p-4 sm:p-8">
        <div className="space-y-8 flex flex-col justify-center">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text">Fire Safety Training for Hotel Staff</h1>
            <p className="text-lg text-gray-500">Interactive training modules tailored to each hotel role. Stay compliant, keep your team and guests safe.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-fire rounded-full p-2 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Role-Based Training</h3>
                <p className="text-sm text-gray-500">Customized for each hotel position</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-azure rounded-full p-2 text-white">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Self-Paced Learning</h3>
                <p className="text-sm text-gray-500">Complete modules at your own speed</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-mixed rounded-full p-2 text-white">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Certification</h3>
                <p className="text-sm text-gray-500">Earn recognized safety credentials</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-2 text-white">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Team Analytics</h3>
                <p className="text-sm text-gray-500">Track progress across departments</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex">
            <Button className="bg-gradient-fire" size="lg" onClick={() => setActiveTab("signup")}>
              Get Started Today
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center lg:p-8">
          <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <CardContent className="pt-6">
                <TabsContent value="login">
                  <div className="space-y-4">
                    <div className="space-y-2 text-center">
                      <h2 className="text-2xl font-bold">Welcome back</h2>
                      <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
                    </div>
                    <LoginForm />
                  </div>
                </TabsContent>
                <TabsContent value="signup">
                  <div className="space-y-4">
                    <div className="space-y-2 text-center">
                      <h2 className="text-2xl font-bold">Create an account</h2>
                      <p className="text-sm text-muted-foreground">Enter your details to create a new account</p>
                    </div>
                    <SignupForm />
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-fire-500" />
            <span className="text-sm font-medium">FireTrainPro © {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
