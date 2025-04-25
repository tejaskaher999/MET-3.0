import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Building, 
    Calendar, 
    ExternalLink, 
    MapPin, 
    Search, 
    Users, 
    X, 
    MoreVertical, 
    Pencil, 
    Trash,
    FileText,
    Mail,
    Edit,
    ChartLine
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface PlacementStats {
    totalPlacements: number;
    averagePackage: number;
    highestPackage: number;
    placementRate: number;
}

interface Company {
    id: string;
    name: string;
    position: string;
    package: string;
    date: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    applicationDeadline: string;
    eligibility: {
        cgpa: number;
        backlogs: number;
        branches: string[];
        yearOfPassing: string;
    };
    jobType: 'full-time' | 'part-time' | 'internship';
    workLocation: 'remote' | 'hybrid' | 'onsite';
    locationDetails: string;
    jobDescription: string;
    requiredSkills: string[];
    additionalInfo: string;
    rounds: {
        id: string;
        name: string;
        date: string;
        time: string;
        venue: string;
        status: 'pending' | 'completed';
    }[];
}

interface CompanyFormData {
    name: string;
    position: string;
    package: string;
    date: string;
    applicationDeadline: string;
    eligibility: {
        cgpa: number;
        backlogs: number;
        branches: string[];
        yearOfPassing: string;
    };
    jobType: 'full-time' | 'part-time' | 'internship';
    workLocation: 'remote' | 'hybrid' | 'onsite';
    locationDetails: string;
    jobDescription: string;
    requiredSkills: string[];
    additionalInfo: string;
}

interface AddCompanyFormData {
    name: string;
    position: string;
    package: string;
    date: string;
    applicationDeadline: string;
    eligibility: {
        cgpa: number;
        backlogs: number;
        branches: string[];
        yearOfPassing: string;
    };
    jobType: 'full-time' | 'part-time' | 'internship';
    workLocation: 'remote' | 'hybrid' | 'onsite';
    locationDetails: string;
    jobDescription: string;
    requiredSkills: string[];
    additionalInfo: string;
}

interface DriveRound {
    name: string;
    date: string;
    time: string;
    venue: string;
    status: 'pending' | 'completed';
}

interface DriveFormData {
    companyId: string;
    driveDate: string;
    venue: string;
    rounds: DriveRound[];
    eligibleBranches: string[];
    description: string;
    schedule: string;
    requirements: string;
    contactPerson: string;
    contactEmail: string;
    maxRegistrations: string;
    registrationDeadline: string;
    selectionProcess: string;
    additionalNotes: string;
}

interface StudentApplication {
    id: string;
    studentName: string;
    studentId: string;
    branch: string;
    cgpa: number;
    companyName: string;
    position: string;
    applicationDate: string;
    status: 'ongoing' | 'shortlisted' | 'registered' | 'waitlisted' | 'rejected';
    resume: string;
}

interface PlacementDrive {
    id: string;
    companyName: string;
    companyPosition: string;
    companyPackage: string;
    eligibility: {
        cgpa: number;
        backlogs: number;
        branches: string[];
        yearOfPassing: string;
    };
    jobType: 'full-time' | 'part-time' | 'internship';
    workLocation: 'remote' | 'hybrid' | 'onsite';
    date: string;
    venue: string;
    registeredStudents: number;
    status: 'upcoming' | 'ongoing' | 'completed';
    rounds: {
        id: string;
        name: string;
        date: string;
        time: string;
        venue: string;
        status: 'pending' | 'completed';
    }[];
    registrationDeadline: string;
    description: string;
    requirements: string;
    contactPerson: string;
    contactEmail: string;
    maxRegistrations: number;
}

interface ManageApplicationsModalProps {
    isOpen: boolean;
    onClose: () => void;
    company: Company | null;
    applications: StudentApplication[];
}

interface RegisteredStudent {
    id: string;
    studentId: string;
    name: string;
    email: string;
    branch: string;
    cgpa: number;
    status: 'active' | 'inactive' | 'pending';
    applicationDate: string;
}

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

// Add a new className constant at the top of the file after imports
const buttonStyles = "bg-[#800000] text-white hover:bg-[#600000] transition-colors";
const secondaryButtonStyles = "border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white transition-colors";

