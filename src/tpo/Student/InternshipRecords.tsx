
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data
const internships = [
  { 
    id: 1, 
    studentName: "Rahul Sharma", 
    grNumber: "N04112100064",
    branch: "Computer Engineering",
    company: "TechCorp Solutions",
    position: "Web Developer Intern",
    duration: "2 months",
    period: "May-Jun 2025",
    stipend: "₹15,000/month",
    status: "Confirmed"
  },
  { 
    id: 2, 
    studentName: "Priya Patel", 
    grNumber: "N04112100065",
    branch: "Information Technology",
    company: "Global Systems Inc.",
    position: "Network Engineer Intern",
    duration: "3 months",
    period: "May-Jul 2025",
    stipend: "₹20,000/month",
    status: "Confirmed"
  },
  { 
    id: 3, 
    studentName: "Ajay Kumar", 
    grNumber: "N04112100066",
    branch: "Computer Engineering",
    company: "InfoTech Solutions",
    position: "Software Developer Intern",
    duration: "6 months",
    period: "May-Oct 2025",
    stipend: "₹25,000/month",
    status: "In Process"
  },
  { 
    id: 4, 
    studentName: "Neha Singh", 
    grNumber: "N04112100067",
    branch: "Information Technology",
    company: "Digital Innovators",
    position: "UI/UX Design Intern",
    duration: "2 months",
    period: "Jun-Jul 2025",
    stipend: "₹18,000/month",
    status: "Confirmed"
  },
  { 
    id: 5, 
    studentName: "Vikram Malhotra", 
    grNumber: "N04112100068",
    branch: "Computer Engineering",
    company: "TechCorp Solutions",
    position: "Android Developer Intern",
    duration: "3 months",
    period: "May-Jul 2025",
    stipend: "₹20,000/month",
    status: "In Process"
  },
];

const TPOInternshipRecords = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Internship Records</h1>
        <p className="text-muted-foreground">View all internship opportunities secured by students.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Internships</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
            <p className="text-xs text-muted-foreground mt-1">This academic year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">75% confirmation rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Stipend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18,500</div>
            <p className="text-xs text-muted-foreground mt-1">Per month</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Internship Details</CardTitle>
          <CardDescription>Students' internship records</CardDescription>
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
                <TableHead>Duration</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Stipend</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internships.map(internship => (
                <TableRow key={internship.id}>
                  <TableCell className="font-medium">{internship.studentName}</TableCell>
                  <TableCell>{internship.grNumber}</TableCell>
                  <TableCell>{internship.branch}</TableCell>
                  <TableCell>{internship.company}</TableCell>
                  <TableCell>{internship.position}</TableCell>
                  <TableCell>{internship.duration}</TableCell>
                  <TableCell>{internship.period}</TableCell>
                  <TableCell>{internship.stipend}</TableCell>
                  <TableCell>
                    <Badge variant={internship.status === "Confirmed" ? "default" : "secondary"}>
                      {internship.status}
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

export default TPOInternshipRecords;
