
import { Home, User, Key, Calendar, FileText, BarChart3, DollarSign, Building, AlertTriangle, Database, CheckSquare, BookOpen, Upload, Download, FileCheck } from "lucide-react";
import { type NavItem } from "../types";

export const StudentNavItems: NavItem[] = [
  { title: "Home", path: "/student", icon: Home },
  { title: "Admission Request Application", path: "/student/admission-request", icon: FileText },
  { title: "Update Profile", path: "/student/update-profile", icon: User },
  { title: "Change Password", path: "/student/change-password", icon: Key },
  { title: "Timetable", path: "/student/timetable", icon: Calendar },
  { 
    title: "Assignment", 
    path: "#", 
    icon: FileText,  
    children: [
      { title: "Upload Assignment", path: "/student/assignment/upload", icon: Upload },
      { title: "View Assignment", path: "/student/assignment/view", icon: FileText }
    ]
  },
  { title: "Result", path: "/student/result", icon: BarChart3 },
  { title: "TPO Department", path: "/student/tpo", icon: Building },
  { 
    title: "Accounts", 
    path: "#",  
    icon: DollarSign,
    children: [
      { title: "Outstanding Details", path: "/student/accounts/outstanding", icon: FileText },
      { title: "Download Receipt", path: "/student/accounts/receipt", icon: Download },
      { title: "Refund Application", path: "/student/accounts/refund", icon: FileText }
    ]
  },
  { 
    title: "Hostel", 
    path: "#", 
    icon: Building,
    children: [
      { title: "Hostel Admission", path: "/student/hostel/admission", icon: FileText },
      { title: "Hostel Feature", path: "/student/hostel/feature", icon: Building }
    ]
  },
  { title: "Grievance", path: "/student/grievance", icon: AlertTriangle },
  { title: "Ematerial", path: "/student/ematerial", icon: Database },
  { title: "Course PO-PSO Justification", path: "/student/course-justification", icon: FileText },
  { title: "Feedback Form", path: "/student/feedback", icon: CheckSquare }
];
