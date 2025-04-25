import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Lock, ShieldAlert } from "lucide-react";

const StaffChangePassword = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recoveryData, setRecoveryData] = useState({
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  });
  const [isRecoveryUpdating, setIsRecoveryUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRecoveryChange = (e) => {
    const { name, value } = e.target;
    setRecoveryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecoverySubmit = async (e) => {
    e.preventDefault();
    setIsRecoveryUpdating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Success handling would go here
    } catch (error) {
      console.error('Error updating recovery options:', error);
    } finally {
      setIsRecoveryUpdating(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      isValid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
      isValid = false;
    } else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = 'New password cannot be the same as current password';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success handling
        setIsSuccess(true);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        // Reset success message after delay
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } catch (error) {
        console.error('Error changing password:', error);
        setErrors({
          ...errors,
          currentPassword: 'Failed to change password. Please try again.'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 space-y-6">
      <Card className="w-full max-w-md shadow-md border-0">
        <div className="p-4 rounded-t-lg flex items-center gap-2" style={{ backgroundColor: 'rgb(128, 0, 0)' }}>
          <Lock className="h-6 w-6 text-white" />
          <h1 className="text-xl font-bold text-white">Change Your Password</h1>
        </div>
        
        <CardContent className="p-6 space-y-6">
          {isSuccess && (
            <div className="p-4 bg-green-50 border border-green-100 rounded-md flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-green-700">Password changed successfully!</p>
            </div>
          )}
          
          <div className="flex items-start gap-2">
            <ShieldAlert className="h-5 w-5 mt-1 flex-shrink-0" style={{ color: 'rgb(128, 0, 0)' }} />
            <p className="text-gray-700">
              For your security, please enter your current password before setting a new password.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="relative">
                <Input 
                  id="currentPassword"
                  name="currentPassword"
                  type={showPasswords.currentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter your current password"
                  className={`pr-10 ${errors.currentPassword ? "border-destructive" : "border-input"}`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                >
                  {showPasswords.currentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-destructive">{errors.currentPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <Input 
                  id="newPassword"
                  name="newPassword"
                  type={showPasswords.newPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  className={`pr-10 ${errors.newPassword ? "border-destructive" : "border-input"}`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                >
                  {showPasswords.newPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-destructive">{errors.newPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Retype Password
              </label>
              <div className="relative">
                <Input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Retype your new password"
                  className={`pr-10 ${errors.confirmPassword ? "border-destructive" : "border-input"}`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                >
                  {showPasswords.confirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full text-white"
              style={{ backgroundColor: 'rgb(128, 0, 0)', borderColor: 'rgb(128, 0, 0)' }}
            >
              {isLoading ? "Processing..." : "Change Password"}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Password Recovery Options */}
      <Card className="w-full max-w-md shadow-md border-0">
        <div className="p-4 border-b flex flex-col" style={{ backgroundColor: 'rgb(128, 0, 0)' }}>
          <CardTitle className="text-lg font-semibold text-white">Password Recovery Options</CardTitle>
          <CardDescription className="text-gray-200">Set up or update recovery methods</CardDescription>
        </div>
        
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleRecoverySubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Recovery Email
              </label>
              <Input 
                id="email"
                name="email"
                type="email"
                value={recoveryData.email}
                onChange={handleRecoveryChange}
                className="border-input"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Recovery Phone Number
              </label>
              <Input 
                id="phone"
                name="phone"
                type="tel"
                value={recoveryData.phone}
                onChange={handleRecoveryChange}
                className="border-input"
              />
            </div>
            
            <Button 
              type="submit" 
              variant="outline"
              disabled={isRecoveryUpdating}
              className="w-full border-2 hover:bg-gray-50 text-gray-800"
              style={{ borderColor: 'rgb(128, 0, 0)' }}
            >
              {isRecoveryUpdating ? "Updating..." : "Update Recovery Options"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-muted-foreground">
        Having trouble? Contact IT Support at support@metbkc.edu
      </div>
    </div>
  );
};

export default StaffChangePassword;