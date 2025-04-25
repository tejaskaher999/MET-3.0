import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AssignmentProvider } from "./contexts/AssignmentContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/custom.css";

// Student imports
import StudentHome from "./student/Home";
import StudentAdmissionRequest from "./student/Admission/RequestApplication";
import StudentUpdateProfile from "./student/Profile/UpdateProfile";
import StudentChangePassword from "./student/Profile/ChangePassword";
import StudentTimetable from "./student/Timetable";
import StudentUploadAssignment from "./student/Assignment/UploadAssignment";
import StudentViewAssignment from "./student/Assignment/ViewAssignment";
import StudentResult from "./student/Result";
import StudentTPO from "./student/TPO";
import StudentOutstandingDetails from "./student/Accounts/OutstandingDetails";
import StudentDownloadReceipt from "./student/Accounts/DownloadReceipt";
import StudentRefundApplication from "./student/Accounts/RefundApplication";
import StudentHostelAdmission from "./student/Hostel/HostelAdmission";
import StudentHostelFeature from "./student/Hostel/HostelFeature";
import StudentGrievance from "./student/Grievance";
import StudentEmaterial from "./student/Ematerial";
import StudentCourseJustification from "./student/CourseJustification";
import StudentFeedbackForm from "./student/FeedbackForm";
import IssueBook from "./student/Library/IssueBook";
import AllocatedBooks from "./student/Library/AllocatedBooks";

// Staff imports
import StaffHome from "./staff/Home";
import StaffHolidayCalendar from "./staff/HR/HolidayCalendar";
import StaffProfile from "./staff/Personal/Profile";
import StaffChangePassword from "./staff/Personal/ChangePassword";
import StaffSalaryDetails from "./staff/Personal/SalaryDetails";
import StaffInsuranceDetails from "./staff/Personal/InsuranceDetails";
import StaffTimetable from "./staff/Timetable/StaffTimetable";
import StaffStudentTimetable from "./staff/Timetable/StudentTimetable";
import StaffUploadAssignment from "./staff/Assignment/UploadAssignment";
import StaffViewAssignment from "./staff/Assignment/ViewAssignment";
import StaffResult from "./staff/Result";
import StaffViewCompany from "./staff/TPO/ViewCompany";
import StaffLeaves from "./staff/Leaves";
import StaffProfessionalEndeavors from "./staff/SelfAppraisal/ProfessionalEndeavors";
import StaffDownloadAppraisal from "./staff/SelfAppraisal/DownloadAppraisal";
import StaffGrievance from "./staff/Grievance";
import StaffSWOCGuidelines from "./staff/SWOC/Guidelines";
import StaffSWOCEntry from "./staff/SWOC/Entry";
import StaffVisitingLetter from "./staff/VisitingLetter";
import StaffAdmissionEnquiry from "./staff/AdmissionEnquiry/Enquiry";
import StaffCounselorRemark from "./staff/AdmissionEnquiry/CounselorRemark";
import StaffUploadEmaterial from "./staff/Ematerial/UploadEmaterial";
import StaffDownloadEmaterial from "./staff/Ematerial/DownloadEmaterial";

