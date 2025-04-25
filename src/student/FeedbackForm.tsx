import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star, ThumbsUp, ThumbsDown, Meh, Smile, Frown, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  course: string;
  faculty: string;
  ratings: {
    [key: string]: {
      [key: string]: string;
    };
  };
  strengths: string;
  improvements: string;
  additionalComments: string;
  facilityType: string;
  facilityRatings: {
    [key: string]: string;
  };
  facilityLikes: string;
  facilityImprovements: string;
  facilityComments: string;
}

const initialFormData: FormData = {
  course: "",
  faculty: "",
  ratings: {},
  strengths: "",
  improvements: "",
  additionalComments: "",
  facilityType: "",
  facilityRatings: {},
  facilityLikes: "",
  facilityImprovements: "",
  facilityComments: "",
};

const feedbackCategories = [
  {
    category: "Teaching Quality",
    questions: [
      "The instructor was well prepared for each class",
      "The instructor explained concepts clearly",
      "The instructor encouraged classroom participation",
      "The instructor was available for consultation outside class hours",
      "The instructor provided timely feedback on assignments and exams"
    ]
  },
  {
    category: "Course Content",
    questions: [
      "The course objectives were clearly defined",
      "The course materials were well organized",
      "The course workload was appropriate",
      "The course assignments helped in understanding the concepts",
      "The assessment methods were fair and appropriate"
    ]
  },
  {
    category: "Infrastructure",
    questions: [
      "The classrooms were well equipped for teaching",
      "The laboratory facilities were adequate",
      "The library resources were sufficient",
      "The IT infrastructure was reliable",
      "The campus facilities were well maintained"
    ]
  }
];

