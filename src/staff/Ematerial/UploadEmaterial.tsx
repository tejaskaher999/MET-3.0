
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload } from "lucide-react";

const StaffUploadEmaterial = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Upload E-Learning Material</h1>
      <p className="text-muted-foreground">Upload and manage e-learning materials for students.</p>
      
      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload Material</TabsTrigger>
          <TabsTrigger value="manage">Manage Uploads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload E-Learning Material</CardTitle>
              <CardDescription>Provide learning materials for your courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="materialTitle">Material Title</Label>
                  <Input id="materialTitle" placeholder="Enter title of the learning material" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="materialType">Material Type</Label>
                  <Select>
                    <SelectTrigger id="materialType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="notes">Lecture Notes</SelectItem>
                      <SelectItem value="presentation">Presentation Slides</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                      <SelectItem value="reference">Reference Material</SelectItem>
                      <SelectItem value="video">Video Lecture</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dbms">Database Management Systems</SelectItem>
                      <SelectItem value="webdev">Web Development</SelectItem>
                      <SelectItem value="dsa">Data Structures and Algorithms</SelectItem>
                      <SelectItem value="os">Operating Systems</SelectItem>
                      <SelectItem value="cn">Computer Networks</SelectItem>
                      <SelectItem value="se">Software Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="program">Program & Semester</Label>
                  <Select>
                    <SelectTrigger id="program">
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bca1">BCA Semester 1</SelectItem>
                      <SelectItem value="bca2">BCA Semester 2</SelectItem>
                      <SelectItem value="bca3">BCA Semester 3</SelectItem>
                      <SelectItem value="bca4">BCA Semester 4</SelectItem>
                      <SelectItem value="bca5">BCA Semester 5</SelectItem>
                      <SelectItem value="bca6">BCA Semester 6</SelectItem>
                      <SelectItem value="mca1">MCA Semester 1</SelectItem>
                      <SelectItem value="mca2">MCA Semester 2</SelectItem>
                      <SelectItem value="mca3">MCA Semester 3</SelectItem>
                      <SelectItem value="mca4">MCA Semester 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a description of the material..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (optional)</Label>
                <Input id="tags" placeholder="Enter comma-separated tags, e.g., normalization, indexes, SQL" />
                <p className="text-xs text-muted-foreground">
                  Adding relevant tags helps students find your materials more easily.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="materialFile">Upload File</Label>
                <Input id="materialFile" type="file" />
                <p className="text-xs text-muted-foreground">
                  Accepted formats: PDF, PPTX, DOCX, ZIP, MP4 (max 50MB)
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <h3 className="text-sm font-medium">Visibility Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="visible-all" name="visibility" defaultChecked />
                    <Label htmlFor="visible-all" className="text-sm font-normal">Visible to All Students</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="visible-enrolled" name="visibility" />
                    <Label htmlFor="visible-enrolled" className="text-sm font-normal">Only Visible to Enrolled Students</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="visible-scheduled" name="visibility" />
                    <Label htmlFor="visible-scheduled" className="text-sm font-normal">Schedule Visibility</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="visible-private" name="visibility" />
                    <Label htmlFor="visible-private" className="text-sm font-normal">Private (Only Visible to Me)</Label>
                  </div>
                </div>
                <div className="mt-2">
                  <Input type="datetime-local" disabled placeholder="Select publish date and time" />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Material
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Manage E-Learning Materials</CardTitle>
              <CardDescription>View and manage your uploaded materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="grid flex-1">
                  <Label htmlFor="materialSearch" className="sr-only">Search materials</Label>
                  <Input id="materialSearch" placeholder="Search by title or description..." />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="dbms">Database Management Systems</SelectItem>
                    <SelectItem value="webdev">Web Development</SelectItem>
                    <SelectItem value="dsa">Data Structures and Algorithms</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="notes">Lecture Notes</SelectItem>
                    <SelectItem value="presentation">Presentation Slides</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="reference">Reference Material</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Uploads</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Database Normalization Concepts
                      </div>
                    </TableCell>
                    <TableCell>DBMS</TableCell>
                    <TableCell>Lecture Notes</TableCell>
                    <TableCell>42</TableCell>
                    <TableCell><Badge variant="default">Public</Badge></TableCell>
                    <TableCell>Apr 10, 2023</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Web Development Project Guidelines
                      </div>
                    </TableCell>
                    <TableCell>Web Development</TableCell>
                    <TableCell>Tutorial</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell><Badge variant="secondary">Enrolled Only</Badge></TableCell>
                    <TableCell>Mar 25, 2023</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Sorting Algorithms Comparison
                      </div>
                    </TableCell>
                    <TableCell>DSA</TableCell>
                    <TableCell>Reference Material</TableCell>
                    <TableCell>35</TableCell>
                    <TableCell><Badge variant="default">Public</Badge></TableCell>
                    <TableCell>Mar 18, 2023</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing 3 of 24 materials
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffUploadEmaterial;
