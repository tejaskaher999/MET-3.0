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

const StudentIdCard = ({ user }: { user: any }) => (
  <div id="student-id-card" className="w-[400px] h-[250px] bg-white rounded-xl overflow-hidden shadow-2xl">
    {/* Header */}
    <div className="h-16 bg-[#DC2626] flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <FaUniversity className="h-8 w-8 text-white" />
        <div className="text-white">
          <h3 className="font-bold text-lg">University Name</h3>
          <p className="text-xs opacity-80">Student Identification Card</p>
        </div>
      </div>
      <div className="bg-white/20 px-3 py-1 rounded-full">
        <p className="text-white text-sm font-medium">2023-24</p>
      </div>
    </div>

    {/* Content */}
    <div className="p-4 flex gap-4">
      <div className="w-[100px] h-[120px] bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
        <img
          src="/placeholder-avatar.jpg"
          alt="Student"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 space-y-2">
        <div>
          <p className="text-sm text-gray-500">GR Number</p>
          <p className="font-semibold">{user?.id || 'N04112100064'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-semibold">{user?.name || 'Lachake Atharva Santosh'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Department</p>
          <p className="font-semibold">{user?.department || 'Computer Science'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Year</p>
          <p className="font-semibold">{user?.year || 'Fourth'}</p>
        </div>
      </div>

      <div className="w-[80px] flex flex-col items-center justify-between">
        <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-md border border-gray-100">
          <FaBarcode className="h-16 w-16 text-[#DC2626]" />
        </div>
        <div className="text-center bg-gray-50 px-3 py-2 rounded-full border border-gray-100">
          <p className="text-[10px] text-gray-500">Valid Till</p>
          <p className="text-xs font-medium">31/12/2024</p>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DC2626]" />
  </div>
);

const StudentHome = () => {
    const { user } = useAuth();
    const [selectedTimeRange, setSelectedTimeRange] = useState('week');
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

    const handleDownloadId = async () => {
        const idCard = document.getElementById('student-id-card');
        if (idCard) {
            try {
                const canvas = await html2canvas(idCard);
                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = image;
                link.download = 'student-id-card.png';
                link.click();
            } catch (error) {
                console.error('Error generating ID card:', error);
            }
        }
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
                            <Avatar className="h-24 w-24 border-4 border-white/20">
                                <AvatarImage src="/placeholder-avatar.jpg" alt="Student" />
                                <AvatarFallback className="bg-white text-[#DC2626] text-xl">
                                    {user?.name?.split(' ').map(n => n[0]).join('') || 'LS'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold">{user?.name || 'Lachake Atharva Santosh'}</h2>
                                <div className="flex gap-2">
                                    <Badge className="bg-white/20 hover:bg-white/30">{user?.year || 'Fourth'} Year</Badge>
                                    <Badge className="bg-white/20 hover:bg-white/30">{user?.department || 'Computer Science'}</Badge>
                                </div>
                                <p className="text-sm text-white/80">GR Number: {user?.id || 'N04112100064'}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary" className="bg-white text-[#DC2626] hover:bg-gray-100">
                                        <FaIdCard className="mr-2" />
                                        Download ID Card
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[450px]">
                                    <DialogHeader>
                                        <DialogTitle>Student ID Card</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <StudentIdCard user={user} />
                                    </div>
                                    <DialogFooter className="flex gap-2">
                                        <Button variant="outline" onClick={() => window.print()}>
                                            <Printer className="h-4 w-4 mr-2" />
                                            Print
                                        </Button>
                                        <Button onClick={handleDownloadId}>
                                            <FaDownload className="mr-2" />
                                            Download
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
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
