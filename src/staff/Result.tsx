
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Download, FileText, Search, Upload, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StaffResult = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Result Management</h1>
      <p className="text-muted-foreground">Manage examination results for students.</p>
      
      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload Results</TabsTrigger>
          <TabsTrigger value="view">View Results</TabsTrigger>
          <TabsTrigger value="analysis">Result Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Examination Results</CardTitle>
              <CardDescription>Upload and publish results for a specific course and class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="examType">Examination Type</Label>
                  <Select>
                    <SelectTrigger id="examType">
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="midterm">Mid-Term Examination</SelectItem>
                      <SelectItem value="endterm">End-Term Examination</SelectItem>
                      <SelectItem value="internal">Internal Assessment</SelectItem>
                      <SelectItem value="practical">Practical Examination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course">Select Course</Label>
                  <Select>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dbms">Database Management Systems</SelectItem>
                      <SelectItem value="webdev">Web Development</SelectItem>
                      <SelectItem value="advdbms">Advanced DBMS</SelectItem>
                      <SelectItem value="se">Software Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="class">Select Class</Label>
                  <Select>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bca4">BCA Semester 4</SelectItem>
                      <SelectItem value="bca6">BCA Semester 6</SelectItem>
                      <SelectItem value="mca2">MCA Semester 2</SelectItem>
                      <SelectItem value="mca4">MCA Semester 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="examDate">Examination Date</Label>
                  <Input id="examDate" type="date" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resultFile">Upload Result File</Label>
                <Input id="resultFile" type="file" />
                <p className="text-xs text-muted-foreground">
                  Upload Excel sheet (.xlsx) or CSV file with student results. 
                  <a href="#" className="text-primary ml-1">Download template</a>
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="remark">Additional Remarks (Optional)</Label>
                <Textarea id="remark" rows={3} placeholder="Any additional information about this result..." />
              </div>
              
              <div className="flex flex-col space-y-2 p-4 bg-muted rounded-lg">
                <h3 className="font-medium">Result Publishing Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="publish-immediately" name="publish-option" />
                    <Label htmlFor="publish-immediately" className="text-sm font-normal">Publish Immediately</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="publish-scheduled" name="publish-option" />
                    <Label htmlFor="publish-scheduled" className="text-sm font-normal">Schedule Publishing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="publish-manual" name="publish-option" defaultChecked />
                    <Label htmlFor="publish-manual" className="text-sm font-normal">Publish Manually Later</Label>
                  </div>
                </div>
                <div className="mt-2">
                  <Input type="datetime-local" disabled placeholder="Select publish date and time" />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  Save as Draft
                </Button>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload and Process
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="view">
          <Card>
            <CardHeader>
              <CardTitle>View Examination Results</CardTitle>
              <CardDescription>Browse and manage uploaded examination results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="grid flex-1">
                  <Label htmlFor="resultSearch" className="sr-only">Search results</Label>
                  <Input id="resultSearch" placeholder="Search by course or class..." />
                </div>
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Results" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Exam Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { 
                      id: 1, 
                      course: "Database Management Systems", 
                      class: "BCA Semester 4", 
                      examType: "Mid-Term Examination", 
                      date: "2023-03-15", 
                      status: "Published"
                    },
                    { 
                      id: 2, 
                      course: "Web Development", 
                      class: "MCA Semester 2", 
                      examType: "Internal Assessment", 
                      date: "2023-04-10", 
                      status: "Published"
                    },
                    { 
                      id: 3, 
                      course: "Software Engineering", 
                      class: "MCA Semester 1", 
                      examType: "Mid-Term Examination", 
                      date: "2023-03-20", 
                      status: "Published"
                    },
                    { 
                      id: 4, 
                      course: "Advanced DBMS", 
                      class: "MCA Semester 2", 
                      examType: "Practical Examination", 
                      date: "2023-04-05", 
                      status: "Draft"
                    }
                  ].map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          {result.course}
                        </div>
                      </TableCell>
                      <TableCell>{result.class}</TableCell>
                      <TableCell>{result.examType}</TableCell>
                      <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={result.status === "Published" ? "default" : "secondary"}>
                          {result.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                          {result.status === "Draft" && (
                            <Button size="sm">Publish</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Result Analysis</CardTitle>
              <CardDescription>Statistical analysis of examination results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="analysisCourse">Select Course</Label>
                  <Select>
                    <SelectTrigger id="analysisCourse">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dbms">Database Management Systems</SelectItem>
                      <SelectItem value="webdev">Web Development</SelectItem>
                      <SelectItem value="advdbms">Advanced DBMS</SelectItem>
                      <SelectItem value="se">Software Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="analysisClass">Select Class</Label>
                  <Select>
                    <SelectTrigger id="analysisClass">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bca4">BCA Semester 4</SelectItem>
                      <SelectItem value="bca6">BCA Semester 6</SelectItem>
                      <SelectItem value="mca2">MCA Semester 2</SelectItem>
                      <SelectItem value="mca4">MCA Semester 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">76.2%</div>
                    <p className="text-xs text-muted-foreground">
                      +5.3% from last semester
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Pass Percentage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92.8%</div>
                    <p className="text-xs text-muted-foreground">
                      +2.1% from last semester
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Top Scorer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">95.0%</div>
                    <p className="text-xs text-muted-foreground">
                      John Student (N04112100064)
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>A Grade (90-100%)</span>
                          <span>15%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "15%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>B Grade (75-89%)</span>
                          <span>40%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: "40%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>C Grade (60-74%)</span>
                          <span>30%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>D Grade (45-59%)</span>
                          <span>8%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-orange-500" style={{ width: "8%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>F Grade (Below 45%)</span>
                          <span>7%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: "7%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Metric</TableHead>
                            <TableHead>Current</TableHead>
                            <TableHead>Previous</TableHead>
                            <TableHead>Change</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Average Score</TableCell>
                            <TableCell>76.2%</TableCell>
                            <TableCell>70.9%</TableCell>
                            <TableCell className="text-green-600">+5.3%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Pass Percentage</TableCell>
                            <TableCell>92.8%</TableCell>
                            <TableCell>90.7%</TableCell>
                            <TableCell className="text-green-600">+2.1%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">A Grade Students</TableCell>
                            <TableCell>15.0%</TableCell>
                            <TableCell>12.5%</TableCell>
                            <TableCell className="text-green-600">+2.5%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Fail Rate</TableCell>
                            <TableCell>7.2%</TableCell>
                            <TableCell>9.3%</TableCell>
                            <TableCell className="text-green-600">-2.1%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Analysis Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffResult;