const RatingOption = ({ value, label, icon: Icon, isSelected }: { value: string; label: string; icon: any; isSelected: boolean }) => (
  <div className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
    isSelected 
      ? 'border-primary bg-primary/10 text-primary' 
      : 'border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5'
  }`}>
    <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const StudentFeedbackForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [activeTab, setActiveTab] = useState("course");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleRatingChange = (category: string, question: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: {
          ...prev.ratings[category],
          [question]: value
        }
      }
    }));
  };

  const handleFacilityRatingChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      facilityRatings: {
        ...prev.facilityRatings,
        [id]: value
      }
    }));
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (activeTab === "course") {
      if (!formData.course || !formData.faculty) {
        toast({
          title: "Validation Error",
          description: "Please select both course and faculty",
          variant: "destructive",
        });
        return false;
      }
      
      // Check if all questions are answered
      for (const category of feedbackCategories) {
        for (const question of category.questions) {
          if (!formData.ratings[category.category]?.[question]) {
            toast({
              title: "Validation Error",
              description: `Please answer all questions in ${category.category}`,
              variant: "destructive",
            });
            return false;
          }
        }
      }
    } else {
      if (!formData.facilityType) {
        toast({
          title: "Validation Error",
          description: "Please select a facility",
          variant: "destructive",
        });
        return false;
      }
      
      // Check if all facility ratings are answered
      const facilityQuestions = ["f1", "f2", "f3"];
      for (const id of facilityQuestions) {
        if (!formData.facilityRatings[id]) {
          toast({
            title: "Validation Error",
            description: "Please rate all aspects of the facility",
            variant: "destructive",
          });
          return false;
        }
      }
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: "Your feedback has been submitted successfully",
      });
      
      // Reset form
      setFormData(initialFormData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-primary">Feedback Form</h1>
        <p className="text-muted-foreground mt-2">Share your feedback to help us improve our services.</p>
      </motion.div>
      
      <Tabs defaultValue="course" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="course" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Course Feedback
          </TabsTrigger>
          <TabsTrigger value="facilities" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Facilities Feedback
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="course">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-primary/5 rounded-t-lg">
                <CardTitle className="text-2xl">Course and Faculty Feedback</CardTitle>
                <CardDescription className="text-base">Please provide your honest feedback for the current semester</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="course" className="text-base">Select Course</Label>
                    <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)}>
                      <SelectTrigger id="course" className="h-12">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dbms">Database Management Systems</SelectItem>
                        <SelectItem value="os">Operating Systems</SelectItem>
                        <SelectItem value="cn">Computer Networks</SelectItem>
                        <SelectItem value="dsa">Data Structures and Algorithms</SelectItem>
                        <SelectItem value="se">Software Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="faculty" className="text-base">Select Faculty</Label>
                    <Select value={formData.faculty} onValueChange={(value) => handleInputChange("faculty", value)}>
                      <SelectTrigger id="faculty" className="h-12">
                        <SelectValue placeholder="Select faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prof1">Prof. Sarah Johnson</SelectItem>
                        <SelectItem value="prof2">Dr. Michael Chen</SelectItem>
                        <SelectItem value="prof3">Prof. David Wilson</SelectItem>
                        <SelectItem value="prof4">Dr. Emma Thompson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {feedbackCategories.map((category, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="space-y-4 mt-6 p-4 bg-muted/30 rounded-lg"
                  >
                    <h3 className="font-semibold text-lg text-primary">{category.category}</h3>
                    
                    {category.questions.map((question, qIdx) => (
                      <div key={qIdx} className="space-y-3">
                        <Label className="text-base">{question}</Label>
                        <RadioGroup 
                          value={formData.ratings[category.category]?.[question] || ""} 
                          onValueChange={(value) => handleRatingChange(category.category, question, value)}
                          className="grid grid-cols-5 gap-2"
                        >
                          <RadioGroupItem value="1" id={`q${idx}-${qIdx}-1`} className="peer sr-only" />
                          <Label htmlFor={`q${idx}-${qIdx}-1`} className="cursor-pointer">
                            <RatingOption
                              value="1"
                              label="Poor"
                              icon={Frown}
                              isSelected={formData.ratings[category.category]?.[question] === "1"}
                            />
                          </Label>
                          
                          <RadioGroupItem value="2" id={`q${idx}-${qIdx}-2`} className="peer sr-only" />
                          <Label htmlFor={`q${idx}-${qIdx}-2`} className="cursor-pointer">
                            <RatingOption
                              value="2"
                              label="Fair"
                              icon={Meh}
                              isSelected={formData.ratings[category.category]?.[question] === "2"}
                            />
                          </Label>
                          
                          <RadioGroupItem value="3" id={`q${idx}-${qIdx}-3`} className="peer sr-only" />
                          <Label htmlFor={`q${idx}-${qIdx}-3`} className="cursor-pointer">
                            <RatingOption
                              value="3"
                              label="Good"
                              icon={Smile}
                              isSelected={formData.ratings[category.category]?.[question] === "3"}
                            />
                          </Label>
                          
                          <RadioGroupItem value="4" id={`q${idx}-${qIdx}-4`} className="peer sr-only" />
                          <Label htmlFor={`q${idx}-${qIdx}-4`} className="cursor-pointer">
                            <RatingOption
                              value="4"
                              label="Very Good"
                              icon={ThumbsUp}
                              isSelected={formData.ratings[category.category]?.[question] === "4"}
                            />
                          </Label>
                          
                          <RadioGroupItem value="5" id={`q${idx}-${qIdx}-5`} className="peer sr-only" />
                          <Label htmlFor={`q${idx}-${qIdx}-5`} className="cursor-pointer">
                            <RatingOption
                              value="5"
                              label="Excellent"
                              icon={Star}
                              isSelected={formData.ratings[category.category]?.[question] === "5"}
                            />
                          </Label>
                        </RadioGroup>
                      </div>
                    ))}
                  </motion.div>
                ))}
                
                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="strengths" className="text-base">What were the strengths of this course?</Label>
                    <Textarea
                      id="strengths"
                      value={formData.strengths}
                      onChange={(e) => handleInputChange("strengths", e.target.value)}
                      rows={3}
                      placeholder="Please share what you liked about this course"
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="improvements" className="text-base">What aspects of this course could be improved?</Label>
                    <Textarea
                      id="improvements"
                      value={formData.improvements}
                      onChange={(e) => handleInputChange("improvements", e.target.value)}
                      rows={3}
                      placeholder="Please suggest areas for improvement"
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additionalComments" className="text-base">Additional Comments</Label>
                    <Textarea
                      id="additionalComments"
                      value={formData.additionalComments}
                      onChange={(e) => handleInputChange("additionalComments", e.target.value)}
                      rows={3}
                      placeholder="Any other feedback you would like to share"
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-primary/5 p-6 rounded-b-lg">
                <Button 
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="facilities">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-primary/5 rounded-t-lg">
                <CardTitle className="text-2xl">Facilities Feedback</CardTitle>
                <CardDescription className="text-base">Help us improve our campus facilities and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="facilityType" className="text-base">Select Facility</Label>
                  <Select value={formData.facilityType} onValueChange={(value) => handleInputChange("facilityType", value)}>
                    <SelectTrigger id="facilityType" className="h-12">
                      <SelectValue placeholder="Select facility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="library">Library</SelectItem>
                      <SelectItem value="labs">Computer Labs</SelectItem>
                      <SelectItem value="canteen">Canteen</SelectItem>
                      <SelectItem value="sports">Sports Facilities</SelectItem>
                      <SelectItem value="hostel">Hostel</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-6 mt-4">
                  {[
                    { label: "Rate the cleanliness and maintenance", id: "f1" },
                    { label: "Rate the availability and accessibility", id: "f2" },
                    { label: "Rate the staff assistance and support", id: "f3" }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="space-y-3 p-4 bg-muted/30 rounded-lg"
                    >
                      <Label className="text-base">{item.label}</Label>
                      <RadioGroup 
                        value={formData.facilityRatings[item.id] || ""} 
                        onValueChange={(value) => handleFacilityRatingChange(item.id, value)}
                        className="grid grid-cols-5 gap-2"
                      >
                        <RadioGroupItem value="1" id={`${item.id}-1`} className="peer sr-only" />
                        <Label htmlFor={`${item.id}-1`} className="cursor-pointer">
                          <RatingOption
                            value="1"
                            label="Poor"
                            icon={Frown}
                            isSelected={formData.facilityRatings[item.id] === "1"}
                          />
                        </Label>
                        
                        <RadioGroupItem value="2" id={`${item.id}-2`} className="peer sr-only" />
                        <Label htmlFor={`${item.id}-2`} className="cursor-pointer">
                          <RatingOption
                            value="2"
                            label="Fair"
                            icon={Meh}
                            isSelected={formData.facilityRatings[item.id] === "2"}
                          />
                        </Label>
                        
                        <RadioGroupItem value="3" id={`${item.id}-3`} className="peer sr-only" />
                        <Label htmlFor={`${item.id}-3`} className="cursor-pointer">
                          <RatingOption
                            value="3"
                            label="Good"
                            icon={Smile}
                            isSelected={formData.facilityRatings[item.id] === "3"}
                          />
                        </Label>
                        
                        <RadioGroupItem value="4" id={`${item.id}-4`} className="peer sr-only" />
                        <Label htmlFor={`${item.id}-4`} className="cursor-pointer">
                          <RatingOption
                            value="4"
                            label="Very Good"
                            icon={ThumbsUp}
                            isSelected={formData.facilityRatings[item.id] === "4"}
                          />
                        </Label>
                        
                        <RadioGroupItem value="5" id={`${item.id}-5`} className="peer sr-only" />
                        <Label htmlFor={`${item.id}-5`} className="cursor-pointer">
                          <RatingOption
                            value="5"
                            label="Excellent"
                            icon={Star}
                            isSelected={formData.facilityRatings[item.id] === "5"}
                          />
                        </Label>
                      </RadioGroup>
                    </motion.div>
                  ))}
                </div>
                
                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="facilityLikes" className="text-base">What do you like about this facility?</Label>
                    <Textarea
                      id="facilityLikes"
                      value={formData.facilityLikes}
                      onChange={(e) => handleInputChange("facilityLikes", e.target.value)}
                      rows={3}
                      placeholder="Please share what works well"
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="facilityImprovements" className="text-base">What improvements would you suggest?</Label>
                    <Textarea
                      id="facilityImprovements"
                      value={formData.facilityImprovements}
                      onChange={(e) => handleInputChange("facilityImprovements", e.target.value)}
                      rows={3}
                      placeholder="Please suggest specific improvements"
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="facilityComments" className="text-base">Additional Comments</Label>
                    <Textarea
                      id="facilityComments"
                      value={formData.facilityComments}
                      onChange={(e) => handleInputChange("facilityComments", e.target.value)}
                      rows={3}
                      placeholder="Any other feedback about campus facilities"
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-primary/5 p-6 rounded-b-lg">
                <Button 
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentFeedbackForm; 