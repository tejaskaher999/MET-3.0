
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, FileText } from "lucide-react";

// Sample data
const resumes = [
  { 
    id: 1, 
    studentName: "Rahul Sharma", 
    grNumber: "N04112100064",
    branch: "Computer Engineering",
    lastUpdated: "Apr 10, 2025",
    status: "Verified",
    skills: ["JavaScript", "React", "Node.js"]
  },
  { 
    id: 2, 
    studentName: "Priya Patel", 
    grNumber: "N04112100065",
    branch: "Information Technology",
    lastUpdated: "Apr 12, 2025",
    status: "Verified",
    skills: ["Python", "Data Science", "Machine Learning"]
  },
  { 
    id: 3, 
    studentName: "Ajay Kumar", 
    grNumber: "N04112100066",
    branch: "Computer Engineering",
    lastUpdated: "Apr 5, 2025",
    status: "Needs Review",
    skills: ["Java", "Spring Boot", "MySQL"]
  },
  { 
    id: 4, 
    studentName: "Neha Singh", 
    grNumber: "N04112100067",
    branch: "Information Technology",
    lastUpdated: "Apr 15, 2025",
    status: "Verified",
    skills: ["UI/UX", "Adobe XD", "Figma"]
  },
  { 
    id: 5, 
    studentName: "Vikram Malhotra", 
    grNumber: "N04112100068",
    branch: "Computer Engineering",
    lastUpdated: "Apr 8, 2025",
    status: "Needs Review",
    skills: ["Android", "Kotlin", "Firebase"]
  },
];

const TPOStudentResumes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Resumes</h1>
        <p className="text-muted-foreground">View and manage student resume submissions.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">123</div>
            <p className="text-xs text-muted-foreground mt-1">Submitted resumes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98</div>
            <p className="text-xs text-muted-foreground mt-1">80% verification rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Needs Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting verification</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Resume Management</CardTitle>
          <CardDescription>View and verify student resumes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>GR Number</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Key Skills</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resumes.map(resume => (
                <TableRow key={resume.id}>
                  <TableCell className="font-medium">{resume.studentName}</TableCell>
                  <TableCell>{resume.grNumber}</TableCell>
                  <TableCell>{resume.branch}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {resume.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{resume.lastUpdated}</TableCell>
                  <TableCell>
                    <Badge variant={resume.status === "Verified" ? "default" : "secondary"}>
                      {resume.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TPOStudentResumes;
