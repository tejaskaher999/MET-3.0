import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatNotifications } from "@/components/ChatNotifications";

interface LayoutProps {
  role: "student" | "staff" | "tpo";
}

const Layout = ({ role }: LayoutProps) => {
  const { user } = useAuth();
  const { isOpen } = useSidebar();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsLargeScreen(width > 1023);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar role={role} />
        <main className={cn(
          "flex-1 bg-gray-50",
          // Only add margin on large screens where sidebar is always visible
          isLargeScreen ? "ml-80" : "ml-0"
        )}>
          <div className={cn(
            "mx-auto p-6",
            "w-full",
            {
              "max-w-7xl": isLargeScreen,
              "max-w-3xl": !isLargeScreen
            }
          )}>
            <Outlet />
          </div>
        </main>
        <ChatNotifications />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
 