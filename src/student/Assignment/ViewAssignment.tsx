
import { useAuth } from "@/contexts/AuthContext";
import { useAssignments } from "@/contexts/AssignmentContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, Star } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const StudentViewAssignment = () => {
  const { user } = useAuth();
  const { assignments } = useAssignments();
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  
  const studentAssignments = assignments.filter(a => a.studentId === user?.id);
  const viewedAssignment = studentAssignments.find(a => a.id === selectedAssignment);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "submitted": return "bg-blue-500";
      case "pending": return "bg-yellow-500";
      case "late": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating: number | undefined) => {
    if (!rating) return "-";
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight">View Assignments</h1>
      <p className="text-muted-foreground">Track your assignments and check feedback.</p>
      
      <Card className="shadow-lg transition-all hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-[#800000]/90 to-[#800000]/70 text-white">
          <CardTitle>Assignment List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentAssignments.map((assignment) => (
                <TableRow key={assignment.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{assignment.subject}</TableCell>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{formatDate(assignment.dueDate)}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(assignment.status)} text-white`}
                    >
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {renderStars(assignment.rating)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setSelectedAssignment(assignment.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {assignment.submissionFile && (
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {studentAssignments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No assignments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedAssignment} onOpenChange={(open) => !open && setSelectedAssignment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{viewedAssignment?.title}</DialogTitle>
            <DialogDescription>
              {viewedAssignment?.subject} - Due on {viewedAssignment?.dueDate ? formatDate(viewedAssignment.dueDate) : 'N/A'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">Description</h4>
              <p className="text-sm">{viewedAssignment?.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Status</h4>
                <Badge className={`${getStatusColor(viewedAssignment?.status || "pending")} text-white`}>
                  {viewedAssignment?.status?.charAt(0).toUpperCase() + viewedAssignment?.status?.slice(1)}
                </Badge>
              </div>
              
              {viewedAssignment?.submissionDate && (
                <div>
                  <h4 className="font-semibold mb-1">Submitted On</h4>
                  <p className="text-sm">{formatDate(viewedAssignment.submissionDate)}</p>
                </div>
              )}
            </div>

            {viewedAssignment?.submissionFile && (
              <div>
                <h4 className="font-semibold mb-1">Submission</h4>
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span className="text-sm">{viewedAssignment.submissionFile}</span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                </div>
              </div>
            )}

            {viewedAssignment?.rating && (
              <div>
                <h4 className="font-semibold mb-1">Professor's Rating</h4>
                <div className="flex">
                  {renderStars(viewedAssignment.rating)}
                  <span className="ml-2 text-sm">{viewedAssignment.rating}/5</span>
                </div>
              </div>
            )}

            {viewedAssignment?.remarks && (
              <div>
                <h4 className="font-semibold mb-1">Professor's Remarks</h4>
                <div className="bg-gray-50 p-3 rounded border text-sm">
                  {viewedAssignment.remarks}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentViewAssignment;
