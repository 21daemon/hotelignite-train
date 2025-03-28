
import { ReactNode, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/layout/user-nav";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Navbar } from "@/components/layout/navbar";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <aside className={cn(
          "border-r bg-muted/40 w-64 flex-shrink-0 flex-col overflow-y-auto",
          isMobile && "fixed inset-y-0 z-50 transition-transform transform-gpu",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0"
        )}>
          <div className="h-16 border-b flex items-center px-6">
            <h2 className="text-lg font-semibold">Navigation</h2>
          </div>
          <div className="p-4">
            <SidebarNav />
          </div>
        </aside>
        
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
