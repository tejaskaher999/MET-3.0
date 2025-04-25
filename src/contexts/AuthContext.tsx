import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Types for user roles and user data
export type UserRole = "student" | "staff" | "tpo";

export type User = {
  id: string;
  name: string;
  role: UserRole;
  year?: string;
  department?: string;
  cgpa?: number;
  attendance?: number;
  division?: string;
  semester?: number;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; 
  login: (id: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user from sessionStorage
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading auth state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  // This is the key change - only redirect to login if not authenticated
  // Don't redirect to dashboard automatically on reload
  useEffect(() => {
    if (!isLoading && !user && location.pathname !== '/login') {
      // Store the current path before redirecting to login
      sessionStorage.setItem('redirectPath', location.pathname);
      navigate('/login');
    }
  }, [isLoading, user, location.pathname, navigate]);

  const users = {
    student: [
      { 
        id: "N04112100064", 
        name: "Student1", 
        role: "student" as const,
        year: "2024",
        department: "Computer Science",
        cgpa: 8.8,
        attendance: 85,
        division: "A",
        semester: 4
      },
      { 
        id: "N04112100065", 
        name: "Student2", 
        role: "student" as const,
        year: "2024",
        department: "Computer Science",
        cgpa: 8.5,
        attendance: 90,
        division: "B",
        semester: 4
      },
    ],
    staff: [
      { id: "STAFF00001", name: "Prof.Staff A (staff)", role: "staff" as const },
      { id: "STAFF00002", name: "Prof.Staff B (Coordinator)", role: "staff" as const },
      { id: "STAFF00003", name: "prof.Staff C ", role: "staff" as const },
    ],
    tpo: [
      { id: "TPO00001", name: "John TPO", role: "tpo" as const },
    ],
  };

  const login = async (id: string, password: string, role: UserRole): Promise<boolean> => {
    if (id !== password) {
      return false;
    }
    
    let foundUser = null;
    switch (role) {
      case "student":
        foundUser = users.student.find(u => u.id === id);
        break;
      case "staff":
        foundUser = users.staff.find(u => u.id === id);
        break;
      case "tpo":
        foundUser = users.tpo.find(u => u.id === id);
        break;
    }
    
    if (foundUser) {
      setUser(foundUser);
      sessionStorage.setItem('user', JSON.stringify(foundUser));
      
      // Check if there's a saved path to redirect to
      const redirectPath = sessionStorage.getItem('redirectPath');
      if (redirectPath) {
        sessionStorage.removeItem('redirectPath'); // Clean up
        navigate(redirectPath);
      } else {
        navigate(`/${foundUser.role}`);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('redirectPath'); // Clean up on logout
    navigate("/login");
  };

  // While checking authentication, show loading indicator 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800000]"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading,
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
