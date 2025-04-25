
import { BookOpen, BookMarked } from "lucide-react";
import { type NavItem } from "../types";
import { StudentNavItems } from "./StudentNavItems";

export const getStudentNavigation = (): NavItem[] => {
  return [
    ...StudentNavItems,
    { 
      title: "Library", 
      path: "#", 
      icon: BookOpen,
      children: [
        { title: "Issue Book", path: "/student/library/issue", icon: BookOpen },
        { title: "Allocated Books", path: "/student/library/allocated", icon: BookMarked }
      ]
    }
  ];
};
 