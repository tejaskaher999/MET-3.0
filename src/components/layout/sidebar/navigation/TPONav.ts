import { Home, User, Key, Building, FileText, CheckSquare, FileCheck, ClipboardList, Briefcase } from "lucide-react";
import { type NavItem } from "../types";

export const TPONavItems: NavItem[] = [
  { title: "Home", path: "/tpo", icon: Home },
  { 
    title: "TPO Profile", 
    path: "#", 
    icon: User,
    children: [
      { title: "Update Profile", path: "/tpo/profile/update", icon: User },
      { title: "Change Password", path: "/tpo/profile/change-password", icon: Key }
    ]
  },
  { 
    title: "Company Zone", 
    path: "#", 
    icon: Building,
    children: [
      { title: "Manage Companies", path: "/tpo/company/manage", icon: Building },
      { title: "Company History", path: "/tpo/company/history", icon: ClipboardList }
    ]
  },   
  { 
    title: "Student Zone", 
    path: "#", 
    icon: User,
    children: [
      { title: "View Applied Students", path: "/tpo/student/applied", icon: User },
      { title: "Selected Students", path: "/tpo/student/selected", icon: CheckSquare },
      { title: "Placed Students", path: "/tpo/student/placed", icon: FileCheck },
      { title: "Internship Records", path: "/tpo/student/internships", icon: FileText },
      { title: "Student Resumes", path: "/tpo/student/resumes", icon: FileText }
    ]
  },
  { title: "Student Feedback", path: "/tpo/student/feedback", icon: CheckSquare }
];
