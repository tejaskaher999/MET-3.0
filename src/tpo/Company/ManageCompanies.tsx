
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash } from "lucide-react";
import { useState } from "react";

// Sample data
const initialCompanies = [
  { id: 1, name: "TechCorp Solutions", package: "₹7.5L", position: "Software Developer", date: "Apr 21, 2025" },
  { id: 2, name: "Global Systems Inc.", package: "₹6.8L", position: "Network Engineer", date: "Apr 23, 2025" },
  { id: 3, name: "InfoTech Solutions", package: "₹6.2L", position: "Software Engineer", date: "Apr 25, 2025" },
];

const TPOManageCompanies = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    package: "",
    position: "",
    date: ""
  });
  
  const handleAddNew = () => {
    setFormData({
      name: "",
      package: "",
      position: "",
      date: ""
    });
    setEditingId(null);
    setShowForm(true);
  };
  
  const handleEdit = (company) => {
    setFormData({
      name: company.name,
      package: company.package,
      position: company.position,
      date: company.date
    });
    setEditingId(company.id);
    setShowForm(true);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing company
      setCompanies(companies.map(company => 
        company.id === editingId ? { ...company, ...formData } : company
      ));
    } else {
      // Add new company
      const newCompany = {
        id: companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1,
        ...formData
      };
      setCompanies([...companies, newCompany]);
    }
    
    setShowForm(false);
    setEditingId(null);
  };
  
  const handleDelete = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Companies</h1>
          <p className="text-muted-foreground">Add, edit, or remove company recruitment information.</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add Company
        </Button>
      </div>
      
      {showForm && (
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>{editingId ? "Edit Company" : "Add New Company"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="package">Package Offered</Label>
                  <Input 
                    id="package" 
                    value={formData.package}
                    onChange={e => setFormData({...formData, package: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input 
                    id="position" 
                    value={formData.position}
                    onChange={e => setFormData({...formData, position: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Drive Date</Label>
                  <Input 
                    id="date" 
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit">{editingId ? "Update" : "Add"} Company</Button>
            </CardFooter>
          </form>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Companies List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Drive Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map(company => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.position}</TableCell>
                  <TableCell>{company.package}</TableCell>
                  <TableCell>{company.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(company)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(company.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TPOManageCompanies;
