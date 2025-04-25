import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, Calendar, MapPin, Building, Users, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const companiesData = [
  {
    id: 1,
    name: "TechCorp Solutions",
    position: "Software Developer",
    package: "8.5 LPA",
    deadline: "2025-04-30",
    status: "Active",
    location: "Bangalore",
    type: "Full-time",
    eligibility: "CGPA > 7.5"
  },
  {
    id: 2,
    name: "Innovate Systems",
    position: "Web Developer",
    package: "7.2 LPA",
    deadline: "2025-05-01",
    status: "Active",
    location: "Hyderabad",
    type: "Full-time",
    eligibility: "CGPA > 7.0"
  },
  {
    id: 3,
    name: "Digital Solutions Inc.",
    position: "Frontend Developer",
    package: "6.8 LPA",
    deadline: "2025-05-02",
    status: "Active",
    location: "Pune",
    type: "Full-time",
    eligibility: "CGPA > 6.5"
  },
  {
    id: 4,
    name: "DataTech Analytics",
    position: "Data Analyst",
    package: "7.5 LPA",
    deadline: "2025-04-20",
    status: "Closed",
    location: "Chennai",
    type: "Full-time",
    eligibility: "CGPA > 7.0"
  },
  {
    id: 5,
    name: "CloudNet Services",
    position: "Cloud Engineer",
    package: "9.0 LPA",
    deadline: "2025-05-05",
    status: "Active",
    location: "Mumbai",
    type: "Full-time",
    eligibility: "CGPA > 8.0"
  }
];

type Application = {
    id: number;
    name: string;
    position: string;
    appliedDate: string;
    status: string;
    interviewDate: string | null;
};

interface ApplicationFormData {
    resume: File | null;
    referralCode: string;
}

