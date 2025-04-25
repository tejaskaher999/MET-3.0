
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Check, MessageSquare, Phone, Search } from "lucide-react";

const StaffCounselorRemark = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Counselor Remarks</h1>
      <p className="text-muted-foreground">Manage follow-ups and add counselor remarks for admission enquiries.</p>
      
      <Tabs defaultValue="assigned">
        <TabsList>
          <TabsTrigger value="assigned">Assigned Enquiries</TabsTrigger>
          <TabsTrigger value="followup">Today's Follow-ups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assigned">
          <Card>
            <CardHeader>
              <CardTitle>Enquiries Assigned to You</CardTitle>
              <CardDescription>Manage and update enquiries assigned to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="grid flex-1">
                  <Label htmlFor="assignedSearch" className="sr-only">Search assigned enquiries</Label>
                  <Input id="assignedSearch" placeholder="Search by name or contact..." />
                </div>
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="followup">Follow-up Scheduled</SelectItem>
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
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Follow-up</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Priya Patel</TableCell>
                    <TableCell>
                      <div className="text-sm">+91 9876543211</div>
                      <div className="text-xs text-muted-foreground">priya.p@example.com</div>
                    </TableCell>
                    <TableCell>MCA</TableCell>
                    <TableCell>Apr 16, 2023</TableCell>
                    <TableCell><Badge variant="default">Contacted</Badge></TableCell>
                    <TableCell>Apr 20, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Add Remark</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Vikram Singh</TableCell>
                    <TableCell>
                      <div className="text-sm">+91 9876543214</div>
                      <div className="text-xs text-muted-foreground">vikram.s@example.com</div>
                    </TableCell>
                    <TableCell>BCA</TableCell>
                    <TableCell>Apr 15, 2023</TableCell>
                    <TableCell><Badge variant="secondary">Interested</Badge></TableCell>
                    <TableCell>Apr 18, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Add Remark</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Neha Gupta</TableCell>
                    <TableCell>
                      <div className="text-sm">+91 9876543215</div>
                      <div className="text-xs text-muted-foreground">neha.g@example.com</div>
                    </TableCell>
                    <TableCell>B.Tech (IT)</TableCell>
                    <TableCell>Apr 12, 2023</TableCell>
                    <TableCell><Badge>Follow-up Scheduled</Badge></TableCell>
                    <TableCell>Apr 19, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Add Remark</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing 3 of 12 assigned enquiries
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Detailed view of a selected enquiry - would show when "Add Remark" is clicked */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Priya Patel</CardTitle>
                  <CardDescription>Enquiry ID: ENQ-2023-0042</CardDescription>
                </div>
                <Badge variant="default">Contacted</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Contact Information</h3>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>+91 9876543211</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        <span>priya.p@example.com</span>
                      </div>
                      <p className="text-sm">
                        A-123, Srinivasa Nagar, Bangalore - 560001
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Enquiry Details</h3>
                    <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Course:</span> MCA
                      </div>
                      <div>
                        <span className="text-muted-foreground">Source:</span> Website
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span> Apr 14, 2023
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reference:</span> None
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Academic Background</h3>
                    <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Qualification:</span> BCA
                      </div>
                      <div>
                        <span className="text-muted-foreground">Institute:</span> Bangalore University
                      </div>
                      <div>
                        <span className="text-muted-foreground">Year of Passing:</span> 2023
                      </div>
                      <div>
                        <span className="text-muted-foreground">Percentage:</span> 85%
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Notes</h3>
                    <p className="mt-1 text-sm">
                      Interested in MCA with specialization in AI. Has questions about placement opportunities. 
                      Wants to visit campus next week.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-3">Interaction History</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium text-sm">Initial Call</div>
                      <div className="text-xs text-muted-foreground">Apr 16, 2023</div>
                    </div>
                    <p className="text-sm">
                      Called to provide information about MCA program. Candidate showed strong interest. 
                      Discussed fee structure and placement opportunities. Will call back after they review the brochure.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Add New Remark</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interactionType">Interaction Type</Label>
                    <Select>
                      <SelectTrigger id="interactionType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">Phone Call</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="visit">Campus Visit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Update Status</Label>
                    <Select>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="interested">Interested</SelectItem>
                        <SelectItem value="followup">Follow-up Scheduled</SelectItem>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="notInterested">Not Interested</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nextFollowup">Next Follow-up Date</Label>
                    <Input id="nextFollowup" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="remarkDetails">Remark Details</Label>
                  <Textarea
                    id="remarkDetails"
                    placeholder="Enter details of your interaction..."
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    <Check className="h-4 w-4 mr-2" />
                    Save Remark
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="followup">
          <Card>
            <CardHeader>
              <CardTitle>Today's Follow-ups</CardTitle>
              <CardDescription>Enquiries scheduled for follow-up today</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Remark</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Ankit Sharma</TableCell>
                    <TableCell>
                      <div className="text-sm">+91 9876543220</div>
                      <div className="text-xs text-muted-foreground">ankit.s@example.com</div>
                    </TableCell>
                    <TableCell>BCA</TableCell>
                    <TableCell><Badge variant="secondary">Interested</Badge></TableCell>
                    <TableCell className="max-w-xs truncate">
                      Discussed course details. Will follow up about campus tour.
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button size="sm">Add Remark</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sanjay Kumar</TableCell>
                    <TableCell>
                      <div className="text-sm">+91 9876543221</div>
                      <div className="text-xs text-muted-foreground">sanjay.k@example.com</div>
                    </TableCell>
                    <TableCell>MCA</TableCell>
                    <TableCell><Badge>Follow-up Scheduled</Badge></TableCell>
                    <TableCell className="max-w-xs truncate">
                      Sent course brochure. Will call to check if they have any questions.
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button size="sm">Add Remark</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              {/* Empty state if no follow-ups scheduled */}
              {false && (
                <div className="py-6 text-center">
                  <CalendarIcon className="h-10 w-10 mx-auto text-muted-foreground" />
                  <h3 className="mt-2 font-medium">No Follow-ups Today</h3>
                  <p className="text-sm text-muted-foreground">You do not have any follow-ups scheduled for today.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffCounselorRemark;
