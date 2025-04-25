import React, { useState, createContext, useContext, useEffect } from 'react';
import { Send, Upload, Eye, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';


// Types
enum GrievanceType {
  FACILITY = "Facility Related",
  ADMINISTRATIVE = "Administrative",
  ACADEMIC = "Academic Related",
  PERSONAL = "Personal",
  OTHER = "Other"
}

enum GrievanceStatus {
  PENDING = "Pending",
  UNDER_REVIEW = "Under Review",
  RESOLVED = "Resolved",
  REJECTED = "Rejected"
}

interface Grievance {
  id: string;
  subject: string;
  description: string;
  type: GrievanceType;
  date: string;
  status: GrievanceStatus;
  attachment?: File | null;
}

// Context
interface GrievanceContextType {
  grievances: Grievance[];
  addGrievance: (grievance: Omit<Grievance, 'id' | 'date' | 'status'>) => void;
}

const GrievanceContext = createContext<GrievanceContextType | undefined>(undefined);

// Components
const Button: React.FC<{
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  children: React.ReactNode;
}> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  icon,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500'
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!isLoading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

const StatusBadge: React.FC<{ status: GrievanceStatus }> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case GrievanceStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case GrievanceStatus.UNDER_REVIEW:
        return 'bg-blue-100 text-blue-800';
      case GrievanceStatus.RESOLVED:
        return 'bg-green-100 text-green-800';
      case GrievanceStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

const FormField: React.FC<{
  label: string;
  id: string;
  children: React.ReactNode;
  required?: boolean;
}> = ({ label, id, children, required = false }) => {
  return (
    <div className="mb-6">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
};

// Main Component
const StaffGrievance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [grievances, setGrievances] = useState<Grievance[]>(() => {
    const saved = localStorage.getItem('grievances');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('grievances', JSON.stringify(grievances));
  }, [grievances]);

  const addGrievance = (newGrievance: Omit<Grievance, 'id' | 'date' | 'status'>) => {
    const grievance: Grievance = {
      ...newGrievance,
      id: `GR-${new Date().getFullYear()}-${String(grievances.length + 1).padStart(3, '0')}`,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      }),
      status: GrievanceStatus.PENDING
    };

    setGrievances(prev => [grievance, ...prev]);
  };

  const NewGrievanceForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
      type: '',
      subject: '',
      description: '',
      attachment: null as File | null
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        addGrievance({
          type: formData.type as GrievanceType,
          subject: formData.subject,
          description: formData.description,
          attachment: formData.attachment
        });

        toast.success('Grievance submitted successfully!');
        setFormData({ type: '', subject: '', description: '', attachment: null });
        setActiveTab('history');
      } catch (error) {
        toast.error('Failed to submit grievance. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Grievance Type" id="type" required>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            required
          >
            <option value="" disabled>Select type</option>
            {Object.values(GrievanceType).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Subject" id="subject" required>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            placeholder="Enter a brief subject"
            required
          />
        </FormField>

        <FormField label="Description" id="description" required>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            rows={5}
            placeholder="Please provide detailed information..."
            required
          />
        </FormField>

        <FormField label="Attachment (Optional)" id="attachment">
          <div className="flex items-center space-x-2">
            <label className="cursor-pointer bg-gray-50 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors flex items-center text-gray-700">
              <Upload className="w-4 h-4 mr-2" />
              Choose File
              <input
                type="file"
                id="attachment"
                onChange={(e) => setFormData(prev => ({ ...prev, attachment: e.target.files?.[0] || null }))}
                className="hidden"
              />
            </label>
            <span className="text-sm text-gray-500">
              {formData.attachment ? formData.attachment.name : 'No file chosen'}
            </span>
          </div>
        </FormField>

        <div className="pt-4">
          <Button 
            type="submit" 
            isLoading={isSubmitting}
            icon={<Send className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Submit Grievance
          </Button>
        </div>
      </form>
    );
  };

  return (
    <GrievanceContext.Provider value={{ grievances, addGrievance }}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-600 w-8 h-8" />
              <h1 className="text-2xl font-bold text-gray-900">Grievance Portal</h1>
            </div>
            <p className="text-gray-600 mt-2">
              Submit and track your grievances or concerns.
            </p>
          </header>

          <motion.div 
            className="bg-white rounded-lg shadow overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex mb-4 border-b border-gray-200">
              <button
                className={`py-2 px-4 font-medium border-b-2 transition-all duration-200 
                ${activeTab === 'new' 
                  ? 'text-red-600 border-red-600' 
                  : 'text-gray-500 border-transparent hover:text-red-500 hover:border-red-300'}`}
                onClick={() => setActiveTab('new')}
              >
                New Grievance
              </button>
              <button
                className={`py-2 px-4 font-medium border-b-2 transition-all duration-200
                ${activeTab === 'history' 
                  ? 'text-red-600 border-red-600' 
                  : 'text-gray-500 border-transparent hover:text-red-500 hover:border-red-300'}`}
                onClick={() => setActiveTab('history')}
              >
                Grievance History
              </button>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'new' ? (
                  <motion.div
                    key="new"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <NewGrievanceForm />
                  </motion.div>
                ) : (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {grievances.length === 0 ? (
                      <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-md">
                        <p className="text-gray-500">No grievances submitted yet.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {grievances.map((grievance, index) => (
                              <motion.tr 
                                key={grievance.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="hover:bg-gray-50"
                              >
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{grievance.id}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{grievance.date}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{grievance.subject}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{grievance.type}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <StatusBadge status={grievance.status} />
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                                  <Button 
                                    variant="outline"
                                    onClick={() => alert(`Viewing details for ${grievance.id}`)}
                                    icon={<Eye className="w-4 h-4" />}
                                    className="text-xs"
                                  >
                                    View Details
                                  </Button>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        <Toaster position="top-right" />
      </div>
    </GrievanceContext.Provider>
  );
};

export default StaffGrievance;