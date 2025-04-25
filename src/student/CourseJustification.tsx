import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaEye,
    FaSearch,
    FaTimes,
    FaSpinner,
    FaChevronLeft,
    FaChevronRight,
    FaExpand,
    FaCompress,
    FaFilter,
    FaBook,
    FaGraduationCap,
    FaUniversity,
    FaCalendarAlt,
    FaClock,
    FaUserTie,
    FaChartLine,
    FaBookmark,
    FaRegBookmark,
    FaShare,
    FaPrint,
    FaDownload,
    FaInfoCircle,
    FaList,
    FaThLarge,
    FaThList
} from 'react-icons/fa';

interface CourseDocument {
    id: string;
    title: string;
    type: 'PO' | 'PSO' | 'Course' | 'Syllabus';
    category: string;
    semester: string;
    department: string;
    filePath: string;
    description: string;
    lastUpdated: string;
    author: string;
    status: 'Active' | 'Draft' | 'Archived';
    credits?: number;
    courseCode?: string;
    prerequisites?: string[];
    objectives?: string[];
    outcomes?: string[];
    isBookmarked?: boolean;
}

const departments = [
    'All',
    'Computer Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electronics Engineering'
];

const semesters = [
    'All',
    'Semester 1',
    'Semester 2',
    'Semester 3',
    'Semester 4'
];

const categories = [
    'All',
    'Program Outcomes',
    'Program Specific Outcomes',
    'Course Outcomes',
    'Syllabus',
    'Curriculum'
];

