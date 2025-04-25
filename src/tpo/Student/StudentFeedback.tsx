
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

// Sample data
const feedbacks = [
  { 
    id: 1, 
    studentName: "Rahul Sharma", 
    grNumber: "N04112100064",
    company: "TechCorp Solutions",
    position: "Software Developer",
    submissionDate: "Apr 15, 2025",
    rating: 4.5,
    status: "Positive"
  },
  { 
    id: 2, 
    studentName: "Priya Patel", 
    grNumber: "N04112100065",
    company: "Global Systems Inc.",
    position: "Network Engineer",
    submissionDate: "Apr 12, 2025",
    rating: 4.0,
    status: "Positive"
  },
  { 
    id: 3, 
    studentName: "Ajay Kumar", 
    grNumber: "N04112100066",
    company: "InfoTech Solutions",
    position: "Software Engineer",
    submissionDate: "Apr 10, 2025",
    rating: 3.5,
    status: "Neutral"
  },
  { 
    id: 4, 
    studentName: "Neha Singh", 
    grNumber: "N04112100067",
    company: "Digital Innovators",
    position: "UI/UX Designer",
    submissionDate: "Apr 8, 2025",
    rating: 4.8,
    status: "Positive"
  },
  { 
    id: 5, 
    studentName: "Vikram Malhotra", 
    grNumber: "N04112100068",
    company: "TechCorp Solutions",
    position: "Software Developer",
    submissionDate: "Apr 5, 2025",
    rating: 3.0,
    status: "Neutral"
  },
];

const TPOStudentFeedback = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Feedback</h1>
        <p className="text-muted-foreground">Review student feedback about recruitment processes and companies.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground mt-1">Received feedbacks</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5</div>
            <p className="text-xs text-muted-foreground mt-1">Across all companies</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Positive Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground mt-1">Rated above 4.0</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Feedback Summary</CardTitle>
          <CardDescription>Student feedback on recruitment processes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>GR Number</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.map(feedback => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium">{feedback.studentName}</TableCell>
                  <TableCell>{feedback.grNumber}</TableCell>
                  <TableCell>{feedback.company}</TableCell>
                  <TableCell>{feedback.position}</TableCell>
                  <TableCell>{feedback.submissionDate}</TableCell>
                  <TableCell>{feedback.rating}/5</TableCell>
                  <TableCell>
                    <Badge variant={
                      feedback.status === "Positive" ? "default" : 
                      feedback.status === "Neutral" ? "secondary" : 
                      "destructive"
                    }>
                      {feedback.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
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

export default TPOStudentFeedback;
