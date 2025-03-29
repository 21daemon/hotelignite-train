
import { ReactNode, useState, useEffect } from "react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/layout/user-nav";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Navbar } from "@/components/layout/navbar";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Close sidebar when route changes
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile, isOpen]);
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  
  // Close sidebar when clicked outside on mobile
  const handleMainClick = () => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Overlay for mobile when sidebar is open */}
        {isMobile && isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
        
        <aside className={cn(
          "border-r bg-muted/40 w-64 flex-shrink-0 flex-col overflow-y-auto z-50",
          isMobile && "fixed inset-y-0 transition-transform transform-gpu h-full",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0"
        )}>
          <div className="h-16 border-b flex items-center px-6">
            <h2 className="text-lg font-semibold">Navigation</h2>
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto"
                onClick={toggleSidebar}
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="p-4">
            <SidebarNav />
          </div>
        </aside>
        
        <main className="flex-1 overflow-y-auto" onClick={handleMainClick}>
          {isMobile && (
            <Button
              variant="outline"
              size="sm"
              className="fixed bottom-4 right-4 z-40 rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
              onClick={toggleSidebar}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="container py-6 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
