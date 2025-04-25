import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, Camera, Upload, CheckCircle, AlertCircle, Save, Download, HelpCircle, Info } from 'lucide-react';

interface AdmissionFormData {
    admissionType: string;
    applicationYear: string;
    branch: string;
    name: string;
    gender: string;
    bloodGroup: string;
    fatherName: string;
    motherName: string;
    dateOfBirth: string;
    category: string;
    caste: string;
    localAddress: string;
    permanentAddress: string;
    parentMobile: string;
    studentMobile: string;
    studentEmail: string;
    hasVehicle: string;
    vehicleNo: string;
}

const StudentAdmissionRequest: React.FC = () => {
    const [isViewMode, setIsViewMode] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [formData, setFormData] = useState<AdmissionFormData>({
        admissionType: 'MS',
        applicationYear: 'Fourth',
        branch: 'Computer Science and Design',
        name: '',
        gender: '',
        bloodGroup: '',
        fatherName: '',
        motherName: '',
        dateOfBirth: '',
        category: '',
        caste: '',
        localAddress: '',
        permanentAddress: '',
        parentMobile: '',
        studentMobile: '',
        studentEmail: '',
        hasVehicle: 'No',
        vehicleNo: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveDraft = () => {
        // Save form data to local storage
        localStorage.setItem('admissionFormDraft', JSON.stringify(formData));
        alert('Draft saved successfully!');
    };

    const loadDraft = () => {
        const savedDraft = localStorage.getItem('admissionFormDraft');
        if (savedDraft) {
            setFormData(JSON.parse(savedDraft));
            alert('Draft loaded successfully!');
        } else {
            alert('No saved draft found.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <div className="bg-gradient-to-r from-red-700 to-red-900 p-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white">Admission Request Application</h1>
                        <div className="flex space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsViewMode(false)}
                                className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                                    !isViewMode 
                                    ? 'bg-white text-red-700 shadow-md' 
                                    : 'bg-red-500 text-white hover:bg-red-400'
                                }`}
                            >
                                Fill Form
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsViewMode(true)}
                                className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                                    isViewMode 
                                    ? 'bg-white text-red-700 shadow-md' 
                                    : 'bg-red-500 text-white hover:bg-red-400'
                                }`}
                            >
                                View Form
                            </motion.button>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {isViewMode ? (
                        <motion.div
                            key="view"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8 space-y-8"
                        >
                            {/* Header */}
                            <div className="text-center space-y-4">
                                <div className="flex justify-center items-center gap-6">
                                    <div className="w-20 h-20 relative">
                                        <img
                                            src="/met-logo.png"
                                            alt="MET Logo"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-800">BHUJBAL KNOWLEDGE CITY</h1>
                                        <h2 className="text-xl text-gray-600">MET's Institute of Technology-Polytechnic</h2>
                                    </div>
                                </div>
                                <p className="text-gray-600">Bhujbal Knowledge City, Adgaon, Nashik, 422 003</p>
                                <div className="border-t border-b border-red-200 py-4">
                                    <h2 className="text-2xl font-bold text-red-700">APPLICATION FORM FOR ADMISSION 2024-2025</h2>
                                </div>
                            </div>

                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                <p className="text-gray-700">
                                    I, hereby apply for admission at Institute of Technology-Polytechnic for academic year 2024-2025. My
                                    details for the purpose are as follows:
                                </p>
                            </div>

                            {/* Admission Details Section */}
                            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                <div className="flex justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Admission Details</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <p className="text-gray-600">Admission Type</p>
                                                <p className="font-medium">{formData.admissionType}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-gray-600">Application Year</p>
                                                <p className="font-medium">{formData.applicationYear}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-gray-600">Branch</p>
                                                <p className="font-medium">{formData.branch}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-gray-600">Application Type</p>
                                                <p className="font-medium">Confirm Admission</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-40 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50">
                                        {photoPreview ? (
                                            <div className="w-full h-full relative">
                                                <img 
                                                    src={photoPreview} 
                                                    alt="Student Photo" 
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500">Upload Photo</p>
                                                <p className="text-xs text-gray-400">Max 2MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Personal Details Section */}
                            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Details</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Full Name</p>
                                        <p className="font-medium">{formData.name || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Gender</p>
                                        <p className="font-medium">{formData.gender || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Blood Group</p>
                                        <p className="font-medium">{formData.bloodGroup || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Date of Birth</p>
                                        <p className="font-medium">{formData.dateOfBirth || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Father's Name</p>
                                        <p className="font-medium">{formData.fatherName || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Mother's Name</p>
                                        <p className="font-medium">{formData.motherName || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Category</p>
                                        <p className="font-medium">{formData.category || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Caste</p>
                                        <p className="font-medium">{formData.caste || '-'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Details Section */}
                            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Details</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Local Address</p>
                                        <p className="font-medium">{formData.localAddress || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Permanent Address</p>
                                        <p className="font-medium">{formData.permanentAddress || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Parent Mobile</p>
                                        <p className="font-medium">{formData.parentMobile || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Student Mobile</p>
                                        <p className="font-medium">{formData.studentMobile || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Student Email</p>
                                        <p className="font-medium">{formData.studentEmail || '-'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle Details Section */}
                            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Vehicle Details</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Has Vehicle</p>
                                        <p className="font-medium">{formData.hasVehicle}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">Vehicle Number</p>
                                        <p className="font-medium">{formData.vehicleNo || '-'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                    onClick={() => setIsViewMode(false)}
                                >
                                    Edit Form
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors flex items-center space-x-2"
                                >
                                    <Printer className="w-4 h-4" />
                                    <span>Print Form</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleSubmit}
                            className="p-8 space-y-8"
                        >
                            {/* Form Navigation Tabs */}
                            <div className="border-b border-gray-200">
                                <nav className="flex space-x-8">
                                    <button
                                        onClick={() => setActiveTab('personal')}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'personal'
                                                ? 'border-red-600 text-red-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Personal Details
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('contact')}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'contact'
                                                ? 'border-red-600 text-red-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Contact Details
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('academic')}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'academic'
                                                ? 'border-red-600 text-red-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Academic Details
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('vehicle')}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'vehicle'
                                                ? 'border-red-600 text-red-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        Vehicle Details
                                    </button>
                                </nav>
                            </div>

                            {/* Form sections with modern styling */}
                            <AnimatePresence mode="wait">
                                {activeTab === 'personal' && (
                                    <motion.div
                                        key="personal"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex items-start">
                                            <Info className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-gray-700">
                                                Please fill in your personal details accurately. This information will be used for your student records.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <label className="block">
                                                    <span className="text-gray-700">Full Name</span>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                        required
                                                    />
                                                </label>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <label className="block">
                                                        <span className="text-gray-700">Gender</span>
                                                        <select
                                                            name="gender"
                                                            value={formData.gender}
                                                            onChange={handleInputChange}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                            required
                                                        >
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </label>

                                                    <label className="block">
                                                        <span className="text-gray-700">Blood Group</span>
                                                        <select
                                                            name="bloodGroup"
                                                            value={formData.bloodGroup}
                                                            onChange={handleInputChange}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                        >
                                                            <option value="">Select Blood Group</option>
                                                            <option value="A+">A+</option>
                                                            <option value="A-">A-</option>
                                                            <option value="B+">B+</option>
                                                            <option value="B-">B-</option>
                                                            <option value="O+">O+</option>
                                                            <option value="O-">O-</option>
                                                            <option value="AB+">AB+</option>
                                                            <option value="AB-">AB-</option>
                                                        </select>
                                                    </label>
                                                </div>

                                                <label className="block">
                                                    <span className="text-gray-700">Date of Birth</span>
                                                    <input
                                                        type="date"
                                                        name="dateOfBirth"
                                                        value={formData.dateOfBirth}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                        required
                                                    />
                                                </label>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block">
                                                    <span className="text-gray-700">Father's Name</span>
                                                    <input
                                                        type="text"
                                                        name="fatherName"
                                                        value={formData.fatherName}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                        required
                                                    />
                                                </label>

                                                <label className="block">
                                                    <span className="text-gray-700">Mother's Name</span>
                                                    <input
                                                        type="text"
                                                        name="motherName"
                                                        value={formData.motherName}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                        required
                                                    />
                                                </label>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <label className="block">
                                                        <span className="text-gray-700">Category</span>
                                                        <select
                                                            name="category"
                                                            value={formData.category}
                                                            onChange={handleInputChange}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                            required
                                                        >
                                                            <option value="">Select Category</option>
                                                            <option value="General">General</option>
                                                            <option value="OBC">OBC</option>
                                                            <option value="SC">SC</option>
                                                            <option value="ST">ST</option>
                                                        </select>
                                                    </label>

                                                    <label className="block">
                                                        <span className="text-gray-700">Caste</span>
                                                        <input
                                                            type="text"
                                                            name="caste"
                                                            value={formData.caste}
                                                            onChange={handleInputChange}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <motion.button
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
                                                onClick={() => setActiveTab('contact')}
                                            >
                                                Next: Contact Details
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'contact' && (
                                    <motion.div
                                        key="contact"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex items-start">
                                            <Info className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-gray-700">
                                                Please provide your contact information. This will be used for communication purposes.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <label className="block">
                                                    <span className="text-gray-700">Local Address</span>
                                                    <textarea
                                                        name="localAddress"
                                                        value={formData.localAddress}
                                                        onChange={handleInputChange}
                                                        rows={3}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                        required
                                                    />
                                                </label>

                                                <label className="block">
                                                    <span className="text-gray-700">Permanent Address</span>
                                                    <textarea
                                                        name="permanentAddress"
                                                        value={formData.permanentAddress}
                                                        onChange={handleInputChange}
                                                        rows={3}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                        required
                                                    />
                                                </label>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block">
                                                    <span className="text-gray-700">Parent Mobile</span>
                                                    <input
                                                        type="tel"
                                                        name="parentMobile"
                                                        value={formData.parentMobile}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                        required
                                                    />
                                                </label>

                                                <label className="block">
                                                    <span className="text-gray-700">Student Mobile</span>
                                                    <input
                                                        type="tel"
                                                        name="studentMobile"
                                                        value={formData.studentMobile}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                        required
                                                    />
                                                </label>

                                                <label className="block">
                                                    <span className="text-gray-700">Student Email</span>
                                                    <input
                                                        type="email"
                                                        name="studentEmail"
                                                        value={formData.studentEmail}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                        required
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <motion.button
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                                onClick={() => setActiveTab('personal')}
                                            >
                                                Previous: Personal Details
                                            </motion.button>
                                            <motion.button
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
                                                onClick={() => setActiveTab('academic')}
                                            >
                                                Next: Academic Details
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'academic' && (
                                    <motion.div
                                        key="academic"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex items-start">
                                            <Info className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-gray-700">
                                                Please select your academic details. This information will be used for your admission process.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <label className="block">
                                                    <span className="text-gray-700">Admission Type</span>
                                                    <select
                                                        name="admissionType"
                                                        value={formData.admissionType}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                    >
                                                        <option value="MS">MS</option>
                                                        <option value="Regular">Regular</option>
                                                    </select>
                                                </label>

                                                <label className="block">
                                                    <span className="text-gray-700">Application Year</span>
                                                    <select
                                                        name="applicationYear"
                                                        value={formData.applicationYear}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                    >
                                                        <option value="First">First Year</option>
                                                        <option value="Second">Second Year</option>
                                                        <option value="Third">Third Year</option>
                                                        <option value="Fourth">Fourth Year</option>
                                                    </select>
                                                </label>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block">
                                                    <span className="text-gray-700">Branch</span>
                                                    <select
                                                        name="branch"
                                                        value={formData.branch}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                    >
                                                        <option value="Computer Science and Design">Computer Science and Design</option>
                                                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                        <option value="Electrical Engineering">Electrical Engineering</option>
                                                    </select>
                                                </label>

                                                <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50">
                                                    {photoPreview ? (
                                                        <div className="w-full h-full relative">
                                                            <img 
                                                                src={photoPreview} 
                                                                alt="Student Photo" 
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <Camera className="w-8 h-8 text-gray-400 mb-2" />
                                                            <p className="text-sm text-gray-500">Upload Photo</p>
                                                            <p className="text-xs text-gray-400">Max 2MB</p>
                                                            <label className="mt-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors cursor-pointer">
                                                                Choose File
                                                                <input 
                                                                    type="file" 
                                                                    accept="image/*" 
                                                                    className="hidden" 
                                                                    onChange={handlePhotoChange}
                                                                />
                                                            </label>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <motion.button
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                                onClick={() => setActiveTab('contact')}
                                            >
                                                Previous: Contact Details
                                            </motion.button>
                                            <motion.button
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
                                                onClick={() => setActiveTab('vehicle')}
                                            >
                                                Next: Vehicle Details
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'vehicle' && (
                                    <motion.div
                                        key="vehicle"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex items-start">
                                            <Info className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-gray-700">
                                                Please provide your vehicle details if you plan to bring a vehicle to campus.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <label className="block">
                                                    <span className="text-gray-700">Do you have a vehicle?</span>
                                                    <select
                                                        name="hasVehicle"
                                                        value={formData.hasVehicle}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                </label>
                                            </div>

                                            <div className="space-y-4">
                                                {formData.hasVehicle === 'Yes' && (
                                                    <label className="block">
                                                        <span className="text-gray-700">Vehicle Number</span>
                                                        <input
                                                            type="text"
                                                            name="vehicleNo"
                                                            value={formData.vehicleNo}
                                                            onChange={handleInputChange}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <motion.button
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                                onClick={() => setActiveTab('academic')}
                                            >
                                                Previous: Academic Details
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex justify-between pt-6 border-t border-gray-200">
                                <div className="flex space-x-4">
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                                        onClick={loadDraft}
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Load Draft</span>
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                                        onClick={handleSaveDraft}
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Save Draft</span>
                                    </motion.button>
                                </div>
                                <div className="flex space-x-4">
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                                        onClick={() => setIsViewMode(true)}
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                        <span>Preview Form</span>
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors flex items-center space-x-2"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Submit Application</span>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default StudentAdmissionRequest;
