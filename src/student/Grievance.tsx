import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface GrievanceFormData {
    studentId: string;
    name: string;
    email: string;
    phone: string;
    category: string;
    subCategory: string;
    subject: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    attachments: File[];
}

const StudentGrievance = () => {
    const [formData, setFormData] = useState<GrievanceFormData>({
        studentId: '',
        name: '',
        email: '',
        phone: '',
        category: '',
        subCategory: '',
        subject: '',
        description: '',
        priority: 'Medium',
        attachments: []
    });

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Grievance submitted:', formData);
        // Add your form submission logic here
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({
                ...formData,
                attachments: Array.from(e.target.files)
            });
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div
            className="max-w-4xl mx-auto p-2"
            initial="initial"
            animate="animate"
            variants={pageVariants}
        >
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Register Grievance</h1>
                <p className="text-sm text-gray-600">Submit your grievance for resolution</p>
            </div>

            <motion.div
                variants={formVariants}
            >
                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center">
                            <div className="bg-red-100 p-2 rounded-full mr-3">
                                <FaExclamationTriangle className="text-red-600 text-lg" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Grievance Details</CardTitle>
                                <CardDescription className="text-xs">Please provide complete information about your grievance</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="studentId" className="text-sm">Student ID</Label>
                                    <Input
                                        id="studentId"
                                        value={formData.studentId}
                                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                        required
                                        className="h-9"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="name" className="text-sm">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="h-9"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="email" className="text-sm">Email Address</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="h-9"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                                    <Input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="h-9"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="category" className="text-sm">Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                                    >
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Academic">Academic</SelectItem>
                                            <SelectItem value="Administrative">Administrative</SelectItem>
                                            <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                                            <SelectItem value="Hostel">Hostel</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="subCategory" className="text-sm">Sub-Category</Label>
                                    <Select
                                        value={formData.subCategory}
                                        onValueChange={(value) => setFormData({ ...formData, subCategory: value })}
                                    >
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Select Sub-Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Examination">Examination</SelectItem>
                                            <SelectItem value="Attendance">Attendance</SelectItem>
                                            <SelectItem value="Fees">Fees</SelectItem>
                                            <SelectItem value="Library">Library</SelectItem>
                                            <SelectItem value="Transport">Transport</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="priority" className="text-sm">Priority Level</Label>
                                    <Select
                                        value={formData.priority}
                                        onValueChange={(value) => setFormData({ ...formData, priority: value as 'Low' | 'Medium' | 'High' })}
                                    >
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Select Priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Low">Low</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="High">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="subject" className="text-sm">Subject</Label>
                                <Input
                                    id="subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                    className="h-9"
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="description" className="text-sm">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    className="h-24"
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="attachments" className="text-sm">Attachments (if any)</Label>
                                <Input
                                    type="file"
                                    id="attachments"
                                    multiple
                                    onChange={handleFileChange}
                                    className="h-9 file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                                />
                            </div>

                            <div className="flex justify-end space-x-2 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="h-9 hover:bg-gray-50"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="h-9 bg-red-600 hover:bg-red-700 text-white"
                                >
                                    Submit Grievance
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default StudentGrievance;
