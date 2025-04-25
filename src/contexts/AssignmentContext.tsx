import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  uploadTimeDeadline: string; // Time in 24-hour format (HH:mm)
  createdBy: string;
  status: "pending" | "submitted" | "completed" | "late";
  submissionDate?: string;
  submissionFile?: string;
  rating?: number;
  remarks?: string;
  studentId?: string;
  studentName?: string;
}

interface AssignmentContextType {
  assignments: Assignment[];
  addAssignment: (assignment: Omit<Assignment, "id" | "status">) => void;
  submitAssignment: (id: string, submission: { file: string, notes?: string }) => void;
  gradeAssignment: (id: string, grading: { rating: number, remarks: string, status: "completed" | "late" }) => void;
  getStudentAssignments: (studentId: string) => Assignment[];
  getStaffAssignments: (staffId: string) => Assignment[];
  getAssignmentById: (id: string) => Assignment | undefined;
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined);

export function AssignmentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Database ER Diagrams",
      description: "Create an ER diagram for a college management system",
      subject: "Database Management Systems",
      dueDate: "2025-05-01",
      uploadTimeDeadline: "12:00",
      createdBy: "STAFF00001",
      status: "pending",
      studentId: "N04112100064"
    },
    {
      id: "2",
      title: "Network Protocol Analysis",
      description: "Analyze the TCP/IP protocol stack and explain its layers",
      subject: "Computer Networks",
      dueDate: "2025-05-05",
      uploadTimeDeadline: "12:00",
      createdBy: "STAFF00002",
      status: "pending",
      studentId: "N04112100064"
    },
  
  ]);

  const addAssignment = (assignment: Omit<Assignment, "id" | "status">) => {
    const newAssignment: Assignment = {
      ...assignment,
      id: Date.now().toString(),
      status: "pending"
    };
    
    setAssignments(prev => [...prev, newAssignment]);
  };

  const submitAssignment = (id: string, submission: { file: string, notes?: string }) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === id 
          ? { 
              ...assignment, 
              status: "submitted", 
              submissionDate: new Date().toISOString().split('T')[0],
              submissionFile: submission.file
            }
          : assignment
      )
    );
  };

  const gradeAssignment = (id: string, grading: { rating: number, remarks: string, status: "completed" | "late" }) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === id 
          ? { 
              ...assignment, 
              status: grading.status,
              rating: grading.rating,
              remarks: grading.remarks
            }
          : assignment
      )
    );
  };

  const getStudentAssignments = (studentId: string) => {
    return assignments.filter(assignment => assignment.studentId === studentId);
  };

  const getStaffAssignments = (staffId: string) => {
    return assignments.filter(assignment => assignment.createdBy === staffId);
  };

  const getAssignmentById = (id: string) => {
    return assignments.find(assignment => assignment.id === id);
  };

  return (
    <AssignmentContext.Provider 
      value={{ 
        assignments, 
        addAssignment, 
        submitAssignment, 
        gradeAssignment,
        getStudentAssignments,
        getStaffAssignments,
        getAssignmentById
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
}

export function useAssignments() {
  const context = useContext(AssignmentContext);
  if (context === undefined) {
    throw new Error("useAssignments must be used within an AssignmentProvider");
  }
  return context;
}
