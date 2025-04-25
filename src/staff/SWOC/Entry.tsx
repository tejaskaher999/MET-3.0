
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Save } from "lucide-react";

const StaffSWOCEntry = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">SWOC Assessment Entry</h1>
      <p className="text-muted-foreground">Complete your Strengths, Weaknesses, Opportunities, and Challenges assessment.</p>
      
      <Card className="mb-6">
        <CardHeader className="space-y-1">
          <CardTitle>SWOC Assessment Form</CardTitle>
          <CardDescription>
            Analyze your Strengths, Weaknesses, Opportunities, and Challenges
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="strengths">Strengths</Label>
            <Textarea
              id="strengths"
              placeholder="List your professional strengths and capabilities..."
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              Focus on your positive attributes that help you excel in your academic role.
            </p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="weaknesses">Weaknesses</Label>
            <Textarea
              id="weaknesses"
              placeholder="Identify areas where you need improvement or development..."
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              Be honest about areas where you could improve to enhance your professional effectiveness.
            </p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="opportunities">Opportunities</Label>
            <Textarea
              id="opportunities"
              placeholder="Identify external opportunities for growth and advancement..."
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              Consider how changes in education, technology, or your institution could benefit your career.
            </p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="challenges">Challenges</Label>
            <Textarea
              id="challenges"
              placeholder="List challenges or threats to your professional development..."
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              Consider external factors that may impede your progress or effectiveness.
            </p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="action-plan">Action Plan</Label>
            <Textarea
              id="action-plan"
              placeholder="Develop an action plan based on your SWOC analysis..."
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              Outline specific steps you will take to leverage strengths, address weaknesses, exploit opportunities, and mitigate challenges.
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline">
              Save as Draft
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Submit Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline">
          View Past Assessments
        </Button>
        <Button variant="outline">
          View Guidelines
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default StaffSWOCEntry;
