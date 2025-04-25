import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaSearch, FaEye, FaTimes, FaSpinner, FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EMaterial {
    id: string;
    subject: string;
    topic: string;
    contentType: string;
    filePath: string;
}

const courses = ['2020-Pattern', '2015-Pattern'];
const branches = ['All', 'Computer Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electronics Engineering'];
const years = ['All', 'First Year', 'Second Year', 'Third Year'];
const subjects = [
    'All',
    'Advanced Manufacturing Processes',
    'Applied Physics',
    'Basic Electrical And Electronics Engineering',
    'Basic Science (PHYSICS)',
    'Digital Techniques'
];

// Sample data with file paths
const materials = [
    {
        id: '042024000037',
        subject: 'Advanced Manufacturing Processes (22563)',
        topic: 'Notes of Advanced Manufacturing Processes (22563)',
        contentType: 'Text',
        filePath: '/documents/advance.docx'
    },
    {
        id: '042024000018',
        subject: 'Applied Physics 312308',
        topic: 'LAB Manual',
        contentType: 'Text',
        filePath: '/documents/applied.docx'
    },
    {
        id: '042024000023',
        subject: 'Applied Physics 312308',
        topic: 'Syllabus',
        contentType: 'Text',
        filePath: '/documents/syllabus.docx'
    },
    {
        id: '042024000008',
        subject: 'Basic Electrical And Electronics Engineering',
        topic: 'Basic Electrical Fundamentals',
        contentType: 'Text',
        filePath: '/documents/basic_electrical_fundamentals.docx'
    },
    {
        id: '042024000011',
        subject: 'Basic Electrical And Electronics Engineering',
        topic: 'Rectifiers and Filters',
        contentType: 'Text',
        filePath: '/documents/rectifiers_and_filters.docx'
    },
    {
        id: '042024000009',
        subject: 'Basic Electrical And Electronics Engineering',
        topic: 'Regulated Power Supply',
        contentType: 'Text',
        filePath: '/documents/regulated_power_supply.docx'
    },
    {
        id: '042024000010',
        subject: 'Basic Electrical And Electronics Engineering',
        topic: 'Special Purpose Diodes and their applications',
        contentType: 'Text',
        filePath: '/documents/special_purpose_diodes.docx'
    },
    {
        id: '042023000068',
        subject: 'Basic Science (PHYSICS)-311305',
        topic: 'Chapter Notes',
        contentType: 'Text',
        filePath: '/documents/chapter_notes.docx'
    },
    {
        id: '042024000001',
        subject: 'Digital Techniques',
        topic: 'Adders',
        contentType: 'Text',
        filePath: '/documents/adders.docx'
    },
    {
        id: '042024000012',
        subject: 'Digital Techniques',
        topic: 'Adders',
        contentType: 'Text',
        filePath: '/documents/adders.docx'
    },
    {
        id: '042024000014',
        subject: 'Digital Techniques',
        topic: 'Decade Counter',
        contentType: 'Text',
        filePath: '/documents/decade_counter.docx'
    },
    {
        id: '042024000015',
        subject: 'Digital Techniques',
        topic: 'MUX',
        contentType: 'Text',
        filePath: '/documents/mux.docx'
    },
    {
        id: '042024000017',
        subject: 'Digital Techniques',
        topic: 'Parallel Adder Subtractor',
        contentType: 'Text',
        filePath: '/documents/parallel_adder_subtractor.docx'
    },
    {
        id: '042024000013',
        subject: 'Digital Techniques',
        topic: 'Subtractor and Code Converter',
        contentType: 'Text',
        filePath: '/documents/subtractor_and_code_converter.docx'
    },
    {
        id: '042024000016',
        subject: 'Digital Techniques',
        topic: 'Universal Logic Gates',
        contentType: 'Text',
        filePath: '/documents/universal_logic_gates.docx'
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

const StudentEmaterial = () => {
    const [selectedCourse, setSelectedCourse] = useState('2020-Pattern');
    const [selectedBranch, setSelectedBranch] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [filteredMaterials, setFilteredMaterials] = useState(materials);
    const [viewingDocument, setViewingDocument] = useState<EMaterial | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [viewError, setViewError] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [zoom, setZoom] = useState(100);

    const handleFilter = () => {
        let filtered = [...materials];
        
        if (selectedSubject !== 'All') {
            filtered = filtered.filter(material => 
                material.subject.toLowerCase().includes(selectedSubject.toLowerCase())
            );
        }

        if (searchQuery) {
            filtered = filtered.filter(material =>
                material.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                material.subject.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        setFilteredMaterials(filtered);
    };

    const handleDownload = (material: EMaterial) => {
        const link = document.createElement('a');
        link.href = material.filePath;
        link.download = material.topic;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleView = (material: EMaterial) => {
        let viewerUrl = '';
        if (material.filePath.endsWith('.pdf')) {
            viewerUrl = material.filePath;
        } else if (material.filePath.endsWith('.docx') || material.filePath.endsWith('.doc')) {
            viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + material.filePath)}&embedded=true`;
        } else {
            viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + material.filePath)}`;
        }

        setViewingDocument({ ...material, filePath: viewerUrl });
        setIsLoading(true);
        setViewError(false);
        setCurrentPage(1);
        setZoom(100);
    };

    const closeViewer = () => {
        setViewingDocument(null);
        setIsLoading(false);
        setViewError(false);
        setIsFullscreen(false);
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

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto space-y-6"
            >
                {/* Header */}
                <motion.div
                    className="bg-white rounded-lg shadow-lg p-6"
                    variants={itemVariants}
                >
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Download E-Material</h1>
                    <p className="text-gray-600">Access and download study materials for your courses.</p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    className="bg-white rounded-lg shadow-lg p-6"
                    variants={itemVariants}
                >
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search materials..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleFilter();
                                }}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Course Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course
                            </label>
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {courses.map((course) => (
                                    <option key={course} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Branch Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Branch
                            </label>
                            <select
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {branches.map((branch) => (
                                    <option key={branch} value={branch}>
                                        {branch}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year
                            </label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subject Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject
                            </label>
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {subjects.map((subject) => (
                                    <option key={subject} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Materials List */}
                <motion.div
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                    variants={itemVariants}
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subject
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Topic
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMaterials.map((material) => (
                                    <tr key={material.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {material.subject}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {material.topic}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {material.contentType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleView(material)}
                                                className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                                            >
                                                <FaEye className="mr-2" />
                                                View Material
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
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
                            <div className="px-6 py-4 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {viewingDocument.topic}
                                    </h3>
                                    <p className="text-sm text-gray-500">{viewingDocument.subject}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {/* Zoom Controls */}
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={handleZoomOut}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm text-gray-600">{zoom}%</span>
                                        <button
                                            onClick={handleZoomIn}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Navigation Controls */}
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                                        >
                                            <FaChevronLeft />
                                        </button>
                                        <span className="text-sm text-gray-600">Page {currentPage}</span>
                                        <button
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                                        >
                                            <FaChevronRight />
                                        </button>
                                    </div>

                                    {/* Fullscreen and Close */}
                                    <button
                                        onClick={toggleFullscreen}
                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                                        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                                    >
                                        {isFullscreen ? <FaCompress /> : <FaExpand />}
                                    </button>
                                    <button
                                        onClick={closeViewer}
                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                                        title="Close"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>

                            {/* Document Display */}
                            <div className={`relative ${isFullscreen ? 'h-[calc(100vh-4rem)]' : 'h-[70vh]'}`}>
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                                        <FaSpinner className="w-8 h-8 text-blue-600 animate-spin" />
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
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentEmaterial;
