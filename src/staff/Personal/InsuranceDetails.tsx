import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, PlusCircle, Download, Shield, User, Clock, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import jsPDF from 'jspdf';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Add type for insurance categories
type InsuranceCategory = 'all' | 'health' | 'life' | 'accident';

// Add this interface before the component
interface InsurancePolicy {
  id: string;
  type: InsuranceCategory;
  name: string;
  company: string;
  policyNumber: string;
  sumInsured: number;
  premium: number;
  validFrom: string;
  validTo: string;
  status: 'Active' | 'Inactive';
}

interface Dependent {
  id: string;
  name: string;
  relation: string;
  status: 'Covered' | 'Pending';
}

interface ClaimForm {
  policyType: InsuranceCategory;
  patient: string;
  reason: string;
  amount: string;
  date: string;
  documents: File[];
}

interface Claim {
  id: string;
  date: string;
  reason: string;
  amount: string;
  status: 'Approved' | 'Pending' | 'In-process';
}

type DownloadStatus = {
  [key: string]: boolean;
};

const generatePolicyPDF = (policy: InsurancePolicy): jsPDF => {
  const pdf = new jsPDF();
  
  // Add company logo placeholder
  pdf.setFillColor(245, 245, 245);
  pdf.rect(20, 15, 40, 15, 'F');
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.text('COMPANY LOGO', 25, 24);

  // Add header with policy type and status
  pdf.setFontSize(22);
  pdf.setTextColor(0, 0, 0);
  pdf.setFont('helvetica', 'bold');
  pdf.text(policy.name, 20, 45);
  
  // Add status badge
  pdf.setFillColor(220, 252, 231); // Light green background
  pdf.setTextColor(22, 163, 74); // Green text
  pdf.setFontSize(12);
  pdf.roundedRect(20, 50, 25, 8, 4, 4, 'F');
  pdf.text(policy.status, 25, 55);

  // Add policy details
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Policy Information', 20, 70);
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  const details = [
    ['Policy Number:', policy.policyNumber],
    ['Insurance Provider:', policy.company],
    ['Sum Insured:', `Rs. ${policy.sumInsured.toLocaleString()}`], // Fixed Rupee symbol
    ['Premium Amount:', `Rs. ${policy.premium.toLocaleString()}`],  // Fixed Rupee symbol
    ['Valid From:', policy.validFrom],
    ['Valid To:', policy.validTo]
  ];

  let y = 80;
  details.forEach(([label, value]) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(107, 114, 128); // Gray for labels
    pdf.text(label, 20, y);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text(value, 80, y);
    y += 10;
  });

  // Add terms and conditions
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Terms & Conditions', 20, y + 10);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const terms = `This insurance policy is subject to the terms and conditions as specified in the policy document. The coverage, exclusions, and claim procedures are detailed in the full policy document. Please read all terms carefully and maintain a copy of this document for your records.`;
  
  const splitTerms = pdf.splitTextToSize(terms, 170);
  pdf.text(splitTerms, 20, y + 20);

  // Add footer
  pdf.setFontSize(8);
  pdf.setTextColor(107, 114, 128);
  pdf.text('Generated on: ' + new Date().toLocaleDateString(), 20, 280);
  pdf.text('This is a computer generated document and does not require signature', 20, 285);

  return pdf;
};

// Add mock data
const insurancePolicies: InsurancePolicy[] = [
  {
    id: '1',
    type: 'health',
    name: 'Employee Group Health Insurance',
    company: 'National Insurance Company',
    policyNumber: 'GHIP-23456-789',
    sumInsured: 500000,
    premium: 12000,
    validFrom: '2023-04-01',
    validTo: '2024-03-31',
    status: 'Active'
  },
  {
    id: '2',
    type: 'life',
    name: 'Group Term Life Insurance',
    company: 'LIC of India',
    policyNumber: 'GTLI-45678-123',
    sumInsured: 2000000,
    premium: 5000,
    validFrom: '2023-04-01',
    validTo: '2024-03-31',
    status: 'Active'
  },
  {
    id: '3',
    type: 'accident',
    name: 'Group Personal Accident Insurance',
    company: 'ICICI Lombard',
    policyNumber: 'GPAI-78901-234',
    sumInsured: 1000000,
    premium: 2000,
    validFrom: '2023-04-01',
    validTo: '2024-03-31',
    status: 'Active'
  }
];

