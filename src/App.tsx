import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/main-layout";
import { useEffect } from "react";
import { initializeApp } from "@/services/init-service";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Training from "./pages/Training";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Schedule from "./pages/Schedule";
import Certifications from "./pages/Certifications";
import NotFound from "./pages/NotFound";
import CourseDetail from "./pages/CourseDetail";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  }
});

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }
  
  return <>{children}</>;
};

// Public route that redirects if already logged in
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  // Initialize app with data if user is logged in
  useEffect(() => {
    if (user) {
      initializeApp().catch(console.error);
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      <Route path="/auth" element={
        <PublicRoute>
          <Auth />
        </PublicRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/training" element={
        <ProtectedRoute>
          <MainLayout>
            <Training />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/training/:id" element={
        <ProtectedRoute>
          <MainLayout>
            <CourseDetail />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/analytics" element={
        <ProtectedRoute>
          <MainLayout>
            <Analytics />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/schedule" element={
        <ProtectedRoute>
          <Schedule />
        </ProtectedRoute>
      } />

      <Route path="/certifications" element={
        <ProtectedRoute>
          <Certifications />
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
