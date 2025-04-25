
import SidebarWrapper from "./sidebar/SidebarWrapper";

interface SidebarProps {
  role: "student" | "staff" | "tpo";
}

const Sidebar = ({ role }: SidebarProps) => {
  return <SidebarWrapper role={role} />;
};

export default Sidebar;
   