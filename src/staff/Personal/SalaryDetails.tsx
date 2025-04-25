import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText, Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import styles from './SalaryDetails.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Add this type definition
type SalaryStructure = {
  basic: number;
  hra: number;
  da: number;
  travel: number;
  medical: number;
  special: number;
  professor: number;
  pf: number;
  professionalTax: number;
  incomeTax: number;
  otherDeductions: number;
};

// Add this type definition at the top with other types
interface TaxSlab {
  range: string;
  rate: string;
  amount: number;
}

// Add these interfaces right after the existing type definitions
interface TaxInformation {
  year: string;
  totalEarnings: number;
  totalDeductions: number;
  taxableIncome: number;
  totalTaxPaid: number;
}

// First, define an interface for the salary slip data type
interface SalarySlip {
  id: string;
  month: string;
  date: string;
  netSalary: number;
  status: string;
}

// Add this interface with other interfaces
interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  accountHolderName: string;
}

// Move salaryStructures before PaySlipModal and add proper typing
const salaryStructures: Record<string, SalaryStructure> = {
  "2024-2025": {
    basic: 62000,
    hra: 16000,
    da: 8500,
    travel: 3200,
    medical: 2500,
    special: 5500,
    professor: 11000,
    pf: 7600,
    professionalTax: 200,
    incomeTax: 9500,
    otherDeductions: 0,
  },
  "2023-2024": {
    basic: 57000,
    hra: 14800,
    da: 7800,
    travel: 3000,
    medical: 2500,
    special: 5200,
    professor: 10000,
    pf: 7100,
    professionalTax: 200,
    incomeTax: 8700,
    otherDeductions: 0,
  },
  "2022-2023": {
    basic: 53000,
    hra: 13800,
    da: 7300,
    travel: 2800,
    medical: 2500,
    special: 4900,
    professor: 9500,
    pf: 6600,
    professionalTax: 200,
    incomeTax: 7950,
    otherDeductions: 0,
  },
};

// Add proper type for the PaySlipModal props
interface PaySlipModalProps {
  slip: SalarySlip | null;
  isOpen: boolean;
  onClose: () => void;
}

