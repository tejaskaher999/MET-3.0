
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const students = [
  { 
    id: 1, 
    name: "Rahul Sharma", 
    grNumber: "N04112100064",
    branch: "Computer Engineering",
    company: "TechCorp Solutions",
    position: "Software Developer",
    applicationDate: "Apr 15, 2025",
    status: "direct",
    cgpa: 8.5
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    grNumber: "N04112100065",
    branch: "Information Technology",
    company: "TechCorp Solutions",
    position: "Software Developer",
    applicationDate: "Apr 15, 2025",
    status: "referral",
    cgpa: 9.2
  },
  { 
    id: 3, 
    name: "Ajay Kumar", 
    grNumber: "N04112100066",
    branch: "Computer Engineering",
    company: "Global Systems Inc.",
    position: "Network Engineer",
    applicationDate: "Apr 14, 2025",
    status: "alumni",
    cgpa: 8.7
  },
  { 
    id: 4, 
    name: "Neha Singh", 
    grNumber: "N04112100067",
    branch: "Information Technology",
    company: "InfoTech Solutions",
    position: "Software Engineer",
    applicationDate: "Apr 12, 2025",
    status: "direct",
    cgpa: 8.9
  },
  { 
    id: 5, 
    name: "Vikram Malhotra", 
    grNumber: "N04112100068",
    branch: "Computer Engineering",
    company: "Global Systems Inc.",
    position: "System Administrator",
    applicationDate: "Apr 10, 2025",
    status: "referral",
    cgpa: 7.8
  },
];

const TPOViewAppliedStudents = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredStudents = activeTab === "all" 
    ? students 
    : students.filter(student => student.status === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Applied Students</h1>
        <p className="text-muted-foreground">View all students who have applied for job opportunities.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>Students who have applied for various positions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="direct">Direct</TabsTrigger>
              <TabsTrigger value="referral">Referral</TabsTrigger>
              <TabsTrigger value="alumni">Alumni</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>GR Number</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Application Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.grNumber}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>{student.company}</TableCell>
                  <TableCell>{student.position}</TableCell>
                  <TableCell>{student.applicationDate}</TableCell>
                  <TableCell>{student.cgpa}</TableCell>
                  <TableCell>
                    <Badge variant={
                      student.status === "direct" ? "default" : 
                      student.status === "referral" ? "secondary" : 
                      "outline"
                    }>
                      {student.status === "direct" ? "Direct" : 
                       student.status === "referral" ? "Referral" : 
                       "Alumni"}
                    </Badge>
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

export default TPOViewAppliedStudents;
