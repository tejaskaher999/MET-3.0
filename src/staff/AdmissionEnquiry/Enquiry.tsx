
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search } from "lucide-react";

const StaffAdmissionEnquiry = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Admission Enquiry Management</h1>
      <p className="text-muted-foreground">Manage and track admission enquiries from prospective students.</p>
      
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Enquiry List</TabsTrigger>
          <TabsTrigger value="add">Add New Enquiry</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Admission Enquiries</CardTitle>
              <CardDescription>View and manage admission enquiries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="grid flex-1">
                  <Label htmlFor="enquirySearch" className="sr-only">Search enquiries</Label>
                  <Input id="enquirySearch" placeholder="Search by name, phone, or email..." />
                </div>
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="bca">BCA</SelectItem>
                    <SelectItem value="mca">MCA</SelectItem>
                    <SelectItem value="btech">B.Tech</SelectItem>
                    <SelectItem value="mtech">M.Tech</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="notInterested">Not Interested</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Counselor</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Rahul Sharma</TableCell>
                    <TableCell>
                      <div className="text-sm">+91 9876543210</div>
                      <div className="text-xs text-muted-foreground">rahul.s@example.com</div>
                    </TableCell>
                    <TableCell>BCA</TableCell>
                    <TableCell>Apr 15, 2023</TableCell>
                    <TableCell><Badge variant="secondary">New</Badge></TableCell>
                    <TableCell>Unassigned</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Priya Patel</TableCell>
                    <TableCell>
                      <div className="text-sm">+91 9876543211</div>
                      <div className="text-xs text-muted-foreground">priya.p@example.com</div>
                    </TableCell>
                    <TableCell>MCA</TableCell>
                    <TableCell>Apr 14, 2023</TableCell>
                    <TableCell><Badge variant="default">Contacted</Badge></TableCell>
                    <TableCell>Dr. John Staff</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Arjun Kumar</TableCell>
                    <TableCell>
                      <div className="text-sm">+91 9876543212</div>
                      <div className="text-xs text-muted-foreground">arjun.k@example.com</div>
                    </TableCell>
                    <TableCell>B.Tech (CS)</TableCell>
                    <TableCell>Apr 10, 2023</TableCell>
                    <TableCell><Badge variant="outline">Applied</Badge></TableCell>
                    <TableCell>Prof. Emma Thomson</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Meera Singh</TableCell>
                    <TableCell>
                      <div className="text-sm">+91 9876543213</div>
                      <div className="text-xs text-muted-foreground">meera.s@example.com</div>
                    </TableCell>
                    <TableCell>MCA</TableCell>
                    <TableCell>Apr 8, 2023</TableCell>
                    <TableCell><Badge variant="destructive">Not Interested</Badge></TableCell>
                    <TableCell>Dr. John Staff</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing 4 of 42 enquiries
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Enquiry</CardTitle>
              <CardDescription>Record a new admission enquiry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course Interested In</Label>
                  <Select>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bca">BCA</SelectItem>
                      <SelectItem value="mca">MCA</SelectItem>
                      <SelectItem value="btech">B.Tech</SelectItem>
                      <SelectItem value="mtech">M.Tech</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="source">Source of Enquiry</Label>
                  <Select>
                    <SelectTrigger id="source">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="walkin">Walk In</SelectItem>
                      <SelectItem value="call">Phone Call</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="reference">Reference</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter address"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any additional information about the enquiry"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Enquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffAdmissionEnquiry;
