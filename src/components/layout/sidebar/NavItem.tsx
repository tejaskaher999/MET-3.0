import { usePdfHandler } from '../../../hooks/usePdfHandler';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import { type NavItem as NavItemType } from "./types";

interface NavItemProps {
  item: NavItemType;
  level?: number;
}

export const NavItem = ({ item, level = 0 }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { closeSidebar } = useSidebar();
  const hasChildren = item.children && item.children.length > 0;
  const { handlePdfClick } = usePdfHandler();
  
  const toggleSubmenu = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }  
  };

  const handleClick = (e: React.MouseEvent) => {
    if (item.path && handlePdfClick(item.path)) {
      e.preventDefault();
      return;
    }

    if (!hasChildren) {
      // Only close sidebar if it's not a submenu toggle
      closeSidebar();
    }
    toggleSubmenu(e);
  };

  return (
    <div className={cn("nav-item", level > 0 && "ml-4")}>
      <NavLink
        to={hasChildren ? "#" : item.path}
        className={({ isActive }) => cn(
          "flex items-center gap-2 py-2 px-3 rounded-md text-sm relative",
          "transition-all duration-200 overflow-hidden",
          isActive && !hasChildren ? "bg-gray-800 text-white font-medium" : "text-gray-300 hover:text-white hover:bg-gray-800",
          "before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1",
          "before:transition-transform before:duration-200",
          isActive ? "before:transform-none before:bg-red-500" : "before:translate-x-[-100%]",
          level > 0 ? "pl-8" : "",
          hasChildren && isOpen ? "before:bg-red-500" : ""
        )}
        onClick={handleClick}
        end={item.path === "/student" || item.path === "/staff"}
      >
        <item.icon className="h-4 w-4" />
        <span className="flex-1">{item.title}</span>
        {hasChildren && (
          <ChevronDown 
            className={cn(
              "h-4 w-4 transition-transform", 
              isOpen && "transform rotate-180"
            )}
          />
        )}
      </NavLink>
      
      {hasChildren && isOpen && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child) => (
            <NavItem key={child.path} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
