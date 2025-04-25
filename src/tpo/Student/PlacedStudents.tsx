
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data
const students = [
  { 
    id: 1, 
    name: "Rahul Sharma", 
    grNumber: "N04112100064",
    branch: "Computer Engineering",
    company: "TechCorp Solutions",
    position: "Software Developer",
    package: "₹8.2L",
    joiningDate: "Jun 15, 2025"
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    grNumber: "N04112100065",
    branch: "Information Technology",
    company: "Global Systems Inc.",
    position: "Network Engineer",
    package: "₹7.5L",
    joiningDate: "Jun 20, 2025"
  },
  { 
    id: 3, 
    name: "Ajay Kumar", 
    grNumber: "N04112100066",
    branch: "Computer Engineering",
    company: "InfoTech Solutions",
    position: "Software Engineer",
    package: "₹6.8L",
    joiningDate: "Jul 1, 2025"
  },
  { 
    id: 4, 
    name: "Neha Singh", 
    grNumber: "N04112100067",
    branch: "Information Technology",
    company: "Digital Innovators",
    position: "Front-end Developer",
    package: "₹7.2L",
    joiningDate: "Jun 25, 2025"
  },
  { 
    id: 5, 
    name: "Vikram Malhotra", 
    grNumber: "N04112100068",
    branch: "Computer Engineering",
    company: "TechCorp Solutions",
    position: "Software Developer",
    package: "₹8.0L",
    joiningDate: "Jul 5, 2025"
  },
];

const TPOPlacedStudents = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Placed Students</h1>
        <p className="text-muted-foreground">View students who have received and accepted job offers.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Placed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 123 eligible students</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 5% from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹6.2L</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 12% from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Highest Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12.5L</div>
            <p className="text-xs text-muted-foreground mt-1">TechCorp Solutions</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Placement Statistics</CardTitle>
          <CardDescription>Students who have been placed in various companies</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>GR Number</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Joining Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.grNumber}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>{student.company}</TableCell>
                  <TableCell>{student.position}</TableCell>
                  <TableCell>
                    <Badge>{student.package}</Badge>
                  </TableCell>
                  <TableCell>{student.joiningDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TPOPlacedStudents;
