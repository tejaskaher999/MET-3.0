import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Edit, Save, Camera, Download, 
  Mail, Phone, MapPin, Calendar, Book, 
  Award, GraduationCap, Briefcase, FileText,
  ChevronRight, ChevronDown, Plus, CheckCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";

const StudentUpdateProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Allotment Details
    grNumber: 'N04112100015',
    capRound: 'I',
    admissionType: 'MS',
    applicationId: 'EN21237293',
    stateMeritNo: '36312',
    generalMeritNo: '68693',
    
    // Personal Details
    firstName: 'Dinesh',
    middleName: 'Chandrakant',
    lastName: 'Sonawane',
    gender: 'Male',
    fathersName: 'Sonawane Chandrakant Kedu',
    mothersName: 'Chhaya',
    dateOfBirth: '23-10-2003',
    birthPlace: 'Mumbai',
    bloodGroup: 'B+',
    fatherOccupation: 'Service',
    childNo: '1',
    annualIncome: '300000',
    motherTongue: 'Marathi',
    religion: 'Hindu',
    category: 'SC',
    caste: 'Chambhar',
    nationality: 'Indian',
    domicile: 'Maharashtra',
    vehicleNo: '',
    licenseNo: '',
    
    // Address Details
    localAddress: 'Plot No. 17,Sudarshan Colony,Dattanagar,Peth Road,Panchwati Nashik.',
    permanentAddress: 'Plot No. 17,Sudarshan Colony,Dattanagar,Peth Road,Panchwati Nashik.',
    district: 'Nashik',
    pin: '422003',
    state: 'Maharashtra',
    studentContact: '9156537875',
    studentEmail: 'sonawanedinesh2310@gmail.com',
    parentContact: '9960520775',
    parentEmail: 'sonawanedinesh2310@gmail.com',
    
    // Entrance Details
    cet: '75.00',
    aieee: '0.00',
    other: '0',
    
    // HSC Details
    phy: '85',
    chem: '87',
    math: '94',
    bio: '0',
    voc: '0',
    pcm: '266',
    pcb: '0',
    english: '88',
    
    // Current Affiliation Details
    prn: '2152441257007',
    eligibilityNo: '',
    
    // Declaration
    declaration: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleDownload = () => {
    alert('Profile downloaded successfully!');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'academic', label: 'Academic Info', icon: GraduationCap },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Profile Photo" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-500" />
                    </div>
                  )}
                  {isEditing && (
                    <label className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 text-center cursor-pointer">
                      <Camera className="w-4 h-4 inline mr-1" />
                      Change
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handlePhotoChange}
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{formData.firstName} {formData.middleName} {formData.lastName}</h1>
                  <p className="text-red-200">Student ID: {formData.grNumber}</p>
                  <p className="text-red-200">Year: 4th | Division: A</p>
                </div>
              </div>
              <div className="flex space-x-3">
                {isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="bg-white text-red-700 px-4 py-2 rounded-lg flex items-center space-x-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-red-700 px-4 py-2 rounded-lg flex items-center space-x-2 shadow-md"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="bg-white text-red-700 px-4 py-2 rounded-lg flex items-center space-x-2 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'personal' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Allotment Details */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-red-600" />
                      Allotment Details
                    </h2>
                    {isEditing && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Editable
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">GR Number</label>
                      <input
                        type="text"
                        name="grNumber"
                        value={formData.grNumber}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CAP Round</label>
                      <select 
                        name="capRound"
                        value={formData.capRound}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      >
                        <option>I</option>
                        <option>II</option>
                        <option>III</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Admission Type</label>
                      <select 
                        name="admissionType"
                        value={formData.admissionType}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      >
                        <option>MS</option>
                        <option>Regular</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Application ID</label>
                      <input
                        type="text"
                        name="applicationId"
                        value={formData.applicationId}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State Merit No</label>
                      <input
                        type="text"
                        name="stateMeritNo"
                        value={formData.stateMeritNo}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">General Merit No</label>
                      <input
                        type="text"
                        name="generalMeritNo"
                        value={formData.generalMeritNo}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <User className="w-5 h-5 mr-2 text-red-600" />
                      Personal Details
                    </h2>
                    {isEditing && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Editable
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <input
                        type="text"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                      <select 
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      >
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>O+</option>
                        <option>O-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                      <input
                        type="text"
                        name="fathersName"
                        value={formData.fathersName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
                      <input
                        type="text"
                        name="mothersName"
                        value={formData.mothersName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      >
                        <option>General</option>
                        <option>OBC</option>
                        <option>SC</option>
                        <option>ST</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-red-600" />
                      Vehicle Details
                    </h2>
                    {isEditing && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Editable
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
                      <input
                        type="text"
                        name="vehicleNo"
                        value={formData.vehicleNo}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">License Number</label>
                      <input
                        type="text"
                        name="licenseNo"
                        value={formData.licenseNo}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'academic' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Entrance Details */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-red-600" />
                      Entrance Details
                    </h2>
                    {isEditing && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Editable
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CET Score</label>
                      <input
                        type="text"
                        name="cet"
                        value={formData.cet}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">AIEEE Score</label>
                      <input
                        type="text"
                        name="aieee"
                        value={formData.aieee}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Other Score</label>
                      <input
                        type="text"
                        name="other"
                        value={formData.other}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* HSC Details */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Book className="w-5 h-5 mr-2 text-red-600" />
                      HSC Details
                    </h2>
                    {isEditing && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Editable
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Physics</label>
                      <input
                        type="text"
                        name="phy"
                        value={formData.phy}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Chemistry</label>
                      <input
                        type="text"
                        name="chem"
                        value={formData.chem}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mathematics</label>
                      <input
                        type="text"
                        name="math"
                        value={formData.math}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">English</label>
                      <input
                        type="text"
                        name="english"
                        value={formData.english}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-800">PCM Total</p>
                          <p className="text-lg font-bold text-blue-900">{formData.pcm}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-blue-800">Percentage</p>
                          <p className="text-lg font-bold text-blue-900">
                            {((parseInt(formData.pcm) / 300) * 100).toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Affiliation Details */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2 text-red-600" />
                      Current Affiliation Details
                    </h2>
                    {isEditing && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Editable
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">PRN / Enrollment No</label>
                      <input
                        type="text"
                        name="prn"
                        value={formData.prn}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Eligibility No</label>
                      <input
                        type="text"
                        name="eligibilityNo"
                        value={formData.eligibilityNo}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'contact' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Address Details */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-red-600" />
                      Address Details
                    </h2>
                    {isEditing && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Editable
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Local Address</label>
                      <textarea
                        name="localAddress"
                        value={formData.localAddress}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
                      <textarea
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">District</label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Pin Code</label>
                      <input
                        type="text"
                        name="pin"
                        value={formData.pin}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <select 
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      >
                        <option>Maharashtra</option>
                        <option>Gujarat</option>
                        <option>Karnataka</option>
                        <option>Delhi</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-red-600" />
                      Contact Details
                    </h2>
                    {isEditing && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Editable
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Student Contact</label>
                      <input
                        type="text"
                        name="studentContact"
                        value={formData.studentContact}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Student Email</label>
                      <input
                        type="email"
                        name="studentEmail"
                        value={formData.studentEmail}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Parent Contact</label>
                      <input
                        type="text"
                        name="parentContact"
                        value={formData.parentContact}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Parent Email</label>
                      <input
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md shadow-sm px-3 py-2 ${
                          isEditing ? 'border-gray-300 focus:border-red-500 focus:ring-red-500' : 'bg-gray-100 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'documents' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-red-600" />
                      Documents
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-600 text-white px-3 py-1 rounded-md text-sm flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Upload Document
                    </motion.button>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-800">Admission Form</h3>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Uploaded</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Uploaded on: 15/06/2023</p>
                        <div className="flex space-x-2">
                          <button className="text-red-600 text-sm hover:underline">View</button>
                          <button className="text-red-600 text-sm hover:underline">Download</button>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-800">ID Card</h3>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Uploaded</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Uploaded on: 15/06/2023</p>
                        <div className="flex space-x-2">
                          <button className="text-red-600 text-sm hover:underline">View</button>
                          <button className="text-red-600 text-sm hover:underline">Download</button>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-800">Birth Certificate</h3>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Pending</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Required for verification</p>
                        <button className="text-red-600 text-sm hover:underline">Upload</button>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-800">Transfer Certificate</h3>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Pending</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Required for verification</p>
                        <button className="text-red-600 text-sm hover:underline">Upload</button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Declaration */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-red-600" />
                  Declaration
                </h2>
              </div>
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1"
                />
                <label className="text-sm text-gray-700">
                  I know that I am abide for regular updation of personal information in the system. Any communication gap due to improper personal information will be the responsibility of students. I agree that All addresses/phone numbers filled are correct and working.
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentUpdateProfile;
