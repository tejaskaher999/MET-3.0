
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const StudentOutstandingDetails = () => {
  const currentSemesterFees = [
    { id: 1, type: "Tuition Fee", amount: 45000, status: "Paid" },
    { id: 2, type: "Development Fee", amount: 5000, status: "Paid" },
    { id: 3, type: "Library Fee", amount: 2500, status: "Pending" },
    { id: 4, type: "Laboratory Fee", amount: 3500, status: "Pending" },
    { id: 5, type: "Exam Fee", amount: 4000, status: "Pending" }
  ];
  
  const totalAmount = currentSemesterFees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidAmount = currentSemesterFees
    .filter(fee => fee.status === "Paid")
    .reduce((sum, fee) => sum + fee.amount, 0);
  const pendingAmount = totalAmount - paidAmount;
  const paymentPercentage = (paidAmount / totalAmount) * 100;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Outstanding Details</h1>
      <p className="text-muted-foreground">View and manage your fee payments.</p>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{paidAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{pendingAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Semester Fee Details</CardTitle>
          <CardDescription>
            Payment Progress
            <Progress className="mt-2" value={paymentPercentage} />
            <div className="text-xs text-muted-foreground mt-1">
              {paymentPercentage.toFixed(0)}% Paid
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSemesterFees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.type}</TableCell>
                  <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={fee.status === "Paid" ? "default" : "secondary"}
                    >
                      {fee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {fee.status === "Pending" ? (
                      <Button size="sm">Pay Now</Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        View Receipt
                      </Button>
                    )}
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

export default StudentOutstandingDetails;
