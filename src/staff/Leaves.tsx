import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Upload, Plus, FileText, History, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LeaveApplication {
  leaveType: string;
  duration: string;
  fromDate: string;
  toDate: string;
  halfDaySlot: string;
  reportingTo: string;
  reason: string;
  attachment: File | null;
  substitutions: Array<{
    date: string;
    class: string;
    time: string;
    substitute: string;
  }>;
}

interface LeaveHistory {
  id: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  duration: string;
  status: string;
  submittedDate: string;
}

interface LeaveEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
}

const StaffLeaves = () => {
  const [activeTab, setActiveTab] = useState("apply");
  const [leaveApplication, setLeaveApplication] = useState<LeaveApplication>({
    leaveType: "",
    duration: "",
    fromDate: "",
    toDate: "",
    halfDaySlot: "",
    reportingTo: "",
    reason: "",
    attachment: null,
    substitutions: [{
      date: "",
      class: "",
      time: "",
      substitute: ""
    }]
  });

  const [leaveHistory, setLeaveHistory] = useState<LeaveHistory[]>([
    {
      id: "LV-2025-001",
      leaveType: "Casual Leave",
      fromDate: "2025-04-25",
      toDate: "2025-04-26",
      duration: "2 days",
      status: "Approved",
      submittedDate: "2025-04-10"
    },
    {
      id: "LV-2025-002",
      leaveType: "Sick Leave",
      fromDate: "2025-05-01",
      toDate: "2025-05-03",
      duration: "3 days",
      status: "Pending",
      submittedDate: "2025-04-25"
    },
    {
      id: "LV-2023-003",
      leaveType: "Earned Leave",
      fromDate: "2023-07-10",
      toDate: "2023-07-15",
      duration: "6 days",
      status: "Approved",
      submittedDate: "2023-06-20"
    },
    {
      id: "LV-2023-004",
      leaveType: "Study Leave",
      fromDate: "2023-08-01",
      toDate: "2023-08-07",
      duration: "7 days",
      status: "Pending",
      submittedDate: "2023-07-15"
    }
  ]);

  const [selectedLeave, setSelectedLeave] = useState<LeaveHistory | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [leaveEvents, setLeaveEvents] = useState<LeaveEvent[]>([]);

  // Convert leave history to calendar events
  const updateLeaveEvents = () => {
    const events = leaveHistory.map(leave => ({
      id: leave.id,
      title: leave.leaveType,
      startDate: leave.fromDate,
      endDate: leave.toDate,
      type: leave.leaveType.toLowerCase().replace(/\s+/g, ''),
      status: leave.status.toLowerCase()
    }));
    setLeaveEvents(events);
  };

  // Update leave events when leave history changes
  useEffect(() => {
    updateLeaveEvents();
  }, [leaveHistory]);

  const handleInputChange = (field: keyof LeaveApplication, value: string) => {
    setLeaveApplication(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubstitutionChange = (index: number, field: string, value: string) => {
    setLeaveApplication(prev => ({
      ...prev,
      substitutions: prev.substitutions.map((sub, i) => 
        i === index ? { ...sub, [field]: value } : sub
      )
    }));
  };

  const addSubstitution = () => {
    setLeaveApplication(prev => ({
      ...prev,
      substitutions: [...prev.substitutions, {
        date: "",
        class: "",
        time: "",
        substitute: ""
      }]
    }));
  };

  const removeSubstitution = (index: number) => {
    setLeaveApplication(prev => ({
      ...prev,
      substitutions: prev.substitutions.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }
      setLeaveApplication(prev => ({
        ...prev,
        attachment: file
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!leaveApplication.leaveType || !leaveApplication.duration || 
        !leaveApplication.fromDate || !leaveApplication.toDate || 
        !leaveApplication.reportingTo || !leaveApplication.reason) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate date range
    const fromDate = new Date(leaveApplication.fromDate);
    const toDate = new Date(leaveApplication.toDate);
    if (toDate < fromDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    // Validate substitutions
    if (leaveApplication.substitutions.some(sub => 
      !sub.date || !sub.class || !sub.time || !sub.substitute
    )) {
      toast.error("Please fill in all substitution details");
      return;
    }

    // Generate a new leave ID
    const newId = `LV-${new Date().getFullYear()}-${String(leaveHistory.length + 1).padStart(3, '0')}`;
    
    // Add to leave history
    const newLeave: LeaveHistory = {
      id: newId,
      leaveType: leaveApplication.leaveType,
      fromDate: leaveApplication.fromDate,
      toDate: leaveApplication.toDate,
      duration: leaveApplication.duration === "halfDay" ? "Half Day" : 
               leaveApplication.duration === "fullDay" ? "1 day" :
               `${Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24))} days`,
      status: "Pending",
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setLeaveHistory(prev => [newLeave, ...prev]);
    
    // Here you would typically send the data to your backend
    console.log("Submitting leave application:", leaveApplication);
    toast.success("Leave application submitted successfully!");
    
    // Reset form
    setLeaveApplication({
      leaveType: "",
      duration: "",
      fromDate: "",
      toDate: "",
      halfDaySlot: "",
      reportingTo: "",
      reason: "",
      attachment: null,
      substitutions: [{
        date: "",
        class: "",
        time: "",
        substitute: ""
      }]
    });

    // Switch to history tab
    setActiveTab("history");
  };

  const handleSaveDraft = () => {
    // Here you would typically save the draft to local storage or backend
    console.log("Saving draft:", leaveApplication);
    toast.success("Draft saved successfully!");
  };

  const handleViewDetails = (leave: LeaveHistory) => {
    setSelectedLeave(leave);
    setIsDetailsDialogOpen(true);
  };

  const handleViewDocument = () => {
    if (selectedDocument) {
      const fileUrl = URL.createObjectURL(selectedDocument);
      window.open(fileUrl, '_blank');
    } else {
      toast.error("No document available");
    }
  };

  const handleCancelApplication = () => {
    if (selectedLeave) {
      // Update the leave status in the history
      setLeaveHistory(prev => 
        prev.map(leave => 
          leave.id === selectedLeave.id 
            ? { ...leave, status: "Cancelled" }
            : leave
        )
      );
      toast.success("Leave application cancelled successfully");
      setIsDetailsDialogOpen(false);
    }
  };

  const handleEditApplication = () => {
    if (selectedLeave) {
      // Switch to apply tab and populate the form
      setActiveTab("apply");
      setIsDetailsDialogOpen(false);
      setLeaveApplication({
        leaveType: selectedLeave.leaveType,
        duration: selectedLeave.duration === "Half Day" ? "halfDay" : 
                 selectedLeave.duration === "1 day" ? "fullDay" : "multipleDays",
        fromDate: selectedLeave.fromDate,
        toDate: selectedLeave.toDate,
        halfDaySlot: "",
        reportingTo: "",
        reason: "",
        attachment: selectedDocument,
        substitutions: [{
          date: "",
          class: "",
          time: "",
          substitute: ""
        }]
      });
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return leaveHistory.map(leave => {
      const startDate = new Date(leave.fromDate);
      const endDate = new Date(leave.toDate);
      
      // Reset time part to ensure date-only comparison
      const currentDate = new Date(date);
      currentDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      
      // Check if the current date falls within the leave period
      if (currentDate >= startDate && currentDate <= endDate) {
        return {
          id: leave.id,
          title: leave.leaveType,
          type: leave.leaveType.toLowerCase().replace(/\s+/g, ''),
          status: leave.status.toLowerCase(),
          duration: leave.duration,
          isUpcoming: currentDate > new Date(new Date().setHours(0, 0, 0, 0))
        };
      }
      return null;
    }).filter(Boolean);
  };

  const getEventColor = (type: string, status: string) => {
    if (status === 'approved') {
      switch (type) {
        case "casualleave":
          return "bg-blue-500/20 text-blue-500";
        case "sickleave":
          return "bg-red-500/20 text-red-500";
        case "earnedleave":
          return "bg-green-500/20 text-green-500";
        case "studyleave":
          return "bg-purple-500/20 text-purple-500";
        default:
          return "bg-gray-500/20 text-gray-500";
      }
    } else if (status === 'pending') {
      return "bg-yellow-500/20 text-yellow-500";
    } else if (status === 'rejected') {
      return "bg-destructive/20 text-destructive";
    }
    return "bg-gray-500/20 text-gray-500";
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Leave Management
        </h1>
        <p className="text-muted-foreground text-lg">
          Apply for leaves and view leave history
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-primary/20 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary">
              <Calendar className="h-4 w-4" />
              Casual Leave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold group-hover:text-primary transition-colors">8 / 12</div>
            <p className="text-xs text-muted-foreground mt-1">
              4 days remaining
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-primary/20 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary">
              <Calendar className="h-4 w-4" />
              Sick Leave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold group-hover:text-primary transition-colors">3 / 10</div>
            <p className="text-xs text-muted-foreground mt-1">
              7 days remaining
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-primary/20 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary">
              <Calendar className="h-4 w-4" />
              Earned Leave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold group-hover:text-primary transition-colors">5 / 30</div>
            <p className="text-xs text-muted-foreground mt-1">
              25 days remaining
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-primary/20 group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary">
              <Calendar className="h-4 w-4" />
              Study Leave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold group-hover:text-primary transition-colors">0 / 15</div>
            <p className="text-xs text-muted-foreground mt-1">
              15 days remaining
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/30 p-1 rounded-lg">
          <TabsTrigger 
            value="apply" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-200 flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Apply for Leave
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-200 flex items-center gap-2"
          >
            <History className="h-4 w-4" />
            Leave History
          </TabsTrigger>
          <TabsTrigger 
            value="calendar" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all duration-200 flex items-center gap-2"
          >
            <CalendarIcon className="h-4 w-4" />
            Leave Calendar
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="apply" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Leave Application
              </CardTitle>
              <CardDescription className="text-lg">Submit a new leave request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="leaveType" className="text-base">Leave Type *</Label>
                    <Select
                      value={leaveApplication.leaveType}
                      onValueChange={(value) => handleInputChange("leaveType", value)}
                    >
                      <SelectTrigger id="leaveType" className="w-full h-12">
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="earned">Earned Leave</SelectItem>
                      <SelectItem value="study">Study Leave</SelectItem>
                      <SelectItem value="unpaid">Leave Without Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="duration" className="text-base">Duration *</Label>
                    <Select
                      value={leaveApplication.duration}
                      onValueChange={(value) => handleInputChange("duration", value)}
                    >
                      <SelectTrigger id="duration" className="w-full h-12">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="halfDay">Half Day</SelectItem>
                      <SelectItem value="fullDay">Full Day</SelectItem>
                      <SelectItem value="multipleDays">Multiple Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="fromDate" className="text-base">From Date *</Label>
                    <Input 
                      id="fromDate" 
                      type="date" 
                      className="w-full h-12"
                      value={leaveApplication.fromDate}
                      onChange={(e) => handleInputChange("fromDate", e.target.value)}
                    />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="toDate" className="text-base">To Date *</Label>
                    <Input 
                      id="toDate" 
                      type="date" 
                      className="w-full h-12"
                      value={leaveApplication.toDate}
                      onChange={(e) => handleInputChange("toDate", e.target.value)}
                    />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="halfDaySlot" className="text-base">Half Day Slot (if applicable)</Label>
                    <Select
                      value={leaveApplication.halfDaySlot}
                      onValueChange={(value) => handleInputChange("halfDaySlot", value)}
                      disabled={leaveApplication.duration !== "halfDay"}
                    >
                      <SelectTrigger id="halfDaySlot" className="w-full h-12">
                      <SelectValue placeholder="Select slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="firstHalf">First Half (Morning)</SelectItem>
                      <SelectItem value="secondHalf">Second Half (Afternoon)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="reportingTo" className="text-base">Reporting To *</Label>
                    <Select
                      value={leaveApplication.reportingTo}
                      onValueChange={(value) => handleInputChange("reportingTo", value)}
                    >
                      <SelectTrigger id="reportingTo" className="w-full h-12">
                      <SelectValue placeholder="Select reporting authority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hod">Dr. Smith (HOD)</SelectItem>
                      <SelectItem value="principal">Dr. Johnson (Principal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                  <Label htmlFor="reason" className="text-base">Reason for Leave *</Label>
                <Textarea 
                  id="reason" 
                    rows={4} 
                  placeholder="Provide reason for your leave application"
                    className="w-full min-h-[120px] resize-none"
                    value={leaveApplication.reason}
                    onChange={(e) => handleInputChange("reason", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                  <Label htmlFor="attachment" className="text-base">Supporting Document (if any)</Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      id="attachment" 
                      type="file" 
                      className="w-full h-12"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          if (file.size > 2 * 1024 * 1024) {
                            toast.error("File size should be less than 2MB");
                            return;
                          }
                          setLeaveApplication(prev => ({
                            ...prev,
                            attachment: file
                          }));
                        }
                      }}
                    />
                    {leaveApplication.attachment && (
                      <span className="text-sm text-muted-foreground">
                        {leaveApplication.attachment.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                  Upload medical certificate or other supporting documents (Max: 2MB)
                </p>
              </div>
              
                <div className="p-6 border rounded-lg space-y-4 bg-muted/30">
                  <h3 className="font-medium text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Substitution Arrangement
                  </h3>
                  <p className="text-sm text-muted-foreground">
                  Please specify substitution arrangements for your classes during leave period
                </p>
                  <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold">Date</TableHead>
                          <TableHead className="font-semibold">Class</TableHead>
                          <TableHead className="font-semibold">Time</TableHead>
                          <TableHead className="font-semibold">Substitute</TableHead>
                          <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                        {leaveApplication.substitutions.map((sub, index) => (
                          <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                              <Input 
                                type="date" 
                                className="h-10"
                                value={sub.date}
                                onChange={(e) => handleSubstitutionChange(index, "date", e.target.value)}
                              />
                      </TableCell>
                      <TableCell>
                              <Select
                                value={sub.class}
                                onValueChange={(value) => handleSubstitutionChange(index, "class", value)}
                              >
                                <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bca4">BCA Semester 4</SelectItem>
                            <SelectItem value="mca2">MCA Semester 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                              <Select
                                value={sub.time}
                                onValueChange={(value) => handleSubstitutionChange(index, "time", value)}
                              >
                                <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9-10:30">9:00 - 10:30</SelectItem>
                            <SelectItem value="10:45-12:15">10:45 - 12:15</SelectItem>
                            <SelectItem value="1-2:30">1:00 - 2:30</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                              <Select
                                value={sub.substitute}
                                onValueChange={(value) => handleSubstitutionChange(index, "substitute", value)}
                              >
                                <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select substitute" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prof1">Prof. David Wilson</SelectItem>
                            <SelectItem value="prof2">Dr. Emma Thompson</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => removeSubstitution(index)}
                              >
                                Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-10 hover:bg-primary/10"
                    onClick={addSubstitution}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Class
                  </Button>
                </div>
                
                <CardFooter className="flex justify-end pt-6">
                  <Button 
                    type="submit"
                    className="h-12 px-6 bg-primary hover:bg-primary/90"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Application
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Leave History
              </CardTitle>
              <CardDescription className="text-lg">Track your leave applications and their status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Application ID</TableHead>
                      <TableHead className="font-semibold">Leave Type</TableHead>
                      <TableHead className="font-semibold">From Date</TableHead>
                      <TableHead className="font-semibold">To Date</TableHead>
                      <TableHead className="font-semibold">Duration</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Submitted Date</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {leaveHistory.map((leave) => (
                      <TableRow key={leave.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{leave.id}</TableCell>
                        <TableCell>{leave.leaveType}</TableCell>
                        <TableCell>{new Date(leave.fromDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(leave.toDate).toLocaleDateString()}</TableCell>
                        <TableCell>{leave.duration}</TableCell>
                      <TableCell>
                        <Badge
                            variant="default" 
                            className={
                              leave.status === "Approved" ? "bg-green-500/20 text-green-500" :
                              leave.status === "Pending" ? "bg-yellow-500/20 text-yellow-500" :
                              "bg-red-500/20 text-red-500"
                          }
                        >
                          {leave.status}
                        </Badge>
                      </TableCell>
                        <TableCell>{new Date(leave.submittedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 hover:bg-primary/10"
                            onClick={() => handleViewDetails(leave)}
                          >
                            View Details
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Leave Calendar
              </CardTitle>
              <CardDescription className="text-lg">View your leaves and team's leave schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-primary/10"
                    onClick={handlePrevMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-primary/10"
                    onClick={handleNextMonth}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2 bg-muted/30 rounded-lg">
                      {day}
                    </div>
                  ))}
                  
                  {getDaysInMonth(currentMonth).map((date, index) => {
                    const currentDate = date ? new Date(date) : null;
                    const isToday = currentDate && 
                      currentDate.toDateString() === new Date().toDateString();
                    
                    return (
                      <div 
                        key={index} 
                        className={`min-h-[100px] p-2 border rounded-lg transition-all duration-200 ${
                          date ? 'bg-card hover:bg-card/80' : 'bg-muted/30'
                        } ${isToday ? 'ring-2 ring-primary/50' : ''}`}
                      >
                        {date && (
                          <>
                            <div className="text-sm font-medium mb-1 flex items-center justify-between">
                              <span>{date.getDate()}</span>
                              {isToday && (
                                <span className="text-xs text-primary">Today</span>
                              )}
                            </div>
                            <div className="space-y-1">
                              {getEventsForDate(date).map(event => (
                                <div 
                                  key={event.id}
                                  className={`text-xs p-1 rounded transition-all duration-200 hover:opacity-80 ${getEventColor(event.type, event.status)} ${
                                    event.isUpcoming ? 'ring-1 ring-primary/30' : ''
                                  }`}
                                >
                                  <div className="flex items-center gap-1">
                                    <span className="truncate">{event.title}</span>
                                    {event.status === 'pending' && (
                                      <span className="text-[10px]">(Pending)</span>
                                    )}
                                    {event.isUpcoming && (
                                      <span className="text-[10px] text-primary">(Upcoming)</span>
                                    )}
                                  </div>
                                  <div className="text-[10px] opacity-75">
                                    {event.duration}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Leave Types</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500/20"></div>
                        <span className="text-sm">Casual Leave</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                        <span className="text-sm">Sick Leave</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                        <span className="text-sm">Earned Leave</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500/20"></div>
                        <span className="text-sm">Study Leave</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                        <span className="text-sm">Pending</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-destructive/20"></div>
                        <span className="text-sm">Rejected</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Today's Indicator</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full ring-2 ring-primary/50"></div>
                      <span className="text-sm">Current Date</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Upcoming Leaves</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full ring-1 ring-primary/30"></div>
                      <span className="text-sm">Future Leave</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Leave Application Details
            </DialogTitle>
            <DialogDescription className="text-sm">
              Detailed information about the leave application
            </DialogDescription>
          </DialogHeader>
          
          {selectedLeave && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Application ID</Label>
                  <p className="text-sm font-medium">{selectedLeave.id}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <Badge 
                    variant="default" 
                    className={
                      selectedLeave.status === "Approved" ? "bg-green-500/20 text-green-500" :
                      selectedLeave.status === "Pending" ? "bg-yellow-500/20 text-yellow-500" :
                      "bg-red-500/20 text-red-500"
                    }
                  >
                    {selectedLeave.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Leave Type</Label>
                  <p className="text-sm font-medium">{selectedLeave.leaveType}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Duration</Label>
                  <p className="text-sm font-medium">{selectedLeave.duration}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">From Date</Label>
                  <p className="text-sm font-medium">{new Date(selectedLeave.fromDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">To Date</Label>
                  <p className="text-sm font-medium">{new Date(selectedLeave.toDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Submitted Date</Label>
                  <p className="text-sm font-medium">{new Date(selectedLeave.submittedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Substitution Arrangement</Label>
                <div className="overflow-x-auto rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold text-xs">Date</TableHead>
                        <TableHead className="font-semibold text-xs">Class</TableHead>
                        <TableHead className="font-semibold text-xs">Time</TableHead>
                        <TableHead className="font-semibold text-xs">Substitute</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-xs">2023-05-15</TableCell>
                        <TableCell className="text-xs">BCA Semester 4</TableCell>
                        <TableCell className="text-xs">9:00 - 10:30</TableCell>
                        <TableCell className="text-xs">Prof. David Wilson</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Supporting Documents</Label>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleViewDocument}
                    disabled={!selectedDocument}
                    className="h-8 px-3 text-xs hover:bg-primary/10"
                  >
                    <FileText className="mr-2 h-3 w-3" />
                    View Document
                  </Button>
                  {selectedDocument && (
                    <span className="text-xs text-muted-foreground">
                      {selectedDocument.name}
                    </span>
                  )}
                </div>
              </div>

              {selectedLeave.status === "Pending" && (
                <div className="flex justify-end pt-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 px-3 text-xs hover:bg-destructive/10 hover:text-destructive"
                    onClick={handleCancelApplication}
                  >
                    Cancel Application
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffLeaves;
