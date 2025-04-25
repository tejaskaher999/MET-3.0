
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
    selectionRound: "Final",
    status: "Selected for Offer"
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    grNumber: "N04112100065",
    branch: "Information Technology",
    company: "TechCorp Solutions",
    position: "Software Developer",
    selectionRound: "HR",
    status: "HR Round Cleared"
  },
  { 
    id: 3, 
    name: "Ajay Kumar", 
    grNumber: "N04112100066",
    branch: "Computer Engineering",
    company: "Global Systems Inc.",
    position: "Network Engineer",
    selectionRound: "Technical",
    status: "Technical Round Cleared"
  },
  { 
    id: 4, 
    name: "Neha Singh", 
    grNumber: "N04112100067",
    branch: "Information Technology",
    company: "InfoTech Solutions",
    position: "Software Engineer",
    selectionRound: "Aptitude",
    status: "Aptitude Test Cleared"
  },
  { 
    id: 5, 
    name: "Vikram Malhotra", 
    grNumber: "N04112100068",
    branch: "Computer Engineering",
    company: "Global Systems Inc.",
    position: "System Administrator",
    selectionRound: "GD",
    status: "Group Discussion Cleared"
  },
];

const TPOSelectedStudents = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Selected Students</h1>
        <p className="text-muted-foreground">View students who have cleared various rounds in the selection process.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aptitude Round</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground mt-1">Students cleared</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Technical Round</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">Students cleared</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">HR Round</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1">Students cleared</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Final Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground mt-1">Offers received</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Selection Status</CardTitle>
          <CardDescription>Students at various stages of the selection process</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="all">All Rounds</TabsTrigger>
              <TabsTrigger value="aptitude">Aptitude</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="hr">HR</TabsTrigger>
              <TabsTrigger value="final">Final</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>GR Number</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Selection Round</TableHead>
                    <TableHead>Status</TableHead>
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
                      <TableCell>{student.selectionRound}</TableCell>
                      <TableCell>
                        <Badge variant={
                          student.selectionRound === "Final" ? "default" : 
                          student.selectionRound === "HR" ? "secondary" : 
                          "outline"
                        }>
                          {student.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="aptitude">
              <p className="text-muted-foreground mb-4">Students who have cleared the aptitude test</p>
              {/* Aptitude tab content */}
            </TabsContent>
            
            <TabsContent value="technical">
              <p className="text-muted-foreground mb-4">Students who have cleared the technical round</p>
              {/* Technical tab content */}
            </TabsContent>
            
            <TabsContent value="hr">
              <p className="text-muted-foreground mb-4">Students who have cleared the HR round</p>
              {/* HR tab content */}
            </TabsContent>
            
            <TabsContent value="final">
              <p className="text-muted-foreground mb-4">Students who have received final offers</p>
              {/* Final tab content */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TPOSelectedStudents;
