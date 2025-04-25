import {
  Home, HardHat, CalendarDays, UserCircle, Calendar, FileEdit, BarChart3, Building,
  User, Key, DollarSign, FileCheck, FileText, Download, AlertTriangle, Workflow,
  Mail, FileQuestion, Database, Upload, BookOpen
} from "lucide-react";
import { type ComponentType } from 'react';
import { type NavItem } from "../types";

export const StaffNavItems: NavItem[] = [
  { title: "Home", path: "/staff", icon: Home },
  { 
    title: "HR Department",
    path: "#",
    icon: HardHat,
    children: [
      {
        title: "HR Handbook",
        path: "/book.pdf", // Move PDF to public folder root
        icon: BookOpen
      },
      { title: "Holiday Calendar", path: "/staff/hr/holiday-calendar", icon: CalendarDays }
    ]
  },
  { 
    title: "Personal",  
    path: "#", 
    icon: UserCircle,
    children: [
      { title: "Profile", path: "/staff/personal/profile", icon: User },
      { title: "Change Password", path: "/staff/personal/change-password", icon: Key },
      { title: "Salary Details", path: "/staff/personal/salary", icon: DollarSign },
      { title: "Insurance Details", path: "/staff/personal/insurance", icon: FileCheck }
    ]
  },
  { 
    title: "Timetable", 
    path: "#", 
    icon: Calendar,
    children: [
      { title: "Staff Timetable", path: "/staff/timetable/staff", icon: Calendar },
      { title: "Student Timetable", path: "/staff/timetable/student", icon: Calendar }
    ]
  },
  { 
    title: "Student Assignment", 
    path: "#", 
    icon: FileEdit,
    children: [
      { title: "Upload Assignment", path: "/staff/assignment/upload", icon: Upload },
      { title: "View Assignment", path: "/staff/assignment/view", icon: FileText }
    ]
  },
  { title: "Result", path: "/staff/result", icon: BarChart3 },
  { 
    title: "TPO", 
    path: "#", 
    icon: Building,
    children: [
      { title: "View Company", path: "/staff/tpo/company", icon: Building },
    ]
  },
  { title: "Leaves", path: "/staff/leaves", icon: Calendar },
  { 
    title: "Self Appraisal", 
    path: "#", 
    icon: FileText,
    children: [
      { title: "Professional Endeavors", path: "/staff/appraisal/professional", icon: FileText },
      { title: "Download Appraisal", path: "/staff/appraisal/download", icon: Download }
    ]
  },
  { title: "Grievance", path: "/staff/grievance", icon: AlertTriangle },
  { 
    title: "SWOC", 
    path: "#", 
    icon: Workflow,
    children: [
      { title: "Guidelines", path: "/staff/swoc/guidelines", icon: FileText },
      { title: "SWOC Entry", path: "/staff/swoc/entry", icon: FileEdit }
    ]
  },
  { title: "Visiting Letter", path: "/staff/visiting-letter", icon: Mail },
  { 
    title: "Admission Enquiry", 
    path: "#", 
    icon: FileQuestion,
    children: [
      { title: "Admission Enquiry", path: "/staff/admission/enquiry", icon: FileQuestion },
      { title: "Counselor Remark", path: "/staff/admission/counselor", icon: FileText }
    ]
  },
  { 
    title: "Ematerial", 
    path: "#", 
    icon: Database,
    children: [
      { title: "Upload Ematerial", path: "/staff/ematerial/upload", icon: Upload },
      { title: "Download Ematerial", path: "/staff/ematerial/download", icon: Download }
    ]
  }
];
