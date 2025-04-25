import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Building,
  Phone,
  Mail,
  Briefcase,
  Calendar,
  FileText,
  Users,
  BookOpen,
  Download,
  Clock,
  ChartBar,
  GraduationCap,
  DollarSign,
  PieChart,
  BarChart2,
  UserCheck,
  Award,
  BookOpen as Book,
  Layers,
  TrendingUp,
  CheckCircle,
  Bell,
  Search,
  Filter,
  QrCode,
  Printer,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import html2canvas from 'html2canvas';
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const StaffHome = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showIdCard, setShowIdCard] = useState(false);

  // I will add state hooks for material upload and attendance data
  const [materialName, setMaterialName] = useState("");
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const [attendanceData, setAttendanceData] = useState<{ id: number; name: string; present: boolean }[]>([
    { id: 1, name: "John Doe", present: false },
    { id: 2, name: "Jane Smith", present: false },
  ]);
  // Add state for assignment submission
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
  const [assignmentComments, setAssignmentComments] = useState("");
  // Load saved avatar from localStorage or use placeholder
  const initialAvatar = typeof window !== 'undefined' ? localStorage.getItem('staffAvatarSrc') : null;
  const [avatarSrc, setAvatarSrc] = useState<string>(initialAvatar || '/placeholder-avatar.jpg');
  // Handler for avatar file input and persist to localStorage
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const src = reader.result as string;
          setAvatarSrc(src);
          localStorage.setItem('staffAvatarSrc', src);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Mock data for analytics
  const assignmentStats = {
    submitted: 85,
    pending: 15,
    graded: 70,
    total: 100,
  };

  const attendanceStats = {
    present: 90,
    absent: 5,
    leave: 5,
    total: 100,
  };

  const placementStats = {
    placed: 75,
    inProcess: 15,
    notStarted: 10,
    averageSalary: "8.5 LPA",
  };

  // Mock handlers for interactive features
  const handleMarkAttendance = () => {
    // Add attendance marking logic
    console.log("Marking attendance...");
  };

  const handleGenerateReport = () => {
    // Add report generation logic
    console.log("Generating report...");
  };

  const handleUploadMaterial = () => {
    // Add material upload logic
    console.log("Uploading material...");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Add search logic
    console.log("Searching:", query);
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    // Add filter logic
    console.log("Filter changed:", value);
  };

  const handleDownloadId = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    canvas.width = 850;
    canvas.height = 540;
  
    // Utility function to draw rounded rectangle
    const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };
  
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Border
    ctx.strokeStyle = '#C4302B';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
  
    // Header
    const headerGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    headerGradient.addColorStop(0, '#C4302B');
    headerGradient.addColorStop(1, '#991B1B');
    ctx.fillStyle = headerGradient;
    ctx.fillRect(0, 0, canvas.width, 100);
  
    // University Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('MET Bhujbal Knowledge City', canvas.width / 2, 48);
    ctx.font = '18px Arial';
    ctx.fillText('THE MET LEAGUE OF COLLEGES', canvas.width / 2, 75);
  
    // Line below title
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 220, 85);
    ctx.lineTo(canvas.width / 2 + 220, 85);
    ctx.stroke();
  
    // Photo Circle
    ctx.beginPath();
    ctx.arc(150, 270, 80, 0, Math.PI * 2);
    ctx.fillStyle = '#f7fafc';
    ctx.fill();
    ctx.strokeStyle = '#C4302B';
    ctx.lineWidth = 4;
    ctx.stroke();
  
    // ID Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#C4302B';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('STAFF ID CARD', 270, 160);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(270, 170);
    ctx.lineTo(550, 170);
    ctx.stroke();
  
    // Details
    const details = [
      { label: 'Name', value: 'Prof.Staff' },
      { label: 'ID', value: 'STAFF00001' },
      { label: 'Department', value: 'Computer Science and Design' },
      { label: 'Blood-Group', value: 'A+' },
    ];
  
    let y = 220;
    details.forEach((detail) => {
      ctx.fillStyle = '#64748b';
      ctx.font = '18px Arial';
      ctx.fillText(`${detail.label}:`, 270, y);
  
      ctx.fillStyle = '#1a202c';
      ctx.font = 'bold 22px Arial';
      ctx.fillText(detail.value, 270, y + 28);
      y += 60;
    });
  
    // Barcode (centered below details, above footer)
    const barcodeW = 350;
    const barcodeH = 50;
    const barcodeX = (canvas.width - barcodeW) / 2;
    const footerHeight = 50;
    const margin = 20;
    const barcodeY = Math.min(y + margin, canvas.height - footerHeight - barcodeH - margin);
  
    const barcodeGradient = ctx.createLinearGradient(barcodeX, barcodeY, barcodeX + barcodeW, barcodeY);
    barcodeGradient.addColorStop(0, '#1B2024');
    barcodeGradient.addColorStop(1, '#2C3E50');
  
    drawRoundedRect(barcodeX, barcodeY, barcodeW, barcodeH, 10);
    ctx.fillStyle = barcodeGradient;
    ctx.fill();
  
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('BARCODE', barcodeX + barcodeW / 2, barcodeY + 32);
  
    // Footer
    const footerGradient = ctx.createLinearGradient(0, canvas.height - 50, canvas.width, canvas.height - 50);
    footerGradient.addColorStop(0, '#C4302B');
    footerGradient.addColorStop(1, '#991B1B');
    ctx.fillStyle = footerGradient;
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
  
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Valid until: 31/12/2024', 20, canvas.height - 20);
  
    ctx.textAlign = 'right';
    ctx.fillText('STAFF', canvas.width - 20, canvas.height - 20);
  
    // Draw avatar image into the circle and download ID card
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = avatarSrc;
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(150, 270, 80, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, 150 - 80, 270 - 80, 160, 160);
      ctx.restore();

      // Download Image
      const link = document.createElement('a');
      link.download = 'Prof.Staff_ID.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    };
  };
  

  // Handler to download attendance data as CSV
  const handleDownloadAttendance = () => {
    const header = "ID,Name,Present\n";
    const rows = attendanceData
      .map((d) => `${d.id},${d.name},${d.present ? "Yes" : "No"}`)
      .join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "attendance.csv";
    link.click();
  };

  const IdCard = () => (
    <div className="w-[650px] h-[420px] bg-gradient-to-br from-[#800000] via-[#800000] to-[#700000] p-6 shadow-2xl rounded-2xl relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-10 w-24 h-24 bg-white/5 rounded-full" />
  
      {/* Main Content */}
      <div className="relative flex flex-col h-full justify-between">
        {/* Header */}
        <div className="text-center text-white">
          <h3 className="font-bold text-4xl tracking-wide">MET Bhujbal Knowledge City</h3>
          <div className="flex items-center justify-center gap-3 my-1">
            <div className="h-[1px] w-20 bg-white/30" />
            <p className="text-xs font-medium tracking-widest">THE MET LEAGUE OF COLLEGES</p>
            <div className="h-[1px] w-20 bg-white/30" />
          </div>
        </div>
  
        {/* ID Card Body */}
        <div className="flex flex-1 gap-6 mt-4 bg-white/95 rounded-xl shadow-xl border border-white/30 p-5 backdrop-blur-sm">
          {/* Left - Avatar & Badge */}
          <div className="flex flex-col items-center justify-between w-[180px]">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C4302B] to-[#991B1B] rounded-full -rotate-45 opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-36 h-36 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <AvatarImage src={avatarSrc} alt="Staff" />
              </div>
            </div>
  
            {/* Year Badge */}
            <div className="mt-4 bg-gradient-to-r from-[#C4302B]/10 to-[#991B1B]/10 px-6 py-1.5 rounded-full border border-[#C4302B]/20">
              <p className="text-sm font-semibold text-[#991B1B] tracking-wide">2024-2025</p>
            </div>
          </div>
  
          {/* Right - Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#991B1B] tracking-wider border-b border-[#C4302B]/20 pb-2 mb-4">
                STAFF ID CARD
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Name', value: 'Prof.Staff' },
                  { label: 'ID Number', value: 'STAFF00001' },
                  { label: 'Department', value: 'Computer Science and Design' },
                  { label: 'Blood-Group', value: 'A+' },
                ].map((item, idx) => (
                  <div key={idx} className="hover:bg-[#C4302B]/5 p-2 rounded-lg transition-all duration-200">
                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                    <p className="text-lg font-semibold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Barcode Section */}
            <div className="self-center">
              <div className="bg-gradient-to-r from-[#1B2024] to-[#2C3E50] text-white py-3 rounded-md shadow-lg flex items-center justify-center gap-2">
                <div className="w-1 h-6 bg-white/20 rounded-full" />
                <p className="font-medium tracking-[0.4em] text-white/90">BARCODE</p>
                <div className="w-1 h-6 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
  
        {/* Footer */}
        <div className="flex items-center justify-between mt-4 px-1 text-white text-sm font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
            <p>Valid until: 31/12/2025</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <p className="tracking-widest">STAFF</p>
          </div>
        </div>
      </div>
    </div>
  );
  

  return (
    <div className="space-y-6 p-6">
      {/* Staff Information Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-[#800000] to-[#cb2020] text-white p-6">
          <div className="flex justify-between items-start">
            <div className="flex gap-6">
              <div className="relative inline-block">
                <Avatar className="h-24 w-24 border-4 border-white/20">
                  <AvatarImage src={avatarSrc} alt="Staff" />
                  <AvatarFallback className="bg-white text-[#DC2626] text-xl">JS</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                  onChange={handleAvatarChange}
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Prof.Staff</h2>
                <div className="flex gap-2">
                  <Badge className="bg-white/20 hover:bg-white/30">Associate Professor</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">Computer Science</Badge>
                </div>
                <p className="text-sm text-white/80">Staff ID: STAFF00001</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="bg-white text-[#DC2626] hover:bg-gray-100" onClick={handleDownloadId}>
                <Download className="h-4 w-4 mr-2" />
                Download ID Card
              </Button>
              <Button variant="secondary" className="bg-white text-[#DC2626] hover:bg-gray-100">
                <Calendar className="h-4 w-4 mr-2" />
                Academic Calendar
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <Building className="h-4 w-4" />
              <span className="text-sm">Department</span>
            </div>
            <p className="font-medium">Computer Science & Engineering</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <Mail className="h-4 w-4" />
              <span className="text-sm">Email</span>
            </div>
            <p className="font-medium">staff@university.edu</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <Phone className="h-4 w-4" />
              <span className="text-sm">Contact</span>
            </div>
            <p className="font-medium">+91 9876543210</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <Briefcase className="h-4 w-4" />
              <span className="text-sm">Experience</span>
            </div>
            <p className="font-medium">10 Years</p>
          </div>
        </div>

        <div className="grid grid-cols-4 border-t border-gray-100 bg-white">
          <div className="p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
            <p className="text-2xl font-bold text-[#DC2626]">24</p>
            <p className="text-sm text-gray-500">Teaching Hours</p>
          </div>
          <div className="p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors border-l border-gray-100">
            <p className="text-2xl font-bold text-[#DC2626]">4</p>
            <p className="text-sm text-gray-500">Active Courses</p>
          </div>
          <div className="p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors border-l border-gray-100">
            <p className="text-2xl font-bold text-[#DC2626]">156</p>
            <p className="text-sm text-gray-500">Students</p>
          </div>
          <div className="p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors border-l border-gray-100">
            <p className="text-2xl font-bold text-[#DC2626]">15</p>
            <p className="text-sm text-gray-500">Publications</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="text-[#DC2626]">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Timetable Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="p-4 hover:shadow-md transition-all cursor-pointer bg-blue-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">View Timetable</h4>
                    <p className="text-sm text-gray-500">Class Schedule</p>
                  </div>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Today's Schedule</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4">
                {[
                  { time: "10:00 AM", title: "Database Systems Lecture", location: "Room 301" },
                  { time: "02:00 PM", title: "Department Meeting", location: "Conference Room" },
                  { time: "04:00 PM", title: "Student Consultation", location: "Office" },
                ].map((event, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-20 text-sm font-medium text-[#DC2626]">{event.time}</div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Submit Assignment Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="p-4 hover:shadow-md transition-all cursor-pointer bg-green-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Submit Assignment</h4>
                    <p className="text-sm text-gray-500">Grade & Review</p>
                  </div>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Submit Assignment</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <Input
                  type="file"
                  onChange={(e) => setAssignmentFile(e.target.files ? e.target.files[0] : null)}
                />
                <Textarea
                  placeholder="Comments"
                  value={assignmentComments}
                  onChange={(e) => setAssignmentComments(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  console.log("Assignment File:", assignmentFile);
                  console.log("Comments:", assignmentComments);
                  setAssignmentFile(null);
                  setAssignmentComments("");
                }}>
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* View Results Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="p-4 hover:shadow-md transition-all cursor-pointer bg-purple-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <BarChart2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">View Results</h4>
                    <p className="text-sm text-gray-500">Performance</p>
                  </div>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Performance Results</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <div>
                  <p className="text-sm font-medium">Submitted</p>
                  <Progress value={assignmentStats.submitted} className="h-2" />
                  <p className="text-sm text-muted-foreground">{assignmentStats.submitted}% Submitted</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Graded</p>
                  <Progress value={assignmentStats.graded} className="h-2" />
                  <p className="text-sm text-muted-foreground">{assignmentStats.graded}% Graded</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Fee Payment Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="p-4 hover:shadow-md transition-all cursor-pointer bg-yellow-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <DollarSign className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Fee Payment</h4>
                    <p className="text-sm text-gray-500">Salary Info</p>
                  </div>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Salary Info</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <p className="text-sm text-gray-500">Average Salary:</p>
                <p className="text-lg font-bold">{placementStats.averageSalary}</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Activity Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <div className="p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-[#DC2626]" />
              Today's Schedule
            </h3>
            <div className="space-y-4">
              {[
                { time: "10:00 AM", title: "Database Systems Lecture", location: "Room 301" },
                { time: "02:00 PM", title: "Department Meeting", location: "Conference Room" },
                { time: "04:00 PM", title: "Student Consultation", location: "Office" }
              ].map((event, index) => (
                <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-20 text-sm font-medium text-[#DC2626]">{event.time}</div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-[#DC2626]" />
              Pending Tasks
            </h3>
            <div className="space-y-4">
              {[
                { task: "Grade Assignment 3", course: "CS401", deadline: "Today" },
                { task: "Review Research Paper", type: "Research", deadline: "Tomorrow" },
                { task: "Submit Course Plan", course: "CS402", deadline: "In 2 days" }
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium">{task.task}</p>
                    <p className="text-sm text-gray-500">{task.course || task.type}</p>
                  </div>
                  <Badge variant={task.deadline === "Today" ? "destructive" : "secondary"}>
                    {task.deadline}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-[#DC2626]" />
              Recent Activities
            </h3>
            <div className="space-y-4">
              {[
                { action: "Updated course materials", time: "2 hours ago", course: "CS401" },
                { action: "Submitted research report", time: "5 hours ago", type: "Research" },
                { action: "Marked attendance", time: "1 day ago", course: "CS402" }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="p-2 rounded-full bg-[#DC2626]/10">
                    <CheckCircle className="h-4 w-4 text-[#DC2626]" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            title: "Teaching Load",
            value: "24 hrs/week",
            change: "+2 hrs from last semester",
            trend: "up",
            icon: <BookOpen className="h-5 w-5" />
          },
          {
            title: "Research Projects",
            value: "3 Active",
            change: "1 completed this month",
            trend: "up",
            icon: <FileText className="h-5 w-5" />
          },
          {
            title: "Student Performance",
            value: "85%",
            change: "+5% from last term",
            trend: "up",
            icon: <TrendingUp className="h-5 w-5" />
          },
          {
            title: "Attendance Rate",
            value: "95%",
            change: "Above department average",
            trend: "up",
            icon: <UserCheck className="h-5 w-5" />
          }
        ].map((stat, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-all bg-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1 text-[#DC2626]">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className="p-2 rounded-full bg-[#DC2626]/10 text-[#DC2626]">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search courses, students, or documents..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Select value={selectedFilter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            <SelectItem value="courses">Courses</SelectItem>
            <SelectItem value="students">Students</SelectItem>
            <SelectItem value="assignments">Assignments</SelectItem>
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
              <Badge variant="secondary" className="ml-2">3</Badge>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {[
                { title: "New Assignment Submission", time: "2 mins ago", type: "info" },
                { title: "Meeting Reminder", time: "1 hour ago", type: "warning" },
                { title: "System Update", time: "2 hours ago", type: "success" }
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.time}</p>
                  </div>
                  <Badge variant={notification.type as "default" | "secondary" | "destructive"}>{notification.type}</Badge>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-[#800000] data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="courses"
            className="data-[state=active]:bg-[#800000] data-[state=active]:text-white"
          >
            Courses
          </TabsTrigger>
          <TabsTrigger
            value="students"
            className="data-[state=active]:bg-[#800000] data-[state=active]:text-white"
          >
            Students
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-[#800000] data-[state=active]:text-white"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Assignment Analysis Card */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Layers className="h-5 w-5 text-blue-600" />
                    Assignment Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground">Current Semester Overview</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Assignment Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Submission Status</p>
                          <Progress value={assignmentStats.submitted} className="h-2" />
                          <p className="text-sm text-muted-foreground">{assignmentStats.submitted}% Submitted</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Grading Progress</p>
                          <Progress value={assignmentStats.graded} className="h-2" />
                          <p className="text-sm text-muted-foreground">{assignmentStats.graded}% Graded</p>
                        </div>
                      </div>
                      {/* Add more detailed assignment information */}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Submitted</span>
                    <span className="text-sm font-medium">{assignmentStats.submitted}%</span>
                  </div>
                  <Progress value={assignmentStats.submitted} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Graded</span>
                    <span className="text-sm font-medium">{assignmentStats.graded}%</span>
                  </div>
                  <Progress value={assignmentStats.graded} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-3 text-center hover:bg-blue-50 transition-colors">
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-xl font-semibold text-blue-600">{assignmentStats.pending}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center hover:bg-blue-50 transition-colors">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-semibold text-blue-600">{assignmentStats.total}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Attendance Analysis Card */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-green-600" />
                    Attendance Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground">Monthly Overview</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-green-600">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Attendance Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Present Rate</p>
                          <Progress value={attendanceStats.present} className="h-2" />
                          <p className="text-sm text-muted-foreground">{attendanceStats.present}% Present</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Absent Rate</p>
                          <Progress value={attendanceStats.absent} className="h-2" />
                          <p className="text-sm text-muted-foreground">{attendanceStats.absent}% Absent</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white rounded-lg p-3 text-center">
                          <p className="text-sm text-muted-foreground">Present</p>
                          <p className="text-xl font-semibold text-green-600">{attendanceStats.present}%</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center">
                          <p className="text-sm text-muted-foreground">Absent</p>
                          <p className="text-xl font-semibold text-red-600">{attendanceStats.absent}%</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center">
                          <p className="text-sm text-muted-foreground">Leave</p>
                          <p className="text-xl font-semibold text-orange-600">{attendanceStats.leave}%</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Present Rate</span>
                    <span className="text-sm font-medium">{attendanceStats.present}%</span>
                  </div>
                  <Progress value={attendanceStats.present} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Absent Rate</span>
                    <span className="text-sm font-medium">{attendanceStats.absent}%</span>
                  </div>
                  <Progress value={attendanceStats.absent} className="h-2" />
                </div>
                <div className="mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Mark Attendance
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Mark Attendance</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 mt-4 max-h-80 overflow-auto">
                        {attendanceData.map((student) => (
                          <div key={student.id} className="flex items-center gap-2">
                            <Checkbox
                              checked={student.present}
                              onCheckedChange={(checked) =>
                                setAttendanceData((prev) =>
                                  prev.map((s) =>
                                    s.id === student.id ? { ...s, present: !!checked } : s
                                  )
                                )
                              }
                            />
                            <span>{student.name}</span>
                          </div>
                        ))}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={handleDownloadAttendance}>
                          Download Attendance
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>

            {/* Placement Analysis Card */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Placement Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground">Current Batch Status</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-purple-600">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Placement Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Placement Rate</p>
                          <Progress value={placementStats.placed} className="h-2" />
                          <p className="text-sm text-muted-foreground">{placementStats.placed}% Placed</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Average Package</p>
                          <p className="text-xl font-semibold text-purple-600">{placementStats.averageSalary}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">In Process</p>
                          <Progress value={placementStats.inProcess} className="h-2" />
                          <p className="text-sm text-muted-foreground">{placementStats.inProcess}% In Process</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Not Started</p>
                          <p className="text-xl font-semibold text-purple-600">{placementStats.notStarted}% Not Started</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Placement Rate</span>
                    <span className="text-sm font-medium">{placementStats.placed}%</span>
                  </div>
                  <Progress value={placementStats.placed} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Average Package</span>
                    <span className="text-sm font-medium">{placementStats.averageSalary}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Average Package</p>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" onClick={handleGenerateReport}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Course Management Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Book className="h-5 w-5 text-[#800000]" />
                Course Materials
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Advanced Database Systems", status: "Published", docs: 12 },
                  { name: "Machine Learning", status: "Draft", docs: 8 },
                  { name: "Software Engineering", status: "Published", docs: 15 }
                ].map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${course.status === 'Published' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <CheckCircle className={`h-4 w-4 ${course.status === 'Published' ? 'text-green-600' : 'text-yellow-600'}`} />
                      </div>
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.docs} documents</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Upload New Material
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Upload New Material</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      <Input
                        placeholder="Material Name"
                        value={materialName}
                        onChange={(e) => setMaterialName(e.target.value)}
                      />
                      <Input
                        type="file"
                        onChange={(e) => setMaterialFile(e.target.files ? e.target.files[0] : null)}
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={() => {
                        console.log("Material Name:", materialName);
                        console.log("Material File:", materialFile);
                        setMaterialName("");
                        setMaterialFile(null);
                      }}>
                        Add Material
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <BarChart2 className="h-5 w-5 text-[#800000]" />
                Student Performance
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Class Average</p>
                    <p className="text-2xl font-semibold">7.8</p>
                    <p className="text-sm text-green-600">↑ 0.5 from last sem</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Pass Rate</p>
                    <p className="text-2xl font-semibold">92%</p>
                    <p className="text-sm text-green-600">↑ 3% from last sem</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Grade Distribution</span>
                    <span>Current Semester</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-24 w-1/5 bg-green-100 rounded-t-lg relative">
                      <div className="absolute bottom-0 w-full bg-green-500 rounded-t-lg" style={{ height: '70%' }}></div>
                      <span className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs">A</span>
                    </div>
                    <div className="h-24 w-1/5 bg-blue-100 rounded-t-lg relative">
                      <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg" style={{ height: '50%' }}></div>
                      <span className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs">B</span>
                    </div>
                    <div className="h-24 w-1/5 bg-yellow-100 rounded-t-lg relative">
                      <div className="absolute bottom-0 w-full bg-yellow-500 rounded-t-lg" style={{ height: '30%' }}></div>
                      <span className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs">C</span>
                    </div>
                    <div className="h-24 w-1/5 bg-orange-100 rounded-t-lg relative">
                      <div className="absolute bottom-0 w-full bg-orange-500 rounded-t-lg" style={{ height: '15%' }}></div>
                      <span className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs">D</span>
                    </div>
                    <div className="h-24 w-1/5 bg-red-100 rounded-t-lg relative">
                      <div className="absolute bottom-0 w-full bg-red-500 rounded-t-lg" style={{ height: '5%' }}></div>
                      <span className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs">F</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Course Management</h3>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Add New Course
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Advanced Database Systems", students: 45, progress: 75 },
                  { name: "Machine Learning", students: 38, progress: 60 },
                  { name: "Software Engineering", students: 42, progress: 80 }
                ].map((course, index) => (
                  <Card key={index} className="p-4 hover:shadow-lg transition-all cursor-pointer">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{course.name}</h4>
                        <Badge variant="outline">{course.students} students</Badge>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Materials
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          Grades
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Student Management</h3>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Add student cards here */}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Report Generation</h3>
                <Button onClick={handleGenerateReport}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
              {/* Add report generation options here */}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Links Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Schedule Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#800000]/10 text-[#800000]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Schedule</h4>
                  <p className="text-sm text-muted-foreground">Class Timetable</p>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Class Timetable</DialogTitle>
            </DialogHeader>
            <div className="p-4 space-y-4">
              {[
                { time: "10:00 AM", title: "Database Systems Lecture", location: "Room 301" },
                { time: "02:00 PM", title: "Department Meeting", location: "Conference Room" },
                { time: "04:00 PM", title: "Student Consultation", location: "Office" }
              ].map((event, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-20 text-sm font-medium text-[#DC2626]">{event.time}</div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Reports Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#800000]/10 text-[#800000]">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Reports</h4>
                  <p className="text-sm text-muted-foreground">Generate Reports</p>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Generate Reports</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={handleGenerateReport}>Generate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Students Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#800000]/10 text-[#800000]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Students</h4>
                  <p className="text-sm text-muted-foreground">View Details</p>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Students</DialogTitle>
            </DialogHeader>
            <div className="p-4"> {/* You can insert student management content here */} </div>
          </DialogContent>
        </Dialog>

        {/* Payroll Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#800000]/10 text-[#800000]">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Payroll</h4>
                  <p className="text-sm text-muted-foreground">Salary Info</p>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Payroll</DialogTitle>
            </DialogHeader>
            <div className="p-4"> {/* Insert payroll info here */} </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StaffHome;
