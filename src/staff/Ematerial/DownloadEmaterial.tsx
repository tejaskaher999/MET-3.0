
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Search } from "lucide-react";

const StaffDownloadEmaterial = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Download E-Learning Materials</h1>
      <p className="text-muted-foreground">Browse and download e-learning materials from all departments.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Browse E-Learning Materials</CardTitle>
          <CardDescription>Search and download materials from all courses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="searchMaterial">Search</Label>
              <div className="flex items-center space-x-2">
                <Input id="searchMaterial" placeholder="Search by title, author, tags..." />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filterDepartment">Department</Label>
              <Select>
                <SelectTrigger id="filterDepartment">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="it">Information Technology</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filterType">Material Type</Label>
              <Select>
                <SelectTrigger id="filterType">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="notes">Lecture Notes</SelectItem>
                  <SelectItem value="presentation">Presentation Slides</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="reference">Reference Material</SelectItem>
                  <SelectItem value="video">Video Lecture</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="popular">
            <TabsList>
              <TabsTrigger value="popular">Popular Materials</TabsTrigger>
              <TabsTrigger value="recent">Recently Added</TabsTrigger>
              <TabsTrigger value="all">All Materials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Downloads</TableHead>
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
                    <TableCell>Dr. John Staff</TableCell>
                    <TableCell>Database Management Systems</TableCell>
                    <TableCell>
                      <Badge variant="outline">Lecture Notes</Badge>
                    </TableCell>
                    <TableCell>256</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Introduction to Neural Networks
                      </div>
                    </TableCell>
                    <TableCell>Prof. Emma Thompson</TableCell>
                    <TableCell>Artificial Intelligence</TableCell>
                    <TableCell>
                      <Badge variant="outline">Presentation</Badge>
                    </TableCell>
                    <TableCell>198</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Operating Systems Architecture
                      </div>
                    </TableCell>
                    <TableCell>Dr. Sarah Wilson</TableCell>
                    <TableCell>Operating Systems</TableCell>
                    <TableCell>
                      <Badge variant="outline">Reference</Badge>
                    </TableCell>
                    <TableCell>187</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Web Development Best Practices
                      </div>
                    </TableCell>
                    <TableCell>Prof. Michael Chen</TableCell>
                    <TableCell>Web Development</TableCell>
                    <TableCell>
                      <Badge variant="outline">Tutorial</Badge>
                    </TableCell>
                    <TableCell>165</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="recent">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Added On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Cloud Computing Architecture
                      </div>
                    </TableCell>
                    <TableCell>Dr. Robert Johnson</TableCell>
                    <TableCell>Cloud Computing</TableCell>
                    <TableCell>
                      <Badge variant="outline">Lecture Notes</Badge>
                    </TableCell>
                    <TableCell>Apr 18, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Software Testing Methodologies
                      </div>
                    </TableCell>
                    <TableCell>Prof. Anita Gupta</TableCell>
                    <TableCell>Software Engineering</TableCell>
                    <TableCell>
                      <Badge variant="outline">Presentation</Badge>
                    </TableCell>
                    <TableCell>Apr 16, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Cybersecurity Fundamentals
                      </div>
                    </TableCell>
                    <TableCell>Dr. David Kumar</TableCell>
                    <TableCell>Network Security</TableCell>
                    <TableCell>
                      <Badge variant="outline">Reference</Badge>
                    </TableCell>
                    <TableCell>Apr 15, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Added On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Merged content from both popular and recent tabs, plus more */}
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Database Normalization Concepts
                      </div>
                    </TableCell>
                    <TableCell>Dr. John Staff</TableCell>
                    <TableCell>Database Management Systems</TableCell>
                    <TableCell>
                      <Badge variant="outline">Lecture Notes</Badge>
                    </TableCell>
                    <TableCell>Mar 10, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Introduction to Neural Networks
                      </div>
                    </TableCell>
                    <TableCell>Prof. Emma Thompson</TableCell>
                    <TableCell>Artificial Intelligence</TableCell>
                    <TableCell>
                      <Badge variant="outline">Presentation</Badge>
                    </TableCell>
                    <TableCell>Feb 22, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        Cloud Computing Architecture
                      </div>
                    </TableCell>
                    <TableCell>Dr. Robert Johnson</TableCell>
                    <TableCell>Cloud Computing</TableCell>
                    <TableCell>
                      <Badge variant="outline">Lecture Notes</Badge>
                    </TableCell>
                    <TableCell>Apr 18, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="flex justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing 3 of 48 materials
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>E-Learning Material Collections</CardTitle>
          <CardDescription>Curated collections of learning materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Programming Fundamentals</CardTitle>
                <CardDescription>Complete learning resources for beginners</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  A collection of materials covering programming basics, algorithms, 
                  data structures, and object-oriented concepts.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">15 items</span>
                  <Button variant="outline" size="sm">View Collection</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Database Technologies</CardTitle>
                <CardDescription>Advanced SQL and NoSQL resources</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive materials on database design, SQL, NoSQL, 
                  data modeling, and database administration.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">12 items</span>
                  <Button variant="outline" size="sm">View Collection</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Web Development</CardTitle>
                <CardDescription>Modern web technologies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Resources covering HTML, CSS, JavaScript, React, Angular, 
                  Node.js, and web application development.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">18 items</span>
                  <Button variant="outline" size="sm">View Collection</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDownloadEmaterial;
