import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaSearch, 
  FaDownload, 
  FaPrint, 
  FaChevronLeft,
  FaChevronRight,
  FaFilePdf,
  FaFileExcel,
  FaFileWord,
  FaCalendarWeek,
  FaCalendarDay,
  FaCalendarCheck,
  FaInfoCircle
} from 'react-icons/fa';
import { format, parseISO, isSameDay, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';

type HolidayType = 'national' | 'religious' | 'academic' | 'observance';
type DownloadFormat = 'pdf' | 'excel' | 'word' | 'ics';

interface Holiday {
  id: number;
  date: string;
  name: string;
  type: HolidayType;
  description: string;
  month: string;
  isRecurring?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const StaffHolidayCalendar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showHolidayDetails, setShowHolidayDetails] = useState(false);
  const [selectedHolidayForDetails, setSelectedHolidayForDetails] = useState<Holiday | null>(null);
  const [filterYear, setFilterYear] = useState('2025');

  const yearOptions = ['2023', '2024', '2025', '2026'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const holidayTypes = [
    { id: 'all', name: 'All Holidays' },
    { id: 'national', name: 'National Holidays' },
    { id: 'religious', name: 'Religious Holidays' },
    { id: 'academic', name: 'Academic Holidays' },
    { id: 'observance', name: 'Observances' }
  ];

  const holidays: Holiday[] = [
    { 
      id: 1, 
      date: '2023-01-26', 
      name: 'Republic Day', 
      type: 'national',
      description: 'Commemorates the adoption of the Constitution of India.',
      month: 'January',
      isRecurring: true,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    { 
      id: 2, 
      date: '2023-02-18', 
      name: 'Mahashivratri', 
      type: 'religious',
      description: 'Hindu festival dedicated to Lord Shiva.',
      month: 'February',
      isRecurring: true,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    { 
      id: 3, 
      date: '2023-03-08', 
      name: 'Holi', 
      type: 'religious',
      description: 'Festival of colors celebrating the arrival of spring.',
      month: 'March',
      isRecurring: true,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    { 
      id: 4, 
      date: '2023-04-14', 
      name: 'Ambedkar Jayanti', 
      type: 'observance',
      description: 'Birth anniversary of Dr. B.R. Ambedkar.',
      month: 'April',
      isRecurring: true,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    { 
      id: 5, 
      date: '2023-05-01', 
      name: 'Labour Day', 
      type: 'observance',
      description: 'International Workers\' Day.',
      month: 'May',
      isRecurring: true,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    { 
      id: 6, 
      date: '2023-06-15', 
      name: 'Summer Vacation', 
      type: 'academic',
      description: 'College closed for summer break.',
      month: 'June',
      isRecurring: false,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    { 
      id: 7, 
      date: '2023-08-15', 
      name: 'Independence Day', 
      type: 'national',
      description: 'Commemorates India\'s independence from British rule.',
      month: 'August',
      isRecurring: true,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    { 
      id: 8, 
      date: '2023-09-19', 
      name: 'Ganesh Chaturthi', 
      type: 'religious',
      description: 'Hindu festival celebrating the birth of Lord Ganesha.',
      month: 'September',
      isRecurring: true,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    { 
      id: 9, 
      date: '2023-10-02', 
      name: 'Gandhi Jayanti', 
      type: 'national',
      description: 'Birth anniversary of Mahatma Gandhi.',
      month: 'October',
      isRecurring: true,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    { 
      id: 10, 
      date: '2023-11-14', 
      name: 'Children\'s Day', 
      type: 'observance',
      description: 'Birth anniversary of Jawaharlal Nehru.',
      month: 'November',
      isRecurring: true,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    { 
      id: 11, 
      date: '2023-12-25', 
      name: 'Christmas', 
      type: 'religious',
      description: 'Celebration of the birth of Jesus Christ.',
      month: 'December',
      isRecurring: true,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    { 
      id: 12, 
      date: '2023-12-31', 
      name: 'New Year\'s Eve', 
      type: 'observance',
      description: 'Last day of the year.',
      month: 'December',
      isRecurring: true,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
  ];

  useEffect(() => {
    document.title = 'Holiday Calendar - MET BKC';
  }, []);

  useEffect(() => {
    const year = parseInt(filterYear, 10);
    setCurrentDate(prev => new Date(year, prev.getMonth(), prev.getDate()));
  }, [filterYear]);

  const computedHolidays = holidays.flatMap(h => {
    const [origYear, month, day] = h.date.split('-');
    if (h.isRecurring) {
      return [{ ...h, date: `${filterYear}-${month}-${day}` }];
    } else if (origYear === filterYear) {
      return [h];
    }
    return [];
  });

  const yearHolidaysSorted = [...computedHolidays].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const filteredHolidays = computedHolidays.filter(holiday => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         holiday.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = filterMonth === 'all' || holiday.month === filterMonth;
    const matchesType = filterType === 'all' || holiday.type === filterType;
    return matchesSearch && matchesMonth && matchesType;
  });

  const sortedFilteredHolidays = [...filteredHolidays].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const getTypeColor = (type: HolidayType): string => {
    switch (type) {
      case 'national': return 'bg-red-100 text-red-900';
      case 'religious': return 'bg-orange-100 text-orange-900';
      case 'academic': return 'bg-yellow-100 text-yellow-900';
      case 'observance': return 'bg-rose-100 text-rose-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddHoliday = () => {
    setShowAddModal(true);
  };

  const handleEditHoliday = (holiday: Holiday) => {
    setSelectedHoliday(holiday);
    setShowEditModal(true);
  };

  const handleDeleteHoliday = (id: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setNotification({ type: 'success', message: 'Holiday deleted successfully' });
      setIsLoading(false);
    }, 1000);
  };

  const handleDownloadCalendar = () => {
    setShowDownloadModal(true);
  };

  const handleDownloadFormat = (fmt: DownloadFormat) => {
    // ICS export for calendar apps
    if (fmt === 'ics') {
      setIsLoading(true);
      const events = sortedFilteredHolidays;
      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//MET BKC//Holiday Calendar//EN',
        'CALSCALE:GREGORIAN',
      ];
      events.forEach(h => {
        const dateStr = format(parseISO(h.date), 'yyyyMMdd');
        lines.push('BEGIN:VEVENT');
        lines.push(`UID:holiday-${h.id}@metbkc.edu`);
        lines.push(`DTSTAMP:${dateStr}T000000Z`);
        lines.push(`DTSTART;VALUE=DATE:${dateStr}`);
        lines.push(`SUMMARY:${h.name}`);
        lines.push(`DESCRIPTION:${h.description}`);
        lines.push('END:VEVENT');
      });
      lines.push('END:VCALENDAR');
      const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `holiday-calendar-${filterYear}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsLoading(false);
      setShowDownloadModal(false);
      setNotification({ type: 'success', message: 'Calendar downloaded as ICS' });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setNotification({
        type: 'success',
        message: `Calendar downloaded as ${fmt.toUpperCase()}`
      });
      setIsLoading(false);
      setShowDownloadModal(false);
    }, 1500);
  };

  const handlePrintCalendar = () => {
    /* implement print logic */
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dateString = format(date, 'yyyy-MM-dd');
    const holiday = computedHolidays.find(h => h.date === dateString);
    
    if (holiday) {
      setSelectedHolidayForDetails(holiday);
      setShowHolidayDetails(true);
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderMonthView = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`day-name-${i}`} className="text-center font-semibold py-2 text-[#800000]">
          {dayNames[i]}
        </div>
      );
    }
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 border border-gray-200 bg-gray-50"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = format(date, 'yyyy-MM-dd');
      const monthHolidaysForDay = filteredHolidays.filter(h => h.date === dateString);
      const isCurrentDay = isToday(date);
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`h-32 border border-gray-200 p-1 cursor-pointer transition-all hover:bg-[#800000]/10 ${
            monthHolidaysForDay.length > 0 ? 'bg-[#800000]/5' : ''
          } ${isCurrentDay ? 'ring-2 ring-[#800000]' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          <div className="flex justify-between">
            <span className={`font-medium ${isCurrentDay ? 'text-[#800000] font-bold' : ''}`}>{day}</span>
            {monthHolidaysForDay.length > 0 && (
              <span className="text-xs bg-[#800000] text-white px-1 rounded-full">
                {monthHolidaysForDay.length}
              </span>
            )}
          </div>
          <div className="mt-1 space-y-1 overflow-y-auto max-h-24">
            {monthHolidaysForDay.map((holiday, index) => (
              <div 
                key={`${day}-${index}`} 
                className={`text-xs px-1 py-0.5 rounded ${getTypeColor(holiday.type)} truncate`}
                title={`${holiday.name} (${holiday.type})`}
              >
                {holiday.name}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const weekDays = eachDayOfInterval({ start: startOfWeek, end: endOfWeek });
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, index) => {
          const dateString = format(day, 'yyyy-MM-dd');
          const weekHolidaysForDay = filteredHolidays.filter(h => h.date === dateString);
          const isCurrentDay = isToday(day);
          
          return (
            <div 
              key={`week-day-${index}`}
              className={`h-40 border border-gray-200 p-2 cursor-pointer transition-all hover:bg-[#800000]/10 ${
                weekHolidaysForDay.length > 0 ? 'bg-[#800000]/5' : ''
              } ${isCurrentDay ? 'ring-2 ring-[#800000]' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              <div className="text-center font-semibold text-[#800000] mb-1">
                {format(day, 'EEE')}
              </div>
              <div className={`text-center font-bold ${isCurrentDay ? 'text-[#800000]' : ''}`}>
                {format(day, 'd')}
              </div>
              <div className="mt-2 space-y-1 overflow-y-auto max-h-24">
                {weekHolidaysForDay.map((holiday, index) => (
                  <div 
                    key={`${dateString}-${index}`}
                    className={`text-xs px-1 py-0.5 rounded ${getTypeColor(holiday.type)} truncate`}
                    title={holiday.name}
                  >
                    {holiday.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const selectedDay = selectedDate || currentDate;
    const dateString = format(selectedDay, 'yyyy-MM-dd');
    const dayHolidays = filteredHolidays.filter(h => h.date === dateString);
    
    return (
      <div className="border border-gray-200 p-4 rounded-lg">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-[#800000]">
            {format(selectedDay, 'EEEE, MMMM d, yyyy')}
          </div>
          {dayHolidays.length > 0 ? (
            <div className="mt-2 space-y-1">
              {dayHolidays.map((holiday, index) => (
                <div 
                  key={index}
                  className={`inline-block px-3 py-1 rounded-full ${getTypeColor(holiday.type)}`}
                >
                  {holiday.name}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-2 text-gray-500">No holidays on this day</div>
          )}
        </div>
        
        {dayHolidays.length > 0 && (
          <div className="mt-4 p-4 bg-[#800000]/5 rounded-lg">
            <h3 className="font-semibold text-[#800000]">Holiday Details</h3>
            {dayHolidays.map((holiday, index) => (
              <div key={index} className="mt-4 first:mt-2">
                <p className="mt-2">{holiday.description}</p>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Type:</span> {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                </div>
                {holiday.isRecurring && (
                  <div className="mt-1 text-sm text-green-600">
                    <span className="font-medium">Recurring:</span> Yes
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="font-semibold text-[#800000] mb-2">Upcoming Holidays</h3>
          <div className="space-y-2">
            {[...computedHolidays]
              .filter(h => new Date(h.date) > selectedDay)
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 3)
              .map(holiday => (
                <div 
                  key={holiday.id} 
                  className="p-2 border border-gray-200 rounded-md hover:bg-[#800000]/10 cursor-pointer"
                  onClick={() => {
                    setSelectedHolidayForDetails(holiday);
                    setShowHolidayDetails(true);
                  }}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{holiday.name}</span>
                    <span className={`text-xs px-1 rounded ${getTypeColor(holiday.type)}`}>
                      {holiday.type}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(parseISO(holiday.date), 'MMMM d, yyyy')}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  const btnPrimary = "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow text-sm font-medium text-white bg-[#800000] hover:bg-[#600000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#800000] transition-colors";
  const btnSecondary = "inline-flex items-center px-4 py-2 border border-[#800000] rounded-md shadow text-sm font-medium text-[#800000] bg-white hover:bg-[#800000]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#800000] transition-colors";
  const btnIcon = "p-2 rounded-full hover:bg-[#800000]/10 text-[#800000] transition-colors";

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#800000]">Holiday Calendar</h1>
              <p className="mt-2 text-gray-600">View and manage the academic year holiday calendar.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button 
                onClick={() => setViewMode('list')}
                className={`${viewMode === 'list' ? btnPrimary : btnSecondary}`}
              >
                List View
              </button>
              <button 
                onClick={() => setViewMode('calendar')}
                className={`${viewMode === 'calendar' ? btnPrimary : btnSecondary}`}
              >
                Calendar View
              </button>
            </div>
          </div>

          {/* Search, Filters & Year */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-[#800000]" />
              </div>
              <input
                type="text"
                placeholder="Search holidays..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              >
                <option value="all">All Months</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {holidayTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
                value={filterYear}
                onChange={e => setFilterYear(e.target.value)}
              >
                {yearOptions.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-8 flex flex-wrap gap-4">
            <button 
              onClick={handleDownloadCalendar}
              disabled={isLoading}
              className={btnPrimary}
            >
              <FaDownload className="mr-2" />
              {isLoading ? 'Downloading...' : 'Download Calendar'}
            </button>
            <button 
              onClick={handlePrintCalendar}
              className={btnSecondary}
            >
              <FaPrint className="mr-2" />
              Print Calendar
            </button>
          </div>

          {/* Notification */}
          {notification && (
            <div className={`mb-6 p-4 rounded-md ${
              notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              <div className="flex justify-between items-center">
                <p>{notification.message}</p>
                <button onClick={closeNotification} className="text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Calendar View */}
          {viewMode === 'calendar' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-xl font-bold text-[#800000] mb-4 md:mb-0">Calendar View</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setCalendarView('month')}
                    className={`${calendarView === 'month' ? btnPrimary : btnSecondary}`}
                  >
                    <FaCalendarAlt className="inline mr-1" /> Month
                  </button>
                  <button 
                    onClick={() => setCalendarView('week')}
                    className={`${calendarView === 'week' ? btnPrimary : btnSecondary}`}
                  >
                    <FaCalendarWeek className="inline mr-1" /> Week
                  </button>
                  <button 
                    onClick={() => setCalendarView('day')}
                    className={`${calendarView === 'day' ? btnPrimary : btnSecondary}`}
                  >
                    <FaCalendarDay className="inline mr-1" /> Day
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={prevMonth}
                    className={btnIcon}
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    onClick={goToToday}
                    className={btnIcon}
                  >
                    Today
                  </button>
                  <button 
                    onClick={nextMonth}
                    className={btnIcon}
                  >
                    <FaChevronRight />
                  </button>
                </div>
                <div className="text-xl font-bold text-[#800000]">
                  {format(currentDate, 'MMMM yyyy')}
                </div>
              </div>
              
              {calendarView === 'month' && renderMonthView()}
              {calendarView === 'week' && renderWeekView()}
              {calendarView === 'day' && renderDayView()}
            </div>
          )}

          {/* Holiday List */}
          {viewMode === 'list' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#800000]">Holidays in {filterYear}</h2>
                <span className="text-sm text-gray-500">{sortedFilteredHolidays.length} holidays found</span>
              </div>
              <div className="divide-y divide-gray-200">
                {sortedFilteredHolidays.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500">
                    No holidays found for {filterYear}.
                  </div>
                ) : (
                  sortedFilteredHolidays.map((holiday) => (
                    <div key={holiday.id} className="p-6 transition-colors hover:bg-[#800000]/10">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center">
                            <FaCalendarAlt className="text-[#800000] text-xl mr-3" />
                            <h3 className="text-lg font-medium text-gray-900">{holiday.name}</h3>
                            <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(holiday.type)}`}>
                              {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                            </span>
                            {holiday.isRecurring && (
                              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Recurring</span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{holiday.description}</p>
                          <div className="mt-2 text-sm text-gray-500">
                            <span className="font-medium">Date:</span> {format(parseISO(holiday.date), 'EEEE, MMMM d, yyyy')}
                          </div>
                          {holiday.updatedAt && (
                            <div className="mt-1 text-xs text-gray-400">Last updated: {format(parseISO(holiday.updatedAt), 'MMM d, yyyy')}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-[#800000]">Download Calendar</h2>
            <p className="text-gray-500 mb-4">Choose a format to download the holiday calendar:</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                onClick={() => handleDownloadFormat('pdf')}
                className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-[#800000]/10 transition-colors"
              >
                <FaFilePdf className="text-red-500 text-3xl mb-2" />
                <span className="font-medium">PDF</span>
                <span className="text-xs text-gray-500">Portable Document Format</span>
              </button>
              
              <button 
                onClick={() => handleDownloadFormat('excel')}
                className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-[#800000]/10 transition-colors"
              >
                <FaFileExcel className="text-green-500 text-3xl mb-2" />
                <span className="font-medium">Excel</span>
                <span className="text-xs text-gray-500">Spreadsheet Format</span>
              </button>
              
              <button 
                onClick={() => handleDownloadFormat('word')}
                className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-[#800000]/10 transition-colors"
              >
                <FaFileWord className="text-blue-500 text-3xl mb-2" />
                <span className="font-medium">Word</span>
                <span className="text-xs text-gray-500">Document Format</span>
              </button>
              
              <button 
                onClick={() => handleDownloadFormat('ics')}
                className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-[#800000]/10 transition-colors"
              >
                <FaCalendarCheck className="text-[#800000] text-3xl mb-2" />
                <span className="font-medium">ICS</span>
                <span className="text-xs text-gray-500">Calendar Format</span>
              </button>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="bg-[#800000] text-white px-4 py-2 rounded-md hover:bg-[#600000] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daily Holiday Details */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-[#800000]">
              Daily Details for {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            <div className="space-y-4">
              {(() => {
                const ds = format(selectedDate, 'yyyy-MM-dd');
                const dayHolidays = computedHolidays.filter(h => h.date === ds);
                if (dayHolidays.length === 0) {
                  return <p className="text-gray-500">No holidays on this day.</p>;
                }
                return dayHolidays.map((h, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold">{h.name}</h3>
                    <p>{h.description}</p>
                  </div>
                ));
              })()}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedDate(null)}
                className="bg-[#800000] text-white px-4 py-2 rounded-md hover:bg-[#600000] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffHolidayCalendar; 