import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaIdCard, FaUniversity, FaUserGraduate, FaCalendarAlt, FaBarcode } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Sample data
const assignmentResults = [
    { subject: 'AI & ML', score: 92, classAverage: 85, rank: 5, maxMarks: 100, submissionDate: '2024-03-15' },
    { subject: 'Web Development', score: 88, classAverage: 82, rank: 8, maxMarks: 100, submissionDate: '2024-03-10' },
    { subject: 'DBMS', score: 84, classAverage: 80, rank: 12, maxMarks: 100, submissionDate: '2024-03-05' },
    { subject: 'CN', score: 91, classAverage: 83, rank: 6, maxMarks: 100, submissionDate: '2024-03-01' },
];

const placementSummary = [
    { company: 'Capgemini', status: 'Placed', ctc: '5.5 LPA', role: 'Software Engineer', date: '2024-03-15' },
    { company: 'TCS', status: 'Not Placed', ctc: '-', role: '-', date: '-' },
    { company: 'Infosys', status: 'Placed', ctc: '4.8 LPA', role: 'Systems Engineer', date: '2024-03-10' },
];

const attendanceData = [
    { month: 'Jan', present: 85, total: 90 },
    { month: 'Feb', present: 82, total: 88 },
    { month: 'Mar', present: 88, total: 92 },
    { month: 'Apr', present: 90, total: 95 },
];

const academicProgress = [
    { semester: 1, cgpa: 8.5, credits: 24, sgpa: 8.2, backlogs: 0 },
    { semester: 2, cgpa: 8.8, credits: 26, sgpa: 8.7, backlogs: 0 },
    { semester: 3, cgpa: 9.0, credits: 25, sgpa: 9.2, backlogs: 0 },
    { semester: 4, cgpa: 8.9, credits: 27, sgpa: 8.8, backlogs: 1 },
];

