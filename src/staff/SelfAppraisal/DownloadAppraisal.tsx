
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";

const StaffDownloadAppraisal = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Download Appraisal</h1>
      <p className="text-muted-foreground">Download your self-appraisal reports.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Self-Appraisal Reports</CardTitle>
          <CardDescription>Download your completed appraisal reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reportYear">Select Academic Year</Label>
            <Select>
              <SelectTrigger id="reportYear">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-24">2023-24</SelectItem>
                <SelectItem value="2022-23">2022-23</SelectItem>
                <SelectItem value="2021-22">2021-22</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <h3 className="font-medium">Annual Appraisal Report</h3>
                <p className="text-sm text-muted-foreground">Academic Year 2022-23</p>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <h3 className="font-medium">Semester Appraisal Report</h3>
                <p className="text-sm text-muted-foreground">Second Half 2022-23</p>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <h3 className="font-medium">Semester Appraisal Report</h3>
                <p className="text-sm text-muted-foreground">First Half 2022-23</p>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDownloadAppraisal;
