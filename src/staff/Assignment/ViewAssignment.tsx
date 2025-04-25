import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAssignments } from "@/contexts/AssignmentContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const StaffViewAssignment = () => {
  const { user } = useAuth();
  const { assignments, gradeAssignment } = useAssignments();
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [remarks, setRemarks] = useState<string>("");
  const [status, setStatus] = useState<"completed" | "late">("completed");
  
  const staffAssignments = assignments.filter(a => a.createdBy === user?.id);
  const viewedAssignment = assignments.find(a => a.id === selectedAssignment);

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

  const handleSubmitGrade = () => {
    if (!selectedAssignment) return;
    
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating",
        variant: "destructive"
      });
      return;
    }
    
    if (!remarks.trim()) {
      toast({
        title: "Error",
        description: "Please provide feedback remarks",
        variant: "destructive"
      });
      return;
    }
    
    gradeAssignment(selectedAssignment, {
      rating,
      remarks,
      status
    });
    
    toast({
      title: "Success",
      description: "Assignment graded successfully"
    });
    
    setSelectedAssignment(null);
    setRating(0);
    setRemarks("");
    setStatus("completed");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight">View Student Assignments</h1>
      <p className="text-muted-foreground">Review and grade student submissions.</p>
      
      <Card className="shadow-lg transition-all hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-[#800000]/90 to-[#800000]/70 text-white">
          <CardTitle>Assignment Submissions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffAssignments.map((assignment) => (
                <TableRow key={assignment.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{assignment.studentId}</TableCell>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{assignment.subject}</TableCell>
                  <TableCell>{formatDate(assignment.dueDate)}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(assignment.status)} text-white`}
                    >
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedAssignment(assignment.id);
                        setRating(assignment.rating || 0);
                        setRemarks(assignment.remarks || "");
                        setStatus(assignment.status === "late" ? "late" : "completed");
                      }}
                      disabled={assignment.status === "pending"}
                    >
                      {assignment.status === "submitted" ? "Grade" : "View"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {staffAssignments.length === 0 && (
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{viewedAssignment?.title}</DialogTitle>
            <DialogDescription>
              {viewedAssignment?.subject} - Due on {viewedAssignment?.dueDate ? formatDate(viewedAssignment.dueDate) : 'N/A'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Student ID</h4>
                <p className="text-sm">{viewedAssignment?.studentId}</p>
              </div>
              
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

            {viewedAssignment?.status === "submitted" && (
              <>
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Grade Assignment</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Status</Label>
                      <div className="flex gap-2 mt-1">
                        <Button 
                          variant={status === "completed" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setStatus("completed")}
                          className={status === "completed" ? "bg-[#800000]" : ""}
                        >
                          Completed
                        </Button>
                        <Button 
                          variant={status === "late" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setStatus("late")}
                          className={status === "late" ? "bg-[#800000]" : ""}
                        >
                          Late Submission
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Rating</Label>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-6 w-6 cursor-pointer ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                            onClick={() => setRating(star)}
                          />
                        ))}
                        <span className="ml-2 text-sm">{rating > 0 ? `${rating}/5` : ""}</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="remarks">Feedback Remarks</Label>
                      <Textarea
                        id="remarks"
                        placeholder="Provide feedback to the student..."
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button onClick={handleSubmitGrade} className="bg-[#800000] hover:bg-[#900000]">
                    Submit Grading
                  </Button>
                </DialogFooter>
              </>
            )}

            {viewedAssignment?.status !== "submitted" && viewedAssignment?.rating && (
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Grade Information</h4>
                
                <div className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 ${star <= (viewedAssignment.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 text-sm">{viewedAssignment.rating}/5</span>
                    </div>
                  </div>
                  
                  {viewedAssignment.remarks && (
                    <div>
                      <Label>Feedback Remarks</Label>
                      <div className="bg-gray-50 p-3 rounded border mt-1">
                        {viewedAssignment.remarks}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffViewAssignment;
