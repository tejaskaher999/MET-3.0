
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, FileCheck, BarChart3 } from "lucide-react";

const TPOHome = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Welcome, {user?.name}</h1>
      <p className="text-muted-foreground">Training and Placement Dashboard</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12</div>
              <Building className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">3 with ongoing recruitment</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">237</div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">45 new this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Placed Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">89</div>
              <FileCheck className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">72% placement rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹6.2L</div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">↑ 12% from last year</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Recruitment Drives</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">TechCorp Solutions</p>
                  <p className="text-sm text-muted-foreground">Software Developer - ₹7.5L</p>
                </div>
                <div className="text-sm">Apr 21, 2025</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Global Systems Inc.</p>
                  <p className="text-sm text-muted-foreground">Network Engineer - ₹6.8L</p>
                </div>
                <div className="text-sm">Apr 23, 2025</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">InfoTech Solutions</p>
                  <p className="text-sm text-muted-foreground">Software Engineer - ₹6.2L</p>
                </div>
                <div className="text-sm">Apr 25, 2025</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Placements</CardTitle>
            <CardDescription>Last 5 placements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Rahul Sharma</p>
                  <p className="text-sm text-muted-foreground">TechCorp Solutions - ₹8.2L</p>
                </div>
                <div className="text-sm">Apr 15, 2025</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Priya Patel</p>
                  <p className="text-sm text-muted-foreground">Global Systems Inc. - ₹7.5L</p>
                </div>
                <div className="text-sm">Apr 12, 2025</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Ajay Kumar</p>
                  <p className="text-sm text-muted-foreground">InfoTech Solutions - ₹6.8L</p>
                </div>
                <div className="text-sm">Apr 10, 2025</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TPOHome;
