import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAssignments } from "@/contexts/AssignmentContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { FileText, Plus } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";

const subjects = [
  "Database Management Systems",
  "Computer Networks",
  "Operating Systems",
  "Web Development",
  "Data Structures",
  "Software Engineering",
  "Artificial Intelligence",
  "Computer Graphics",
  "Mobile App Development",
  "Cyber Security"
];

const students = [
  { id: "N04112100064", name: " Student1 " },
  { id: "N04112100065", name: "Jane Student" }
];

const StaffUploadAssignment = () => {
  const { user } = useAuth();
  const { addAssignment } = useAssignments();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [uploadTimeDeadline, setUploadTimeDeadline] = useState("23:59");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!title) {
      toast({
        title: "Error",
        description: "Please enter a title",
        variant: "destructive"
      });
      return;
    }

    if (!description) {
      toast({
        title: "Error",
        description: "Please enter a description",
        variant: "destructive"
      });
      return;
    }

    if (!subject) {
      toast({
        title: "Error",
        description: "Please select a subject",
        variant: "destructive"
      });
      return;
    }

    if (!dueDate) {
      toast({
        title: "Error",
        description: "Please select a due date",
        variant: "destructive"
      });
      return;
    }

    if (!uploadTimeDeadline) {
      toast({
        title: "Error",
        description: "Please set an upload time deadline",
        variant: "destructive"
      });
      return;
    }

    if (!selectedStudent) {
      toast({
        title: "Error",
        description: "Please select a student",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addAssignment({
        title,
        description,
        subject,
        dueDate: dueDate.toISOString().split('T')[0],
        uploadTimeDeadline,
        createdBy: user?.id || "",
        studentId: selectedStudent,
        studentName: students.find(s => s.id === selectedStudent)?.name
      });
      
      setIsSubmitting(false);
      setTitle("");
      setDescription("");
      setSubject("");
      setDueDate(undefined);
      setUploadTimeDeadline("23:59");
      setSelectedStudent("");
      
      toast({
        title: "Success",
        description: "Assignment created successfully",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Create Assignment</h1>
      <p className="text-muted-foreground">Create and assign new assignments to students.</p>
      
      <Card className="shadow-lg transition-all hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-[#800000]/90 to-[#800000]/70 text-white">
          <CardTitle>New Assignment</CardTitle>
          <CardDescription className="text-white/80">Create a new assignment for students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title</Label>
              <Input 
                id="title" 
                placeholder="Enter title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(sub => (
                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter assignment description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <DatePicker
                selected={dueDate}
                onSelect={setDueDate}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="uploadTimeDeadline">Upload Time Deadline</Label>
              <Input
                id="uploadTimeDeadline"
                type="time"
                value={uploadTimeDeadline}
                onChange={(e) => setUploadTimeDeadline(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="student">Assign To Student</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger id="student">
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map(student => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} ({student.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 px-6 py-4 border-t">
          <Button 
            className="bg-[#800000] hover:bg-[#900000]" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Creating Assignment...</>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Assignment
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StaffUploadAssignment;
