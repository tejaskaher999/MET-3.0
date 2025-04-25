
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const StaffSWOCGuidelines = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">SWOC Guidelines</h1>
      <p className="text-muted-foreground">Guidelines for Strengths, Weaknesses, Opportunities, and Challenges assessment.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>SWOC Assessment Guidelines</CardTitle>
          <CardDescription>Instructions for completing your SWOC assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Purpose of SWOC Assessment</h3>
            <p className="text-muted-foreground">
              The SWOC (Strengths, Weaknesses, Opportunities, and Challenges) analysis is a structured planning method that evaluates 
              these four elements in relation to your teaching, research, and academic administration. It provides insights into 
              your professional development needs and helps in creating effective action plans.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Guidelines for Assessment</h3>
            
            <div className="space-y-2 p-4 bg-blue-50 rounded-md">
              <h4 className="font-medium">Strengths</h4>
              <p className="text-sm">
                Identify your internal attributes and resources that support achievement of your objectives. These can include:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                <li>Subject expertise and knowledge breadth/depth</li>
                <li>Teaching methodologies and innovation in pedagogy</li>
                <li>Research skills and publication record</li>
                <li>Professional networks and collaborations</li>
                <li>Administrative abilities and leadership qualities</li>
              </ul>
            </div>
            
            <div className="space-y-2 p-4 bg-amber-50 rounded-md">
              <h4 className="font-medium">Weaknesses</h4>
              <p className="text-sm">
                Identify internal attributes and resource limitations that hinder achievement of your objectives:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                <li>Knowledge gaps or skills that need development</li>
                <li>Time management and work organization challenges</li>
                <li>Limited experience in specific academic areas</li>
                <li>Communication or interpersonal challenges</li>
                <li>Technological or digital literacy limitations</li>
              </ul>
            </div>
            
            <div className="space-y-2 p-4 bg-green-50 rounded-md">
              <h4 className="font-medium">Opportunities</h4>
              <p className="text-sm">
                Identify external factors that could positively impact your professional growth:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                <li>Professional development and training programs</li>
                <li>Emerging technologies in education</li>
                <li>Research grant opportunities and collaborations</li>
                <li>Curriculum development initiatives</li>
                <li>Networking opportunities with industry and academia</li>
              </ul>
            </div>
            
            <div className="space-y-2 p-4 bg-red-50 rounded-md">
              <h4 className="font-medium">Challenges</h4>
              <p className="text-sm">
                Identify external factors that could negatively impact your professional effectiveness:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                <li>Institutional resource constraints</li>
                <li>Rapidly changing curriculum requirements</li>
                <li>Work-life balance considerations</li>
                <li>Academic workload pressures</li>
                <li>Adaptation to new teaching modalities or technologies</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Submission Process</h3>
            <p className="text-muted-foreground">
              Complete your SWOC assessment form by the end of each semester. The analysis should be honest, reflective, 
              and forward-looking. It will be reviewed during your annual performance review and will help shape 
              your professional development plan.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffSWOCGuidelines;
