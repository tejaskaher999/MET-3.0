import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<"student" | "staff">("student");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if there's a stored path to redirect to
      const redirectPath = sessionStorage.getItem('redirectPath');
      if (redirectPath) {
        sessionStorage.removeItem('redirectPath'); // Clean up
        navigate(redirectPath);
      } else {
        navigate(`/${user.role}`);
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(id, password, role);
      if (!success) {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6]">
      <header className="bg-[#800000] py-6 px-2 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl text-white font-bold tracking-wide text-center">MET Bhujbal Knowledge City</h1>
        <span className="text-lg font-semibold text-white/90 -mt-1">Institute of Technology - Polytechnic</span>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-4">
          <Card className="rounded-lg shadow-md">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-extrabold" style={{ fontFamily: "Nunito, Arial, sans-serif" }}>
                Sign in to your account
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <Tabs
                  value={role}
                  onValueChange={(value: "student" | "staff") => setRole(value)}
                  className="w-full justify-center"
                >
                  <TabsList className="grid grid-cols-2 bg-gray-100 p-1 rounded-md mb-2">
                    <TabsTrigger value="student" className="data-[state=active]:bg-[#800000] data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:font-bold">
                      Student
                    </TabsTrigger>
                    <TabsTrigger value="staff" className="data-[state=active]:bg-[#800000] data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:font-bold">
                      Staff
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-2 text-left">
                  <Label htmlFor="id">{role === "student" ? "GR Number" : "Staff ID"}</Label>
                  <Input
                    id="id"
                    placeholder={role === "student" ? "e.g. N04112100064" : "e.g. STAFF00001"}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="rounded border border-gray-300 bg-white py-2 px-3 text-gray-900"
                    required
                  />
                </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded border border-gray-300 bg-white py-2 px-3 text-gray-900"
                    required
                  />
                  <span className="text-xs text-muted-foreground">
                    For demo: Use the same ID as your password
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full rounded bg-[#800000] hover:bg-[#700000] text-white text-base font-semibold py-2 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Sign in"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