const StudentTPO = () => {
    const [selectedCompany, setSelectedCompany] = useState<typeof companiesData[0] | null>(null);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [showCompanyDetails, setShowCompanyDetails] = useState(false);
    const [showApplicationDetails, setShowApplicationDetails] = useState(false);
    const [showApplyConfirmation, setShowApplyConfirmation] = useState(false);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [applicationFormData, setApplicationFormData] = useState<ApplicationFormData>({
        resume: null,
        referralCode: ''
    });
    const [appliedCompanies, setAppliedCompanies] = useState([
        {
            id: 1,
            name: "TechCorp Solutions",
            position: "Software Developer",
            appliedDate: "2023-04-20",
            status: "Interview Scheduled",
            interviewDate: "2023-05-10"
        },
        {
            id: 4,
            name: "DataTech Analytics",
            position: "Data Analyst",
            appliedDate: "2023-04-15",
            status: "Application Rejected",
            interviewDate: null
        }
    ]);

    const handleViewCompany = (company: typeof companiesData[0]) => {
        setSelectedCompany(company);
        setShowCompanyDetails(true);
    };

    const handleViewApplication = (application: Application) => {
        setSelectedApplication(application);
        setShowApplicationDetails(true);
    };

    const handleApplyClick = (company: typeof companiesData[0]) => {
        setSelectedCompany(company);
        setShowApplicationForm(true);
    };

    const handleFormSubmit = (formData: ApplicationFormData) => {
        setApplicationFormData(formData);
        setShowApplicationForm(false);
        setShowApplyConfirmation(true);
    };

    const handleApply = (company: typeof companiesData[0]) => {
        if (!applicationFormData) return;

        // Check if already applied
        const alreadyApplied = appliedCompanies.some(app => app.id === company.id);
        if (alreadyApplied) {
            toast.error("You have already applied to this company");
            return;
        }

        // Add new application
        const newApplication = {
            id: company.id,
            name: company.name,
            position: company.position,
            appliedDate: new Date().toISOString().split('T')[0],
            status: "Application Submitted",
            interviewDate: null
        };

        setAppliedCompanies(prev => [...prev, newApplication]);
        toast.success(`Successfully applied to ${company.name}`);
        setShowApplyConfirmation(false);
        setSelectedCompany(null);
        setApplicationFormData({
            resume: null,
            referralCode: ''
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Application Submitted':
                return 'bg-blue-500 text-white';
            case 'Interview Scheduled':
                return 'bg-purple-500 text-white';
            case 'Application Rejected':
                return 'bg-red-500 text-white';
            case 'Shortlisted':
                return 'bg-green-500 text-white';
            case 'Waitlisted':
                return 'bg-orange-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const ApplicationDetailsModal = ({ isOpen, onClose, application }: {
        isOpen: boolean;
        onClose: () => void;
        application: Application | null;
    }) => {
        if (!application) return null;

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
                                    <DialogTitle className="text-2xl">{application.name}</DialogTitle>
                                    <DialogDescription>{application.position}</DialogDescription>
                                </div>
                            </div>
                            <Badge 
                                variant="default"
                                className={`${getStatusColor(application.status)} hover:opacity-100`}
                            >
                                {application.status}
                            </Badge>
                        </div>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Application Timeline */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Application Timeline</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="h-8 w-8 rounded-full border flex items-center justify-center bg-muted">
                                        <Calendar className="h-4 w-4" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-medium">Application Submitted</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(application.appliedDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                {application.interviewDate && (
                                    <div className="flex items-start gap-4">
                                        <div className="h-8 w-8 rounded-full border flex items-center justify-center bg-muted">
                                            <Users className="h-4 w-4" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium">Interview Scheduled</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(application.interviewDate).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Next Steps</h3>
                            <div className="p-4 border rounded-lg">
                                {application.status === 'Application Submitted' && (
                                    <p className="text-muted-foreground">
                                        Your application is under review. We will notify you once the status changes.
                                    </p>
                                )}
                                {application.status === 'Interview Scheduled' && (
                                    <div className="space-y-2">
                                        <p className="font-medium">Interview Details:</p>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>Date: {new Date(application.interviewDate!).toLocaleDateString()}</li>
                                            <li>Time: 10:00 AM</li>
                                            <li>Venue: Main Campus, Room 301</li>
                                            <li>Duration: 45 minutes</li>
                                        </ul>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            Please bring your resume and any relevant documents.
                                        </p>
                                    </div>
                                )}
                                {application.status === 'Application Rejected' && (
                                    <p className="text-muted-foreground">
                                        We appreciate your interest in {application.name}. While we cannot move forward with your application at this time, we encourage you to apply for other positions that match your skills and interests.
                                    </p>
                                )}
                                {application.status === 'Shortlisted' && (
                                    <p className="text-muted-foreground">
                                        Congratulations! You have been shortlisted for the next round. We will contact you shortly with further details.
                                    </p>
                                )}
                                {application.status === 'Waitlisted' && (
                                    <p className="text-muted-foreground">
                                        Your application is on the waitlist. We will contact you if a position becomes available.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={onClose}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    return (
        <div className="max-w-[1400px] mx-auto p-8">
            <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-8 rounded-lg shadow-sm mb-8">
                <h1 className="text-3xl font-bold mb-2">Training & Placement Office</h1>
                <p className="text-white/90 text-lg">Explore job opportunities and manage your applications</p>
            </div>
            
            <Tabs defaultValue="opportunities" className="space-y-8">
                <TabsList className="bg-gray-100 p-1.5 rounded-lg">
                    <TabsTrigger 
                        value="opportunities" 
                        className="rounded-md px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-[#800000] data-[state=active]:shadow-sm"
                    >
                        <Briefcase className="mr-2 h-4 w-4" />
                        Job Opportunities
                    </TabsTrigger>
                    <TabsTrigger 
                        value="applications"
                        className="rounded-md px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-[#800000] data-[state=active]:shadow-sm"
                    >
                        <Users className="mr-2 h-4 w-4" />
                        My Applications
                    </TabsTrigger>
                </TabsList>
                
                <TabsContent value="opportunities">
                    <Card className="border shadow-sm">
                        <CardHeader className="bg-gray-50 border-b px-6 py-5">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-2xl text-[#800000]">Available Job Opportunities</CardTitle>
                                    <CardDescription className="text-base">Companies currently recruiting on campus</CardDescription>
                                </div>
                                <Badge variant="outline" className="text-[#800000] border-[#800000] px-4 py-1">
                                    {companiesData.filter(c => c.status === "Active").length} Active Positions
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-gray-50">
                                        <TableHead className="font-semibold py-4">Company</TableHead>
                                        <TableHead className="font-semibold py-4">Position</TableHead>
                                        <TableHead className="font-semibold py-4">Package</TableHead>
                                        <TableHead className="font-semibold py-4">Location</TableHead>
                                        <TableHead className="font-semibold py-4">Deadline</TableHead>
                                        <TableHead className="font-semibold py-4">Status</TableHead>
                                        <TableHead className="text-right font-semibold py-4">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {companiesData.map((company) => (
                                        <TableRow key={company.id} className="hover:bg-gray-50">
                                            <TableCell className="font-medium py-4">{company.name}</TableCell>
                                            <TableCell className="py-4">{company.position}</TableCell>
                                            <TableCell className="font-semibold text-[#800000] py-4">{company.package}</TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex items-center">
                                                    <MapPin className="mr-2 h-4 w-4 text-[#800000]" />
                                                    {company.location}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex items-center">
                                                    <Calendar className="mr-2 h-4 w-4 text-[#800000]" />
                                                    {new Date(company.deadline).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <Badge 
                                                    variant="default"
                                                    className={
                                                        company.status === "Active" 
                                                            ? "bg-green-500 text-white hover:bg-green-500" 
                                                            : "bg-red-500 text-white hover:bg-red-500"
                                                    }
                                                >
                                                    {company.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right py-4">
                                                <div className="flex justify-end items-center gap-3">
                                                    <Button 
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleViewCompany(company)}
                                                        className="flex items-center w-[85px] text-[#800000] border-[#800000] hover:bg-[#800000] hover:text-white"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                        <span className="ml-2">View</span>
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        disabled={company.status === "Closed" || appliedCompanies.some(app => app.id === company.id)}
                                                        onClick={() => handleApplyClick(company)}
                                                        className="flex items-center justify-center w-[85px] bg-[#800000] hover:bg-[#800000]/90"
                                                    >
                                                        {appliedCompanies.some(app => app.id === company.id) ? 'Applied' : 'Apply'}
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="applications">
                    <Card className="border shadow-sm">
                        <CardHeader className="bg-gray-50 border-b px-6 py-5">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-2xl text-[#800000]">My Applications</CardTitle>
                                    <CardDescription className="text-base">Track the status of your job applications</CardDescription>
                                </div>
                                <Badge variant="outline" className="text-[#800000] border-[#800000] px-4 py-1">
                                    Total Applications: {appliedCompanies.length}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-muted/50">
                                        <TableHead className="font-semibold">Company</TableHead>
                                        <TableHead className="font-semibold">Position</TableHead>
                                        <TableHead className="font-semibold">Applied On</TableHead>
                                        <TableHead className="font-semibold">Status</TableHead>
                                        <TableHead className="font-semibold">Next Steps</TableHead>
                                        <TableHead className="text-right font-semibold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appliedCompanies.map((application) => (
                                        <TableRow key={application.id} className="hover:bg-muted/50">
                                            <TableCell className="font-medium">{application.name}</TableCell>
                                            <TableCell>{application.position}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Calendar className="mr-2 h-4 w-4 text-[#800000]" />
                                                    {new Date(application.appliedDate).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge 
                                                    variant="default"
                                                    className={`${getStatusColor(application.status)} hover:opacity-100`}
                                                >
                                                    {application.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {application.interviewDate ? (
                                                    <div className="flex items-center">
                                                        <Calendar className="mr-2 h-4 w-4 text-[#800000]" />
                                                        Interview on {new Date(application.interviewDate).toLocaleDateString()}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        {application.status === 'Application Submitted' && 'Under Review'}
                                                        {application.status === 'Application Rejected' && 'No further action'}
                                                        {application.status === 'Shortlisted' && 'Awaiting interview details'}
                                                        {application.status === 'Waitlisted' && 'On waitlist'}
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleViewApplication(application)}
                                                    className="text-[#800000] border-[#800000] hover:bg-[#800000] hover:text-white"
                                                >
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    View Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="bg-muted/50 rounded-b-lg p-4">
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <Briefcase className="mr-2 h-4 w-4 text-[#800000]" />
                                    <span>Total Applications: {appliedCompanies.length}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="mr-2 h-4 w-4 text-[#800000]" />
                                    <span>Interviews Scheduled: {appliedCompanies.filter(app => app.interviewDate).length}</span>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Company Details Modal */}
            <CompanyDetailsModal
                isOpen={showCompanyDetails}
                onClose={() => {
                    setShowCompanyDetails(false);
                    setSelectedCompany(null);
                }}
                company={selectedCompany}
                onApply={() => {
                    setShowCompanyDetails(false);
                    setShowApplicationForm(true);
                }}
            />

            {/* Application Details Modal */}
            <ApplicationDetailsModal
                isOpen={showApplicationDetails}
                onClose={() => {
                    setShowApplicationDetails(false);
                    setSelectedApplication(null);
                }}
                application={selectedApplication}
            />

            {/* Apply Confirmation Modal */}
            <ApplyConfirmationModal
                isOpen={showApplyConfirmation}
                onClose={() => {
                    setShowApplyConfirmation(false);
                    setSelectedCompany(null);
                }}
                onApply={handleApply}
                company={selectedCompany}
            />

            {/* Application Form Modal */}
            <ApplicationFormModal
                isOpen={showApplicationForm}
                onClose={() => {
                    setShowApplicationForm(false);
                    setSelectedCompany(null);
                }}
                onSubmit={handleFormSubmit}
                company={selectedCompany}
            />
        </div>
    );
};

const CompanyDetailsModal = ({ isOpen, onClose, company, onApply }: { 
    isOpen: boolean; 
    onClose: () => void; 
    company: typeof companiesData[0] | null;
    onApply: () => void;
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
                        <Badge 
                            variant="default"
                            className={
                                company.status === "Active" 
                                    ? "bg-green-500 text-white hover:bg-green-500" 
                                    : "bg-red-500 text-white hover:bg-red-500"
                            }
                        >
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
                            <p className="font-semibold">{company.type}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-semibold">{company.location}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Eligibility</p>
                            <p className="font-semibold">{company.eligibility}</p>
                        </div>
                    </div>

                    {/* Important Dates */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Important Dates</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                                <p className="text-sm text-muted-foreground">Application Deadline</p>
                                <p className="font-semibold">
                                    {new Date(company.deadline).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">About the Company</h3>
                        <div className="prose max-w-none">
                            <p className="text-muted-foreground">
                                {company.name} is a leading technology company specializing in innovative solutions. 
                                We are looking for talented individuals to join our team and contribute to our growth.
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={onClose} className="text-[#800000] border-[#800000] hover:bg-[#800000] hover:text-white">
                        Close
                    </Button>
                    <Button 
                        disabled={company.status === "Closed"}
                        onClick={onApply}
                        className="bg-[#800000] hover:bg-[#800000]/90"
                    >
                        Apply Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

interface ApplyConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (company: typeof companiesData[0]) => void;
    company: typeof companiesData[0] | null;
}

const ApplyConfirmationModal = ({ isOpen, onClose, onApply, company }: ApplyConfirmationModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                    Confirm Application
                </h3>
                <p className="mb-4">
                    Are you sure you want to apply to {company?.name}?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onApply(company)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </Modal>
    );
};

const ApplicationFormModal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    company 
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    onSubmit: (data: ApplicationFormData) => void;
    company: typeof companiesData[0] | null;
}) => {
    const [formData, setFormData] = useState<ApplicationFormData>({
        resume: null,
        referralCode: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Apply to {company?.name}</DialogTitle>
                    <DialogDescription>
                        Please upload your resume and provide a referral code if you have one.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {/* Resume Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="resume">Resume</Label>
                            <Input
                                id="resume"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setFormData(prev => ({ ...prev, resume: file }));
                                }}
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                Accepted formats: PDF, DOC, DOCX
                            </p>
                        </div>

                        {/* Referral Code */}
                        <div className="space-y-2">
                            <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                            <Input
                                id="referralCode"
                                type="text"
                                placeholder="Enter referral code if you have one"
                                value={formData.referralCode}
                                onChange={(e) => setFormData(prev => ({ ...prev, referralCode: e.target.value }))}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} className="text-[#800000] border-[#800000] hover:bg-[#800000] hover:text-white">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-[#800000] hover:bg-[#800000]/90">
                            Submit Application
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default StudentTPO;
