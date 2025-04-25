import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { MenuButton } from "./header/MenuButton";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-[#800000] text-white h-16 px-6 flex items-center justify-between shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
        <MenuButton />
        <h1 className="text-xl font-bold">MET Bhujbal Knowledge City</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <p className="text-sm">Welcome, {user?.name}</p>
          <p className="text-xs opacity-80">ID: {user?.id}</p>
        </div>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={logout}
          className="bg-white text-[#800000] hover:bg-gray-100"
        >
          Logout 
        </Button>
      </div>
    </header>
  );
};

export default Header;