// TPO imports
import TPOHome from "./tpo/Home";
import TPOUpdateProfile from "./tpo/Profile/UpdateProfile";
import TPOChangePassword from "./tpo/Profile/ChangePassword";
import TPOManageCompanies from "./tpo/Company/ManageCompanies";
import TPOCompanyHistory from "./tpo/Company/CompanyHistory";
import TPOViewAppliedStudents from "./tpo/Student/ViewAppliedStudents";
import TPOSelectedStudents from "./tpo/Student/SelectedStudents";
import TPOPlacedStudents from "./tpo/Student/PlacedStudents";
import TPOInternshipRecords from "./tpo/Student/InternshipRecords";
import TPOStudentResumes from "./tpo/Student/StudentResumes";
import TPOStudentFeedback from "./tpo/Student/StudentFeedback";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Store the current location in session storage when redirecting to login
  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectPath', location.pathname);
    }
  }, [isAuthenticated, location]);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (user.role !== allowedRole) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AssignmentProvider>
        <SidebarProvider>
          <TooltipProvider>
            <ScrollToTop />
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              
              <Route path="/student" element={
                <ProtectedRoute allowedRole="student">
                  <Layout role="student" />
                </ProtectedRoute>
              }>
                <Route index element={<StudentHome />} />
                <Route path="admission-request" element={<StudentAdmissionRequest />} />
                <Route path="update-profile" element={<StudentUpdateProfile />} />
                <Route path="change-password" element={<StudentChangePassword />} />
                <Route path="timetable" element={<StudentTimetable />} />
                <Route path="assignment/upload" element={<StudentUploadAssignment />} />
                <Route path="assignment/view" element={<StudentViewAssignment />} />
                <Route path="result" element={<StudentResult />} />
                <Route path="tpo" element={<StudentTPO />} />
                <Route path="accounts/outstanding" element={<StudentOutstandingDetails />} />
                <Route path="accounts/receipt" element={<StudentDownloadReceipt />} />
                <Route path="accounts/refund" element={<StudentRefundApplication />} />
                <Route path="hostel/admission" element={<StudentHostelAdmission />} />
                <Route path="hostel/feature" element={<StudentHostelFeature />} />
                <Route path="grievance" element={<StudentGrievance />} />
                <Route path="ematerial" element={<StudentEmaterial />} />
                <Route path="course-justification" element={<StudentCourseJustification />} />
                <Route path="feedback" element={<StudentFeedbackForm />} />
                <Route path="library/issue" element={<IssueBook />} />
                <Route path="library/allocated" element={<AllocatedBooks />} />
              </Route>
              
              <Route path="/staff" element={
                <ProtectedRoute allowedRole="staff">
                  <Layout role="staff" />
                </ProtectedRoute>
              }>
                <Route index element={<StaffHome />} />
                <Route path="hr/holiday-calendar" element={<StaffHolidayCalendar />} />
                <Route path="personal/profile" element={<StaffProfile />} />
                <Route path="personal/change-password" element={<StaffChangePassword />} />
                <Route path="personal/salary" element={<StaffSalaryDetails />} />
                <Route path="personal/insurance" element={<StaffInsuranceDetails />} />
                <Route path="timetable/staff" element={<StaffTimetable />} />
                <Route path="timetable/student" element={<StaffStudentTimetable />} />
                <Route path="assignment/upload" element={<StaffUploadAssignment />} />
                <Route path="assignment/view" element={<StaffViewAssignment />} />
                <Route path="result" element={<StaffResult />} />
                <Route path="tpo/company" element={<StaffViewCompany />} />
                <Route path="leaves" element={<StaffLeaves />} />
                <Route path="appraisal/professional" element={<StaffProfessionalEndeavors />} />
                <Route path="appraisal/download" element={<StaffDownloadAppraisal />} />
                <Route path="grievance" element={<StaffGrievance />} />
                <Route path="swoc/guidelines" element={<StaffSWOCGuidelines />} />
                <Route path="swoc/entry" element={<StaffSWOCEntry />} />
                <Route path="visiting-letter" element={<StaffVisitingLetter />} />
                <Route path="admission/enquiry" element={<StaffAdmissionEnquiry />} />
                <Route path="admission/counselor" element={<StaffCounselorRemark />} />
                <Route path="ematerial/upload" element={<StaffUploadEmaterial />} />
                <Route path="ematerial/download" element={<StaffDownloadEmaterial />} />
              </Route>
              
              <Route path="/tpo" element={
                <ProtectedRoute allowedRole="tpo">
                  <Layout role="tpo" />
                </ProtectedRoute>
              }>
                <Route index element={<TPOHome />} />
                <Route path="profile/update" element={<TPOUpdateProfile />} />
                <Route path="profile/change-password" element={<TPOChangePassword />} />
                <Route path="company/manage" element={<TPOManageCompanies />} />
                <Route path="company/history" element={<TPOCompanyHistory />} />
                <Route path="student/applied" element={<TPOViewAppliedStudents />} />
                <Route path="student/selected" element={<TPOSelectedStudents />} />
                <Route path="student/placed" element={<TPOPlacedStudents />} />
                <Route path="student/internships" element={<TPOInternshipRecords />} />
                <Route path="student/resumes" element={<TPOStudentResumes />} />
                <Route path="student/feedback" element={<TPOStudentFeedback />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </SidebarProvider>
      </AssignmentProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