export default function ViewCompany() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // State declarations
    const [activeTab, setActiveTab] = useState('overview');
    const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
    const [showEditCompanyModal, setShowEditCompanyModal] = useState(false);
    const [showScheduleDriveModal, setShowScheduleDriveModal] = useState(false);
    const [showCompanyDetails, setShowCompanyDetails] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [companyFormData, setCompanyFormData] = useState<CompanyFormData>({
        name: '',
        position: '',
        package: '',
        date: '',
        applicationDeadline: '',
        eligibility: {
            cgpa: 0,
            backlogs: 0,
            branches: [],
            yearOfPassing: ''
        },
        jobType: 'full-time',
        workLocation: 'onsite',
        locationDetails: '',
        jobDescription: '',
        requiredSkills: [],
        additionalInfo: ''
    });
    const [placementStats, setPlacementStats] = useState<PlacementStats>({
        totalPlacements: 150,
        averagePackage: 6.5,
        highestPackage: 12.0,
        placementRate: 85,
    });
    const [showCompanyDetailsModal, setShowCompanyDetailsModal] = useState(false);
    const [showManageApplicationsModal, setShowManageApplicationsModal] = useState(false);
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<StudentApplication | null>(null);
    const [showDriveModal, setShowDriveModal] = useState(false);
    const [selectedDrive, setSelectedDrive] = useState<PlacementDrive | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
    const [companies, setCompanies] = useState<Company[]>([
        {
            id: '1',
            name: 'TCS Digital',
            position: 'Software Engineer',
            package: '7.5 LPA',
            date: '2024-03-15',
            status: 'upcoming',
            applicationDeadline: '2024-03-01',
            eligibility: {
                cgpa: 7.5,
                backlogs: 0,
                branches: ['CSE', 'IT', 'ECE'],
                yearOfPassing: '2024'
            },
            jobType: 'full-time',
            workLocation: 'hybrid',
            locationDetails: 'Bangalore, Mumbai, Chennai',
            jobDescription: 'Looking for passionate software engineers with strong problem-solving skills and knowledge of Java, Python, and web technologies.',
            requiredSkills: ['Java', 'Python', 'SQL', 'Web Technologies'],
            additionalInfo: 'Training period of 3 months in Chennai',
            rounds: [
                {
                    id: 'r1',
                    name: 'Online Test',
                    date: '2024-03-15',
                    time: '10:00 AM',
                    venue: 'Computer Lab 1',
                    status: 'pending'
                },
                {
                    id: 'r2',
                    name: 'Technical Interview',
                    date: '2024-03-15',
                    time: '2:00 PM',
                    venue: 'Interview Room 1',
                    status: 'pending'
                }
            ]
        },
        {
            id: '2',
            name: 'Infosys',
            position: 'Systems Engineer',
            package: '6.5 LPA',
            date: '2024-03-20',
            status: 'upcoming',
            applicationDeadline: '2024-03-05',
            eligibility: {
                cgpa: 7.0,
                backlogs: 1,
                branches: ['CSE', 'IT', 'ECE', 'EEE'],
                yearOfPassing: '2024'
            },
            jobType: 'full-time',
            workLocation: 'onsite',
            locationDetails: 'Bangalore, Hyderabad, Pune',
            jobDescription: 'Systems Engineer role focusing on software development and maintenance.',
            requiredSkills: ['Java', 'SQL', 'Basic Programming'],
            additionalInfo: '6 months training period',
            rounds: [
                {
                    id: 'r3',
                    name: 'Online Test',
                    date: '2024-03-20',
                    time: '10:00 AM',
                    venue: 'Computer Lab 2',
                    status: 'pending'
                },
                {
                    id: 'r4',
                    name: 'Technical Interview',
                    date: '2024-03-20',
                    time: '2:00 PM',
                    venue: 'Interview Room 2',
                    status: 'pending'
                }
            ]
        },
        {
            id: '3',
            name: 'Wipro',
            position: 'Project Engineer',
            package: '6.0 LPA',
            date: '2024-03-25',
            status: 'upcoming',
            applicationDeadline: '2024-03-10',
            eligibility: {
                cgpa: 6.5,
                backlogs: 2,
                branches: ['CSE', 'IT', 'ECE', 'EEE', 'MECH'],
                yearOfPassing: '2024'
            },
            jobType: 'full-time',
            workLocation: 'hybrid',
            locationDetails: 'Bangalore, Chennai, Hyderabad',
            jobDescription: 'Project Engineer role with focus on software development and testing.',
            requiredSkills: ['Java', 'Python', 'Testing', 'Agile'],
            additionalInfo: '3 months training period',
            rounds: [
                {
                    id: 'r5',
                    name: 'Online Test',
                    date: '2024-03-25',
                    time: '10:00 AM',
                    venue: 'Computer Lab 3',
                    status: 'pending'
                },
                {
                    id: 'r6',
                    name: 'Technical Interview',
                    date: '2024-03-25',
                    time: '2:00 PM',
                    venue: 'Interview Room 3',
                    status: 'pending'
                }
            ]
        }
    ]);
    const [studentApplications, setStudentApplications] = useState<StudentApplication[]>([
        {
            id: '1',
            studentName: 'Rahul Sharma',
            studentId: 'CSE2024001',
            branch: 'CSE',
            cgpa: 8.5,
            companyName: 'TCS Digital',
            position: 'Software Engineer',
            applicationDate: '2024-02-15',
            status: 'shortlisted',
            resume: '/resumes/rahul_sharma.pdf'
        },
        {
            id: '2',
            studentName: 'Priya Patel',
            studentId: 'IT2024002',
            branch: 'IT',
            cgpa: 8.8,
            companyName: 'Infosys',
            position: 'Systems Engineer',
            applicationDate: '2024-02-16',
            status: 'ongoing',
            resume: '/resumes/priya_patel.pdf'
        },
        {
            id: '3',
            studentName: 'Amit Kumar',
            studentId: 'ECE2024003',
            branch: 'ECE',
            cgpa: 7.9,
            companyName: 'Wipro',
            position: 'Project Engineer',
            applicationDate: '2024-02-17',
            status: 'registered',
            resume: '/resumes/amit_kumar.pdf'
        }
    ]);
    const [placementDrives, setPlacementDrives] = useState<PlacementDrive[]>([
        {
            id: '1',
            companyName: 'TCS Digital',
            companyPosition: 'Software Engineer',
            companyPackage: '7.5 LPA',
            eligibility: {
                cgpa: 7.5,
                backlogs: 0,
                branches: ['CSE', 'IT', 'ECE'],
                yearOfPassing: '2024'
            },
            jobType: 'full-time',
            workLocation: 'hybrid',
            date: '2024-03-15',
            venue: 'Main Campus',
            registeredStudents: 50,
            status: 'upcoming',
            rounds: [
                {
                    id: 'r1',
                    name: 'Online Test',
                    date: '2024-03-15',
                    time: '10:00 AM',
                    venue: 'Computer Lab 1',
                    status: 'pending'
                },
                {
                    id: 'r2',
                    name: 'Technical Interview',
                    date: '2024-03-15',
                    time: '2:00 PM',
                    venue: 'Interview Room 1',
                    status: 'pending'
                }
            ],
            registrationDeadline: '2024-03-01',
            description: 'Looking for passionate software engineers with strong problem-solving skills and knowledge of Java, Python, and web technologies.',
            requirements: 'Training period of 3 months in Chennai',
            contactPerson: '',
            contactEmail: '',
            maxRegistrations: 100
        },
        {
            id: '2',
            companyName: 'Infosys',
            companyPosition: 'Systems Engineer',
            companyPackage: '6.5 LPA',
            eligibility: {
                cgpa: 7.0,
                backlogs: 1,
                branches: ['CSE', 'IT', 'ECE', 'EEE'],
                yearOfPassing: '2024'
            },
            jobType: 'full-time',
            workLocation: 'onsite',
            date: '2024-03-20',
            venue: 'Seminar Hall',
            registeredStudents: 120,
            status: 'upcoming',
            rounds: [
                {
                  name: 'Online Test',
                  time: '10:00 AM',
                  venue: 'Computer Lab',
                  status: 'pending',
                  id: '',
                  date: ''
                },
                {
                  name: 'Technical Discussion',
                  time: '01:00 PM',
                  venue: 'Room 301',
                  status: 'pending',
                  id: '',
                  date: ''
                }
            ],
            registrationDeadline: '2024-03-05',
            description: 'Systems Engineer role focusing on software development and maintenance.',
            requirements: '6 months training period',
            contactPerson: '',
            contactEmail: '',
            maxRegistrations: 150
        },
        {
            id: '3',
            companyName: 'Wipro',
            companyPosition: 'Project Engineer',
            companyPackage: '6.0 LPA',
            eligibility: {
                cgpa: 6.5,
                backlogs: 2,
                branches: ['CSE', 'IT', 'ECE', 'EEE', 'MECH'],
                yearOfPassing: '2024'
            },
            jobType: 'full-time',
            workLocation: 'hybrid',
            date: '2024-03-25',
            venue: 'Conference Hall',
            registeredStudents: 100,
            status: 'upcoming',
            rounds: [
                {
                  name: 'Written Test',
                  time: '09:30 AM',
                  venue: 'Hall 1',
                  status: 'pending',
                  id: '',
                  date: ''
                },
                {
                  name: 'Group Discussion',
                  time: '11:30 AM',
                  venue: 'Hall 2',
                  status: 'pending',
                  id: '',
                  date: ''
                },
                {
                  name: 'Final Interview',
                  time: '02:30 PM',
                  venue: 'Room 401',
                  status: 'pending',
                  id: '',
                  date: ''
                }
            ],
            registrationDeadline: '2024-03-10',
            description: 'Project Engineer role with focus on software development and testing.',
            requirements: '3 months training period',
            contactPerson: '',
            contactEmail: '',
            maxRegistrations: 120
        }
    ]);

    // Handler functions
    const handleExportApplications = (applications: StudentApplication[]) => {
        const headers = ['Student Name', 'Student ID', 'Company', 'Position', 'Status', 'CGPA', 'Branch', 'Application Date'];
        const csvData = applications.map(app => [
            app.studentName,
            app.studentId,
            app.companyName,
            app.position,
            app.status,
            app.cgpa,
            app.branch,
            new Date(app.applicationDate).toLocaleDateString()
        ]);

        const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'student_applications.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const handleSendUpdates = (applications: StudentApplication[]) => {
        alert(`Updates will be sent to ${applications.length} students`);
    };

    const handleUpdateApplicationStatus = (applicationId: string, newStatus: 'ongoing' | 'shortlisted' | 'registered' | 'waitlisted' | 'rejected') => {
        setStudentApplications(prevApplications => 
            prevApplications.map(app => {
                if (app.id === applicationId) {
                    return {
                        ...app,
                        status: newStatus
                    };
                }
                return app;
            })
        );
    };

    const handleViewResume = (resumeUrl: string) => {
        window.open(resumeUrl, '_blank');
    };

    const handleEditApplication = (application: StudentApplication) => {
        setSelectedStudent(application);
        setShowStudentModal(true);
    };

    const handleEditCompany = (company: Company) => {
        setSelectedCompany(company);
        setShowEditCompanyModal(true);
    };

    const handleEditCompanySubmit = (updatedData: AddCompanyFormData) => {
        if (selectedCompany) {
            const updatedCompany: Company = {
                ...selectedCompany,
                ...updatedData,
                rounds: selectedCompany.rounds // Preserve existing rounds
            };
            setCompanies(prevCompanies =>
                prevCompanies.map(company =>
                    company.id === updatedCompany.id ? updatedCompany : company
                )
            );
            setShowEditCompanyModal(false);
            setSelectedCompany(null);
        }
    };

    const handleUpdateDriveStatus = (driveId: string, roundIndex: number, newStatus: 'pending' | 'completed') => {
        setPlacementDrives((prevDrives: PlacementDrive[]) => 
            prevDrives.map((drive: PlacementDrive) => {
                if (drive.id === driveId) {
                    const updatedRounds = [...drive.rounds];
                    updatedRounds[roundIndex] = {
                        ...updatedRounds[roundIndex],
                        status: newStatus
                    };
                    return {
                        ...drive,
                        rounds: updatedRounds
                    };
                }
                return drive;
            })
        );
    };

    const handleDeleteCompany = (companyId: string) => {
        setCompanies(prevCompanies => prevCompanies.filter(company => company.id !== companyId));
    };

    useEffect(() => {
        // Set initial tab based on URL query parameter
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab && tab !== activeTab) {
            setActiveTab(tab);
        }
    }, [location.search]);

    const handleTabChange = (tab: string) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            // Update URL without triggering a full page reload
            navigate(`?tab=${tab}`, { replace: true });
        }
    };

    const handleAddCompanySubmit = (data: AddCompanyFormData) => {
        const newCompany: Company = {
            id: Date.now().toString(),
            ...data,
            status: 'upcoming',
            rounds: []
        };
        setCompanies([...companies, newCompany]);
        setShowAddCompanyModal(false);
        
        // Ask if user wants to schedule a drive
        if (window.confirm('Company added successfully! Would you like to schedule a drive for this company?')) {
            setSelectedCompany(newCompany);
            setShowScheduleDriveModal(true);
        }
    };

    const handleScheduleDriveSubmit = (data: DriveFormData) => {
        if (!selectedCompany) return;

        const newDrive: PlacementDrive = {
            id: Math.random().toString(36).substr(2, 9),
            companyName: selectedCompany.name,
            companyPosition: selectedCompany.position,
            companyPackage: selectedCompany.package,
            eligibility: selectedCompany.eligibility,
            jobType: selectedCompany.jobType,
            workLocation: selectedCompany.workLocation,
            date: data.driveDate,
            venue: data.venue,
            registeredStudents: 0,
            status: 'upcoming',
            rounds: data.rounds.map((round, index) => ({
                id: `r${Math.random().toString(36).substr(2, 9)}`,
                name: round.name,
                date: data.driveDate,
                time: '10:00 AM', // You might want to make this configurable
                venue: data.venue,
                status: 'pending'
            })),
            registrationDeadline: data.registrationDeadline,
            description: data.description,
            requirements: data.requirements,
            contactPerson: data.contactPerson,
            contactEmail: data.contactEmail,
            maxRegistrations: parseInt(data.maxRegistrations) || 0
        };

        setPlacementDrives(prev => [...prev, newDrive]);
        setShowScheduleDriveModal(false);
        setSelectedCompany(null);
    };

    const handleCompanyClick = (company: Company) => {
        setSelectedCompany(company);
        setShowCompanyDetailsModal(true);
    };

    // Student Applications Handlers
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value);
    };

    const handleViewStudentDetails = (application: StudentApplication) => {
        setSelectedStudent(application);
        setShowStudentModal(true);
    };

    // Placement Drives Handlers
    const handleViewDriveDetails = (drive: PlacementDrive) => {
        setSelectedDrive(drive);
        setShowDriveModal(true);
    };

    const handleManageDrive = (driveId: string) => {
        const drive = placementDrives.find(d => d.id === driveId);
        if (drive) {
            setSelectedDrive(drive);
            setShowDriveModal(true);
        }
    };

    // Filter applications based on search and status
    const filteredApplications = studentApplications.filter(app => {
        const matchesSearch = app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.companyName.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Component definitions
    const CompanyDetailsModal = ({ isOpen, onClose, company }: {
        isOpen: boolean;
        onClose: () => void;
        company: Company | null;
    }) => {
        if (!company) return null;

        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-lg border flex items-center justify-center bg-muted">
                                    <Building className="h-8 w-8" />
                                </div>
                                <div>
                                    <DialogTitle className="text-2xl">{company.name}</DialogTitle>
                                    <DialogDescription>{company.position}</DialogDescription>
                                </div>
                            </div>
                            <Badge variant={company.status === 'upcoming' ? 'default' : 'secondary'}>
                                {company.status}
                            </Badge>
                        </div>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Key Details Section */}
                        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Package</p>
                                <p className="font-semibold text-lg">{company.package}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Job Type</p>
                                <p className="font-semibold">{company.jobType}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Work Location</p>
                                <p className="font-semibold">{company.workLocation}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Location Details</p>
                                <p className="font-semibold">{company.locationDetails || 'Not specified'}</p>
                            </div>
                        </div>

                        {/* Important Dates */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Important Dates</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border rounded-lg">
                                    <p className="text-sm text-muted-foreground">Drive Date</p>
                                    <p className="font-semibold">
                                        {new Date(company.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <p className="text-sm text-muted-foreground">Application Deadline</p>
                                    <p className="font-semibold">
                                        {new Date(company.applicationDeadline).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Eligibility Criteria */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Eligibility Criteria</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border rounded-lg">
                                    <p className="text-sm text-muted-foreground">Minimum CGPA</p>
                                    <p className="font-semibold">{company.eligibility.cgpa}</p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <p className="text-sm text-muted-foreground">Maximum Backlogs</p>
                                    <p className="font-semibold">{company.eligibility.backlogs}</p>
                                </div>
                                <div className="p-4 border rounded-lg col-span-2">
                                    <p className="text-sm text-muted-foreground">Eligible Branches</p>
                                    <p className="font-semibold">
                                        {company.eligibility.branches.length > 0 
                                            ? company.eligibility.branches.join(', ')
                                            : 'All branches eligible'}
                                    </p>
                                </div>
                                <div className="p-4 border rounded-lg col-span-2">
                                    <p className="text-sm text-muted-foreground">Year of Passing</p>
                                    <p className="font-semibold">{company.eligibility.yearOfPassing}</p>
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Job Description</h3>
                            <div className="prose max-w-none">
                                <p className="whitespace-pre-wrap">{company.jobDescription}</p>
                            </div>
                        </div>

                        {/* Required Skills */}
                        {company.requiredSkills.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {company.requiredSkills.map((skill, index) => (
                                        <Badge key={index} variant="secondary">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Additional Information */}
                        {company.additionalInfo && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Additional Information</h3>
                                <div className="prose max-w-none">
                                    <p className="whitespace-pre-wrap">{company.additionalInfo}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={() => {
                            handleEditCompany(company);
                            onClose();
                        }}>
                            Edit Details
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    const ManageApplicationsModal = ({ isOpen, onClose, company, applications }: ManageApplicationsModalProps) => {
        if (!company) return null;

        const companyApplications = applications.filter(app => app.companyName === company.name);

        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Manage Applications - {company.name}</DialogTitle>
                        <DialogDescription>View and manage student applications for {company.position}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Total Applications</p>
                                <p className="text-2xl font-bold">{companyApplications.length}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleExportApplications(companyApplications)}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Export List
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleSendUpdates(companyApplications)}
                                >
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send Updates
                                </Button>
                            </div>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Branch</TableHead>
                                    <TableHead>CGPA</TableHead>
                                    <TableHead>Application Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {companyApplications.map((application) => (
                                    <TableRow key={application.id}>
                                        <TableCell>{application.studentName}</TableCell>
                                        <TableCell>{application.studentId}</TableCell>
                                        <TableCell>{application.branch}</TableCell>
                                        <TableCell>{application.cgpa}</TableCell>
                                        <TableCell>
                                            {new Date(application.applicationDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={application.status}
                                                onValueChange={(value) => handleUpdateApplicationStatus(application.id, value as 'ongoing' | 'shortlisted' | 'registered' | 'waitlisted' | 'rejected')}
                                            >
                                                <SelectTrigger className="w-[130px] border-[#800000] text-[#800000] hover:bg-red-50">
                                                    <SelectValue>
                                                        <Badge className={getStatusColor(application.status)}>
                                                            {application.status}
                                                        </Badge>
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent className="border-[#800000]">
                                                    <SelectItem value="pending" className="text-[#800000] hover:bg-red-50">Pending</SelectItem>
                                                    <SelectItem value="shortlisted" className="text-[#800000] hover:bg-red-50">Shortlisted</SelectItem>
                                                    <SelectItem value="selected" className="text-[#800000] hover:bg-red-50">Selected</SelectItem>
                                                    <SelectItem value="rejected" className="text-[#800000] hover:bg-red-50">Rejected</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button 
                                                variant="ghost" 
                                                size="icon"
                                                className="hover:bg-red-50 text-[#800000]"
                                                onClick={() => handleViewResume(application.resume)}
                                            >
                                                <FileText className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon"
                                                className="hover:bg-red-50 text-[#800000]"
                                                onClick={() => handleEditApplication(application)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={onClose}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center bg-gradient-to-r from-red-700 to-red-900 p-6 rounded-lg shadow-lg mb-8">
                <h1 className="text-2xl font-bold text-white tracking-wide">Training & Placement Office</h1>
                <div className="flex gap-4">
                    <Button 
                        onClick={() => setShowAddCompanyModal(true)} 
                        variant="secondary"
                        className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#800000] transition-all font-semibold"
                    >
                        <Building className="mr-2 h-4 w-4" />
                        Add Company
                    </Button>
                </div>
            </div>

            {/* Add Modals */}
            <AddCompanyModal
                isOpen={showAddCompanyModal}
                onClose={() => setShowAddCompanyModal(false)}
                onSubmit={handleAddCompanySubmit}
            />

            <AddCompanyModal
                isOpen={showEditCompanyModal}
                onClose={() => {
                    setShowEditCompanyModal(false);
                    setSelectedCompany(null);
                }}
                onSubmit={handleEditCompanySubmit}
                initialData={selectedCompany}
            />

            <ScheduleDriveModal
                isOpen={showScheduleDriveModal}
                onClose={() => setShowScheduleDriveModal(false)}
                onSubmit={handleScheduleDriveSubmit}
                company={selectedCompany}
            />

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="hover:border-[#800000] transition-colors">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#800000]">Total Placements</p>
                                <h2 className="text-3xl font-bold text-[#800000]">150</h2>
                            </div>
                            <div className="p-2 bg-red-100 rounded-full">
                                <Building className="h-5 w-5 text-[#800000]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:border-[#800000] transition-colors">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#800000]">Average Package</p>
                                <h2 className="text-3xl font-bold text-[#800000]">6.5 LPA</h2>
                            </div>
                            <div className="p-2 bg-red-100 rounded-full">
                                <ChartLine className="h-5 w-5 text-[#800000]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:border-[#800000] transition-colors">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#800000]">Highest Package</p>
                                <h2 className="text-3xl font-bold text-[#800000]">12 LPA</h2>
                            </div>
                            <div className="p-2 bg-red-100 rounded-full">
                                <ChartLine className="h-5 w-5 text-[#800000]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:border-[#800000] transition-colors">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#800000]">Placement Rate</p>
                                <h2 className="text-3xl font-bold text-[#800000]">85%</h2>
                            </div>
                            <div className="p-2 bg-red-100 rounded-full">
                                <Users className="h-5 w-5 text-[#800000]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Navigation Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-red-50 p-1">
                    <TabsTrigger 
                        value="overview"
                        className="data-[state=active]:bg-[#800000] data-[state=active]:text-white"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger 
                        value="companies"
                        className="data-[state=active]:bg-[#800000] data-[state=active]:text-white"
                    >
                        Companies
                    </TabsTrigger>
                    <TabsTrigger 
                        value="students"
                        className="data-[state=active]:bg-[#800000] data-[state=active]:text-white"
                    >
                        Students
                    </TabsTrigger>
                    <TabsTrigger 
                        value="drives"
                        className="data-[state=active]:bg-[#800000] data-[state=active]:text-white"
                    >
                        Placement Drives
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Upcoming Drives Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Drives</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {companies
                                        .filter(company => company.status === 'upcoming')
                                        .map(company => (
                                            <div
                                                key={company.id}
                                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                                                onClick={() => handleCompanyClick(company)}
                                            >
                                                <div className="space-y-1">
                                                    <h3 className="font-semibold">{company.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{company.position}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">{company.package}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(company.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Placement Statistics Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Placement Statistics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { dept: "Computer Science", rate: 90 },
                                        { dept: "Electronics", rate: 85 },
                                        { dept: "Mechanical", rate: 80 },
                                        { dept: "Civil", rate: 75 },
                                    ].map((dept, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>{dept.dept}</span>
                                                <span>{dept.rate}%</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500"
                                                    style={{ width: `${dept.rate}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="companies">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Recruiting Companies</CardTitle>
                            <CardDescription>Companies currently hiring from campus</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1">
                                    <Label htmlFor="companySearch" className="sr-only">Search companies</Label>
                                    <Input 
                                        id="companySearch" 
                                        placeholder="Search companies..."
                                        className="focus-visible:ring-[#800000] focus-visible:border-[#800000]"
                                    />
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="icon"
                                    className={secondaryButtonStyles}
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                            
                            <div className="grid gap-4">
                                {companies.map((company, index) => (
                                    <Card key={company.id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="h-16 w-16 flex-shrink-0 rounded-md border p-2">
                                                    <Building className="h-full w-full" />
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-semibold text-lg">{company.name}</h3>
                                                        <Badge variant={company.status === "upcoming" ? "default" : "secondary"}>
                                                            {company.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-muted-foreground">{company.position}</p>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                                        <div className="flex items-center text-muted-foreground">
                                                            <MapPin className="mr-1 h-3 w-3" />
                                                            {company.workLocation}
                                                        </div>
                                                        <div className="flex items-center text-muted-foreground">
                                                            <Calendar className="mr-1 h-3 w-3" />
                                                            Deadline: {new Date(company.applicationDeadline).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center text-muted-foreground">
                                                            <Users className="mr-1 h-3 w-3" />
                                                            CGPA: {company.eligibility.cgpa}+
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-lg">{company.package}</p>
                                                    <p className="text-sm text-muted-foreground">{company.jobType}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-4 border-t pt-4">
                                                <div className="flex justify-between">
                                                    <div className="space-y-1">
                                                        <p className="text-sm">Required Skills: {company.requiredSkills.join(', ') || 'Not specified'}</p>
                                                        <div className="flex items-center gap-4">
                                                            <div>
                                                                <span className="text-sm font-medium">Branches:</span>{" "}
                                                                <span className="text-sm">{company.eligibility.branches.join(', ') || 'All'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            className={secondaryButtonStyles}
                                                            onClick={() => handleCompanyClick(company)}
                                                        >
                                                            <ExternalLink className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </Button>
                                                        <Button 
                                                            size="sm"
                                                            className={buttonStyles}
                                                            onClick={() => {
                                                                setSelectedCompany(company);
                                                                setShowScheduleDriveModal(true);
                                                            }}
                                                        >
                                                            <Calendar className="mr-2 h-4 w-4" />
                                                            Schedule Drive
                                                        </Button>
                                                        <Button 
                                                            size="sm"
                                                            className={buttonStyles}
                                                            onClick={() => {
                                                                setSelectedCompany(company);
                                                                setShowManageApplicationsModal(true);
                                                            }}
                                                        >
                                                            Manage Applications
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="students">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Student Applications</CardTitle>
                                    <CardDescription>View and manage student applications</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className={secondaryButtonStyles} onClick={() => handleExportApplications(studentApplications)}>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                    <Button variant="outline" className={secondaryButtonStyles} onClick={() => handleSendUpdates(studentApplications)}>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Send Updates
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <Input 
                                            placeholder="Search applications..." 
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                    <Select 
                                        value={statusFilter}
                                        onValueChange={handleStatusFilterChange}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                            <SelectItem value="selected">Selected</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student</TableHead>
                                            <TableHead>Company & Position</TableHead>
                                            <TableHead>Application Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>CGPA</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredApplications.map((application) => (
                                            <TableRow key={application.id}>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{application.studentName}</p>
                                                        <p className="text-sm text-muted-foreground">{application.studentId}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{application.companyName}</p>
                                                        <p className="text-sm text-muted-foreground">{application.position}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(application.applicationDate).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={application.status}
                                                        onValueChange={(value) => handleUpdateApplicationStatus(application.id, value as 'ongoing' | 'shortlisted' | 'registered' | 'waitlisted' | 'rejected')}
                                                    >
                                                        <SelectTrigger className="w-[130px] border-[#800000] text-[#800000] hover:bg-red-50">
                                                            <SelectValue>
                                                                <Badge className={getStatusColor(application.status)}>
                                                                    {application.status}
                                                                </Badge>
                                                            </SelectValue>
                                                        </SelectTrigger>
                                                        <SelectContent className="border-[#800000]">
                                                            <SelectItem value="pending" className="text-[#800000] hover:bg-red-50">Pending</SelectItem>
                                                            <SelectItem value="shortlisted" className="text-[#800000] hover:bg-red-50">Shortlisted</SelectItem>
                                                            <SelectItem value="selected" className="text-[#800000] hover:bg-red-50">Selected</SelectItem>
                                                            <SelectItem value="rejected" className="text-[#800000] hover:bg-red-50">Rejected</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell>{application.cgpa}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon"
                                                        className="hover:bg-red-50 text-[#800000]"
                                                        onClick={() => handleViewResume(application.resume)}
                                                    >
                                                        <FileText className="h-4 w-4" />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon"
                                                        className="hover:bg-red-50 text-[#800000]"
                                                        onClick={() => handleEditApplication(application)}
                                                    >
                                                        <Edit className="h-4 w-4" />
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

                <TabsContent value="drives">
                    <Card>
                        <CardHeader>
                            <CardTitle>Placement Drives</CardTitle>
                            <CardDescription>View and manage upcoming placement drives</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {placementDrives.map((drive) => (
                                    <Card key={drive.id} className="hover:border-[#800000] transition-colors">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <CardTitle className="text-2xl font-bold text-[#800000]">
                                                        {drive.companyName}
                                                    </CardTitle>
                                                    <CardDescription className="text-base">
                                                        {new Date(drive.date).toLocaleDateString('en-US', {
                                                            weekday: 'long',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </CardDescription>
                                                </div>
                                                <Badge 
                                                    className={cn(
                                                        "px-4 py-1 text-sm capitalize",
                                                        drive.status === 'upcoming' ? "bg-yellow-100 text-[#800000]" :
                                                        drive.status === 'ongoing' ? "bg-[#800000] text-white" :
                                                        "bg-green-100 text-[#800000]"
                                                    )}
                                                >
                                                    {drive.status}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <div className="space-y-6">
                                                {/* Drive Overview Stats */}
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-muted-foreground">Venue</p>
                                                        <p className="font-medium">{drive.venue}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-muted-foreground">Registered Students</p>
                                                        <p className="font-medium">{drive.registeredStudents}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-muted-foreground">Total Rounds</p>
                                                        <p className="font-medium">{drive.rounds.length}</p>
                                                    </div>
                                                </div>

                                                {/* Schedule Section */}
                                                <div className="space-y-3">
                                                    <h4 className="font-semibold text-[#800000] mb-4">Schedule</h4>
                                                    <div className="space-y-4">
                                                        {drive.rounds.map((round, index) => (
                                                            <div key={index} className="flex items-start gap-4">
                                                                <div className="w-24 flex-shrink-0">
                                                                    <p className="text-sm font-medium text-muted-foreground">
                                                                        {round.time}
                                                                    </p>
                                                                </div>
                                                                <div className="flex-1 p-4 border rounded-lg hover:border-[#800000] transition-colors">
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="space-y-1">
                                                                            <p className="font-semibold text-[#800000]">
                                                                                {round.name}
                                                                            </p>
                                                                            <p className="text-sm text-muted-foreground">
                                                                                {round.venue}
                                                                            </p>
                                                                        </div>
                                                                        <Select
                                                                            value={round.status}
                                                                            onValueChange={(value) => handleUpdateDriveStatus(drive.id, index, value as 'pending' | 'completed')}
                                                                        >
                                                                            <SelectTrigger 
                                                                                className={cn(
                                                                                    "w-[120px] border-none",
                                                                                    round.status === 'pending' ? "bg-yellow-50 text-[#800000]" : "bg-green-50 text-green-700"
                                                                                )}
                                                                            >
                                                                                <SelectValue>
                                                                                    <span className="capitalize">{round.status}</span>
                                                                                </SelectValue>
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="pending" className="text-[#800000]">Pending</SelectItem>
                                                                                <SelectItem value="completed" className="text-green-700">Completed</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="pt-0 flex justify-end">
                                            <Button 
                                                className={`${buttonStyles} px-6 py-2 text-base font-medium`}
                                                onClick={() => handleManageDrive(drive.id)}
                                            >
                                                Manage Drive
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Add Company Details Modal */}
            <CompanyDetailsModal
                isOpen={showCompanyDetailsModal}
                onClose={() => setShowCompanyDetailsModal(false)}
                company={selectedCompany}
            />

            {/* Add Student Details Modal */}
            <StudentDetailsModal
                isOpen={showStudentModal}
                onClose={() => setShowStudentModal(false)}
                student={selectedStudent}
            />

            {/* Add Drive Management Modal */}
            <DriveManagementModal
                isOpen={showDriveModal}
                onClose={() => setShowDriveModal(false)}
                drive={selectedDrive}
                onUpdateStatus={handleUpdateDriveStatus}
            />

            {/* Manage Applications Modal */}
            <ManageApplicationsModal
                isOpen={showManageApplicationsModal}
                onClose={() => setShowManageApplicationsModal(false)}
                company={selectedCompany}
                applications={studentApplications}
            />
        </div>
    );
}

// Add Company Modal Component
const AddCompanyModal = ({ isOpen, onClose, onSubmit, initialData }: { 
    isOpen: boolean; 
    onClose: () => void; 
    onSubmit: (data: AddCompanyFormData) => void;
    initialData?: Company;
}) => {
    const [formData, setFormData] = useState<AddCompanyFormData>(() => {
        if (initialData) {
            return {
                name: initialData.name,
                position: initialData.position,
                package: initialData.package,
                date: initialData.date,
                applicationDeadline: initialData.applicationDeadline,
                eligibility: initialData.eligibility,
                jobType: initialData.jobType,
                workLocation: initialData.workLocation,
                locationDetails: initialData.locationDetails,
                jobDescription: initialData.jobDescription,
                requiredSkills: initialData.requiredSkills,
                additionalInfo: initialData.additionalInfo
            };
        }
        return {
            name: '',
            position: '',
            package: '',
            date: '',
            applicationDeadline: '',
            eligibility: {
                cgpa: 0,
                backlogs: 0,
                branches: [],
                yearOfPassing: ''
            },
            jobType: 'full-time',
            workLocation: 'onsite',
            locationDetails: '',
            jobDescription: '',
            requiredSkills: [],
            additionalInfo: ''
        };
    });

    // Reset form data when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                position: initialData.position,
                package: initialData.package,
                date: initialData.date,
                applicationDeadline: initialData.applicationDeadline,
                eligibility: initialData.eligibility,
                jobType: initialData.jobType,
                workLocation: initialData.workLocation,
                locationDetails: initialData.locationDetails,
                jobDescription: initialData.jobDescription,
                requiredSkills: initialData.requiredSkills,
                additionalInfo: initialData.additionalInfo
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Company' : 'Add New Company'}</DialogTitle>
                    <DialogDescription>{initialData ? 'Update company details and recruitment criteria' : 'Enter company details and recruitment criteria'}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Basic Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Company Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    value={formData.position}
                                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Job Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="jobType">Job Type</Label>
                                <Select
                                    value={formData.jobType}
                                    onValueChange={(value: any) => setFormData({...formData, jobType: value})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select job type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="full-time">Full Time</SelectItem>
                                        <SelectItem value="part-time">Part Time</SelectItem>
                                        <SelectItem value="internship">Internship</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="workLocation">Work Location</Label>
                                <Select
                                    value={formData.workLocation}
                                    onValueChange={(value: any) => setFormData({...formData, workLocation: value})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select work location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="onsite">On-site</SelectItem>
                                        <SelectItem value="remote">Remote</SelectItem>
                                        <SelectItem value="hybrid">Hybrid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="package">Package (LPA)</Label>
                                <Input
                                    id="package"
                                    value={formData.package}
                                    onChange={(e) => setFormData({...formData, package: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="locationDetails">Location Details</Label>
                                <Input
                                    id="locationDetails"
                                    value={formData.locationDetails}
                                    onChange={(e) => setFormData({...formData, locationDetails: e.target.value})}
                                    placeholder="e.g., Bangalore, Mumbai"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Eligibility Criteria */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Eligibility Criteria</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cgpa">Minimum CGPA</Label>
                                <Input
                                    id="cgpa"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={formData.eligibility.cgpa}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        eligibility: {
                                            ...formData.eligibility,
                                            cgpa: parseFloat(e.target.value)
                                        }
                                    })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="backlogs">Maximum Backlogs</Label>
                                <Input
                                    id="backlogs"
                                    type="number"
                                    min="0"
                                    value={formData.eligibility.backlogs}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        eligibility: {
                                            ...formData.eligibility,
                                            backlogs: parseInt(e.target.value)
                                        }
                                    })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="yearOfPassing">Year of Passing</Label>
                                <Input
                                    id="yearOfPassing"
                                    value={formData.eligibility.yearOfPassing}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        eligibility: {
                                            ...formData.eligibility,
                                            yearOfPassing: e.target.value
                                        }
                                    })}
                                    placeholder="e.g., 2024"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Important Dates</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Drive Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="applicationDeadline">Application Deadline</Label>
                                <Input
                                    id="applicationDeadline"
                                    type="date"
                                    value={formData.applicationDeadline}
                                    onChange={(e) => setFormData({...formData, applicationDeadline: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Job Description & Requirements</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="jobDescription">Job Description</Label>
                                <Textarea
                                    id="jobDescription"
                                    value={formData.jobDescription}
                                    onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
                                    rows={4}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="requiredSkills">Required Skills (comma-separated)</Label>
                                <Input
                                    id="requiredSkills"
                                    value={formData.requiredSkills.join(', ')}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        requiredSkills: e.target.value.split(',').map(skill => skill.trim())
                                    })}
                                    placeholder="e.g., JavaScript, React, Node.js"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="additionalInfo">Additional Information</Label>
                                <Textarea
                                    id="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                                    rows={3}
                                    placeholder="Any additional information about the job or selection process"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" className={secondaryButtonStyles} onClick={onClose}>Cancel</Button>
                        <Button type="submit" className={buttonStyles}>
                            {initialData ? 'Save Changes' : 'Add Company'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

// Schedule Drive Modal Component
const ScheduleDriveModal = ({ isOpen, onClose, onSubmit, company }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: DriveFormData) => void;
    company: Company | null;
}) => {
    const [formData, setFormData] = useState<DriveFormData>({
        companyId: company?.id || '',
        driveDate: '',
        venue: '',
        rounds: [],
        eligibleBranches: company?.eligibility.branches || [],
        description: '',
        schedule: '',
        requirements: company?.requiredSkills.join(', ') || '',
        contactPerson: '',
        contactEmail: '',
        maxRegistrations: '',
        registrationDeadline: '',
        selectionProcess: '',
        additionalNotes: ''
    });

    // Add state for managing rounds
    const [currentRound, setCurrentRound] = useState<DriveRound>({
        name: '',
        date: '',
        time: '',
        venue: '',
        status: 'pending'
    });

    const handleAddRound = () => {
        if (currentRound.name && currentRound.date && currentRound.time && currentRound.venue) {
            setFormData(prev => ({
                ...prev,
                rounds: [...prev.rounds, { ...currentRound }]
            }));
            setCurrentRound({
                name: '',
                date: '',
                time: '',
                venue: '',
                status: 'pending'
            });
        }
    };

    const handleRemoveRound = (index: number) => {
        setFormData(prev => ({
            ...prev,
            rounds: prev.rounds.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // Predefined round types
    const roundTypes = [
        "Aptitude Test",
        "Technical Test",
        "Coding Test",
        "Group Discussion",
        "Technical Interview",
        "HR Interview",
        "Machine Test",
        "Project Presentation",
        "Case Study"
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Schedule Placement Drive</DialogTitle>
                    <DialogDescription>
                        {company ? `Schedule a drive for ${company.name}` : 'Enter drive details and schedule'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ... existing form sections ... */}

                    {/* Rounds Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Drive Rounds</h3>
                        
                        {/* Add New Round */}
                        <Card className="p-4">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="roundName">Round Name</Label>
                                        <Select
                                            value={currentRound.name}
                                            onValueChange={(value) => setCurrentRound(prev => ({ ...prev, name: value }))}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select round type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roundTypes.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="roundVenue">Venue</Label>
                                        <Input
                                            id="roundVenue"
                                            value={currentRound.venue}
                                            onChange={(e) => setCurrentRound(prev => ({ ...prev, venue: e.target.value }))}
                                            placeholder="e.g., Computer Lab 1"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="roundDate">Date</Label>
                                        <Input
                                            id="roundDate"
                                            type="date"
                                            value={currentRound.date}
                                            onChange={(e) => setCurrentRound(prev => ({ ...prev, date: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="roundTime">Time</Label>
                                        <Input
                                            id="roundTime"
                                            type="time"
                                            value={currentRound.time}
                                            onChange={(e) => setCurrentRound(prev => ({ ...prev, time: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleAddRound}
                                    className={buttonStyles}
                                    disabled={!currentRound.name || !currentRound.date || !currentRound.time || !currentRound.venue}
                                >
                                    Add Round
                                </Button>
                            </div>
                        </Card>

                        {/* Display Added Rounds */}
                        {formData.rounds.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="font-medium">Scheduled Rounds</h4>
                                <div className="space-y-2">
                                    {formData.rounds.map((round, index) => (
                                        <Card key={index} className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="grid grid-cols-2 gap-4 flex-1">
                                                    <div>
                                                        <p className="font-medium">{round.name}</p>
                                                        <p className="text-sm text-muted-foreground">{round.venue}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">
                                                            {new Date(round.date).toLocaleDateString()}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">{round.time}</p>
                                                    </div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => handleRemoveRound(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" className={secondaryButtonStyles} onClick={onClose}>Cancel</Button>
                        <Button 
                            type="submit" 
                            className={buttonStyles}
                            disabled={formData.rounds.length === 0}
                        >
                            Schedule Drive
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

// Student Details Modal Component
const StudentDetailsModal = ({ isOpen, onClose, student }: {
    isOpen: boolean;
    onClose: () => void;
    student: StudentApplication | null;
}) => {
    if (!student) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Student Application Details</DialogTitle>
                    <DialogDescription>View and manage student application</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Student Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Student Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-medium">{student.studentName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Student ID</p>
                                <p className="font-medium">{student.studentId}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Branch</p>
                                <p className="font-medium">{student.branch}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">CGPA</p>
                                <p className="font-medium">{student.cgpa}</p>
                            </div>
                        </div>
                    </div>

                    {/* Application Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Application Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Company</p>
                                <p className="font-medium">{student.companyName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Position</p>
                                <p className="font-medium">{student.position}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Application Date</p>
                                <p className="font-medium">
                                    {new Date(student.applicationDate).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Status</p>
                                <Badge className={getStatusColor(student.status)}>
                                    {student.status}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Resume Preview */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Resume</h3>
                        <div className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">{student.resume}</p>
                                <Button variant="outline" className={secondaryButtonStyles} onClick={() => window.open(student.resume)}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    View Resume
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" className={secondaryButtonStyles} onClick={onClose}>Close</Button>
                    <Button className={buttonStyles}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Drive Management Modal Component
const DriveManagementModal = ({ 
    isOpen, 
    onClose, 
    drive,
    onUpdateStatus 
}: {
    isOpen: boolean;
    onClose: () => void;
    drive: PlacementDrive | null;
    onUpdateStatus: (driveId: string, roundIndex: number, newStatus: 'pending' | 'completed') => void;
}) => {
    if (!drive) return null;

    return (
        <Dialog open={isOpen} onOpenChange={() => onClose()}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Manage Drive: {drive.companyName}</DialogTitle>
                    <DialogDescription>
                        {new Date(drive.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Drive Overview */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Venue</p>
                            <p className="font-medium">{drive.venue}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Registered Students</p>
                            <p className="font-medium">{drive.registeredStudents}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Total Rounds</p>
                            <p className="font-medium">{drive.rounds.length}</p>
                        </div>
                    </div>

                    {/* Rounds Timeline */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">Schedule</h4>
                        <div className="space-y-4">
                            {drive.rounds.map((round, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-12 text-sm text-muted-foreground">
                                        {round.time}
                                    </div>
                                    <div className="flex-1 p-4 border rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{round.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {round.venue}
                                                </p>
                                            </div>
                                            <Select
                                                value={round.status}
                                                onValueChange={(value) => onUpdateStatus(drive.id, index, value as 'pending' | 'completed')}
                                            >
                                                <SelectTrigger className="w-[130px] border-[#800000] text-[#800000]">
                                                    <SelectValue>
                                                        <Badge className={getStatusColor(round.status)}>
                                                            {round.status}
                                                        </Badge>
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" className={secondaryButtonStyles} onClick={onClose}>Close</Button>
                    <Button className={buttonStyles}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Helper function for status colors
export const getStatusColor = (status: 'active' | 'inactive' | 'pending' | 'shortlisted' | 'registered' | 'waitlisted' | 'rejected' | 'ongoing' | 'upcoming' | 'completed') => {
    switch (status) {
        case 'active':
            return 'bg-[#800000] text-white';
        case 'inactive':
            return 'bg-red-100 text-[#800000]';
        case 'pending':
            return 'bg-yellow-100 text-[#800000]';
        case 'shortlisted':
            return 'bg-[#800000] text-white';
        case 'registered':
            return 'bg-[#800000] text-white';
        case 'waitlisted':
            return 'bg-orange-100 text-[#800000]';
        case 'rejected':
            return 'bg-red-100 text-[#800000]';
        case 'ongoing':
            return 'bg-[#800000] text-white';
        case 'upcoming':
            return 'bg-yellow-100 text-[#800000]';
        case 'completed':
            return 'bg-[#800000] text-white';
        default:
            return 'bg-gray-100 text-[#800000]';
    }
};
