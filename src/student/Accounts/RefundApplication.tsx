
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const refundApplications = [
  {
    id: "REF-2023-001",
    date: "2023-03-15",
    amount: 5000,
    reason: "Double Payment for Development Fee",
    status: "Approved",
    paymentDate: "2023-03-30"
  },
  {
    id: "REF-2022-045",
    date: "2022-11-20",
    amount: 2500,
    reason: "Withdrawal from Optional Course",
    status: "Rejected",
    paymentDate: null
  }
];

const StudentRefundApplication = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Refund Application</h1>
      <p className="text-muted-foreground">Apply for refunds and track your applications.</p>
      
      <Tabs defaultValue="new">
        <TabsList>
          <TabsTrigger value="new">New Application</TabsTrigger>
          <TabsTrigger value="history">Application History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Refund Request Form</CardTitle>
              <CardDescription>Please fill in the details to request a refund</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="feeType">Fee Type</Label>
                  <Select>
                    <SelectTrigger id="feeType">
                      <SelectValue placeholder="Select fee type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tuition">Tuition Fee</SelectItem>
                      <SelectItem value="development">Development Fee</SelectItem>
                      <SelectItem value="library">Library Fee</SelectItem>
                      <SelectItem value="laboratory">Laboratory Fee</SelectItem>
                      <SelectItem value="exam">Exam Fee</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="Enter amount" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentDate">Original Payment Date</Label>
                  <Input id="paymentDate" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receiptNumber">Receipt Number</Label>
                  <Input id="receiptNumber" placeholder="e.g. RCPT-23456" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Refund</Label>
                <Textarea id="reason" rows={3} placeholder="Explain why you are requesting a refund" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bankDetails">Bank Account Details</Label>
                <Textarea 
                  id="bankDetails" 
                  rows={3} 
                  placeholder="Bank Name, Account Number, IFSC Code, Account Holder Name"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Submit Application</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Refund Application History</CardTitle>
              <CardDescription>Track the status of your previous refund applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {refundApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>{new Date(application.date).toLocaleDateString()}</TableCell>
                      <TableCell>₹{application.amount.toLocaleString()}</TableCell>
                      <TableCell>{application.reason}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            application.status === "Approved" 
                              ? "default" 
                              : application.status === "Rejected" 
                                ? "destructive" 
                                : "secondary"
                          }
                        >
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {application.paymentDate 
                          ? new Date(application.paymentDate).toLocaleDateString() 
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentRefundApplication;
