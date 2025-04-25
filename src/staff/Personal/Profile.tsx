import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Building,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Globe,
  BookOpen,
  Star,
  Briefcase,
  Award,
  Heart,
  User2,
  Save,
  Upload,
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react";

const nationalities = [
  "Indian",
  "Afghan",
  "Australian",
  "Bangladeshi",
  "British",
  "Canadian",
  "Chinese",
  "German",
  "Japanese",
  "Malaysian",
  "Nepalese",
  "American",
  "Other"
];

const commonLanguages = [
  "English",
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Urdu",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Sanskrit"
];

const StaffProfile = () => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(85);
  const [sameAsPresent, setSameAsPresent] = useState(false);
  const [addressData, setAddressData] = useState({
    present: {
      line1: "Flat 101, Building A, Green View Apartments",
      line2: "MG Road, Civil Lines",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India"
    },
    permanent: {
      line1: "234, Park Avenue",
      line2: "Near Town Hall",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      country: "India"
    }
  });

  const [formData, setFormData] = useState({
    personal: {
      fullName: "Prof.Staff",
      dob: "1980-01-15",
      gender: "male",
      nationality: "Indian",
      aadhar: "XXXX-XXXX-XXXX",
      maritalStatus: "married",
      bloodGroup: "oPositive",
      religion: "",
      category: "",
      physicallyChallenged: "no",
      languages: "",
      panNumber: "",
      passport: "",
      drivingLicense: "",
      voterID: ""
    },
    academic: {
      designation: "Associate Professor",
      department: "computerScience",
      employmentType: "permanent",
      experience: "12",
      qualification: "Ph.D. in Computer Science",
      qualificationYear: "2012",
      university: "Indian Institute of Technology",
      specialization: "Machine Learning",
      researchInterests: "Artificial Intelligence, Machine Learning, Natural Language Processing, Computer Vision"
    },
    contact: {
      email: "john.staff@campus.edu",
      personalEmail: "john.doe@example.com",
      phone: "+91 9876543210",
      alternatePhone: "+91 9876543211",
      emergencyName: "Jane Doe",
      emergencyRelation: "Spouse",
      emergencyPhone: "+91 9876543212",
      emergencyEmail: "jane.doe@example.com"
    }
  });

  const [displayData, setDisplayData] = useState({
    personal: {
      fullName: "Prof.Staff", 
      dob: "1980-01-15",
      gender: "male",
      nationality: "Indian",
      aadhar: "XXXX-XXXX-XXXX",
      maritalStatus: "married",
      bloodGroup: "oPositive",
      religion: "",
      category: "",
      physicallyChallenged: "",
      languages: "",
      panNumber: "",
      passport: "",
      drivingLicense: "",
      voterID: ""
    },
    academic: {
      designation: "Associate Professor",
      department: "computerScience",
      employmentType: "permanent",
      experience: "12",
      qualification: "Ph.D. in Computer Science",
      qualificationYear: "2012",
      university: "Indian Institute of Technology",
      specialization: "Machine Learning",
      researchInterests: "Artificial Intelligence, Machine Learning, Natural Language Processing, Computer Vision"
    },
    contact: {
      email: "john.staff@campus.edu",
      personalEmail: "john.doe@example.com",
      phone: "+91 9876543210",
      alternatePhone: "+91 9876543211",
      emergencyName: "Jane Doe",
      emergencyRelation: "Spouse",
      emergencyPhone: "+91 9876543212",
      emergencyEmail: "jane.doe@example.com"
    }
  });

  const [profileImage, setProfileImage] = useState<string>("/placeholder-avatar.jpg");
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = async (section) => {
    setSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(`Saving ${section} section:`, section === 'all' ? formData : formData[section]);

      // Update displayData after successful save
      if (section === 'all') {
        setDisplayData(formData); // Update all data
      } else {
        // Update only the specific section
        setDisplayData(prev => ({
          ...prev,
          [section]: formData[section]
        }));
      }

      if (profileCompletion < 100) {
        setProfileCompletion(prev => Math.min(prev + 5, 100));
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving profile data:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSameAsPresent = (e) => {
    const isChecked = e.target.checked;
    setSameAsPresent(isChecked);

    if (isChecked) {
      setAddressData(prev => ({
        ...prev,
        permanent: { ...prev.present }
      }));
    }
  };

  // Function to format Aadhar number with hyphens after every 4 digits
  const handleAadharChange = (e) => {
    let value = e.target.value;

    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Limit to 12 digits max
    const limitedDigits = digits.slice(0, 12);

    // Format with hyphens
    let formattedValue = '';
    for (let i = 0; i < limitedDigits.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += '-';
      }
      formattedValue += limitedDigits[i];
    }

    // Update the state with formatted value
    handleInputChange('personal', 'aadhar', formattedValue);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      // Create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      // Here you would typically upload to your server
      // Simulating upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Replace this with your actual API call
      // const formData = new FormData();
      // formData.append('image', file);
      // const response = await fetch('/api/upload-profile-image', {
      //   method: 'POST',
      //   body: formData
      // });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    // Update document title
    document.title = `Profile | ${displayData.personal.fullName}`;

  }, [displayData.personal.fullName]);

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Avatar and Quick Stats */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg !rounded-lg">
                <AvatarImage src={profileImage} alt="STAFF" className="!rounded-lg" />
                <AvatarFallback className="bg-[#800000] text-white text-xl !rounded-lg">
                  STAFF
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="profile-image"
                className="absolute inset-0 bg-black/50 !rounded-lg opacity-0 group-hover:opacity-100 
                  flex items-center justify-center transition-opacity cursor-pointer"
              >
                {isUploading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="h-5 w-5 text-white" />
                )}
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1" />
                Active
              </Badge>
              <span className="text-xs text-muted-foreground">Since July 2015</span>
            </div>
          </div>

          {/* Middle Column - Main Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-2xl font-bold">{displayData.personal.fullName}</h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-primary text-primary">
                  {displayData.academic.designation}
                </Badge>
                <Badge variant="outline" className="border-amber-500 text-amber-500">
                  <Star className="h-3 w-3 mr-1 fill-amber-500" />
                  STAFF
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                {/* Contact Info */}
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{displayData.contact.email}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{displayData.contact.phone}</span>
                </div>
              </div>

              <div className="space-y-2">
                {/* Department Info */}
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span className="text-sm">
                    Department of Computer Science & Engineering
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-sm">Staff ID: {user?.id || "STAFF00001"}</span>
                </div>
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {displayData.academic.researchInterests.split(',').map((interest, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    {interest.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile Completion */}
          <div className="flex flex-col items-center gap-4 md:min-w-[200px]">
            <div className="text-center w-full">
              <span className="text-sm text-muted-foreground">Profile Completion</span>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={profileCompletion} className="h-2" />
                <span className="text-sm font-medium min-w-[40px]">{profileCompletion}%</span>
              </div>
            </div>

            {showSuccess && (
              <div className="text-green-600 text-sm flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>Changes saved!</span>
              </div>
            )}

            <div className="flex flex-col items-center text-center">
              <span className="text-sm font-medium">Quick Stats</span>
              <div className="flex gap-3 mt-2">
                <div className="text-center">
                  <span className="text-xs text-muted-foreground">Experience</span>
                  <p className="font-medium">{displayData.academic.experience} Years</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-muted-foreground">Publications</span>
                  <p className="font-medium">24</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-muted-foreground">Students</span>
                  <p className="font-medium">120+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Profile Management</h2>
            <p className="text-muted-foreground">View and update your personal information.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleSave('all')}
              disabled={saving}
              className="gap-1"
              style={{ backgroundColor: 'rgb(128, 0, 0)' }}
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save All Changes</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <div className="border-b">
            <TabsList className="bg-transparent h-12 w-full justify-start gap-4">
              <TabsTrigger
                value="personal"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-1 py-3"
              >
                <User className="h-4 w-4 mr-2" />
                Personal Information
              </TabsTrigger>
              <TabsTrigger
                value="academic"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-1 py-3"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Academic Details
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-1 py-3"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Details
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="personal" className="mt-6">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User2 className="h-5 w-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 w-fit">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Verification Pending
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.personal.fullName}
                      onChange={(e) => handleInputChange('personal', 'fullName', e.target.value)}
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="staffId" className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                      Staff ID
                    </Label>
                    <Input id="staffId" defaultValue={user?.id || "STAFF-1234"} disabled className="bg-gray-50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob" className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.personal.dob}
                      onChange={(e) => handleInputChange('personal', 'dob', e.target.value)}
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      Gender
                    </Label>
                    <Select
                      value={formData.personal.gender}
                      onValueChange={(value) => handleInputChange('personal', 'gender', value)}
                    >
                      <SelectTrigger id="gender" className="border-gray-300">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality" className="flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      Nationality
                    </Label>
                    <Select
                      value={formData.personal.nationality}
                      onValueChange={(value) => handleInputChange('personal', 'nationality', value)}
                    >
                      <SelectTrigger id="nationality" className="border-gray-300">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        {nationalities.map((nationality) => (
                          <SelectItem key={nationality.toLowerCase()} value={nationality.toLowerCase()}>
                            {nationality}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadhar" className="flex items-center gap-1">
                      <Award className="h-3.5 w-3.5 text-muted-foreground" />
                      Aadhar Number
                    </Label>
                    <Input
                      id="aadhar"
                      value={formData.personal.aadhar}
                      onChange={handleAadharChange}
                      placeholder="XXXX-XXXX-XXXX"
                      maxLength={14}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-muted-foreground">
                      12-digit Aadhar number (format: XXXX-XXXX-XXXX)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus" className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                      Marital Status
                    </Label>
                    <Select
                      value={formData.personal.maritalStatus}
                      onValueChange={(value) => handleInputChange('personal', 'maritalStatus', value)}
                    >
                      <SelectTrigger id="maritalStatus" className="border-gray-300">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup" className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                      Blood Group
                    </Label>
                    <Select
                      value={formData.personal.bloodGroup}
                      onValueChange={(value) => handleInputChange('personal', 'bloodGroup', value)}
                    >
                      <SelectTrigger id="bloodGroup" className="border-gray-300">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aPositive">A+</SelectItem>
                        <SelectItem value="aNegative">A-</SelectItem>
                        <SelectItem value="bPositive">B+</SelectItem>
                        <SelectItem value="bNegative">B-</SelectItem>
                        <SelectItem value="abPositive">AB+</SelectItem>
                        <SelectItem value="abNegative">AB-</SelectItem>
                        <SelectItem value="oPositive">O+</SelectItem>
                        <SelectItem value="oNegative">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <User2 className="h-4 w-4 mr-2 text-primary" />
                    Additional Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="religion">Religion</Label>
                      <Select
                        value={formData.personal.religion}
                        onValueChange={(value) => handleInputChange('personal', 'religion', value)}
                      >
                        <SelectTrigger id="religion" className="border-gray-300">
                          <SelectValue placeholder="Select religion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hinduism">Hinduism</SelectItem>
                          <SelectItem value="islam">Islam</SelectItem>
                          <SelectItem value="christianity">Christianity</SelectItem>
                          <SelectItem value="sikhism">Sikhism</SelectItem>
                          <SelectItem value="buddhism">Buddhism</SelectItem>
                          <SelectItem value="jainism">Jainism</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.personal.category}
                        onValueChange={(value) => handleInputChange('personal', 'category', value)}
                      >
                        <SelectTrigger id="category" className="border-gray-300">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="obc">OBC</SelectItem>
                          <SelectItem value="sc">SC</SelectItem>
                          <SelectItem value="st">ST</SelectItem>
                          <SelectItem value="ews">EWS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="physicallyChallenged">Physically Challenged</Label>
                      <Select
                        value={formData.personal.physicallyChallenged}
                        onValueChange={(value) => handleInputChange('personal', 'physicallyChallenged', value)}
                      >
                        <SelectTrigger id="physicallyChallenged" className="border-gray-300">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="yes">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="languages" className="flex items-center gap-1">
                        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                        Languages Known
                      </Label>
                      <Select
                        value={formData.personal.languages}
                        onValueChange={(value) => {
                          const currentLanguages = formData.personal.languages ? formData.personal.languages.split(',') : [];
                          const newLanguages = currentLanguages.includes(value)
                            ? currentLanguages.filter(lang => lang !== value)
                            : [...currentLanguages, value];
                          handleInputChange('personal', 'languages', newLanguages.join(','));
                        }}
                      >
                        <SelectTrigger id="languages" className="border-gray-300">
                          <SelectValue placeholder="Select languages">
                            {formData.personal.languages ?
                              formData.personal.languages.split(',').join(', ') :
                              'Select languages'}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {commonLanguages.map((language) => (
                            <SelectItem
                              key={language.toLowerCase()}
                              value={language.toLowerCase()}
                              className={formData.personal.languages?.includes(language.toLowerCase()) ? 'bg-primary/10' : ''}
                            >
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formData.personal.languages && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.personal.languages.split(',').map((language) => (
                            <Badge
                              key={language}
                              variant="secondary"
                              className="px-2 py-1 text-xs"
                              onClick={() => {
                                const newLanguages = formData.personal.languages
                                  .split(',')
                                  .filter(lang => lang !== language)
                                  .join(',');
                                handleInputChange('personal', 'languages', newLanguages);
                              }}
                            >
                              {language}
                              <X className="h-3 w-3 ml-1 cursor-pointer" />
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">Click on a language to remove it</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <Building className="h-4 w-4 mr-2 text-primary" />
                    Identity Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="panNumber">PAN Number</Label>
                      <Input
                        id="panNumber"
                        placeholder="ABCDE1234F"
                        value={formData.personal.panNumber}
                        onChange={(e) => handleInputChange('personal', 'panNumber', e.target.value.toUpperCase())}
                        className="border-gray-300"
                        maxLength={10}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passport">Passport Number</Label>
                      <Input
                        id="passport"
                        placeholder="A1234567"
                        value={formData.personal.passport}
                        onChange={(e) => handleInputChange('personal', 'passport', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="drivingLicense">Driving License</Label>
                      <Input
                        id="drivingLicense"
                        placeholder="DL1234567890"
                        value={formData.personal.drivingLicense}
                        onChange={(e) => handleInputChange('personal', 'drivingLicense', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="voterID">Voter ID</Label>
                      <Input
                        id="voterID"
                        placeholder="ABC1234567"
                        value={formData.personal.voterID}
                        onChange={(e) => handleInputChange('personal', 'voterID', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50 border-t px-6 py-4">
                <Button
                  className="gap-1"
                  style={{ backgroundColor: 'rgb(128, 0, 0)' }}
                  onClick={() => handleSave('personal')}
                  disabled={saving}
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="mt-6">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Academic & Professional Details
                    </CardTitle>
                    <CardDescription>Update your qualifications and experience</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 w-fit">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="designation" className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                      Designation
                    </Label>
                    <Input
                      id="designation"
                      value={formData.academic.designation}
                      onChange={(e) => handleInputChange('academic', 'designation', e.target.value)}
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department" className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5 text-muted-foreground" />
                      Department
                    </Label>
                    <Select
                      value={formData.academic.department}
                      onValueChange={(value) => handleInputChange('academic', 'department', value)}
                    >
                      <SelectTrigger id="department" className="border-gray-300">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computerScience">Computer Science & Engineering</SelectItem>
                        <SelectItem value="information">Information Technology</SelectItem>
                        <SelectItem value="electronics">Electronics & Communication</SelectItem>
                        <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                        <SelectItem value="civil">Civil Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Employment Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="joiningDate" className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        Date of Joining
                        <span className="text-xs text-muted-foreground ml-1">(Non-editable)</span>
                      </Label>
                      <Input
                        id="joiningDate"
                        type="date"
                        defaultValue="2015-07-10"
                        disabled
                        className="bg-gray-100 border-gray-300 cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employmentType">Employment Type</Label>
                      <Select
                        value={formData.academic.employmentType}
                        onValueChange={(value) => handleInputChange('academic', 'employmentType', value)}
                      >
                        <SelectTrigger id="employmentType" className="border-gray-300">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent">Permanent</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="visiting">Visiting</SelectItem>
                          <SelectItem value="adjunct">Adjunct</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Total Experience (Years)</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={formData.academic.experience}
                        onChange={(e) => handleInputChange('academic', 'experience', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-primary" />
                    Highest Qualification
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="qualification">Degree</Label>
                      <Input
                        id="qualification"
                        value={formData.academic.qualification}
                        onChange={(e) => handleInputChange('academic', 'qualification', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qualificationYear">Year</Label>
                      <Input
                        id="qualificationYear"
                        value={formData.academic.qualificationYear}
                        onChange={(e) => handleInputChange('academic', 'qualificationYear', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Input
                        id="university"
                        value={formData.academic.university}
                        onChange={(e) => handleInputChange('academic', 'university', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        value={formData.academic.specialization}
                        onChange={(e) => handleInputChange('academic', 'specialization', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="researchInterests" className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-muted-foreground" />
                    Research Interests
                  </Label>
                  <Textarea
                    id="researchInterests"
                    rows={3}
                    value={formData.academic.researchInterests}
                    onChange={(e) => handleInputChange('academic', 'researchInterests', e.target.value)}
                    className="border-gray-300"
                  />
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50 border-t px-6 py-4">
                <Button
                  className="gap-1"
                  style={{ backgroundColor: 'rgb(128, 0, 0)' }}
                  onClick={() => handleSave('academic')}
                  disabled={saving}
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>Update your contact details</CardDescription>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    Email & Phone
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address (Official)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.contact.email}
                        onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="personalEmail">Email Address (Personal)</Label>
                      <Input
                        id="personalEmail"
                        type="email"
                        value={formData.contact.personalEmail}
                        onChange={(e) => handleInputChange('contact', 'personalEmail', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.contact.phone}
                        onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
                      <Input
                        id="alternatePhone"
                        value={formData.contact.alternatePhone}
                        onChange={(e) => handleInputChange('contact', 'alternatePhone', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    Present Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="presentAddressLine1">Address Line 1</Label>
                      <Input id="presentAddressLine1" defaultValue={addressData.present.line1} className="border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="presentAddressLine2">Address Line 2</Label>
                      <Input id="presentAddressLine2" defaultValue={addressData.present.line2} className="border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="presentCity">City</Label>
                      <Input id="presentCity" defaultValue={addressData.present.city} className="border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="presentState">State</Label>
                      <Input id="presentState" defaultValue={addressData.present.state} className="border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="presentPincode">Pincode</Label>
                      <Input id="presentPincode" defaultValue={addressData.present.pincode} className="border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="presentCountry">Country</Label>
                      <Input id="presentCountry" defaultValue={addressData.present.country} className="border-gray-300" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    Permanent Address
                  </h3>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sameAsPresent"
                      className="mr-2"
                      checked={sameAsPresent}
                      onChange={handleSameAsPresent}
                    />
                    <Label htmlFor="sameAsPresent" className="text-sm cursor-pointer">
                      Same as Present Address
                    </Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="permanentAddressLine1">Address Line 1</Label>
                    <Input
                      id="permanentAddressLine1"
                      value={addressData.permanent.line1}
                      onChange={(e) => setAddressData(prev => ({
                        ...prev,
                        permanent: { ...prev.permanent, line1: e.target.value }
                      }))}
                      disabled={sameAsPresent}
                      className={`border-gray-300 ${sameAsPresent ? "bg-gray-100" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="permanentAddressLine2">Address Line 2</Label>
                    <Input
                      id="permanentAddressLine2"
                      value={addressData.permanent.line2}
                      onChange={(e) => setAddressData(prev => ({
                        ...prev,
                        permanent: { ...prev.permanent, line2: e.target.value }
                      }))}
                      disabled={sameAsPresent}
                      className={`border-gray-300 ${sameAsPresent ? "bg-gray-100" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="permanentCity">City</Label>
                    <Input
                      id="permanentCity"
                      value={addressData.permanent.city}
                      onChange={(e) => setAddressData(prev => ({
                        ...prev,
                        permanent: { ...prev.permanent, city: e.target.value }
                      }))}
                      disabled={sameAsPresent}
                      className={`border-gray-300 ${sameAsPresent ? "bg-gray-100" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="permanentState">State</Label>
                    <Input
                      id="permanentState"
                      value={addressData.permanent.state}
                      onChange={(e) => setAddressData(prev => ({
                        ...prev,
                        permanent: { ...prev.permanent, state: e.target.value }
                      }))}
                      disabled={sameAsPresent}
                      className={`border-gray-300 ${sameAsPresent ? "bg-gray-100" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="permanentPincode">Pincode</Label>
                    <Input
                      id="permanentPincode"
                      value={addressData.permanent.pincode}
                      onChange={(e) => setAddressData(prev => ({
                        ...prev,
                        permanent: { ...prev.permanent, pincode: e.target.value }
                      }))}
                      disabled={sameAsPresent}
                      className={`border-gray-300 ${sameAsPresent ? "bg-gray-100" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="permanentCountry">Country</Label>
                    <Input
                      id="permanentCountry"
                      value={addressData.permanent.country}
                      onChange={(e) => setAddressData(prev => ({
                        ...prev,
                        permanent: { ...prev.permanent, country: e.target.value }
                      }))}
                      disabled={sameAsPresent}
                      className={`border-gray-300 ${sameAsPresent ? "bg-gray-100" : ""}`}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <User className="h-4 w-4 mr-2 text-primary" />
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName">Name</Label>
                      <Input
                        id="emergencyName"
                        value={formData.contact.emergencyName}
                        onChange={(e) => handleInputChange('contact', 'emergencyName', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelation">Relationship</Label>
                      <Input
                        id="emergencyRelation"
                        value={formData.contact.emergencyRelation}
                        onChange={(e) => handleInputChange('contact', 'emergencyRelation', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Phone Number</Label>
                      <Input
                        id="emergencyPhone"
                        value={formData.contact.emergencyPhone}
                        onChange={(e) => handleInputChange('contact', 'emergencyPhone', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyEmail">Email</Label>
                      <Input
                        id="emergencyEmail"
                        type="email"
                        value={formData.contact.emergencyEmail}
                        onChange={(e) => handleInputChange('contact', 'emergencyEmail', e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50 border-t px-6 py-4">
                <Button
                  className="gap-1"
                  style={{ backgroundColor: 'rgb(128, 0, 0)' }}
                  onClick={() => handleSave('contact')}
                  disabled={saving}
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffProfile;
