import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBed,
  FaCalendarAlt,
  FaExchangeAlt,
  FaTools,
  FaStar,
  FaUserFriends,
  FaClipboardList,
  FaTshirt,
  FaExclamationTriangle,
  FaBullhorn,
  FaClipboardCheck,
  FaMoon,
  FaBoxes,
  FaSignOutAlt,
  FaTimes,
} from 'react-icons/fa';

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  status?: 'active' | 'coming-soon';
}

const features: FeatureCard[] = [
  {
    title: 'Hostel Allocation',
    description: 'View your room number, building, warden details, and roommates information.',
    icon: <FaBed className="text-2xl" />,
    link: '/student/hostel-allocation',
    status: 'active',
  },
  {
    title: 'Hostel Leave Request',
    description: 'Submit leave requests with dates and reasons for warden approval.',
    icon: <FaCalendarAlt className="text-2xl" />,
    link: '/student/hostel-leave',
    status: 'active',
  },
  {
    title: 'Room Change Request',
    description: 'Request to shift to another room with reason and preferred room selection.',
    icon: <FaExchangeAlt className="text-2xl" />,
    link: '/student/room-change',
    status: 'active',
  },
  {
    title: 'Maintenance Complaint',
    description: 'Raise maintenance issues with image upload and track resolution status.',
    icon: <FaTools className="text-2xl" />,
    link: '/student/maintenance',
    status: 'active',
  },
  {
    title: 'Hostel Feedback',
    description: 'Rate your hostel experience and provide feedback for improvements.',
    icon: <FaStar className="text-2xl" />,
    link: '/student/hostel-feedback',
    status: 'active',
  },
  {
    title: 'Visitor Entry Request',
    description: 'Pre-approve guests visiting you in the hostel.',
    icon: <FaUserFriends className="text-2xl" />,
    link: '/student/visitor-entry',
    status: 'active',
  },
  {
    title: 'Mess Menu',
    description: 'View daily and weekly mess menu with detailed information.',
    icon: <FaClipboardList className="text-2xl" />,
    link: '/student/mess-menu',
    status: 'active',
  },
  {
    title: 'Laundry Service',
    description: 'Request laundry pickup and track delivery status.',
    icon: <FaTshirt className="text-2xl" />,
    link: '/student/laundry',
    status: 'active',
  },
  {
    title: 'Emergency Alert (SOS)',
    description: 'Quick alert system for emergencies with one-click activation.',
    icon: <FaExclamationTriangle className="text-2xl" />,
    link: '/student/emergency',
    status: 'active',
  },
  {
    title: 'Hostel Circulars',
    description: 'View important announcements and notices from hostel administration.',
    icon: <FaBullhorn className="text-2xl" />,
    link: '/student/circulars',
    status: 'active',
  },
  {
    title: 'Room Inspection Logs',
    description: 'Access warden inspection reports and room condition logs.',
    icon: <FaClipboardCheck className="text-2xl" />,
    link: '/student/inspection-logs',
    status: 'active',
  },
  {
    title: 'Night Attendance',
    description: 'View your night attendance records and check-in status.',
    icon: <FaMoon className="text-2xl" />,
    link: '/student/night-attendance',
    status: 'active',
  },
  {
    title: 'Room Inventory',
    description: 'View and acknowledge room inventory checklist.',
    icon: <FaBoxes className="text-2xl" />,
    link: '/student/inventory',
    status: 'active',
  },
  {
    title: 'Exit Pass',
    description: 'Request final exit approval and generate transfer certificate.',
    icon: <FaSignOutAlt className="text-2xl" />,
    link: '/student/exit-pass',
    status: 'active',
  },
];

const StudentHostelFeature = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureCard | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedFeature(feature)}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {feature.icon}
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
                {feature.status === 'coming-soon' && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                    Coming Soon
                  </span>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">{selectedFeature.title}</h2>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaTimes className="text-gray-500" />
                </button>
              </div>
              <FeatureModal 
                feature={selectedFeature} 
                onClose={() => setSelectedFeature(null)} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentHostelFeature;