const subjectPerformance = [
    { name: 'AI & ML', value: 92 },
    { name: 'Web Development', value: 88 },
    { name: 'DBMS', value: 84 },
    { name: 'CN', value: 91 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const StudentIdCard = ({ user, avatarSrc }: { user: any; avatarSrc: string }) => (
  <div id="student-id-card" className="w-[650px] h-[420px] bg-white p-6 shadow-2xl rounded-2xl relative overflow-hidden">
    {/* Decorative Background Circles */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
    <div className="absolute top-1/2 right-10 w-24 h-24 bg-white/5 rounded-full" />

    {/* Content Container */}
    <div className="relative flex flex-col h-full justify-between">
      {/* Header */}
      <div className="text-center text-[#DC2626]">
        <h3 className="font-bold text-4xl tracking-wide">MET Bhujbal Knowledge City</h3>
      </div>

      {/* ID Card Body */}
      <div className="flex flex-1 gap-8 mt-6 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        {/* Avatar */}
        <div className="flex flex-col items-center justify-between w-[200px]">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C4302B] to-[#991B1B] rounded-full -rotate-45 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-xl">
              <img src={avatarSrc} alt="Student" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="mt-4 bg-gradient-to-r from-[#C4302B]/10 to-[#991B1B]/10 px-8 py-2 rounded-full border border-[#C4302B]/20">
            <p className="text-base font-semibold text-[#991B1B] tracking-wide">{new Date().getFullYear()} - {new Date().getFullYear()+1}</p>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#991B1B] tracking-wider border-b-2 border-[#C4302B]/20 pb-3 mb-6">
              STUDENT ID CARD
            </h2>
            <div className="space-y-6">
              {[
                { label: 'Name', value: user?.name },
                { label: 'ID Number', value: user?.id },
                { label: 'Department', value: user?.department },
              ].map((item, idx) => (
                <div key={idx} className="hover:bg-[#C4302B]/5 p-3 rounded-lg transition-all duration-200">
                  <p className="text-base text-gray-500 mb-2">{item.label}</p>
                  <p className="text-xl font-semibold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Barcode Section */}
          <div className="self-center">
            <div className="bg-gradient-to-r from-[#1B2024] to-[#2C3E50] text-white py-4 px-10 rounded-lg shadow-lg flex items-center justify-center gap-3 text-lg">
              <div className="w-1 h-6 bg-white/30 rounded-full" />
              <p className="font-semibold tracking-wide">BARCODE</p>
              <div className="w-1 h-6 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium tracking-wide rounded-md">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
          <p>Valid until: 31/12/{new Date().getFullYear()+1}</p>
        </div>
        <div className="bg-gray-100 px-4 py-1.5 rounded-full">
          <p className="tracking-wide">STUDENT</p>
        </div>
      </div>
    </div>
  </div>
);

const StudentHome = () => {
    const { user } = useAuth();
    const [selectedTimeRange, setSelectedTimeRange] = useState('week');
    const initialAvatar = typeof window !== 'undefined' ? localStorage.getItem('studentAvatarSrc') : null;
    const [avatarSrc, setAvatarSrc] = useState<string>(initialAvatar || '/placeholder-avatar.jpg');
    const handleAvatarChange = (e: any) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            const src = reader.result as string;
            setAvatarSrc(src);
            localStorage.setItem('studentAvatarSrc', src);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };
    const [academicStats, setAcademicStats] = useState({
        totalCredits: 102,
        completedCredits: 75,
        pendingCredits: 27,
        currentCGPA: 8.8,
    });
    const [showTimetable, setShowTimetable] = useState(false);
    const [showAssignments, setShowAssignments] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showFeePayment, setShowFeePayment] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedSemester, setSelectedSemester] = useState(4);
    const [showAcademicCalendar, setShowAcademicCalendar] = useState(false);

    const handleDownloadId = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 850;
      canvas.height = 540;

      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Header bar
      ctx.fillStyle = '#C4302B';
      ctx.fillRect(0, 0, canvas.width, 80);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 42px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('MET Bhujbal Knowledge City', canvas.width/2, 50);

      // ID card title
      ctx.fillStyle = '#';
      ctx.font = 'bold 30px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('STUDENT ID CARD', 270, 130);

      // Draw avatar circle
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = avatarSrc;
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(150, 270, 80, 0, Math.PI*2);
        ctx.clip();
        ctx.drawImage(img, 70, 190, 160, 160);
        ctx.restore();

        // Student details
        ctx.fillStyle = '#64748b';
        ctx.font = '16px Arial';
        ['Name:', 'ID:', 'Department:'].forEach((label, i) => {
          ctx.fillText(label, 270, 200 + i*40);
          ctx.fillStyle = '#1a202c';
          ctx.font = 'bold 18px Arial';
          const val = i===0 ? user?.name : i===1 ? user?.id : user?.department;
          ctx.fillText(val||'', 350, 200 + i*40);
          ctx.fillStyle = '#64748b';
          ctx.font = '16px Arial';
        });

        // Barcode placeholder
        ctx.fillStyle = '#2C3E50';
        ctx.fillRect((canvas.width-350)/2, 330, 350, 50);
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('BARCODE', canvas.width/2, 365);

        // Footer
        ctx.fillStyle = '#C4302B';
        ctx.fillRect(0, canvas.height-60, canvas.width, 60);
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Valid until: 31/12/2025', 20, canvas.height-20);
        ctx.textAlign = 'right';
        ctx.fillText('STUDENT', canvas.width-20, canvas.height-20);

        // Download the card
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'student_id_card.png';
        link.click();
      };
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="p-6 md:p-10 max-w-7xl mx-auto space-y-10"
        >
            {/* Student Info Card */}
            <motion.div
                className="bg-white rounded-xl shadow-xl overflow-hidden"
                variants={itemVariants}
            >
                <div className="bg-[#DC2626] text-white p-6">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-6">
                            <div className="relative inline-block">
                                <Avatar className="h-24 w-24 border-4 border-white/20">
                                    <AvatarImage src={avatarSrc} alt="Student" />
                                    <AvatarFallback className="bg-white text-[#DC2626] text-xl">
                                        {user?.name?.split(' ').map(n => n[0]).join('') || 'LS'}
                                    </AvatarFallback>
                                </Avatar>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                                    onChange={handleAvatarChange}
                                />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold">{user?.name }</h2>
                                <div className="flex gap-2">
                                    <Badge className="bg-white/20 hover:bg-white/30">{ '2025'} Year</Badge>
                                    <Badge className="bg-white/20 hover:bg-white/30">{user?.department || 'Computer Science'}</Badge>
                                </div>
                                <p className="text-sm text-white/80">GR Number: {user?.id || 'N04112100064'}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="secondary" className="bg-white text-[#DC2626] hover:bg-gray-100" onClick={handleDownloadId}>
                                <FaDownload className="mr-2" />
                                Download ID Card
                            </Button>
                            <Button variant="secondary" className="bg-white text-[#DC2626] hover:bg-gray-100">
                                <FaCalendarAlt className="mr-2" />
                                View Academic Calendar
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white">
                    <motion.div className="space-y-2" variants={itemVariants}>
                        <div className="flex items-center gap-2 text-gray-500">
                            <FaUserGraduate className="h-4 w-4" />
                            <span className="text-sm">Department</span>
                        </div>
                        <p className="font-medium">{user?.department || 'Computer Science'}</p>
                    </motion.div>
                    <motion.div className="space-y-2" variants={itemVariants}>
                        <div className="flex items-center gap-2 text-gray-500">
                            <FaUniversity className="h-4 w-4" />
                            <span className="text-sm">Year</span>
                        </div>
                        <p className="font-medium">{user?.year || 'Fourth'}</p>
                    </motion.div>
                    <motion.div className="space-y-2" variants={itemVariants}>
                        <div className="flex items-center gap-2 text-gray-500">
                            <FaIdCard className="h-4 w-4" />
                            <span className="text-sm">Current CGPA</span>
                        </div>
                        <p className="font-medium">{user?.cgpa || '8.8'}</p>
                    </motion.div>
                    <motion.div className="space-y-2" variants={itemVariants}>
                        <div className="flex items-center gap-2 text-gray-500">
                            <FaCalendarAlt className="h-4 w-4" />
                            <span className="text-sm">Attendance</span>
                        </div>
                        <p className="font-medium">{user?.attendance || '85%'}</p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                className="bg-white rounded-xl shadow-xl p-6"
                variants={itemVariants}
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">⚡ Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button 
                        className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center shadow-sm hover:shadow-md"
                        onClick={() => setShowTimetable(true)}
                    >
                        <span className="text-2xl">📚</span>
                        <p className="mt-2 font-medium">View Timetable</p>
                    </button>
                    <button 
                        className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition text-center shadow-sm hover:shadow-md"
                        onClick={() => setShowAssignments(true)}
                    >
                        <span className="text-2xl">📝</span>
                        <p className="mt-2 font-medium">Submit Assignment</p>
                    </button>
                    <button 
                        className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-center shadow-sm hover:shadow-md"
                        onClick={() => setShowResults(true)}
                    >
                        <span className="text-2xl">📊</span>
                        <p className="mt-2 font-medium">View Results</p>
                    </button>
                    <button 
                        className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition text-center shadow-sm hover:shadow-md"
                        onClick={() => setShowFeePayment(true)}
                    >
                        <span className="text-2xl">💰</span>
                        <p className="mt-2 font-medium">Fee Payment</p>
                    </button>
                </div>
            </motion.div>

            {/* Academic Progress */}
            <motion.div
                className="bg-white rounded-xl shadow-xl p-6"
                variants={itemVariants}
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">📈 Academic Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-semibold mb-4">CGPA Progression</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={academicProgress}>
                                <XAxis dataKey="semester" />
                                <YAxis domain={[7, 10]} />
                                <Tooltip />
                                <Line type="monotone" dataKey="cgpa" stroke="#ef4444" name="CGPA" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h3 className="font-semibold mb-4">Subject Performance</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={subjectPerformance}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {subjectPerformance.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>

            {/* Attendance Analysis */}
            <motion.div
                className="bg-white rounded-xl shadow-xl p-6"
                variants={itemVariants}
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">📅 Attendance Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={attendanceData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="present" fill="#10B981" name="Present Days" />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 className="font-semibold mb-2">Attendance Summary</h3>
                            <p className="text-sm text-gray-600">Current Month: 90%</p>
                            <p className="text-sm text-gray-600">Last Month: 88%</p>
                            <p className="text-sm text-gray-600">Overall: 85%</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Assignment Results */}
            <motion.div
                className="bg-white rounded-xl shadow-xl p-6"
                variants={itemVariants}
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">📘 Assignment Results</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-2 px-4 text-left">Subject</th>
                                <th className="py-2 px-4 text-left">Your Score</th>
                                <th className="py-2 px-4 text-left">Class Average</th>
                                <th className="py-2 px-4 text-left">Rank</th>
                                <th className="py-2 px-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignmentResults.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{item.subject}</td>
                                    <td className="py-2 px-4 font-semibold">{item.score}</td>
                                    <td className="py-2 px-4">{item.classAverage}</td>
                                    <td className="py-2 px-4">{item.rank}</td>
                                    <td className="py-2 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            item.score > item.classAverage ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {item.score > item.classAverage ? 'Above Average' : 'Below Average'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Placement Summary */}
            <motion.div
                className="bg-white rounded-xl shadow-xl p-6"
                variants={itemVariants}
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 Placement Summary</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-2 px-4 text-left">Company</th>
                                <th className="py-2 px-4 text-left">Role</th>
                                <th className="py-2 px-4 text-left">Status</th>
                                <th className="py-2 px-4 text-left">CTC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {placementSummary.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{item.company}</td>
                                    <td className="py-2 px-4">{item.role}</td>
                                    <td className={`py-2 px-4 font-semibold ${
                                        item.status === 'Placed' ? 'text-green-600' : 'text-red-600'
                                    }`}>{item.status}</td>
                                    <td className="py-2 px-4">{item.ctc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default StudentHome;
