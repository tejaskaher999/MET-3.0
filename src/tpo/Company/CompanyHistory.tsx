
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data
const companies = [
  { 
    id: 1, 
    name: "TechCorp Solutions", 
    year: "2024-25",
    positions: ["Software Developer", "Data Analyst"],
    packageRange: "₹6.5L - ₹8.2L",
    studentsPlaced: 12
  },
  { 
    id: 2, 
    name: "Global Systems Inc.", 
    year: "2024-25",
    positions: ["Network Engineer", "System Administrator"],
    packageRange: "₹5.8L - ₹7.5L",
    studentsPlaced: 8
  },
  { 
    id: 3, 
    name: "InfoTech Solutions", 
    year: "2024-25",
    positions: ["Software Engineer", "Full Stack Developer"],
    packageRange: "₹5.2L - ₹7.0L",
    studentsPlaced: 15
  },
  { 
    id: 4, 
    name: "TechCorp Solutions", 
    year: "2023-24",
    positions: ["Software Developer", "QA Engineer"],
    packageRange: "₹5.8L - ₹7.5L",
    studentsPlaced: 10
  },
  { 
    id: 5, 
    name: "Digital Innovators", 
    year: "2023-24",
    positions: ["UI/UX Designer", "Front-end Developer"],
    packageRange: "₹5.5L - ₹7.2L",
    studentsPlaced: 6
  },
];

const TPOCompanyHistory = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Company Recruitment History</h1>
        <p className="text-muted-foreground">Historical data of companies that recruited from our institution.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Placement Statistics</CardTitle>
          <CardDescription>Overview of company recruitment over the years</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Companies Visited</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">32</p>
                <p className="text-xs text-muted-foreground">Last 3 academic years</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Students Placed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">248</p>
                <p className="text-xs text-muted-foreground">Average 82 per year</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Highest Package</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹12.5L</p>
                <p className="text-xs text-muted-foreground">TechCorp Solutions (2023)</p>
              </CardContent>
            </Card>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Positions Offered</TableHead>
                <TableHead>Package Range</TableHead>
                <TableHead>Students Placed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map(company => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.year}</TableCell>
                  <TableCell>{company.positions.join(", ")}</TableCell>
                  <TableCell>{company.packageRange}</TableCell>
                  <TableCell>{company.studentsPlaced}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TPOCompanyHistory;
