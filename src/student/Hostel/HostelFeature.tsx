import React, { useState } from 'react';
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

const HostelFeaturesPage = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureCard | null>(null);

  const handleFeatureClick = (feature: FeatureCard) => {
    setSelectedFeature(feature);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-700 to-red-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Hostel Features & Services
            </h1>
            <p className="text-lg text-red-100">
              Access all hostel-related features and services in one place
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-full"
            >
              <div 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col"
                onClick={() => handleFeatureClick(feature)}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-[#800000] bg-opacity-10 rounded-lg text-[#800000]">
                    {feature.icon}
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 flex-grow">{feature.description}</p>
                {feature.status === 'coming-soon' && (
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-yellow-600 bg-yellow-100 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedFeature && (
          <FeatureModal
            feature={selectedFeature}
            onClose={() => setSelectedFeature(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Modal component for displaying feature content
const FeatureModal = ({ feature, onClose }: { feature: FeatureCard; onClose: () => void }) => {
  const renderFeatureContent = () => {
    switch (feature.title) {
      case 'Hostel Allocation':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Hostel Allocation Details</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Current Room Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Room Number</p>
                    <p className="font-medium">B-304</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Building</p>
                    <p className="font-medium">Boys Hostel Block B</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Floor</p>
                    <p className="font-medium">3rd Floor</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Room Type</p>
                    <p className="font-medium">Double Sharing</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Warden Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">Dr. John Smith</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Office Location</p>
                    <p className="font-medium">Block B, Ground Floor</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Office Hours</p>
                    <p className="font-medium">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Roommate Details</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">Alex Johnson</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Student ID</p>
                      <p className="font-medium">2021CS1234</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Course</p>
                      <p className="font-medium">B.Tech CSE</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <p className="font-medium">+91 98765 12345</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Visitor Entry Request':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Visitor Entry Request Form</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visitor Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter visitor's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select relationship</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="relative">Relative</option>
                    <option value="guardian">Guardian</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visitor's Contact</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter visitor's phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select ID type</option>
                    <option value="aadhar">Aadhar Card</option>
                    <option value="pan">PAN Card</option>
                    <option value="dl">Driving License</option>
                    <option value="voter">Voter ID</option>
                    <option value="passport">Passport</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Visit</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Please describe the purpose of the visit..."
                ></textarea>
              </div>
              <div className="bg-yellow-50 p-4 rounded-md mb-4">
                <p className="text-sm text-yellow-800">
                  Note: Visitors are allowed only during visiting hours (10:00 AM - 6:00 PM).
                  Please ensure your visitor carries the mentioned ID proof.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#800000]/90 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        );

      case 'Mess Menu':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Mess Menu</h3>
            <div className="space-y-6">
              <div className="flex space-x-4 mb-4">
                <button className="px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#800000]/90">
                  This Week
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                  Next Week
                </button>
              </div>

              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <div key={day} className="bg-white rounded-lg shadow p-4">
                  <h4 className="font-semibold text-lg mb-3 text-blue-600">{day}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-yellow-50 p-3 rounded">
                      <h5 className="font-medium mb-2">Breakfast (7:30 - 9:30 AM)</h5>
                      <ul className="text-sm space-y-1">
                        <li>Idli/Dosa</li>
                        <li>Sambar</li>
                        <li>Chutney</li>
                        <li>Tea/Coffee</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <h5 className="font-medium mb-2">Lunch (12:00 - 2:00 PM)</h5>
                      <ul className="text-sm space-y-1">
                        <li>Rice</li>
                        <li>Dal</li>
                        <li>Vegetable Curry</li>
                        <li>Curd</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <h5 className="font-medium mb-2">Snacks (4:30 - 5:30 PM)</h5>
                      <ul className="text-sm space-y-1">
                        <li>Samosa</li>
                        <li>Tea/Coffee</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <h5 className="font-medium mb-2">Dinner (7:30 - 9:30 PM)</h5>
                      <ul className="text-sm space-y-1">
                        <li>Chapati</li>
                        <li>Rice</li>
                        <li>Dal</li>
                        <li>Paneer Curry</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <h4 className="font-semibold text-lg mb-2">Special Notes</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li>Special diet requirements must be informed to the mess manager</li>
                  <li>Weekend special menu may vary</li>
                  <li>Feedback for mess food can be submitted through the feedback form</li>
                  <li>Outside food delivery is allowed only until 9:00 PM</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'Hostel Feedback':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Hostel Feedback Form</h3>
            <form className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  Your feedback helps us improve the hostel facilities and services. Please rate various aspects of your hostel experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Room and Facilities */}
                <div className="space-y-4">
                  <h4 className="font-medium text-lg text-gray-900">Room & Facilities</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Condition</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cleanliness</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Response</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mess and Food */}
                <div className="space-y-4">
                  <h4 className="font-medium text-lg text-gray-900">Mess & Food</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Food Quality</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mess Cleanliness</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Food Variety</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Staff and Security */}
                <div className="space-y-4">
                  <h4 className="font-medium text-lg text-gray-900">Staff & Security</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Staff Behavior</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Security Measures</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Warden Support</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Amenities and Services */}
                <div className="space-y-4">
                  <h4 className="font-medium text-lg text-gray-900">Amenities & Services</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Laundry Service</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Common Areas</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Internet/WiFi</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What aspects of the hostel need improvement?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Room Maintenance',
                      'Mess Food Quality',
                      'Staff Behavior',
                      'Security',
                      'Cleanliness',
                      'Amenities',
                      'Internet Speed',
                      'Common Areas'
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={item}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={item} className="text-sm text-gray-700">{item}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Share your detailed feedback and suggestions for improvement..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Would you recommend this hostel to others?</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input type="radio" name="recommend" className="form-radio text-blue-600" />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="recommend" className="form-radio text-blue-600" />
                      <span className="ml-2">No</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="recommend" className="form-radio text-blue-600" />
                      <span className="ml-2">Maybe</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#800000]/90 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        );

      case 'Hostel Leave Request':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Hostel Leave Request Form</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Leave</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Please provide a detailed reason for your leave request..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter emergency contact number"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#800000]/90 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        );

      case 'Room Change Request':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Room Change Request Form</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Room Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your current room number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Room Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter preferred room number (if any)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Change</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Please provide a detailed reason for your room change request..."
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#800000]/90 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        );

      case 'Maintenance Complaint':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Maintenance Complaint Form</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select issue type</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="furniture">Furniture</option>
                  <option value="appliance">Appliance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe the issue in detail..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#800000]/90 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                >
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        );

      case 'Emergency Alert (SOS)':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Emergency Alert System</h3>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p className="font-bold">Emergency Alert</p>
              <p>This button will immediately notify hostel authorities about your emergency.</p>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select emergency type</option>
                  <option value="medical">Medical Emergency</option>
                  <option value="security">Security Threat</option>
                  <option value="fire">Fire Hazard</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your current location in the hostel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brief Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Briefly describe the emergency situation..."
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="px-6 py-3 bg-[#800000] text-white rounded-md hover:bg-[#800000]/90 focus:outline-none focus:ring-2 focus:ring-[#800000] text-lg font-bold"
                >
                  SEND SOS ALERT
                </button>
              </div>
            </form>
          </div>
        );

      case 'Laundry Service':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Laundry Service Request</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-lg mb-2">Service Status</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Last Pickup</p>
                    <p className="font-medium">15th March 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Delivery</p>
                    <p className="font-medium">17th March 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Quota Used</p>
                    <p className="font-medium">3/4 Services</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service Status</p>
                    <p className="font-medium text-green-600">Available</p>
                  </div>
                </div>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Pickup Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Pickup Time</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select time slot</option>
                      <option value="morning">Morning (8:00 - 10:00 AM)</option>
                      <option value="afternoon">Afternoon (2:00 - 4:00 PM)</option>
                      <option value="evening">Evening (6:00 - 8:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Clothes Count</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">T-Shirts</label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pants</label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Shirts</label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Others</label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Any special instructions for laundry service..."
                  ></textarea>
                </div>

                <div className="bg-yellow-50 p-4 rounded-md">
                  <p className="text-sm text-yellow-800">
                    Note: Maximum 15 clothes per service. Delicate items should be marked separately.
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#800000]/90 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                  >
                    Schedule Pickup
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case 'Room Inventory':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Room Inventory Checklist</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-lg mb-2">Room Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Room Number</p>
                    <p className="font-medium">B-304</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="font-medium">March 15, 2024</p>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Furniture Items</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { name: 'Study Table', count: 1 },
                      { name: 'Chair', count: 1 },
                      { name: 'Bed with Mattress', count: 1 },
                      { name: 'Wardrobe', count: 1 },
                      { name: 'Bookshelf', count: 1 }
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                        </div>
                        <div className="space-x-2">
                          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="good">Good</option>
                            <option value="damaged">Damaged</option>
                            <option value="missing">Missing</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Electrical Fittings</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { name: 'Tube Light', count: 2 },
                      { name: 'Fan', count: 1 },
                      { name: 'Power Sockets', count: 4 }
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                        </div>
                        <div className="space-x-2">
                          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="working">Working</option>
                            <option value="not_working">Not Working</option>
                            <option value="missing">Missing</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Any additional comments about room inventory..."
                  ></textarea>
                </div>

                <div className="bg-yellow-50 p-4 rounded-md">
                  <p className="text-sm text-yellow-800">
                    Note: Please report any damages immediately. You will be responsible for maintaining these items throughout your stay.
                  </p>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#800000]/90 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                  >
                    Submit Inventory
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case 'Night Attendance':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Night Attendance Record</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Today's Status</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">March 15, 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium text-green-600">Present</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Check-in Time</p>
                    <p className="font-medium">9:45 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Checked by</p>
                    <p className="font-medium">Mr. Rajesh Kumar</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 bg-gray-50 border-b">
                  <h4 className="font-semibold text-lg">Attendance History</h4>
                </div>
                <div className="divide-y">
                  {[
                    { date: 'March 14, 2024', status: 'Present', time: '10:00 PM' },
                    { date: 'March 13, 2024', status: 'Present', time: '9:30 PM' },
                    { date: 'March 12, 2024', status: 'Absent', time: '-' },
                    { date: 'March 11, 2024', status: 'Present', time: '9:15 PM' },
                    { date: 'March 10, 2024', status: 'Present', time: '9:45 PM' }
                  ].map((record) => (
                    <div key={record.date} className="p-4">
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <p className="text-sm text-gray-600">Date</p>
                          <p className="font-medium">{record.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <p className={`font-medium ${record.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
                            {record.status}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{record.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-md">
                <h4 className="font-semibold text-lg mb-2">Attendance Rules</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li>Night attendance is mandatory for all hostel residents</li>
                  <li>Attendance is taken between 9:00 PM and 10:30 PM</li>
                  <li>Three consecutive absences without permission will be reported</li>
                  <li>Late entry requires prior permission from the warden</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'Hostel Circulars':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Hostel Circulars & Announcements</h3>
            <div className="space-y-6">
              <div className="flex space-x-4 mb-4">
                <button className="px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#800000]/90">
                  All
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                  Important
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                  Events
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Hostel Maintenance Schedule',
                    date: 'March 15, 2024',
                    type: 'Important',
                    content: 'Maintenance work will be carried out in Block B from March 20-22. Please cooperate.',
                    attachment: true
                  },
                  {
                    title: 'Cultural Night Event',
                    date: 'March 14, 2024',
                    type: 'Event',
                    content: 'Annual cultural night will be held on March 25th in the hostel amphitheater.',
                    attachment: false
                  },
                  {
                    title: 'New Mess Menu',
                    date: 'March 13, 2024',
                    type: 'General',
                    content: 'Updated mess menu for the month of April has been released.',
                    attachment: true
                  },
                  {
                    title: 'Water Supply Timing Change',
                    date: 'March 12, 2024',
                    type: 'Important',
                    content: 'Water supply timing has been changed to 6:00 AM - 9:00 AM and 6:00 PM - 9:00 PM.',
                    attachment: false
                  }
                ].map((circular) => (
                  <div key={circular.title} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{circular.title}</h4>
                        <p className="text-sm text-gray-600">{circular.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        circular.type === 'Important' ? 'bg-red-100 text-red-800' :
                        circular.type === 'Event' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {circular.type}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{circular.content}</p>
                    {circular.attachment && (
                      <button className="text-[#800000] hover:text-[#800000]/90 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Attachment
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Room Inspection Logs':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Room Inspection Logs</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Latest Inspection</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">March 15, 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Inspector</p>
                    <p className="font-medium">Mr. Rajesh Kumar</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overall Rating</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium text-green-600">Passed</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 bg-gray-50 border-b">
                  <h4 className="font-semibold text-lg">Inspection History</h4>
                </div>
                <div className="divide-y">
                  {[
                    {
                      date: 'March 15, 2024',
                      rating: 4,
                      remarks: 'Room well maintained. Keep it up!',
                      status: 'Passed'
                    },
                    {
                      date: 'February 15, 2024',
                      rating: 3,
                      remarks: 'Bathroom needs cleaning. Please maintain hygiene.',
                      status: 'Warning'
                    },
                    {
                      date: 'January 15, 2024',
                      rating: 4,
                      remarks: 'Everything in order.',
                      status: 'Passed'
                    }
                  ].map((inspection) => (
                    <div key={inspection.date} className="p-4">
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <p className="text-sm text-gray-600">Date</p>
                          <p className="font-medium">{inspection.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Rating</p>
                          <div className="flex items-center">
                            {Array.from({ length: inspection.rating }).map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{inspection.remarks}</p>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        inspection.status === 'Passed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {inspection.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Exit Pass':
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Exit Pass / Transfer Certificate Request</h3>
            <div className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-lg mb-2">Important Notice</h4>
                <p className="text-sm text-yellow-800">
                  Please ensure all dues are cleared and room inventory is properly handed over before applying for an exit pass.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Exit Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Exit</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select reason</option>
                      <option value="graduation">Graduation</option>
                      <option value="transfer">College Transfer</option>
                      <option value="personal">Personal Reasons</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Reason</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Please provide detailed reason for leaving the hostel..."
                  ></textarea>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Clearance Checklist</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Mess Dues Cleared',
                      'Room Rent Cleared',
                      'Library Dues Cleared',
                      'Room Inventory Checked',
                      'ID Card Submitted',
                      'Room Keys Returned'
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="text-sm text-gray-700">{item}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Forward Address</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Enter your forwarding address..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Documents</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#800000]/90 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <div className="bg-blue-100 p-4 rounded-md">
              <p className="text-blue-800">
                This feature is currently being developed. Please check back later for updates.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{feature.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        {renderFeatureContent()}
      </motion.div>
    </motion.div>
  );
};

export default HostelFeaturesPage;