// Update the PaySlipModal component
const PaySlipModal = ({ slip, isOpen, onClose }: PaySlipModalProps) => {
  if (!slip) return null;

  const year = slip.date.split('/')[2];
  const structureYear = `${year}-${Number(year) + 1}`;
  const structure = salaryStructures[structureYear];
  
  const totalEarnings = 
    structure.basic + 
    structure.hra + 
    structure.da + 
    structure.travel + 
    structure.medical + 
    structure.special + 
    structure.professor;
    
  const totalDeductions = 
    structure.pf + 
    structure.professionalTax + 
    structure.incomeTax + 
    structure.otherDeductions;

  const handleDownloadPDF = async () => {
    try {
      // Create a temporary clone of the content for PDF generation
      const content = document.getElementById('payslip-content');
      if (!content) return;

      const clone = content.cloneNode(true) as HTMLElement;
      clone.style.cssText = `
        position: fixed;
        left: 0;
        top: 0;
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        background: white;
        box-shadow: none;
        z-index: -9999;
        border: none;
      `;
      document.body.appendChild(clone);

      // Generate PDF
      try {
        const canvas = await html2canvas(clone, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          windowWidth: clone.scrollWidth,
          windowHeight: clone.scrollHeight
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;

        pdf.addImage(
          imgData, 
          'PNG', 
          imgX, 
          imgY, 
          imgWidth * ratio, 
          imgHeight * ratio
        );

        pdf.save(`${slip.id}-${slip.month.replace(' ', '-')}.pdf`);
      } finally {
        // Always remove the clone
        document.body.removeChild(clone);
      }

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] p-0 flex flex-col overflow-hidden">
        <DialogHeader className="sticky top-0 bg-white z-10 px-6 py-4 border-b">
          <DialogTitle className="text-xl font-bold">
            Pay Slip Details - {slip.month}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <div id="payslip-content" className="bg-white p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">MET BKC</h2>
                <h3 className="text-xl">Pay Slip - {slip.month}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                <div>Pay Slip ID: {slip.id}</div>
                <div>Month: {slip.month}</div>
                <div>Date: {slip.date}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Earnings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Basic Salary</span>
                      <span>₹{structure.basic.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>House Rent Allowance</span>
                      <span>₹{structure.hra.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dearness Allowance</span>
                      <span>₹{structure.da.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Travel Allowance</span>
                      <span>₹{structure.travel.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medical Allowance</span>
                      <span>₹{structure.medical.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Special Allowance</span>
                      <span>₹{structure.special.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Professor Allowance</span>
                      <span>₹{structure.professor.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Total Earnings</span>
                      <span>₹{totalEarnings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Deductions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Provident Fund</span>
                      <span>₹{structure.pf.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Professional Tax</span>
                      <span>₹{structure.professionalTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Income Tax</span>
                      <span>₹{structure.incomeTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Deductions</span>
                      <span>₹{structure.otherDeductions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Total Deductions</span>
                      <span>₹{totalDeductions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between font-bold text-lg">
                  <span>Net Salary</span>
                  <span>₹{slip.netSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Close
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add this helper function before BankDetailsModal component
const formatAccountNumber = (value: string): string => {
  // Remove all spaces and non-digits first
  const cleaned = value.replace(/\s+/g, '').replace(/\D/g, '');
  // Add space after every 4 digits
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
};

// Update the BankDetailsModal component's account number input handling
const BankDetailsModal = ({ isOpen, onClose, details, onUpdate }: {
  isOpen: boolean;
  onClose: () => void;
  details: BankDetails;
  onUpdate: (details: BankDetails) => void;
}) => {
  const [formData, setFormData] = useState(details);

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAccountNumber(e.target.value);
    setFormData({ ...formData, accountNumber: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Bank Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Account Holder Name</label>
            <Input
              value={formData.accountHolderName}
              onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Account Number</label>
            <Input
              value={formData.accountNumber}
              onChange={handleAccountNumberChange}
              maxLength={19} // 16 digits + 3 spaces
              placeholder="XXXX XXXX XXXX XXXX"
              pattern="[0-9\s]*"
              required
            />
            <p className="text-xs text-muted-foreground">
              Enter 16 digits account number
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">IFSC Code</label>
            <Input
              value={formData.ifscCode}
              onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Bank Name</label>
            <Input
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Branch Name</label>
            <Input
              value={formData.branchName}
              onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Move taxInformation before the generateTaxStatementPDF function
const taxInformation: Record<string, TaxInformation> = {
  "2022-2023": {
    year: "2022-2023",
    totalEarnings: 967200,
    totalDeductions: 154752,
    taxableIncome: 812448,
    totalTaxPaid: 89369,
  },
  "2023-2024": {
    year: "2023-2024",
    totalEarnings: 1113000,
    totalDeductions: 176400,
    taxableIncome: 936600,
    totalTaxPaid: 108000,
  },
  "2024-2025": {
    year: "2024-2025",
    totalEarnings: 1116200,
    totalDeductions: 178592,
    taxableIncome: 937608,
    totalTaxPaid: 112513,
  },
};

// Update the type in generateTaxStatementPDF function parameters
const generateTaxStatementPDF = async (
  year: string, 
  taxInfo: TaxInformation,
  taxSlabsInfo: TaxSlab[],
  salaryList: SalarySlip[]
) => {
  try {
    const tempDiv = document.createElement('div');
    tempDiv.className = 'bg-white p-8';
    tempDiv.innerHTML = `
      <div class="max-w-4xl mx-auto space-y-8" style="font-size: 18px; line-height: 1.6;">
        <div class="text-center space-y-4">
          <h2 style="font-size: 32px; font-weight: bold; margin-bottom: 12px;">MET BKC</h2>
          <h3 style="font-size: 28px;">Annual Tax Statement - FY ${year}</h3>
        </div>
        
        <div class="space-y-8">
          <div class="space-y-6">
            <h4 style="font-size: 24px; font-weight: 600;">Annual Summary</h4>
            <div style="font-size: 20px;" class="space-y-4">
              <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
                <span>Total Earnings</span>
                <span style="font-weight: 500;">₹${taxInfo.totalEarnings.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
                <span>Total Deductions</span>
                <span style="font-weight: 500;">₹${taxInfo.totalDeductions.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 16px; padding-top: 16px; border-top: 2px solid #e5e7eb;">
                <span style="font-weight: 500;">Taxable Income</span>
                <span style="font-weight: 500;">₹${taxInfo.taxableIncome.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 16px; background-color: #f3f4f6; border-radius: 8px;">
                <span style="font-weight: 600;">Total Tax Paid</span>
                <span style="font-weight: 600; color: #dc2626;">₹${taxInfo.totalTaxPaid.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <h4 style="font-size: 24px; font-weight: 600;">Tax Slab Details</h4>
            <div style="font-size: 18px;" class="space-y-4">
              ${taxSlabsInfo.map(slab => `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                  <div>
                    <div style="margin-bottom: 4px;">${slab.range}</div>
                    <div style="color: #6b7280; font-size: 16px;">${slab.rate}</div>
                  </div>
                  <div style="font-weight: 500;">₹${slab.amount.toLocaleString()}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="space-y-6">
            <h4 style="font-size: 24px; font-weight: 600;">Monthly Breakdown</h4>
            <div style="font-size: 18px;" class="space-y-4">
              ${salaryList.map(salary => `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                  <div>
                    <div style="margin-bottom: 4px;">${salary.month}</div>
                    <div style="color: #6b7280; font-size: 16px;">${salary.date}</div>
                  </div>
                  <div style="font-weight: 500;">₹${salary.netSalary.toLocaleString()}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(tempDiv);

    // Increase scale for better quality
    const canvas = await html2canvas(tempDiv, {
      scale: 2.5, // Increased from 2 to 2.5
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    document.body.removeChild(tempDiv);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 20; // Added top margin

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`Tax-Statement-${year}.pdf`);

  } catch (error) {
    console.error('Error generating tax statement PDF:', error);
  }
};

// Move and type the salaryData object
const salaryData: Record<string, SalarySlip[]> = {
  "2022-2023": [
    {
      id: "SAL-2022-APR",
      month: "April 2022",
      date: "30/04/2022",
      netSalary: 79100,
      status: "Credited",
    },
    {
      id: "SAL-2022-MAY",
      month: "May 2022",
      date: "31/05/2022",
      netSalary: 79100,
      status: "Credited",
    },
    {
      id: "SAL-2022-JUN",
      month: "June 2022",
      date: "30/06/2022",
      netSalary: 79100,
      status: "Credited",
    },
    {
      id: "SAL-2022-JUL",
      month: "July 2022",
      date: "31/07/2022",
      netSalary: 79100,
      status: "Credited",
    },
    {
      id: "SAL-2022-AUG",
      month: "August 2022",
      date: "31/08/2022",
      netSalary: 79350,
      status: "Credited",
    },
    {
      id: "SAL-2022-SEP",
      month: "September 2022",
      date: "30/09/2022",
      netSalary: 79350,
      status: "Credited",
    },
    {
      id: "SAL-2022-OCT",
      month: "October 2022",
      date: "31/10/2022",
      netSalary: 81850,
      status: "Credited",
    },
    {
      id: "SAL-2022-NOV",
      month: "November 2022",
      date: "30/11/2022",
      netSalary: 81850,
      status: "Credited",
    },
    {
      id: "SAL-2022-DEC",
      month: "December 2022",
      date: "31/12/2022",
      netSalary: 81850,
      status: "Credited",
    },
    {
      id: "SAL-2023-JAN",
      month: "January 2023",
      date: "31/01/2023",
      netSalary: 81850,
      status: "Credited",
    },
    {
      id: "SAL-2023-FEB",
      month: "February 2023",
      date: "28/02/2023",
      netSalary: 81850,
      status: "Credited",
    },
    {
      id: "SAL-2023-MAR",
      month: "March 2023",
      date: "31/03/2023",
      netSalary: 81850,
      status: "Credited",
    },
  ],
  "2023-2024": [
    {
      id: "SAL-2023-APR",
      month: "April 2023",
      date: "30/04/2023",
      netSalary: 84600,
      status: "Credited",
    },
    {
      id: "SAL-2023-MAY",
      month: "May 2023",
      date: "31/05/2023",
      netSalary: 84600,
      status: "Credited",
    },
    {
      id: "SAL-2023-JUN",
      month: "June 2023",
      date: "30/06/2023",
      netSalary: 84600,
      status: "Credited",
    },
    {
      id: "SAL-2023-JUL",
      month: "July 2023",
      date: "31/07/2023",
      netSalary: 85100,
      status: "Credited",
    },
    {
      id: "SAL-2023-AUG",
      month: "August 2023",
      date: "31/08/2023",
      netSalary: 87100,
      status: "Credited",
    },
    {
      id: "SAL-2023-SEP",
      month: "September 2023",
      date: "30/09/2023",
      netSalary: 87100,
      status: "Credited",
    },
    {
      id: "SAL-2023-OCT",
      month: "October 2023",
      date: "31/10/2023",
      netSalary: 87100,
      status: "Credited",
    },
    {
      id: "SAL-2023-NOV",
      month: "November 2023",
      date: "30/11/2023",
      netSalary: 87100,
      status: "Credited",
    },
    {
      id: "SAL-2023-DEC",
      month: "December 2023",
      date: "31/12/2023",
      netSalary: 87100,
      status: "Credited",
    },
    {
      id: "SAL-2024-JAN",
      month: "January 2024",
      date: "31/01/2024",
      netSalary: 87100,
      status: "Credited",
    },
    {
      id: "SAL-2024-FEB",
      month: "February 2024",
      date: "29/02/2024",
      netSalary: 87100,
      status: "Credited",
    },
    {
      id: "SAL-2024-MAR",
      month: "March 2024",
      date: "31/03/2024",
      netSalary: 87100,
      status: "Credited",
    },
  ],
  "2024-2025": [
    {
      id: "SAL-2024-APR",
      month: "April 2024",
      date: "30/04/2024",
      netSalary: 91400,
      status: "Credited",
    },
    {
      id: "SAL-2024-MAY",
      month: "May 2024",
      date: "31/05/2024",
      netSalary: 91400,
      status: "Credited",
    },
    {
      id: "SAL-2024-JUN",
      month: "June 2024",
      date: "30/06/2024",
      netSalary: 91400,
      status: "Credited",
    },
    {
      id: "SAL-2024-JUL",
      month: "July 2024",
      date: "31/07/2024",
      netSalary: 91400,
      status: "Credited",
    },
    {
      id: "SAL-2024-AUG",
      month: "August 2024",
      date: "31/08/2024",
      netSalary: 91400,
      status: "Credited",
    },
    {
      id: "SAL-2024-SEP",
      month: "September 2024",
      date: "30/09/2024",
      netSalary: 91400,
      status: "Credited",
    },
    {
      id: "SAL-2024-OCT",
      month: "October 2024",
      date: "31/10/2024",
      netSalary: 94600,
      status: "Credited",
    },
    {
      id: "SAL-2024-NOV",
      month: "November 2024",
      date: "30/11/2024",
      netSalary: 94600,
      status: "Credited",
    },
    {
      id: "SAL-2024-DEC",
      month: "December 2024",
      date: "31/12/2024",
      netSalary: 94600,
      status: "Processing",
    }
  ],
};

const StaffSalaryDetails = () => {
  const [selectedYear, setSelectedYear] = useState("2024-2025"); // Changed from "2023-2024" to "2024-2025"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlip, setSelectedSlip] = useState<SalarySlip | null>(null);
  // Add this state for tax breakdown visibility
  const [showTaxBreakdown, setShowTaxBreakdown] = useState(false);

  // Add this state for bank details
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountNumber: "4569 8565 2652 3512",
    ifscCode: "SBIN0012345",
    bankName: "State Bank of India",
    branchName: "MET Branch",
    accountHolderName: "John Doe"
  });

  const [showBankModal, setShowBankModal] = useState(false);

  // Add tax slabs data
  const taxSlabs: Record<string, TaxSlab[]> = {
    "2024-2025": [
      { range: "₹0 - ₹250,000", rate: "0%", amount: 0 },
      { range: "₹250,001 - ₹500,000", rate: "5%", amount: 12500 },
      { range: "₹500,001 - ₹750,000", rate: "10%", amount: 25000 },
      { range: "₹750,001 - ₹949,400", rate: "15%", amount: 29910 },
    ],
    // Add data for other years if different
    "2023-2024": [
      { range: "₹0 - ₹250,000", rate: "0%", amount: 0 },
      { range: "₹250,001 - ₹500,000", rate: "5%", amount: 12500 },
      { range: "₹500,001 - ₹750,000", rate: "10%", amount: 25000 },
      { range: "₹750,001 - ₹949,400", rate: "15%", amount: 29910 },
    ],
    "2022-2023": [
      { range: "₹0 - ₹250,000", rate: "0%", amount: 0 },
      { range: "₹250,001 - ₹500,000", rate: "5%", amount: 12500 },
      { range: "₹500,001 - ₹750,000", rate: "10%", amount: 25000 },
      { range: "₹750,001 - ₹949,400", rate: "15%", amount: 29910 },
    ],
  };

  const years = ["2022-2023", "2023-2024", "2024-2025"];

  const filteredSalaryData = salaryData[selectedYear]?.filter(item => 
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.month.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Salary Details</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by month or ID"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Bank Details Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Bank Account Details</CardTitle>
              <CardDescription>Salary will be credited to this account</CardDescription>
            </div>
            <Button 
              variant="outline"
              onClick={() => setShowBankModal(true)}
            >
              Modify Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Account Holder</div>
              <div className="font-medium">{bankDetails.accountHolderName}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Account Number</div>
              <div className="font-medium">{bankDetails.accountNumber}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">IFSC Code</div>
              <div className="font-medium">{bankDetails.ifscCode}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Bank Name</div>
              <div className="font-medium">{bankDetails.bankName}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Branch</div>
              <div className="font-medium">{bankDetails.branchName}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Year Selection */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-gray-700">Financial Year:</h2>
        </div>
        <Select 
          value={selectedYear} 
          onValueChange={setSelectedYear}
        >
          <SelectTrigger className="w-[180px] bg-white hover:bg-gray-50 transition-colors">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem 
                key={year} 
                value={year}
                className="cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">{year}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Salary History</CardTitle>
              <CardDescription>
                {filteredSalaryData.length} entries
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Pay Slip</TableHead>
                  <TableHead className="w-[18%]">Date</TableHead>
                  <TableHead className="w-[22%] pl-6">Net Salary</TableHead> {/* Reduced from 27% to 22% */}
                  <TableHead className="w-[20%]">Status</TableHead> {/* Increased from 15% to 20% */}
                  <TableHead className="w-[15%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSalaryData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-[25%]">
                      <div className="flex flex-col">
                        <span className="font-medium">{item.id}</span>
                        <span className="text-sm text-muted-foreground">{item.month}</span>
                      </div>
                    </TableCell>
                    <TableCell className="w-[18%]">{item.date}</TableCell>
                    <TableCell className="w-[22%] pl-6">₹{item.netSalary.toLocaleString()}</TableCell>
                    <TableCell className="w-[20%]">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === "Credited" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="w-[15%]">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedSlip(item)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Annual Tax Information</CardTitle>
            <CardDescription>Financial Year {selectedYear}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Earnings</span>
                <span className="font-medium">
                  ₹{taxInformation[selectedYear].totalEarnings.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Deductions</span>
                <span className="font-medium">
                  ₹{taxInformation[selectedYear].totalDeductions.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm font-medium">Taxable Income</span>
                <span className="font-medium">
                  ₹{taxInformation[selectedYear].taxableIncome.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between bg-muted p-2 rounded-md">
                <span className="text-sm font-medium">Total Tax Paid</span>
                <span className="font-medium text-red-600">
                  ₹{taxInformation[selectedYear].totalTaxPaid.toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              variant="outline" 
              className="w-full border-dashed"
              onClick={() => setShowTaxBreakdown(!showTaxBreakdown)}
            >
              {showTaxBreakdown ? "Hide" : "Show"} Tax Breakdown
            </Button>

            {showTaxBreakdown && (
              <div className="space-y-4 border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Tax Slabs</h4>
                <div className="space-y-2">
                  {taxSlabs[selectedYear].map((slab, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center text-sm"
                    >
                      <div className="space-y-1">
                        <div>{slab.range}</div>
                        <div className="text-muted-foreground">{slab.rate}</div>
                      </div>
                      <div className="font-medium">₹{slab.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => generateTaxStatementPDF(
                selectedYear,
                taxInformation[selectedYear],
                taxSlabs[selectedYear],
                salaryData[selectedYear]
              )}
            >
              Download Tax Statement
            </Button>
          </CardContent>
        </Card>
      </div>

      <PaySlipModal
        slip={selectedSlip}
        isOpen={!!selectedSlip}
        onClose={() => setSelectedSlip(null)}
      />

      <BankDetailsModal
        isOpen={showBankModal}
        onClose={() => setShowBankModal(false)}
        details={bankDetails}
        onUpdate={setBankDetails}
      />
    </div>
  );
};

export default StaffSalaryDetails;
