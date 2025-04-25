import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const inputVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4
        }
    }
};

const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            delay: 0.4,
            duration: 0.3
        }
    },
    hover: {
        scale: 1.03,
        transition: {
            duration: 0.2
        }
    },
    tap: {
        scale: 0.97
    }
};

const StudentChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        retypePassword: ''
    });

    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        retypePassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        retypePassword: false
    });

    const [isSuccess, setIsSuccess] = useState(false);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            currentPassword: '',
            newPassword: '',
            retypePassword: ''
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
        }

        if (!formData.retypePassword) {
            newErrors.retypePassword = 'Please retype your password';
            isValid = false;
        } else if (formData.newPassword !== formData.retypePassword) {
            newErrors.retypePassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle password change logic here
            console.log('Form submitted:', formData);
            
            // Simulate success
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    retypePassword: ''
                });
            }, 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <>
            <motion.div
                className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
                initial="hidden"
                animate="visible"
                variants={formVariants}
            >
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        className="bg-white rounded-xl shadow-2xl overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                    >
                        {/* Header */}
                        <motion.div
                            className="bg-gradient-to-r from-red-700 to-red-900 px-8 py-6"
                            whileHover={{ backgroundColor: "#991b1b" }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                                    <Lock className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                                    <p className="mt-1 text-red-100 text-sm">Please enter your current password and choose a new password</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Success Message */}
                        {isSuccess && (
                            <motion.div 
                                className="bg-green-50 border-l-4 border-green-500 p-4"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                    <p className="text-green-700 font-medium">Password changed successfully!</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Form */}
                        <motion.div
                            className="px-8 py-6"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-5">
                                    {/* Current Password */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label
                                            htmlFor="currentPassword"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPasswords.currentPassword ? "text" : "password"}
                                                id="currentPassword"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleChange}
                                                className={`
                                                    block w-full px-4 py-3 rounded-lg shadow-sm text-gray-900
                                                    focus:ring-2 focus:ring-red-500 focus:border-transparent
                                                    ${errors.currentPassword
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                    }
                                                `}
                                                placeholder="Enter your current password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => togglePasswordVisibility('currentPassword')}
                                            >
                                                {showPasswords.currentPassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                )}
                                            </button>
                                            {errors.currentPassword && (
                                                <motion.div
                                                    className="mt-1 flex items-center text-sm text-red-600"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.currentPassword}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* New Password */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label
                                            htmlFor="newPassword"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPasswords.newPassword ? "text" : "password"}
                                                id="newPassword"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                className={`
                                                    block w-full px-4 py-3 rounded-lg shadow-sm text-gray-900
                                                    focus:ring-2 focus:ring-red-500 focus:border-transparent
                                                    ${errors.newPassword
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                    }
                                                `}
                                                placeholder="Enter your new password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => togglePasswordVisibility('newPassword')}
                                            >
                                                {showPasswords.newPassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                )}
                                            </button>
                                            {errors.newPassword && (
                                                <motion.div
                                                    className="mt-1 flex items-center text-sm text-red-600"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.newPassword}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* Retype Password */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label
                                            htmlFor="retypePassword"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Retype Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPasswords.retypePassword ? "text" : "password"}
                                                id="retypePassword"
                                                name="retypePassword"
                                                value={formData.retypePassword}
                                                onChange={handleChange}
                                                className={`
                                                    block w-full px-4 py-3 rounded-lg shadow-sm text-gray-900
                                                    focus:ring-2 focus:ring-red-500 focus:border-transparent
                                                    ${errors.retypePassword
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                    }
                                                `}
                                                placeholder="Retype your new password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => togglePasswordVisibility('retypePassword')}
                                            >
                                                {showPasswords.retypePassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                )}
                                            </button>
                                            {errors.retypePassword && (
                                                <motion.div
                                                    className="mt-1 flex items-center text-sm text-red-600"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.retypePassword}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Password Requirements */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h3>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                        <li className="flex items-center">
                                            <div className={`w-2 h-2 rounded-full mr-2 ${formData.newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            At least 8 characters long
                                        </li>
                                        <li className="flex items-center">
                                            <div className={`w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(formData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            Contains uppercase letter
                                        </li>
                                        <li className="flex items-center">
                                            <div className={`w-2 h-2 rounded-full mr-2 ${/[0-9]/.test(formData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            Contains number
                                        </li>
                                        <li className="flex items-center">
                                            <div className={`w-2 h-2 rounded-full mr-2 ${/[!@#$%^&*]/.test(formData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            Contains special character
                                        </li>
                                    </ul>
                                </div>

                                {/* Submit Button */}
                                <motion.div
                                    className="pt-6"
                                    variants={buttonVariants}
                                >
                                    <motion.button
                                        type="submit"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        Change Password
                                    </motion.button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default StudentChangePassword;
