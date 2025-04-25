import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import toast from 'react-hot-toast';

interface HostelAdmissionFormData {
  // Personal Details
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;

  // Academic Details
  rollNumber: string;
  course: string;
  year: string;
  division: string;
  semester: string;
  cgpa: string;
  scholarship: string;
  backlogs: string;
  achievements: string;

  // Parent/Guardian Details
  parentName: string;
  parentRelation: string;
  parentPhone: string;
  parentEmail: string;
  parentOccupation: string;
  parentAddress: string;

  // Hostel Preferences
  roomType: string;
  roommatePreference: string;
  specialRequirements: string;

  // Documents
  photoUpload: File | null;
  idProof: File | null;
  addressProof: File | null;
  academicDocuments: File | null;

  // Terms
  termsAccepted: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const StudentHostelAdmission = () => {
  const [formData, setFormData] = useState<HostelAdmissionFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    rollNumber: '',
    course: '',
    year: '',
    division: '',
    semester: '',
    cgpa: '',
    scholarship: '',
    backlogs: '',
    achievements: '',
    parentName: '',
    parentRelation: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',
    parentAddress: '',
    roomType: '',
    roommatePreference: '',
    specialRequirements: '',
    photoUpload: null,
    idProof: null,
    addressProof: null,
    academicDocuments: null,
    termsAccepted: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Personal Details Validation
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';

    // Academic Details Validation
    if (!formData.rollNumber) newErrors.rollNumber = 'Roll number is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.division) newErrors.division = 'Division is required';
    if (!formData.semester) newErrors.semester = 'Semester is required';
    if (!formData.cgpa) newErrors.cgpa = 'CGPA is required';
    else if (isNaN(Number(formData.cgpa)) || Number(formData.cgpa) < 0 || Number(formData.cgpa) > 10) {
      newErrors.cgpa = 'CGPA must be between 0 and 10';
    }

    // Parent/Guardian Details Validation
    if (!formData.parentName) newErrors.parentName = 'Parent/Guardian name is required';
    if (!formData.parentRelation) newErrors.parentRelation = 'Relation is required';
    if (!formData.parentPhone) newErrors.parentPhone = 'Parent/Guardian phone number is required';
    if (!formData.parentEmail) newErrors.parentEmail = 'Parent/Guardian email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) newErrors.parentEmail = 'Invalid email format';
    if (!formData.parentOccupation) newErrors.parentOccupation = 'Parent/Guardian occupation is required';
    if (!formData.parentAddress) newErrors.parentAddress = 'Parent/Guardian address is required';

    // Hostel Preferences Validation
    if (!formData.roomType) newErrors.roomType = 'Room type is required';
    if (!formData.roommatePreference) newErrors.roommatePreference = 'Roommate preference is required';

    // Document Upload Validation
    if (!formData.photoUpload) newErrors.photoUpload = 'Photo is required';
    if (!formData.idProof) newErrors.idProof = 'ID proof is required';
    if (!formData.addressProof) newErrors.addressProof = 'Address proof is required';
    if (!formData.academicDocuments) newErrors.academicDocuments = 'Academic documents are required';

    // Terms and Conditions Validation
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Show error toast for validation
      toast.error('Please fill in all required fields correctly', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
          border: '1px solid #FCA5A5',
        },
      });
      // Scroll to the first error
      const firstError = document.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      // Create FormData object for file uploads
      const submitData = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          submitData.append(key, value);
        } else {
          submitData.append(key, value.toString());
        }
      });

      // Make API call to submit the form
      const response = await fetch('/api/hostel-admission', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      
      // Show success toast
      toast.success('Hostel admission request submitted successfully!', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#DCFCE7',
          color: '#166534',
          border: '1px solid #86EFAC',
        },
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        rollNumber: '',
        course: '',
        year: '',
        division: '',
        semester: '',
        cgpa: '',
        scholarship: '',
        backlogs: '',
        achievements: '',
        parentName: '',
        parentRelation: '',
        parentPhone: '',
        parentEmail: '',
        parentOccupation: '',
        parentAddress: '',
        roomType: '',
        roommatePreference: '',
        specialRequirements: '',
        photoUpload: null,
        idProof: null,
        addressProof: null,
        academicDocuments: null,
        termsAccepted: false
      });
      setCurrentStep(1);
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      // Show error toast
      toast.error('Failed to submit form. Please try again.', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FEE2E2',
          color: '#991B1B',
          border: '1px solid #FCA5A5',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#800000] mb-2">Hostel Admission Request</h1>
            <p className="text-gray-600">Please fill out the form below to apply for hostel admission</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    step < 5 ? 'flex-1' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= step
                        ? 'bg-[#800000] text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 5 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        currentStep > step ? 'bg-[#800000]' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">Personal Details</span>
              <span className="text-sm text-gray-600">Academic Details</span>
              <span className="text-sm text-gray-600">Parent Details</span>
              <span className="text-sm text-gray-600">Documents</span>
              <span className="text-sm text-gray-600">Terms and Conditions</span>
            </div>
          </div>

          {/* Form content will be added in next parts */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className={errors.dateOfBirth ? 'border-red-500' : ''}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  >
                    <SelectTrigger id="gender" className={errors.gender ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-red-500">{errors.gender}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}
                  >
                    <SelectTrigger id="bloodGroup" className={errors.bloodGroup ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.bloodGroup && (
                    <p className="text-sm text-red-500">{errors.bloodGroup}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={errors.state ? 'border-red-500' : ''}
                  />
                  {errors.state && (
                    <p className="text-sm text-red-500">{errors.state}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className={errors.pincode ? 'border-red-500' : ''}
                  />
                  {errors.pincode && (
                    <p className="text-sm text-red-500">{errors.pincode}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  onClick={() => setCurrentStep(2)}
                  className="bg-[#800000] hover:bg-[#600000] text-white"
                >
                  Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-[#800000] mb-4">Current Academic Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input
                        id="rollNumber"
                        value={formData.rollNumber}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                        className={errors.rollNumber ? 'border-red-500' : ''}
                      />
                      {errors.rollNumber && (
                        <p className="text-sm text-red-500">{errors.rollNumber}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="course">Course</Label>
                      <Select
                        value={formData.course}
                        onValueChange={(value) => setFormData({ ...formData, course: value })}
                      >
                        <SelectTrigger id="course" className={errors.course ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btech">B.Tech</SelectItem>
                          <SelectItem value="mtech">M.Tech</SelectItem>
                          <SelectItem value="mba">MBA</SelectItem>
                          <SelectItem value="mca">MCA</SelectItem>
                          <SelectItem value="bca">BCA</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.course && (
                        <p className="text-sm text-red-500">{errors.course}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Select
                        value={formData.year}
                        onValueChange={(value) => setFormData({ ...formData, year: value })}
                      >
                        <SelectTrigger id="year" className={errors.year ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">First Year</SelectItem>
                          <SelectItem value="2">Second Year</SelectItem>
                          <SelectItem value="3">Third Year</SelectItem>
                          <SelectItem value="4">Fourth Year</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.year && (
                        <p className="text-sm text-red-500">{errors.year}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="division">Division</Label>
                      <Select
                        value={formData.division}
                        onValueChange={(value) => setFormData({ ...formData, division: value })}
                      >
                        <SelectTrigger id="division" className={errors.division ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select division" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Division A</SelectItem>
                          <SelectItem value="B">Division B</SelectItem>
                          <SelectItem value="C">Division C</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.division && (
                        <p className="text-sm text-red-500">{errors.division}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select
                        value={formData.semester}
                        onValueChange={(value) => setFormData({ ...formData, semester: value })}
                      >
                        <SelectTrigger id="semester" className={errors.semester ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Semester 1</SelectItem>
                          <SelectItem value="2">Semester 2</SelectItem>
                          <SelectItem value="3">Semester 3</SelectItem>
                          <SelectItem value="4">Semester 4</SelectItem>
                          <SelectItem value="5">Semester 5</SelectItem>
                          <SelectItem value="6">Semester 6</SelectItem>
                          <SelectItem value="7">Semester 7</SelectItem>
                          <SelectItem value="8">Semester 8</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.semester && (
                        <p className="text-sm text-red-500">{errors.semester}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cgpa">Current CGPA</Label>
                      <Input
                        id="cgpa"
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={formData.cgpa}
                        onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                        className={errors.cgpa ? 'border-red-500' : ''}
                      />
                      {errors.cgpa && (
                        <p className="text-sm text-red-500">{errors.cgpa}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#800000] mb-4">Additional Academic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="scholarship">Scholarship Details (if any)</Label>
                      <Input
                        id="scholarship"
                        value={formData.scholarship}
                        onChange={(e) => setFormData({ ...formData, scholarship: e.target.value })}
                        className={errors.scholarship ? 'border-red-500' : ''}
                        placeholder="Enter scholarship details"
                      />
                      {errors.scholarship && (
                        <p className="text-sm text-red-500">{errors.scholarship}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="backlogs">Number of Backlogs (if any)</Label>
                      <Input
                        id="backlogs"
                        type="number"
                        min="0"
                        value={formData.backlogs}
                        onChange={(e) => setFormData({ ...formData, backlogs: e.target.value })}
                        className={errors.backlogs ? 'border-red-500' : ''}
                      />
                      {errors.backlogs && (
                        <p className="text-sm text-red-500">{errors.backlogs}</p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="achievements">Academic Achievements</Label>
                      <Textarea
                        id="achievements"
                        value={formData.achievements}
                        onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                        className={errors.achievements ? 'border-red-500' : ''}
                        placeholder="Enter any academic achievements, awards, or recognitions"
                      />
                      {errors.achievements && (
                        <p className="text-sm text-red-500">{errors.achievements}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between space-x-4">
                <Button
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  className="border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white"
                >
                  Previous Step
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  className="bg-[#800000] hover:bg-[#600000] text-white"
                >
                  Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent/Guardian Name</Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className={errors.parentName ? 'border-red-500' : ''}
                  />
                  {errors.parentName && (
                    <p className="text-sm text-red-500">{errors.parentName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentRelation">Relation</Label>
                  <Select
                    value={formData.parentRelation}
                    onValueChange={(value) => setFormData({ ...formData, parentRelation: value })}
                  >
                    <SelectTrigger id="parentRelation" className={errors.parentRelation ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="guardian">Guardian</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.parentRelation && (
                    <p className="text-sm text-red-500">{errors.parentRelation}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Phone Number</Label>
                  <Input
                    id="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className={errors.parentPhone ? 'border-red-500' : ''}
                  />
                  {errors.parentPhone && (
                    <p className="text-sm text-red-500">{errors.parentPhone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentEmail">Email</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                    className={errors.parentEmail ? 'border-red-500' : ''}
                  />
                  {errors.parentEmail && (
                    <p className="text-sm text-red-500">{errors.parentEmail}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentOccupation">Occupation</Label>
                  <Input
                    id="parentOccupation"
                    value={formData.parentOccupation}
                    onChange={(e) => setFormData({ ...formData, parentOccupation: e.target.value })}
                    className={errors.parentOccupation ? 'border-red-500' : ''}
                  />
                  {errors.parentOccupation && (
                    <p className="text-sm text-red-500">{errors.parentOccupation}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="parentAddress">Address</Label>
                  <Textarea
                    id="parentAddress"
                    value={formData.parentAddress}
                    onChange={(e) => setFormData({ ...formData, parentAddress: e.target.value })}
                    className={errors.parentAddress ? 'border-red-500' : ''}
                  />
                  {errors.parentAddress && (
                    <p className="text-sm text-red-500">{errors.parentAddress}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between space-x-4">
                <Button
                  onClick={() => setCurrentStep(2)}
                  variant="outline"
                  className="border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white"
                >
                  Previous Step
                </Button>
                <Button
                  onClick={() => setCurrentStep(4)}
                  className="bg-[#800000] hover:bg-[#600000] text-white"
                >
                  Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-[#800000] mb-4">Hostel Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="roomType">Room Type</Label>
                      <Select
                        value={formData.roomType}
                        onValueChange={(value) => setFormData({ ...formData, roomType: value })}
                      >
                        <SelectTrigger id="roomType" className={errors.roomType ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single Room</SelectItem>
                          <SelectItem value="double">Double Room</SelectItem>
                          <SelectItem value="triple">Triple Room</SelectItem>
                          <SelectItem value="dormitory">Dormitory</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.roomType && (
                        <p className="text-sm text-red-500">{errors.roomType}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="roommatePreference">Roommate Preference</Label>
                      <Select
                        value={formData.roommatePreference}
                        onValueChange={(value) => setFormData({ ...formData, roommatePreference: value })}
                      >
                        <SelectTrigger id="roommatePreference" className={errors.roommatePreference ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="same_course">Same Course</SelectItem>
                          <SelectItem value="same_year">Same Year</SelectItem>
                          <SelectItem value="no_preference">No Preference</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.roommatePreference && (
                        <p className="text-sm text-red-500">{errors.roommatePreference}</p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <Textarea
                        id="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                        className={errors.specialRequirements ? 'border-red-500' : ''}
                        placeholder="Please mention any special requirements or accommodations needed"
                      />
                      {errors.specialRequirements && (
                        <p className="text-sm text-red-500">{errors.specialRequirements}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#800000] mb-4">Document Upload</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="photoUpload">Passport Size Photo</Label>
                      <Input
                        id="photoUpload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormData({ ...formData, photoUpload: file });
                          }
                        }}
                        className={errors.photoUpload ? 'border-red-500' : ''}
                      />
                      {errors.photoUpload && (
                        <p className="text-sm text-red-500">{errors.photoUpload}</p>
                      )}
                      <p className="text-sm text-gray-500">Upload a recent passport size photo (max 2MB)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="idProof">ID Proof</Label>
                      <Input
                        id="idProof"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormData({ ...formData, idProof: file });
                          }
                        }}
                        className={errors.idProof ? 'border-red-500' : ''}
                      />
                      {errors.idProof && (
                        <p className="text-sm text-red-500">{errors.idProof}</p>
                      )}
                      <p className="text-sm text-gray-500">Upload Aadhar Card, PAN Card, or Passport (max 5MB)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="addressProof">Address Proof</Label>
                      <Input
                        id="addressProof"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormData({ ...formData, addressProof: file });
                          }
                        }}
                        className={errors.addressProof ? 'border-red-500' : ''}
                      />
                      {errors.addressProof && (
                        <p className="text-sm text-red-500">{errors.addressProof}</p>
                      )}
                      <p className="text-sm text-gray-500">Upload any valid address proof (max 5MB)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="academicDocuments">Academic Documents</Label>
                      <Input
                        id="academicDocuments"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormData({ ...formData, academicDocuments: file });
                          }
                        }}
                        className={errors.academicDocuments ? 'border-red-500' : ''}
                      />
                      {errors.academicDocuments && (
                        <p className="text-sm text-red-500">{errors.academicDocuments}</p>
                      )}
                      <p className="text-sm text-gray-500">Upload previous academic records (max 5MB)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between space-x-4">
                <Button
                  onClick={() => setCurrentStep(3)}
                  variant="outline"
                  className="border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white"
                >
                  Previous Step
                </Button>
                <Button
                  onClick={() => setCurrentStep(5)}
                  className="bg-[#800000] hover:bg-[#600000] text-white"
                >
                  Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-[#800000] mb-4">Terms and Conditions</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Hostel Rules and Regulations</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                        <li>Students must maintain discipline and follow hostel rules</li>
                        <li>No unauthorized guests are allowed in the hostel</li>
                        <li>Hostel fees must be paid on time</li>
                        <li>Students must maintain cleanliness in their rooms</li>
                        <li>No smoking or consumption of alcohol is allowed</li>
                        <li>Students must inform the hostel warden before leaving the hostel</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Fee Structure</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                        <li>Hostel fees are to be paid semester-wise</li>
                        <li>Additional charges may apply for special facilities</li>
                        <li>Refund policy is subject to college rules</li>
                      </ul>
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                        className="mt-1"
                      />
                      <label htmlFor="termsAccepted" className="text-sm text-gray-600">
                        I have read and agree to the terms and conditions, hostel rules, and fee structure. I understand that any violation of these rules may result in disciplinary action.
                      </label>
                    </div>
                    {errors.termsAccepted && (
                      <p className="text-sm text-red-500">{errors.termsAccepted}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#800000]">Review Your Application</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Please review all the information you have provided. Once submitted, you will not be able to make changes to your application.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between space-x-4">
                <Button
                  onClick={() => setCurrentStep(4)}
                  variant="outline"
                  className="border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white"
                >
                  Previous Step
                </Button>
                <Button
                  onClick={() => {
                    console.log('Submit button clicked in UI'); // Debug log
                    handleSubmit();
                  }}
                  className="bg-[#800000] hover:bg-[#600000] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentHostelAdmission;