const StaffInsuranceDetails = () => {
  const [activeCategory, setActiveCategory] = useState<InsuranceCategory>('all');
  const [dependents, setDependents] = useState<Dependent[]>([
    { id: '1', name: "Priya Sharma", relation: "Spouse", status: 'Covered' },
    { id: '2', name: "Rahul Sharma", relation: "Son", status: 'Covered' },
    { id: '3', name: "Sita Sharma", relation: "Daughter", status: 'Covered' }
  ]);
  const [showAddDependentModal, setShowAddDependentModal] = useState(false);
  const [newDependent, setNewDependent] = useState({ name: '', relation: '' });
  const [selectedPolicy, setSelectedPolicy] = useState<InsurancePolicy | null>(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [downloading, setDownloading] = useState<DownloadStatus>({});
  const [showNewClaimModal, setShowNewClaimModal] = useState(false);
  const [claimForm, setClaimForm] = useState<ClaimForm>({
    policyType: 'health',
    patient: '',
    reason: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    documents: []
  });
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: "HC-45678-23",
      date: "2023-08-15",
      reason: "Hospitalization due to viral fever",
      amount: "₹75,000",
      status: "Approved"
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddDependent = (e: React.FormEvent) => {
    e.preventDefault();
    const dependent: Dependent = {
      id: (dependents.length + 1).toString(),
      name: newDependent.name,
      relation: newDependent.relation,
      status: 'Pending'
    };
    setDependents([...dependents, dependent]);
    setNewDependent({ name: '', relation: '' });
    setShowAddDependentModal(false);
  };

  const handleDownload = async (policy: InsurancePolicy) => {
    try {
      setDownloading(prev => ({ ...prev, [policy.id]: true }));
      
      // Generate and download PDF
      const pdf = generatePolicyPDF(policy);
      pdf.save(`${policy.type}_policy_${policy.policyNumber}.pdf`);
      
      toast({
        title: "Download Successful",
        description: `${policy.name} policy document has been downloaded.`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the policy document.",
        variant: "destructive",
      });
    } finally {
      setDownloading(prev => ({ ...prev, [policy.id]: false }));
    }
  };

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate new claim ID
    const newClaimId = `HC-${Math.floor(Math.random() * 90000) + 10000}-${new Date().getFullYear().toString().slice(2)}`;
    
    // Create new claim object
    const newClaim: Claim = {
      id: newClaimId,
      date: claimForm.date,
      reason: claimForm.reason,
      amount: `₹${parseInt(claimForm.amount).toLocaleString()}`,
      status: "Pending"
    };

    // Add new claim to claims array
    setClaims(prevClaims => [newClaim, ...prevClaims]);

    toast({
      title: "Claim Submitted Successfully",
      description: `Your claim for ${newClaim.amount} has been submitted and is under review.`,
    });

    setShowNewClaimModal(false);
    setClaimForm({
      policyType: 'health',
      patient: '',
      reason: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      documents: []
    });
  };

  const filteredPolicies = insurancePolicies.filter(policy => {
    const matchesCategory = activeCategory === 'all' ? true : policy.type === activeCategory;
    const matchesSearch = searchQuery.trim() === '' ? true : 
      policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.policyNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const PolicyDetailsModal = ({ policy }: { policy: InsurancePolicy }) => (
    <Dialog open={showPolicyModal} onOpenChange={setShowPolicyModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Policy Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Policy Information</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Policy Name</p>
                  <p className="font-medium">{policy.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Policy Number</p>
                  <p className="font-medium">{policy.policyNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Insurance Provider</p>
                  <p className="font-medium">{policy.company}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Coverage Details</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Sum Insured</p>
                  <p className="font-medium">₹{policy.sumInsured.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Premium Amount</p>
                  <p className="font-medium">₹{policy.premium.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Policy Period</p>
                  <p className="font-medium">{policy.validFrom} to {policy.validTo}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Terms & Conditions</h3>
            <p className="text-sm text-gray-600">
              This policy is subject to the terms and conditions as specified in the policy document. 
              Please refer to the policy document for detailed information about coverage, exclusions, 
              and claim procedures.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Insurance Details</h1>
        <div className="flex gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search policies..."
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="destructive" 
            className="gap-2"
            onClick={() => setShowNewClaimModal(true)}
          >
            <PlusCircle className="h-5 w-5" />
            New Claim
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">Insurance Categories</h2>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    activeCategory === 'all' ? 'bg-red-50 text-red-600' : ''
                  }`}
                  onClick={() => setActiveCategory('all')}
                >
                  <Shield className="h-5 w-5" />
                  All Policies
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    activeCategory === 'health' ? 'bg-red-50 text-red-600' : ''
                  }`}
                  onClick={() => setActiveCategory('health')}
                >
                  <Shield className="h-5 w-5" />
                  Health Insurance
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    activeCategory === 'life' ? 'bg-red-50 text-red-600' : ''
                  }`}
                  onClick={() => setActiveCategory('life')}
                >
                  <User className="h-5 w-5" />
                  Life Insurance
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    activeCategory === 'accident' ? 'bg-red-50 text-red-600' : ''
                  }`}
                  onClick={() => setActiveCategory('accident')}
                >
                  <Clock className="h-5 w-5" />
                  Accident Insurance
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Dependents</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowAddDependentModal(true)}
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                {dependents.map((dependent) => (
                  <div key={dependent.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{dependent.name}</p>
                      <p className="text-sm text-gray-500">{dependent.relation}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      dependent.status === 'Covered' 
                        ? 'text-green-700 bg-green-50'
                        : 'text-yellow-700 bg-yellow-50'
                    }`}>
                      {dependent.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-3 space-y-6">
          {filteredPolicies.map(policy => (
            <Card key={policy.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold">{policy.name}</h2>
                      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                        {policy.status}
                      </span>
                    </div>
                    <p className="text-gray-600">{policy.company}</p>
                    <p className="text-sm text-gray-500">Policy Number: {policy.policyNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">₹{policy.sumInsured.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Sum Insured</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedPolicy(policy);
                      setShowPolicyModal(true);
                    }}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    disabled={downloading[policy.id]}
                    onClick={() => handleDownload(policy)}
                  >
                    {downloading[policy.id] ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Claims History */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Claims History</h2>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3">CLAIM ID</th>
                    <th className="pb-3">DATE</th>
                    <th className="pb-3">REASON</th>
                    <th className="pb-3">AMOUNT</th>
                    <th className="pb-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {claims.map((claim) => (
                    <tr key={claim.id} className="border-b">
                      <td className="py-4 font-medium">{claim.id}</td>
                      <td className="py-4">{claim.date}</td>
                      <td className="py-4">{claim.reason}</td>
                      <td className="py-4">{claim.amount}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full
                          ${claim.status === 'Approved' ? 'text-green-700 bg-green-50' : 
                          claim.status === 'Pending' ? 'text-yellow-700 bg-yellow-50' :
                          'text-blue-700 bg-blue-50'}`}>
                          {claim.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Dependent Modal */}
      <Dialog open={showAddDependentModal} onOpenChange={setShowAddDependentModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Dependent</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddDependent} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newDependent.name}
                onChange={(e) => setNewDependent({ ...newDependent, name: e.target.value })}
                placeholder="Enter dependent's name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relation">Relation</Label>
              <Input
                id="relation"
                value={newDependent.relation}
                onChange={(e) => setNewDependent({ ...newDependent, relation: e.target.value })}
                placeholder="e.g., Spouse, Child"
                required
              />
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowAddDependentModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Dependent</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Policy Details Modal */}
      {selectedPolicy && <PolicyDetailsModal policy={selectedPolicy} />}

      {/* New Claim Modal */}
      <Dialog open={showNewClaimModal} onOpenChange={setShowNewClaimModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Submit New Claim</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitClaim} className="space-y-4">
            <div className="space-y-2">
              <Label>Insurance Type</Label>
              <div className="flex gap-4">
                {(['health', 'life', 'accident'] as const).map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={claimForm.policyType === type ? "default" : "outline"}
                    onClick={() => setClaimForm({ ...claimForm, policyType: type })}
                    className="flex-1"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="patient">Patient Name</Label>
              <Select
                value={claimForm.patient}
                onValueChange={(value) => setClaimForm({ ...claimForm, patient: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self">Self</SelectItem>
                  {dependents.map((dependent) => (
                    <SelectItem key={dependent.id} value={dependent.name}>
                      {dependent.name} ({dependent.relation})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Claim</Label>
              <Input
                id="reason"
                value={claimForm.reason}
                onChange={(e) => setClaimForm({ ...claimForm, reason: e.target.value })}
                placeholder="Enter reason for claim"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Claim Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={claimForm.amount}
                  onChange={(e) => setClaimForm({ ...claimForm, amount: e.target.value })}
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date of Incident</Label>
                <Input
                  id="date"
                  type="date"
                  value={claimForm.date}
                  onChange={(e) => setClaimForm({ ...claimForm, date: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="documents">Supporting Documents</Label>
              <Input
                id="documents"
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setClaimForm({ ...claimForm, documents: files });
                }}
                accept=".pdf,.jpg,.jpeg,.png"
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500">
                Supported formats: PDF, JPG, PNG. Max size: 5MB per file
              </p>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowNewClaimModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Claim</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffInsuranceDetails;
