
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const StudentHostelAdmission = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Hostel Admission</h1>
      <p className="text-muted-foreground">Apply for hostel accommodation and manage your hostel details.</p>
      
      <Tabs defaultValue="form">
        <TabsList>
          <TabsTrigger value="form">Application Form</TabsTrigger>
          <TabsTrigger value="status">Application Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>Hostel Admission Application</CardTitle>
              <CardDescription>Fill in the details to apply for hostel accommodation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hostelType">Hostel Type</Label>
                  <Select>
                    <SelectTrigger id="hostelType">
                      <SelectValue placeholder="Select hostel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boys">Boys Hostel</SelectItem>
                      <SelectItem value="girls">Girls Hostel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="roomType">Room Type</Label>
                  <Select>
                    <SelectTrigger id="roomType">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Occupancy</SelectItem>
                      <SelectItem value="double">Double Occupancy</SelectItem>
                      <SelectItem value="triple">Triple Occupancy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semester">One Semester</SelectItem>
                      <SelectItem value="year">One Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mealPlan">Meal Plan</Label>
                  <Select>
                    <SelectTrigger id="mealPlan">
                      <SelectValue placeholder="Select meal plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veg">Vegetarian</SelectItem>
                      <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
                      <SelectItem value="special">Special Diet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Do you have any medical conditions that require special attention?</Label>
                <RadioGroup defaultValue="no">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="medical-yes" />
                    <Label htmlFor="medical-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="medical-no" />
                    <Label htmlFor="medical-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medicalDetails">Medical Details (if applicable)</Label>
                <Textarea id="medicalDetails" rows={3} placeholder="Describe your medical condition" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" placeholder="Name, Relationship, Phone Number" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Permanent Address</Label>
                <Textarea id="address" rows={3} placeholder="Enter your permanent address" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Submit Application</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
              <CardDescription>Current status of your hostel application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Application #HST-2023-056</h3>
                    <p className="text-sm text-muted-foreground">Submitted on: April 10, 2023</p>
                  </div>
                  <Badge variant="default">Approved</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-semibold">Hostel Type</p>
                    <p className="text-sm">Boys Hostel</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Room Type</p>
                    <p className="text-sm">Double Occupancy</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Duration</p>
                    <p className="text-sm">One Semester</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Meal Plan</p>
                    <p className="text-sm">Vegetarian</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-semibold">Room Allotment Details</p>
                  <div className="bg-muted p-3 rounded mt-1">
                    <p className="text-sm">
                      <strong>Hostel:</strong> Boys Hostel Block B
                    </p>
                    <p className="text-sm">
                      <strong>Room Number:</strong> B-205
                    </p>
                    <p className="text-sm">
                      <strong>Check-in Date:</strong> May 1, 2023
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button>Download Allotment Letter</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentHostelAdmission;
