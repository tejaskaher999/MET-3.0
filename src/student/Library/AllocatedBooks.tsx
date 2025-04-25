
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, AlertCircle } from "lucide-react";

// Sample data
const allocatedBooks = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    author: "Thomas H. Cormen",
    issuedDate: "Apr 1, 2025",
    dueDate: "Apr 15, 2025",
    status: "active",
    fine: 0
  },
  {
    id: 2,
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    issuedDate: "Mar 25, 2025",
    dueDate: "Apr 8, 2025",
    status: "overdue",
    fine: 30
  },
  {
    id: 3,
    title: "Digital Electronics",
    author: "Morris Mano",
    issuedDate: "Apr 5, 2025",
    dueDate: "Apr 19, 2025",
    status: "active",
    fine: 0
  },
  {
    id: 4,
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    issuedDate: "Mar 20, 2025",
    dueDate: "Apr 3, 2025",
    status: "overdue",
    fine: 85
  }
];

const AllocatedBooks = () => {
  const { toast } = useToast();
  
  const handleRenewRequest = (bookId) => {
    toast({
      title: "Renewal Request Submitted",
      description: "Your renewal request has been sent to the librarian for approval.",
    });
  };
  
  const handleReturnRequest = (bookId) => {
    toast({
      title: "Return Request Submitted",
      description: "Please return the book to the library counter.",
    });
  };

  // Calculate statistics
  const totalBooks = allocatedBooks.length;
  const overdueBooks = allocatedBooks.filter(book => book.status === "overdue").length;
  const totalFine = allocatedBooks.reduce((total, book) => total + book.fine, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Allocated Books</h1>
      <p className="text-muted-foreground">Manage your currently borrowed library books.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently issued</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueBooks}</div>
            <p className="text-xs text-muted-foreground mt-1">Past due date</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Fine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalFine}</div>
            <p className="text-xs text-muted-foreground mt-1">Pending payment</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Books</CardTitle>
          <CardDescription>Books currently issued to you</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fine (₹)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocatedBooks.map(book => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.issuedDate}</TableCell>
                  <TableCell>{book.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={book.status === "active" ? "default" : "destructive"}>
                      {book.status === "active" ? "Active" : "Overdue"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {book.fine > 0 ? (
                      <div className="flex items-center">
                        <AlertCircle className="text-destructive mr-1 h-4 w-4" />
                        <span>₹{book.fine}</span>
                      </div>
                    ) : (
                      "₹0"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRenewRequest(book.id)}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Renew
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleReturnRequest(book.id)}
                      >
                        Return
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

export default AllocatedBooks;