// Sample data with more syllabus-specific information
const documents: CourseDocument[] = [
    {
        id: '1',
        title: 'Computer Engineering Program Outcomes',
        type: 'PO',
        category: 'Program Outcomes',
        semester: 'Semester 3',
        department: 'Computer Engineering',
        filePath: '/documents/computer_engineering_po.pdf',
        description: 'Detailed program outcomes for Computer Engineering students',
        lastUpdated: '2024-03-15',
        author: 'Dr. John Smith',
        status: 'Active'
    },
    {
        id: '2',
        title: 'Mechanical Engineering PSO',
        type: 'PSO',
        category: 'Program Specific Outcomes',
        semester: 'Semester 1',
        department: 'Mechanical Engineering',
        filePath: '/documents/mechanical_engineering_pso.pdf',
        description: 'Program specific outcomes for Mechanical Engineering',
        lastUpdated: '2024-03-14',
        author: 'Prof. Sarah Johnson',
        status: 'Active'
    },
    {
        id: '3',
        title: 'Data Structures Course Outcomes',
        type: 'Course',
        category: 'Course Outcomes',
        semester: 'Semester 2',
        department: 'Computer Engineering',
        filePath: '/documents/data_structures_outcomes.pdf',
        description: 'Course outcomes for Data Structures and Algorithms',
        lastUpdated: '2024-03-13',
        author: 'Dr. Michael Brown',
        status: 'Active'
    },
    {
        id: '4',
        title: 'Data Structures and Algorithms Syllabus',
        type: 'Syllabus',
        category: 'Syllabus',
        semester: 'Semester 2',
        department: 'Computer Engineering',
        filePath: '/documents/data_structures_syllabus.pdf',
        description: 'Comprehensive syllabus for Data Structures and Algorithms course',
        lastUpdated: '2024-03-12',
        author: 'Dr. Michael Brown',
        status: 'Active',
        credits: 4,
        courseCode: 'CS301',
        prerequisites: ['CS201: Programming Fundamentals', 'CS202: Discrete Mathematics'],
        objectives: [
            'Understand fundamental data structures and their implementations',
            'Analyze algorithm efficiency and complexity',
            'Apply appropriate data structures to solve problems'
        ],
        outcomes: [
            'Implement and analyze various data structures',
            'Design efficient algorithms for problem-solving',
            'Evaluate time and space complexity of algorithms'
        ],
        isBookmarked: false
    },
    {
        id: '5',
        title: 'Database Management Systems Syllabus',
        type: 'Syllabus',
        category: 'Syllabus',
        semester: 'Semester 4',
        department: 'Computer Engineering',
        filePath: '/documents/dbms_syllabus.pdf',
        description: 'Detailed syllabus for Database Management Systems course',
        lastUpdated: '2024-03-11',
        author: 'Prof. Emily Davis',
        status: 'Active',
        credits: 3,
        courseCode: 'CS402',
        prerequisites: ['CS301: Data Structures and Algorithms'],
        objectives: [
            'Understand database design principles',
            'Learn SQL and database querying',
            'Implement database management systems'
        ],
        outcomes: [
            'Design and implement database schemas',
            'Write efficient SQL queries',
            'Understand transaction management and concurrency control'
        ],
        isBookmarked: true
    },
    {
        id: '6',
        title: 'Operating Systems Syllabus',
        type: 'Syllabus',
        category: 'Syllabus',
        semester: 'Semester 4',
        department: 'Computer Engineering',
        filePath: '/documents/os_syllabus.pdf',
        description: 'Comprehensive syllabus for Operating Systems course',
        lastUpdated: '2024-03-10',
        author: 'Dr. Robert Wilson',
        status: 'Active',
        credits: 4,
        courseCode: 'CS403',
        prerequisites: ['CS301: Data Structures and Algorithms', 'CS302: Computer Organization'],
        objectives: [
            'Understand operating system concepts and components',
            'Learn process management and scheduling',
            'Study memory management and file systems'
        ],
        outcomes: [
            'Analyze and implement process scheduling algorithms',
            'Understand memory management techniques',
            'Design and implement file system operations'
        ],
        isBookmarked: false
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const CoursePSOJustification = () => {
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedSemester, setSelectedSemester] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('Syllabus'); // Default to Syllabus
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDocuments, setFilteredDocuments] = useState(documents);
    const [viewingDocument, setViewingDocument] = useState<CourseDocument | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [viewError, setViewError] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [zoom, setZoom] = useState(100);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showSyllabusDetails, setShowSyllabusDetails] = useState(false);
    const [bookmarkedDocuments, setBookmarkedDocuments] = useState<string[]>(
        documents.filter(doc => doc.isBookmarked).map(doc => doc.id)
    );

    useEffect(() => {
        handleFilter();
    }, [selectedDepartment, selectedSemester, selectedCategory, searchQuery, selectedStatus]);

    const handleFilter = () => {
        let filtered = [...documents];
        
        if (selectedDepartment !== 'All') {
            filtered = filtered.filter(doc => doc.department === selectedDepartment);
        }
        
        if (selectedSemester !== 'All') {
            filtered = filtered.filter(doc => doc.semester === selectedSemester);
        }
        
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(doc => doc.category === selectedCategory);
        }

        if (selectedStatus !== 'All') {
            filtered = filtered.filter(doc => doc.status === selectedStatus);
        }

        if (searchQuery) {
            filtered = filtered.filter(doc =>
                doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (doc.courseCode && doc.courseCode.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
        
        setFilteredDocuments(filtered);
    };

    const handleView = (document: CourseDocument) => {
        // Create a viewer URL based on the file type
        let viewerUrl = '';
        if (document.filePath.endsWith('.pdf')) {
            viewerUrl = document.filePath;
        } else if (document.filePath.endsWith('.docx') || document.filePath.endsWith('.doc')) {
            viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + document.filePath)}&embedded=true`;
        } else {
            viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + document.filePath)}`;
        }

        setViewingDocument({ ...document, filePath: viewerUrl });
        setIsLoading(true);
        setViewError(false);
        setCurrentPage(1);
        setZoom(100);
        setShowSyllabusDetails(document.type === 'Syllabus');
    };

    const closeViewer = () => {
        setViewingDocument(null);
        setIsLoading(false);
        setViewError(false);
        setIsFullscreen(false);
        setShowSyllabusDetails(false);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 10, 200));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 10, 50));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Draft':
                return 'bg-yellow-100 text-yellow-800';
            case 'Archived':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const toggleBookmark = (docId: string) => {
        setBookmarkedDocuments(prev => {
            if (prev.includes(docId)) {
                return prev.filter(id => id !== docId);
            } else {
                return [...prev, docId];
            }
        });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-7xl mx-auto space-y-6"
                >
                    {/* Header */}
                    <motion.div
                        className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-lg p-6"
                        variants={itemVariants}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-2">Course Syllabus </h1>
                                <p className="text-red-100">View and explore course syllabi for all departments and semesters</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 border border-red-400"
                                >
                                    <FaFilter className="mr-2" />
                                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Search and Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-white rounded-lg shadow-lg overflow-hidden border border-red-100"
                            >
                                <div className="p-6 space-y-6">
                                    {/* Search Bar */}
                                    <div className="relative">
                                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" />
                                        <input
                                            type="text"
                                            placeholder="Search syllabi by title, course code, or description..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>

                                    {/* Filters Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {/* Department Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Department
                                            </label>
                                            <select
                                                value={selectedDepartment}
                                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                                className="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                {departments.map((dept) => (
                                                    <option key={dept} value={dept}>
                                                        {dept}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Semester Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Semester
                                            </label>
                                            <select
                                                value={selectedSemester}
                                                onChange={(e) => setSelectedSemester(e.target.value)}
                                                className="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                {semesters.map((sem) => (
                                                    <option key={sem} value={sem}>
                                                        {sem}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Category Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Category
                                            </label>
                                            <select
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                {categories.map((cat) => (
                                                    <option key={cat} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Status Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Status
                                            </label>
                                            <select
                                                value={selectedStatus}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                                className="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                <option value="All">All Status</option>
                                                <option value="Active">Active</option>
                                                <option value="Draft">Draft</option>
                                                <option value="Archived">Archived</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* View Mode Toggle */}
                    <div className="flex justify-end mb-4">
                        <div className="bg-white rounded-lg shadow-md p-1 flex space-x-1 border border-red-100">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md ${
                                    viewMode === 'grid' ? 'bg-red-100 text-red-600' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                                title="Grid View"
                            >
                                <FaThLarge />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md ${
                                    viewMode === 'list' ? 'bg-red-100 text-red-600' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                                title="List View"
                            >
                                <FaThList />
                            </button>
                        </div>
                    </div>

                    {/* Documents Grid/List */}
                    {viewMode === 'grid' ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={itemVariants}
                        >
                            {filteredDocuments.map((doc) => (
                                <motion.div
                                    key={doc.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-red-100"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {doc.title}
                                                </h3>
                                                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                                                    {doc.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-red-600 font-medium">
                                                    {doc.type}
                                                </span>
                                                {doc.courseCode && (
                                                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                                        {doc.courseCode}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <FaUniversity className="mr-2 text-red-500" />
                                                {doc.department}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <FaCalendarAlt className="mr-2 text-red-500" />
                                                {doc.semester}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <FaUserTie className="mr-2 text-red-500" />
                                                {doc.author}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <FaClock className="mr-2 text-red-500" />
                                                Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                                            </div>
                                            {doc.credits && (
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <FaBook className="mr-2 text-red-500" />
                                                    Credits: {doc.credits}
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-600 mb-4">
                                            {doc.description}
                                        </p>

                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleView(doc)}
                                                className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
                                            >
                                                <FaEye className="mr-2" />
                                                View Syllabus
                                            </button>
                                            <button
                                                onClick={() => toggleBookmark(doc.id)}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors duration-300"
                                                title={bookmarkedDocuments.includes(doc.id) ? "Remove Bookmark" : "Add Bookmark"}
                                            >
                                                {bookmarkedDocuments.includes(doc.id) ? <FaBookmark /> : <FaRegBookmark />}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="bg-white rounded-lg shadow-lg overflow-hidden border border-red-100"
                            variants={itemVariants}
                        >
                            <table className="min-w-full divide-y divide-red-100">
                                <thead className="bg-gradient-to-r from-red-50 to-red-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                                            Course
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                                            Department
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                                            Semester
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                                            Credits
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-red-800 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-red-100">
                                    {filteredDocuments.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-red-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                                                        {doc.courseCode && (
                                                            <div className="text-sm text-red-600">{doc.courseCode}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{doc.department}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{doc.semester}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{doc.credits || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                                                    {doc.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleView(doc)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="View Syllabus"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        onClick={() => toggleBookmark(doc.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title={bookmarkedDocuments.includes(doc.id) ? "Remove Bookmark" : "Add Bookmark"}
                                                    >
                                                        {bookmarkedDocuments.includes(doc.id) ? <FaBookmark /> : <FaRegBookmark />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}
                </motion.div>

                {/* Document Viewer */}
                <AnimatePresence>
                    {viewingDocument && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center ${
                                isFullscreen ? 'p-0' : 'p-4'
                            }`}
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                className={`bg-white rounded-lg shadow-xl overflow-hidden ${
                                    isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl max-h-[90vh]'
                                }`}
                            >
                                {/* Viewer Header */}
                                <div className="px-6 py-4 bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200 flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-red-800">
                                            {viewingDocument.title}
                                        </h3>
                                        <p className="text-sm text-red-600">{viewingDocument.category}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        {/* Zoom Controls */}
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={handleZoomOut}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                                            >
                                                -
                                            </button>
                                            <span className="text-sm text-red-600">{zoom}%</span>
                                            <button
                                                onClick={handleZoomIn}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Navigation Controls */}
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                                            >
                                                <FaChevronLeft />
                                            </button>
                                            <span className="text-sm text-red-600">Page {currentPage}</span>
                                            <button
                                                onClick={() => setCurrentPage(prev => prev + 1)}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                                            >
                                                <FaChevronRight />
                                            </button>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={handlePrint}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                                                title="Print"
                                            >
                                                <FaPrint />
                                            </button>
                                            <button
                                                onClick={toggleFullscreen}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                                                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                                            >
                                                {isFullscreen ? <FaCompress /> : <FaExpand />}
                                            </button>
                                            <button
                                                onClick={closeViewer}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                                                title="Close"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Syllabus Details or Document Display */}
                                {showSyllabusDetails && viewingDocument.type === 'Syllabus' ? (
                                    <div className="flex h-[70vh]">
                                        {/* Syllabus Details Panel */}
                                        <div className="w-1/3 bg-red-50 p-6 overflow-y-auto border-r border-red-100">
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-lg font-semibold text-red-800 mb-2">Course Information</h4>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Course Code:</span>
                                                            <span className="font-medium text-red-700">{viewingDocument.courseCode}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Credits:</span>
                                                            <span className="font-medium text-red-700">{viewingDocument.credits}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Department:</span>
                                                            <span className="font-medium text-red-700">{viewingDocument.department}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Semester:</span>
                                                            <span className="font-medium text-red-700">{viewingDocument.semester}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Instructor:</span>
                                                            <span className="font-medium text-red-700">{viewingDocument.author}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {viewingDocument.prerequisites && viewingDocument.prerequisites.length > 0 && (
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-red-800 mb-2">Prerequisites</h4>
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            {viewingDocument.prerequisites.map((prereq, index) => (
                                                                <li key={index} className="text-gray-700">{prereq}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {viewingDocument.objectives && viewingDocument.objectives.length > 0 && (
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-red-800 mb-2">Course Objectives</h4>
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            {viewingDocument.objectives.map((objective, index) => (
                                                                <li key={index} className="text-gray-700">{objective}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {viewingDocument.outcomes && viewingDocument.outcomes.length > 0 && (
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-red-800 mb-2">Course Outcomes</h4>
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            {viewingDocument.outcomes.map((outcome, index) => (
                                                                <li key={index} className="text-gray-700">{outcome}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Document Display */}
                                        <div className="w-2/3 relative">
                                            {isLoading && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                                                    <FaSpinner className="w-8 h-8 text-red-600 animate-spin" />
                                                </div>
                                            )}
                                            {viewError ? (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-center text-red-600">
                                                        <p className="text-lg font-semibold">Error loading document</p>
                                                        <p className="text-sm">Please try again later</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <iframe
                                                    src={viewingDocument.filePath}
                                                    className="w-full h-full border-0"
                                                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
                                                    onLoad={() => setIsLoading(false)}
                                                    onError={() => {
                                                        setIsLoading(false);
                                                        setViewError(true);
                                                    }}
                                                    sandbox="allow-same-origin allow-scripts allow-forms"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`relative ${isFullscreen ? 'h-[calc(100vh-4rem)]' : 'h-[70vh]'}`}>
                                        {isLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                                                <FaSpinner className="w-8 h-8 text-red-600 animate-spin" />
                                            </div>
                                        )}
                                        {viewError ? (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center text-red-600">
                                                    <p className="text-lg font-semibold">Error loading document</p>
                                                    <p className="text-sm">Please try again later</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <iframe
                                                src={viewingDocument.filePath}
                                                className="w-full h-full border-0"
                                                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
                                                onLoad={() => setIsLoading(false)}
                                                onError={() => {
                                                    setIsLoading(false);
                                                    setViewError(true);
                                                }}
                                                sandbox="allow-same-origin allow-scripts allow-forms"
                                            />
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default CoursePSOJustification;
