
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Download, FileText } from "lucide-react";

const StaffVisitingLetter = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Visiting Letter Management</h1>
      <p className="text-muted-foreground">Request and download visiting letters for external visits and events.</p>
      
      <Tabs defaultValue="request">
        <TabsList>
          <TabsTrigger value="request">Request Letter</TabsTrigger>
          <TabsTrigger value="history">Request History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="request">
          <Card>
            <CardHeader>
              <CardTitle>Request Visiting Letter</CardTitle>
              <CardDescription>Submit a request for an official visiting letter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visitPurpose">Visit Purpose</Label>
                  <Select>
                    <SelectTrigger id="visitPurpose">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conference">Conference Attendance</SelectItem>
                      <SelectItem value="seminar">Seminar/Workshop</SelectItem>
                      <SelectItem value="research">Research Collaboration</SelectItem>
                      <SelectItem value="industry">Industry Visit</SelectItem>
                      <SelectItem value="other">Other Purpose</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="visitType">Visit Type</Label>
                  <Select>
                    <SelectTrigger id="visitType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="national">National</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization">Organization/Institution Name</Label>
                <Input id="organization" placeholder="Enter the name of the organization you'll be visiting" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter the complete address of the organization"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <div className="flex">
                    <Input id="startDate" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <div className="flex">
                    <Input id="endDate" type="date" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Visit Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about your visit including purpose, activities, etc."
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="supportingDoc">Supporting Documents (Optional)</Label>
                <Input id="supportingDoc" type="file" />
                <p className="text-xs text-muted-foreground">
                  Upload invitation letter, conference acceptance, or other relevant documents.
                </p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Submit Request</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Letter Request History</CardTitle>
              <CardDescription>View status and download your visiting letters</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Visit Dates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">VL-2023-005</TableCell>
                    <TableCell>Apr 15, 2023</TableCell>
                    <TableCell>Delhi Technical University</TableCell>
                    <TableCell>May 10-12, 2023</TableCell>
                    <TableCell><Badge variant="default">Approved</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">VL-2023-004</TableCell>
                    <TableCell>Mar 22, 2023</TableCell>
                    <TableCell>IBM Research Labs</TableCell>
                    <TableCell>Apr 5-6, 2023</TableCell>
                    <TableCell><Badge variant="default">Approved</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">VL-2023-003</TableCell>
                    <TableCell>Feb 18, 2023</TableCell>
                    <TableCell>National Conference on AI</TableCell>
                    <TableCell>Mar 10-12, 2023</TableCell>
                    <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" disabled>
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffVisitingLetter;
