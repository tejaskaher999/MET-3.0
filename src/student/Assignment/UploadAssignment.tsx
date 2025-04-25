
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
import { Upload, UploadCloud } from "lucide-react"; // Changed FileUpload to Upload

const StudentUploadAssignment = () => {
  const { user } = useAuth();
  const { assignments, submitAssignment } = useAssignments();
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const pendingAssignments = assignments.filter(
    a => a.studentId === user?.id && a.status === "pending"
  );

  const handleSubmit = () => {
    if (!selectedAssignment) {
      toast({
        title: "Error",
        description: "Please select an assignment",
        variant: "destructive"
      });
      return;
    }

    if (!file) {
      toast({
        title: "Error",
        description: "Please upload a file",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      submitAssignment(selectedAssignment, {
        file: file.name,
        notes: description
      });
      
      setUploading(false);
      setSelectedAssignment("");
      setDescription("");
      setFile(null);
      
      toast({
        title: "Success",
        description: "Assignment submitted successfully",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Upload Assignment</h1>
      <p className="text-muted-foreground">Submit your assignments for evaluation.</p>
      
      <Card className="shadow-lg transition-all hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-[#800000]/90 to-[#800000]/70 text-white">
          <CardTitle>Assignment Submission</CardTitle>
          <CardDescription className="text-white/80">Upload your completed assignment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor="assignment">Select Assignment</Label>
            <Select 
              value={selectedAssignment} 
              onValueChange={setSelectedAssignment}
            >
              <SelectTrigger id="assignment">
                <SelectValue placeholder="Select assignment" />
              </SelectTrigger>
              <SelectContent>
                {pendingAssignments.map(assignment => (
                  <SelectItem key={assignment.id} value={assignment.id}>
                    {assignment.title} - {assignment.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea 
              id="description" 
              placeholder="Any notes for your professor..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Upload File</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center gap-2 transition-colors hover:border-[#800000]/50 cursor-pointer"
                 onClick={() => document.getElementById('fileInput')?.click()}>
              <UploadCloud className="h-10 w-10 text-[#800000]/60" />
              <p className="text-sm text-center font-medium">
                {file ? file.name : "Drag and drop or click to upload"}
              </p>
              <p className="text-xs text-muted-foreground text-center">
                Allowed file types: PDF, DOCX, ZIP (Max: 10MB)
              </p>
              <Input 
                id="fileInput" 
                type="file" 
                className="hidden" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 px-6 py-4 border-t">
          <Button 
            className="bg-[#800000] hover:bg-[#900000]" 
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> {/* Changed FileUpload to Upload */}
                Submit Assignment
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentUploadAssignment;
