import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const currentResults = [
  { subject: "Database Management Systems", code: "CS301", credits: 4, marks: 87, grade: "A", status: "Passed" },
  { subject: "Computer Networks", code: "CS302", credits: 4, marks: 75, grade: "B+", status: "Passed" },
  { subject: "Operating Systems", code: "CS303", credits: 4, marks: 82, grade: "A-", status: "Passed" },
  { subject: "Web Development", code: "CS304", credits: 3, marks: 90, grade: "A+", status: "Passed" },
  { subject: "Data Structures", code: "CS305", credits: 4, marks: 78, grade: "B+", status: "Passed" },
  { subject: "Mathematics for Computing", code: "MA301", credits: 3, marks: 65, grade: "C+", status: "Passed" }
];

const previousResults = [
  { subject: "Programming Fundamentals", code: "CS101", credits: 4, marks: 88, grade: "A", status: "Passed" },
  { subject: "Digital Logic Design", code: "CS102", credits: 4, marks: 72, grade: "B", status: "Passed" },
  { subject: "Calculus", code: "MA101", credits: 3, marks: 80, grade: "A-", status: "Passed" },
  { subject: "Physics", code: "PH101", credits: 3, marks: 75, grade: "B+", status: "Passed" },
  { subject: "Communication Skills", code: "EN101", credits: 2, marks: 85, grade: "A", status: "Passed" },
  { subject: "Introduction to Computing", code: "CS103", credits: 3, marks: 90, grade: "A+", status: "Passed" }
];

const StudentResult = () => {
  const totalCredits = currentResults.reduce((acc, subject) => acc + subject.credits, 0);
  const earnedCredits = currentResults.filter(subject => subject.status === "Passed").reduce((acc, subject) => acc + subject.credits, 0);
  const averageMarks = currentResults.reduce((acc, subject) => acc + subject.marks, 0) / currentResults.length;
  
  const calculateGPA = (results) => {
    const gradePoints = {
      "A+": 10, "A": 9, "A-": 8,
      "B+": 7, "B": 6, "B-": 5,
      "C+": 4, "C": 3, "C-": 2,
      "D": 1, "F": 0
    };
    
    const totalPoints = results.reduce((acc, subject) => acc + (gradePoints[subject.grade] * subject.credits), 0);
    const totalCredits = results.reduce((acc, subject) => acc + subject.credits, 0);
    
    return (totalPoints / totalCredits).toFixed(2);
  };
  
  const currentGPA = calculateGPA(currentResults);
  const previousGPA = calculateGPA(previousResults);
  const cgpa = ((parseFloat(currentGPA) + parseFloat(previousGPA)) / 2).toFixed(2);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Academic Results</h1>
      <p className="text-muted-foreground">View your semester-wise academic performance.</p>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CGPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{cgpa}</div>
            <Progress className="mt-2" value={parseFloat(cgpa) * 10} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{earnedCredits}/{totalCredits}</div>
            <Progress className="mt-2" value={(earnedCredits / totalCredits) * 100} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Marks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageMarks.toFixed(1)}%</div>
            <Progress className="mt-2" value={averageMarks} />
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current Semester (V)</TabsTrigger>
          <TabsTrigger value="previous">Previous Semester (IV)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Semester V Results</CardTitle>
              <CardDescription>GPA: {currentGPA}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{result.subject}</TableCell>
                      <TableCell>{result.code}</TableCell>
                      <TableCell>{result.credits}</TableCell>
                      <TableCell>{result.marks}</TableCell>
                      <TableCell>{result.grade}</TableCell>
                      <TableCell>
                        <Badge variant={result.status === "Passed" ? "default" : "destructive"}>
                          {result.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="previous">
          <Card>
            <CardHeader>
              <CardTitle>Semester IV Results</CardTitle>
              <CardDescription>GPA: {previousGPA}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previousResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{result.subject}</TableCell>
                      <TableCell>{result.code}</TableCell>
                      <TableCell>{result.credits}</TableCell>
                      <TableCell>{result.marks}</TableCell>
                      <TableCell>{result.grade}</TableCell>
                      <TableCell>
                        <Badge variant={result.status === "Passed" ? "default" : "destructive"}>
                          {result.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentResult;
