
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";

const paymentHistory = [
  {
    id: "RCPT-23456",
    date: "2023-01-15",
    amount: 50000,
    paymentMode: "Online",
    description: "Semester V Tuition Fee",
    receiptAvailable: true
  },
  {
    id: "RCPT-23123",
    date: "2022-07-20",
    amount: 45000,
    paymentMode: "Online",
    description: "Semester IV Tuition Fee",
    receiptAvailable: true
  },
  {
    id: "RCPT-22789",
    date: "2022-01-10",
    amount: 45000,
    paymentMode: "Demand Draft",
    description: "Semester III Tuition Fee",
    receiptAvailable: true
  },
  {
    id: "RCPT-22453",
    date: "2021-07-15",
    amount: 40000,
    paymentMode: "Cash",
    description: "Semester II Tuition Fee",
    receiptAvailable: true
  },
  {
    id: "RCPT-21987",
    date: "2021-01-12",
    amount: 40000,
    paymentMode: "Online",
    description: "Semester I Tuition Fee",
    receiptAvailable: true
  }
];

const StudentDownloadReceipt = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Download Receipt</h1>
      <p className="text-muted-foreground">View and download your payment receipts.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.paymentMode}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!payment.receiptAvailable}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Receipt
                    </Button>
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

export default StudentDownloadReceipt;
