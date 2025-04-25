import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/contexts/SidebarContext";

export function MenuButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="xl:hidden"
      onClick={toggleSidebar}
      aria-label="Toggle menu"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
} 