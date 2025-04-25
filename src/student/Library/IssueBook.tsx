
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, BookOpen } from "lucide-react";

// Sample data
const availableBooks = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    author: "Thomas H. Cormen",
    isbn: "9780262033848",
    publisher: "MIT Press",
    category: "Computer Science",
    copies: 5
  },
  {
    id: 2,
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    isbn: "9780132126953",
    publisher: "Pearson",
    category: "Computer Science",
    copies: 3
  },
  {
    id: 3,
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    isbn: "9781118063330",
    publisher: "Wiley",
    category: "Computer Science",
    copies: 2
  },
  {
    id: 4,
    title: "Digital Electronics",
    author: "Morris Mano",
    isbn: "9780132774208",
    publisher: "Pearson",
    category: "Electronics",
    copies: 4
  },
  {
    id: 5,
    title: "Applied Physics",
    author: "Arthur Beiser",
    isbn: "9780070048607",
    publisher: "McGraw-Hill",
    category: "Physics",
    copies: 6
  }
];

const IssueBook = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const filteredBooks = searchQuery 
    ? availableBooks.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery))
    : availableBooks;
  
  const handleIssueRequest = (bookId) => {
    toast({
      title: "Book Issue Request Submitted",
      description: "Your request has been sent to the librarian for approval.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Issue Book</h1>
      <p className="text-muted-foreground">Search and request books from the library.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Search Books</CardTitle>
          <CardDescription>Search by title, author, or ISBN</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Books</CardTitle>
          <CardDescription>Books currently available in the library</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Publisher</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Available Copies</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map(book => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {book.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={book.copies > 0 ? "default" : "destructive"}>
                      {book.copies}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      disabled={book.copies === 0}
                      onClick={() => handleIssueRequest(book.id)}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Request
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredBooks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    No books found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueBook;
