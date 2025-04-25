import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { NavItem } from "./NavItem";
import { getStudentNavigation } from "./navigation/StudentNav";
import { StaffNavItems } from "./navigation/StaffNav";
import { TPONavItems } from "./navigation/TPONav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

interface SidebarWrapperProps {
  role: "student" | "staff" | "tpo";
}

const SidebarWrapper = ({ role }: SidebarWrapperProps) => {
  const { isOpen, closeSidebar } = useSidebar();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  let navItems = [];
  
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsLargeScreen(width > 1023);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  switch (role) {
    case "student":
      navItems = getStudentNavigation();
      break;
    case "staff":
      navItems = StaffNavItems; 
      break;
    case "tpo":
      navItems = TPONavItems;
      break;
  }

  const showOverlay = isOpen && !isLargeScreen;
  const sidebarVisible = isLargeScreen || (!isLargeScreen && isOpen);
 
  return (
    <>
      {/* Overlay - only show on smaller screens when sidebar is open */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "w-80 bg-black border-r border-gray-800 shrink-0 h-[calc(100vh-4rem)] fixed top-16 left-0",
        "transition-transform duration-300 ease-in-out",
        // Increase z-index to appear above content
        !isLargeScreen ? "z-50" : "z-30",
        {
          "translate-x-0": sidebarVisible,
          "-translate-x-full": !sidebarVisible
        }
      )}>
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="mb-6">
              <h2 className="text-sm font-semibold uppercase text-white">
                {role === "student" ? "Student Portal" : 
                 role === "staff" ? "Staff Portal" : 
                 "TPO Portal"}
              </h2>
            </div>
            
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
            </nav>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default SidebarWrapper;
