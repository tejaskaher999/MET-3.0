import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Upload, Pencil, Trash2, Award } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Publication {
  id: number;
  title: string;
  type: string;
  journal: string;
  authors: string;
  year: number;
  status: string;
  impactFactor?: number;
  link?: string;
  abstract?: string;
}

interface Event {
  id: number;
  name: string;
  type: string;
  role: string;
  organizer: string;
  startDate: string;
  duration: string;
  venue: string;
  description: string;
  outcome: string;
}

interface Award {
  id: number;
  title: string;
  organization: string;
  date: string;
  level: string;
  description: string;
}

interface TeachingInnovation {
  id: number;
  title: string;
  description: string;
}

interface Course {
  id: number;
  name: string;
  class: string;
  semester: string;
  load: number;
}

interface Project {
  id: number;
  title: string;
  students: string;
  class: string;
  type: string;
  status: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  technologies?: string;
  outcome?: string;
}

const StaffProfessionalEndeavors = () => {
  const addPublicationRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPublicationId, setEditingPublicationId] = useState<number | null>(null);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [isAwardDialogOpen, setIsAwardDialogOpen] = useState(false);
  const [editingAwardId, setEditingAwardId] = useState<number | null>(null);
  const [isInnovationDialogOpen, setIsInnovationDialogOpen] = useState(false);
  const [editingInnovationId, setEditingInnovationId] = useState<number | null>(null);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [publications, setPublications] = useState<Publication[]>([
    {
      id: 1,
      title: "Optimizing Deep Learning Models for Edge Computing",
      type: "Journal Paper",
      journal: "IEEE Transactions on Neural Networks and Learning Systems",
      authors: "John Staff, David Wilson, Emma Thompson",
      year: 2023,
      status: "Published",
      impactFactor: 10.4,
      link: "https://doi.org/10.1109/TNNLS.2023.123456"
    },
    {
      id: 2,
      title: "A Novel Approach to Database Query Optimization Using Machine Learning",
      type: "Conference Paper",
      journal: "International Conference on Database Systems (ICDS 2022)",
      authors: "John Staff, Michael Chen",
      year: 2022,
      status: "Published",
      impactFactor: null,
      link: "https://doi.org/10.1145/ICDS.2022.987654"
    }
  ]);

  const [newPublication, setNewPublication] = useState({
    title: "",
    type: "",
    journal: "",
    authors: "",
    year: "",
    status: "",
    impactFactor: "",
    link: "",
    abstract: ""
  });

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: "International Conference on Advanced Computing",
      type: "Conference",
      role: "Paper Presenter",
      organizer: "IEEE Computer Society",
      startDate: "2023-02-15",
      duration: "3 days",
      venue: "Virtual Conference",
      description: "Advanced computing technologies and applications",
      outcome: "Presented research paper and networked with industry experts"
    },
    {
      id: 2,
      name: "Workshop on Deep Learning Applications",
      type: "Workshop",
      role: "Resource Person",
      organizer: "National Institute of Technology",
      startDate: "2022-11-10",
      duration: "2 days",
      venue: "NIT Campus",
      description: "Hands-on workshop on deep learning frameworks",
      outcome: "Conducted sessions on TensorFlow and PyTorch"
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    name: "",
    type: "",
    role: "",
    organizer: "",
    startDate: "",
    duration: "",
    venue: "",
    description: "",
    outcome: ""
  });

  const [awards, setAwards] = useState<Award[]>([
    {
      id: 1,
      title: "Best Teacher Award",
      organization: "University Education Society",
      date: "2022-05-15",
      level: "University",
      description: "Recognized for excellence in teaching and student mentoring."
    },
    {
      id: 2,
      title: "Outstanding Research Paper Award",
      organization: "International Conference on Advanced Computing",
      date: "2023-02-20",
      level: "International",
      description: "Awarded for the paper titled 'Optimizing Deep Learning Models for Edge Computing'."
    }
  ]);

  const [newAward, setNewAward] = useState({
    title: "",
    organization: "",
    date: "",
    level: "",
    description: ""
  });

  const [innovations, setInnovations] = useState<TeachingInnovation[]>([
    {
      id: 1,
      title: "Project-Based Learning in DBMS",
      description: "Implemented project-based learning approach in Database Management Systems course where students developed real-world database applications."
    },
    {
      id: 2,
      title: "Flipped Classroom for Web Development",
      description: "Adopted flipped classroom methodology for Web Development course with pre-recorded lectures and hands-on coding sessions during class time."
    }
  ]);

  const [newInnovation, setNewInnovation] = useState({
    title: "",
    description: ""
  });

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "Database Management Systems",
      class: "BCA Semester 4",
      semester: "Spring 2023",
      load: 6
    },
    {
      id: 2,
      name: "Advanced DBMS",
      class: "MCA Semester 2",
      semester: "Spring 2023",
      load: 4
    },
    {
      id: 3,
      name: "Web Development",
      class: "MCA Semester 2",
      semester: "Spring 2023",
      load: 6
    },
    {
      id: 4,
      name: "Software Engineering",
      class: "MCA Semester 1",
      semester: "Fall 2022",
      load: 4
    }
  ]);

  const [newCourse, setNewCourse] = useState({
    name: "",
    class: "",
    semester: "",
    load: ""
  });

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Smart Attendance System using Face Recognition",
      students: "John Student, Jane Student",
      class: "BCA Semester 6",
      type: "Final Year Project",
      status: "In Progress",
      description: "A system that uses facial recognition technology to automate attendance tracking in educational institutions.",
      startDate: "2023-01-15",
      technologies: "Python, OpenCV, TensorFlow, React, Node.js",
      outcome: "Expected to reduce manual attendance tracking time by 80%"
    },
    {
      id: 2,
      title: "Hospital Management System",
      students: "Alex Student",
      class: "MCA Semester 4",
      type: "Final Year Project",
      status: "Completed",
      description: "Comprehensive hospital management system for patient records, appointments, and inventory management.",
      startDate: "2022-08-01",
      endDate: "2023-01-15",
      technologies: "Java, Spring Boot, MySQL, React",
      outcome: "Successfully implemented and deployed in a local clinic"
    },
    {
      id: 3,
      title: "E-commerce Website with Recommendation System",
      students: "Sarah Student, Michael Student",
      class: "BCA Semester 6",
      type: "Final Year Project",
      status: "Completed",
      description: "E-commerce platform with personalized product recommendations using machine learning.",
      startDate: "2022-09-01",
      endDate: "2023-02-15",
      technologies: "Python, Django, PostgreSQL, React, TensorFlow",
      outcome: "Achieved 30% increase in customer engagement through recommendations"
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    students: "",
    class: "",
    type: "",
    status: "",
    description: "",
    startDate: "",
    endDate: "",
    technologies: "",
    outcome: ""
  });

  const scrollToAddPublication = () => {
    addPublicationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (field: string, value: string) => {
    setNewPublication(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSavePublication = () => {
    if (!newPublication.title || !newPublication.type || !newPublication.journal || 
        !newPublication.authors || !newPublication.year || !newPublication.status) {
      // You can add proper validation and error handling here
      return;
    }

    if (isEditMode && editingPublicationId) {
      // Update existing publication
      setPublications(prev => prev.map(pub => 
        pub.id === editingPublicationId ? {
          ...pub,
          title: newPublication.title,
          type: newPublication.type,
          journal: newPublication.journal,
          authors: newPublication.authors,
          year: parseInt(newPublication.year),
          status: newPublication.status,
          impactFactor: newPublication.impactFactor ? parseFloat(newPublication.impactFactor) : undefined,
          link: newPublication.link || undefined,
          abstract: newPublication.abstract
        } : pub
      ));
    } else {
      // Add new publication
      const publication: Publication = {
        id: publications.length + 1,
        title: newPublication.title,
        type: newPublication.type,
        journal: newPublication.journal,
        authors: newPublication.authors,
        year: parseInt(newPublication.year),
        status: newPublication.status,
        impactFactor: newPublication.impactFactor ? parseFloat(newPublication.impactFactor) : undefined,
        link: newPublication.link || undefined,
        abstract: newPublication.abstract
      };

      setPublications(prev => [...prev, publication]);
    }
    
    // Reset form and state
    setNewPublication({
      title: "",
      type: "",
      journal: "",
      authors: "",
      year: "",
      status: "",
      impactFactor: "",
      link: "",
      abstract: ""
    });
    
    setIsEditMode(false);
    setEditingPublicationId(null);
    setIsDialogOpen(false);
  };

  const handleEditPublication = (publication: Publication) => {
    setNewPublication({
      title: publication.title,
      type: publication.type,
      journal: publication.journal,
      authors: publication.authors,
      year: publication.year.toString(),
      status: publication.status,
      impactFactor: publication.impactFactor?.toString() || "",
      link: publication.link || "",
      abstract: publication.abstract || ""
    });
    
    setIsEditMode(true);
    setEditingPublicationId(publication.id);
    setIsDialogOpen(true);
  };

  const handleDeletePublication = (id: number) => {
    setPublications(prev => prev.filter(pub => pub.id !== id));
  };

  const handleCancel = () => {
    setNewPublication({
      title: "",
      type: "",
      journal: "",
      authors: "",
      year: "",
      status: "",
      impactFactor: "",
      link: "",
      abstract: ""
    });
    
    setIsEditMode(false);
    setEditingPublicationId(null);
    setIsDialogOpen(false);
  };

  const handleEventInputChange = (field: string, value: string) => {
    setNewEvent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEvent = () => {
    if (!newEvent.name || !newEvent.type || !newEvent.role || 
        !newEvent.organizer || !newEvent.startDate || !newEvent.duration) {
      return;
    }

    if (isEditMode && editingEventId) {
      setEvents(prev => prev.map(event => 
        event.id === editingEventId ? {
          ...event,
          name: newEvent.name,
          type: newEvent.type,
          role: newEvent.role,
          organizer: newEvent.organizer,
          startDate: newEvent.startDate,
          duration: newEvent.duration,
          venue: newEvent.venue,
          description: newEvent.description,
          outcome: newEvent.outcome
        } : event
      ));
    } else {
      const event: Event = {
        id: events.length + 1,
        name: newEvent.name,
        type: newEvent.type,
        role: newEvent.role,
        organizer: newEvent.organizer,
        startDate: newEvent.startDate,
        duration: newEvent.duration,
        venue: newEvent.venue,
        description: newEvent.description,
        outcome: newEvent.outcome
      };

      setEvents(prev => [...prev, event]);
    }
    
    setNewEvent({
      name: "",
      type: "",
      role: "",
      organizer: "",
      startDate: "",
      duration: "",
      venue: "",
      description: "",
      outcome: ""
    });
    
    setIsEditMode(false);
    setEditingEventId(null);
    setIsDialogOpen(false);
  };

  const handleEditEvent = (event: Event) => {
    setNewEvent({
      name: event.name,
      type: event.type,
      role: event.role,
      organizer: event.organizer,
      startDate: event.startDate,
      duration: event.duration,
      venue: event.venue,
      description: event.description,
      outcome: event.outcome
    });
    
    setIsEditMode(true);
    setEditingEventId(event.id);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const handleEventCancel = () => {
    setNewEvent({
      name: "",
      type: "",
      role: "",
      organizer: "",
      startDate: "",
      duration: "",
      venue: "",
      description: "",
      outcome: ""
    });
    
    setIsEditMode(false);
    setEditingEventId(null);
    setIsDialogOpen(false);
  };

  const handleAwardInputChange = (field: string, value: string) => {
    setNewAward(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAward = () => {
    if (!newAward.title || !newAward.organization || !newAward.date || !newAward.level) {
      return;
    }

    if (isEditMode && editingAwardId) {
      setAwards(prev => prev.map(award => 
        award.id === editingAwardId ? {
          ...award,
          title: newAward.title,
          organization: newAward.organization,
          date: newAward.date,
          level: newAward.level,
          description: newAward.description
        } : award
      ));
    } else {
      const award: Award = {
        id: awards.length + 1,
        title: newAward.title,
        organization: newAward.organization,
        date: newAward.date,
        level: newAward.level,
        description: newAward.description
      };

      setAwards(prev => [...prev, award]);
    }
    
    setNewAward({
      title: "",
      organization: "",
      date: "",
      level: "",
      description: ""
    });
    
    setIsEditMode(false);
    setEditingAwardId(null);
    setIsAwardDialogOpen(false);
  };

  const handleEditAward = (award: Award) => {
    setNewAward({
      title: award.title,
      organization: award.organization,
      date: award.date,
      level: award.level,
      description: award.description
    });
    
    setIsEditMode(true);
    setEditingAwardId(award.id);
    setIsAwardDialogOpen(true);
  };

  const handleDeleteAward = (id: number) => {
    setAwards(prev => prev.filter(award => award.id !== id));
  };

  const handleAwardCancel = () => {
    setNewAward({
      title: "",
      organization: "",
      date: "",
      level: "",
      description: ""
    });
    
    setIsEditMode(false);
    setEditingAwardId(null);
    setIsAwardDialogOpen(false);
  };

  const handleInnovationInputChange = (field: string, value: string) => {
    setNewInnovation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveInnovation = () => {
    if (!newInnovation.title || !newInnovation.description) {
      return;
    }

    if (isEditMode && editingInnovationId) {
      setInnovations(prev => prev.map(innovation => 
        innovation.id === editingInnovationId ? {
          ...innovation,
          title: newInnovation.title,
          description: newInnovation.description
        } : innovation
      ));
    } else {
      const innovation: TeachingInnovation = {
        id: innovations.length + 1,
        title: newInnovation.title,
        description: newInnovation.description
      };

      setInnovations(prev => [...prev, innovation]);
    }
    
    setNewInnovation({
      title: "",
      description: ""
    });
    
    setIsEditMode(false);
    setEditingInnovationId(null);
    setIsInnovationDialogOpen(false);
  };

  const handleEditInnovation = (innovation: TeachingInnovation) => {
    setNewInnovation({
      title: innovation.title,
      description: innovation.description
    });
    
    setIsEditMode(true);
    setEditingInnovationId(innovation.id);
    setIsInnovationDialogOpen(true);
  };

  const handleDeleteInnovation = (id: number) => {
    setInnovations(prev => prev.filter(innovation => innovation.id !== id));
  };

  const handleInnovationCancel = () => {
    setNewInnovation({
      title: "",
      description: ""
    });
    
    setIsEditMode(false);
    setEditingInnovationId(null);
    setIsInnovationDialogOpen(false);
  };

  const handleCourseInputChange = (field: string, value: string) => {
    setNewCourse(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveCourse = () => {
    if (!newCourse.name || !newCourse.class || !newCourse.semester || !newCourse.load) {
      return;
    }

    if (isEditMode && editingCourseId) {
      setCourses(prev => prev.map(course => 
        course.id === editingCourseId ? {
          ...course,
          name: newCourse.name,
          class: newCourse.class,
          semester: newCourse.semester,
          load: parseInt(newCourse.load)
        } : course
      ));
    } else {
      const course: Course = {
        id: courses.length + 1,
        name: newCourse.name,
        class: newCourse.class,
        semester: newCourse.semester,
        load: parseInt(newCourse.load)
      };

      setCourses(prev => [...prev, course]);
    }
    
    setNewCourse({
      name: "",
      class: "",
      semester: "",
      load: ""
    });
    
    setIsEditMode(false);
    setEditingCourseId(null);
    setIsCourseDialogOpen(false);
  };

  const handleEditCourse = (course: Course) => {
    setNewCourse({
      name: course.name,
      class: course.class,
      semester: course.semester,
      load: course.load.toString()
    });
    
    setIsEditMode(true);
    setEditingCourseId(course.id);
    setIsCourseDialogOpen(true);
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const handleCourseCancel = () => {
    setNewCourse({
      name: "",
      class: "",
      semester: "",
      load: ""
    });
    
    setIsEditMode(false);
    setEditingCourseId(null);
    setIsCourseDialogOpen(false);
  };

  const handleProjectInputChange = (field: string, value: string) => {
    setNewProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProject = () => {
    if (!newProject.title || !newProject.students || !newProject.class || 
        !newProject.type || !newProject.status) {
      return;
    }

    if (isEditMode && editingProjectId) {
      setProjects(prev => prev.map(project => 
        project.id === editingProjectId ? {
          ...project,
          ...newProject
        } : project
      ));
    } else {
      const project: Project = {
        id: projects.length + 1,
        ...newProject
      };

      setProjects(prev => [...prev, project]);
    }
    
    setNewProject({
      title: "",
      students: "",
      class: "",
      type: "",
      status: "",
      description: "",
      startDate: "",
      endDate: "",
      technologies: "",
      outcome: ""
    });
    
    setIsEditMode(false);
    setEditingProjectId(null);
    setIsProjectDialogOpen(false);
  };

  const handleEditProject = (project: Project) => {
    setNewProject({
      title: project.title,
      students: project.students,
      class: project.class,
      type: project.type,
      status: project.status,
      description: project.description || "",
      startDate: project.startDate || "",
      endDate: project.endDate || "",
      technologies: project.technologies || "",
      outcome: project.outcome || ""
    });
    
    setIsEditMode(true);
    setEditingProjectId(project.id);
    setIsProjectDialogOpen(true);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const handleProjectCancel = () => {
    setNewProject({
      title: "",
      students: "",
      class: "",
      type: "",
      status: "",
      description: "",
      startDate: "",
      endDate: "",
      technologies: "",
      outcome: ""
    });
    
    setIsEditMode(false);
    setEditingProjectId(null);
    setIsProjectDialogOpen(false);
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Professional Endeavors</h1>
      <p className="text-muted-foreground">Record your professional activities for self-appraisal.</p>
      
      <Tabs defaultValue="research">
        <TabsList>
          <TabsTrigger value="research">Research & Publications</TabsTrigger>
          <TabsTrigger value="conferences">Conferences & Workshops</TabsTrigger>
          <TabsTrigger value="teaching">Teaching Activities</TabsTrigger>
          <TabsTrigger value="awards">Awards & Recognitions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="research">
          <Card>
            <CardHeader>
              <CardTitle>Research & Publications</CardTitle>
              <CardDescription>Add your research papers, projects, and publications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-end">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Publication
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{isEditMode ? "Edit Publication" : "Add New Publication"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pubTitle">Publication Title</Label>
                          <Input 
                            id="pubTitle" 
                            placeholder="Enter title of your publication"
                            value={newPublication.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="pubType">Publication Type</Label>
                          <Select 
                            value={newPublication.type}
                            onValueChange={(value) => handleInputChange('type', value)}
                          >
                            <SelectTrigger id="pubType">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Journal Paper">Journal Paper</SelectItem>
                              <SelectItem value="Conference Paper">Conference Paper</SelectItem>
                              <SelectItem value="Book">Book</SelectItem>
                              <SelectItem value="Book Chapter">Book Chapter</SelectItem>
                              <SelectItem value="Patent">Patent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="pubJournal">Journal/Conference/Publisher</Label>
                          <Input 
                            id="pubJournal" 
                            placeholder="Name of journal, conference, or publisher"
                            value={newPublication.journal}
                            onChange={(e) => handleInputChange('journal', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="pubYear">Year</Label>
                          <Input 
                            id="pubYear" 
                            type="number" 
                            placeholder="Publication year"
                            value={newPublication.year}
                            onChange={(e) => handleInputChange('year', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="pubAuthors">Authors</Label>
                          <Input 
                            id="pubAuthors" 
                            placeholder="List all authors (comma separated)"
                            value={newPublication.authors}
                            onChange={(e) => handleInputChange('authors', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="pubStatus">Status</Label>
                          <Select 
                            value={newPublication.status}
                            onValueChange={(value) => handleInputChange('status', value)}
                          >
                            <SelectTrigger id="pubStatus">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Published">Published</SelectItem>
                              <SelectItem value="Accepted">Accepted</SelectItem>
                              <SelectItem value="Under Review">Under Review</SelectItem>
                              <SelectItem value="Submitted">Submitted</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="pubIF">Impact Factor (if applicable)</Label>
                          <Input 
                            id="pubIF" 
                            type="number" 
                            step="0.1" 
                            placeholder="e.g., 5.4"
                            value={newPublication.impactFactor}
                            onChange={(e) => handleInputChange('impactFactor', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="pubLink">DOI/URL (if available)</Label>
                          <Input 
                            id="pubLink" 
                            placeholder="Link to your publication"
                            value={newPublication.link}
                            onChange={(e) => handleInputChange('link', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pubAbstract">Abstract/Summary</Label>
                        <Textarea 
                          id="pubAbstract" 
                          rows={4} 
                          placeholder="Brief summary of your publication"
                          value={newPublication.abstract}
                          onChange={(e) => handleInputChange('abstract', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pubFile">Upload Publication (Optional)</Label>
                        <Input id="pubFile" type="file" />
                        <p className="text-xs text-muted-foreground">
                          Upload your publication PDF or supporting documents (Max: 10MB)
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                      <Button onClick={handleSavePublication}>
                        {isEditMode ? "Update Publication" : "Save Publication"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-4">
                {publications.map((publication) => (
                  <Card key={publication.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 mt-1 text-primary" />
                          <div>
                            <h3 className="font-semibold">{publication.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {publication.authors}
                            </p>
                            <p className="text-sm mt-1">
                              {publication.journal}, {publication.year}
                            </p>
                            {publication.link && (
                              <a 
                                href={publication.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-sm text-primary hover:underline mt-1 inline-block"
                              >
                                {publication.link}
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge variant={publication.status === "Published" ? "default" : "secondary"}>
                            {publication.status}
                          </Badge>
                          <span className="text-sm mt-1">{publication.type}</span>
                          {publication.impactFactor && (
                            <span className="text-sm font-medium mt-1">
                              IF: {publication.impactFactor}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditPublication(publication)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the publication.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeletePublication(publication.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conferences">
          <Card>
            <CardHeader>
              <CardTitle>Conferences & Workshops</CardTitle>
              <CardDescription>Record your participation in conferences, workshops, FDPs, etc.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{isEditMode ? "Edit Event" : "Add New Event"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="eventName">Event Name</Label>
                          <Input 
                            id="eventName" 
                            placeholder="Name of the conference/workshop"
                            value={newEvent.name}
                            onChange={(e) => handleEventInputChange('name', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="eventType">Event Type</Label>
                          <Select 
                            value={newEvent.type}
                            onValueChange={(value) => handleEventInputChange('type', value)}
                          >
                            <SelectTrigger id="eventType">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Conference">Conference</SelectItem>
                              <SelectItem value="Workshop">Workshop</SelectItem>
                              <SelectItem value="FDP">Faculty Development Program</SelectItem>
                              <SelectItem value="Seminar">Seminar</SelectItem>
                              <SelectItem value="Symposium">Symposium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="eventRole">Your Role</Label>
                          <Select 
                            value={newEvent.role}
                            onValueChange={(value) => handleEventInputChange('role', value)}
                          >
                            <SelectTrigger id="eventRole">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Paper Presenter">Paper Presenter</SelectItem>
                              <SelectItem value="Resource Person">Resource Person</SelectItem>
                              <SelectItem value="Session Chair">Session Chair</SelectItem>
                              <SelectItem value="Participant">Participant</SelectItem>
                              <SelectItem value="Organizer">Organizer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="eventOrganizer">Organizing Institution</Label>
                          <Input 
                            id="eventOrganizer" 
                            placeholder="Name of the organizing institution"
                            value={newEvent.organizer}
                            onChange={(e) => handleEventInputChange('organizer', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="eventStartDate">Start Date</Label>
                          <Input 
                            id="eventStartDate" 
                            type="date"
                            value={newEvent.startDate}
                            onChange={(e) => handleEventInputChange('startDate', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="eventDuration">Duration</Label>
                          <Input 
                            id="eventDuration" 
                            placeholder="e.g., 2 days, 1 week"
                            value={newEvent.duration}
                            onChange={(e) => handleEventInputChange('duration', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="eventVenue">Venue/Location</Label>
                          <Input 
                            id="eventVenue" 
                            placeholder="Physical venue or online platform"
                            value={newEvent.venue}
                            onChange={(e) => handleEventInputChange('venue', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="eventDescription">Description/Topics Covered</Label>
                        <Textarea 
                          id="eventDescription" 
                          rows={3} 
                          placeholder="Brief description of the event and topics covered"
                          value={newEvent.description}
                          onChange={(e) => handleEventInputChange('description', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="eventOutcome">Learning Outcome/Contribution</Label>
                        <Textarea 
                          id="eventOutcome" 
                          rows={3} 
                          placeholder="What did you learn or contribute to this event?"
                          value={newEvent.outcome}
                          onChange={(e) => handleEventInputChange('outcome', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="eventCertificate">Upload Certificate (Optional)</Label>
                        <Input id="eventCertificate" type="file" />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={handleEventCancel}>Cancel</Button>
                      <Button onClick={handleSaveEvent}>
                        {isEditMode ? "Update Event" : "Save Event"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Organizer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>{event.type}</TableCell>
                      <TableCell>{event.role}</TableCell>
                      <TableCell>{event.organizer}</TableCell>
                      <TableCell>{new Date(event.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{event.duration}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditEvent(event)}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the event.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teaching">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Activities</CardTitle>
              <CardDescription>Record your teaching responsibilities and innovations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Courses Taught</CardTitle>
                    <CardDescription className="text-sm">Current academic year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-x-auto rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">Course Name</TableHead>
                            <TableHead className="font-semibold">Class</TableHead>
                            <TableHead className="font-semibold">Semester</TableHead>
                            <TableHead className="font-semibold">Load (hrs/week)</TableHead>
                            <TableHead className="text-right font-semibold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {courses.map((course) => (
                            <TableRow key={course.id} className="hover:bg-muted/30 transition-colors">
                              <TableCell className="font-medium">{course.name}</TableCell>
                              <TableCell>{course.class}</TableCell>
                              <TableCell>{course.semester}</TableCell>
                              <TableCell>{course.load}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleEditCourse(course)}
                                    className="hover:bg-primary/10"
                                  >
                                    <Pencil className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                      >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Delete
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete the course.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                          onClick={() => handleDeleteCourse(course.id)}
                                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Dialog open={isCourseDialogOpen} onOpenChange={setIsCourseDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Course
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{isEditMode ? "Edit Course" : "Add New Course"}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="courseName">Course Name</Label>
                                <Input 
                                  id="courseName" 
                                  placeholder="Enter course name"
                                  value={newCourse.name}
                                  onChange={(e) => handleCourseInputChange('name', e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="courseClass">Class</Label>
                                <Input 
                                  id="courseClass" 
                                  placeholder="e.g., BCA Semester 4"
                                  value={newCourse.class}
                                  onChange={(e) => handleCourseInputChange('class', e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="courseSemester">Semester</Label>
                                <Input 
                                  id="courseSemester" 
                                  placeholder="e.g., Spring 2023"
                                  value={newCourse.semester}
                                  onChange={(e) => handleCourseInputChange('semester', e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="courseLoad">Load (hrs/week)</Label>
                                <Input 
                                  id="courseLoad" 
                                  type="number" 
                                  placeholder="Enter weekly hours"
                                  value={newCourse.load}
                                  onChange={(e) => handleCourseInputChange('load', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={handleCourseCancel}>Cancel</Button>
                            <Button onClick={handleSaveCourse}>
                              {isEditMode ? "Update Course" : "Save Course"}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Teaching Innovations</CardTitle>
                    <CardDescription className="text-sm">New methods or technologies implemented</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {innovations.map((innovation) => (
                      <div 
                        key={innovation.id} 
                        className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
                      >
                        <h3 className="font-semibold text-lg mb-2">{innovation.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {innovation.description}
                        </p>
                        <div className="flex justify-end gap-2 mt-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditInnovation(innovation)}
                            className="hover:bg-primary/10"
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the teaching innovation.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteInnovation(innovation.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-end mt-2">
                      <Dialog open={isInnovationDialogOpen} onOpenChange={setIsInnovationDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Innovation
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{isEditMode ? "Edit Teaching Innovation" : "Add New Teaching Innovation"}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="innovationTitle">Innovation Title</Label>
                              <Input 
                                id="innovationTitle" 
                                placeholder="Title of your teaching innovation"
                                value={newInnovation.title}
                                onChange={(e) => handleInnovationInputChange('title', e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="innovationDesc">Description</Label>
                              <Textarea 
                                id="innovationDesc" 
                                rows={4} 
                                placeholder="Describe your teaching innovation and its impact"
                                value={newInnovation.description}
                                onChange={(e) => handleInnovationInputChange('description', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={handleInnovationCancel}>Cancel</Button>
                            <Button onClick={handleSaveInnovation}>
                              {isEditMode ? "Update Innovation" : "Save Innovation"}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Student Mentoring & Projects</CardTitle>
                    <CardDescription className="text-sm">Record of student mentoring and project guidance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-x-auto rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">Project Title</TableHead>
                            <TableHead className="font-semibold">Student(s)</TableHead>
                            <TableHead className="font-semibold">Class</TableHead>
                            <TableHead className="font-semibold">Type</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="text-right font-semibold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {projects.map((project) => (
                            <TableRow key={project.id} className="hover:bg-muted/30 transition-colors">
                              <TableCell className="font-medium">{project.title}</TableCell>
                              <TableCell>{project.students}</TableCell>
                              <TableCell>{project.class}</TableCell>
                              <TableCell>{project.type}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={project.status === "Completed" ? "default" : "secondary"}
                                  className="font-medium"
                                >
                                  {project.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleViewProject(project)}
                                    className="hover:bg-primary/10"
                                  >
                                    View Details
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleEditProject(project)}
                                    className="hover:bg-primary/10"
                                  >
                                    <Pencil className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                      >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Delete
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete the project.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                          onClick={() => handleDeleteProject(project.id)}
                                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Project
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{isEditMode ? "Edit Project" : "Add New Project"}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="projectTitle">Project Title</Label>
                                <Input 
                                  id="projectTitle" 
                                  placeholder="Enter project title"
                                  value={newProject.title}
                                  onChange={(e) => handleProjectInputChange('title', e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="projectStudents">Student(s)</Label>
                                <Input 
                                  id="projectStudents" 
                                  placeholder="Enter student names (comma separated)"
                                  value={newProject.students}
                                  onChange={(e) => handleProjectInputChange('students', e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="projectClass">Class</Label>
                                <Input 
                                  id="projectClass" 
                                  placeholder="e.g., BCA Semester 6"
                                  value={newProject.class}
                                  onChange={(e) => handleProjectInputChange('class', e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="projectType">Type</Label>
                                <Select 
                                  value={newProject.type}
                                  onValueChange={(value) => handleProjectInputChange('type', value)}
                                >
                                  <SelectTrigger id="projectType">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Final Year Project">Final Year Project</SelectItem>
                                    <SelectItem value="Mini Project">Mini Project</SelectItem>
                                    <SelectItem value="Research Project">Research Project</SelectItem>
                                    <SelectItem value="Internship Project">Internship Project</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="projectStatus">Status</Label>
                                <Select 
                                  value={newProject.status}
                                  onValueChange={(value) => handleProjectInputChange('status', value)}
                                >
                                  <SelectTrigger id="projectStatus">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="On Hold">On Hold</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="projectStartDate">Start Date</Label>
                                <Input 
                                  id="projectStartDate" 
                                  type="date"
                                  value={newProject.startDate}
                                  onChange={(e) => handleProjectInputChange('startDate', e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="projectEndDate">End Date (if completed)</Label>
                                <Input 
                                  id="projectEndDate" 
                                  type="date"
                                  value={newProject.endDate}
                                  onChange={(e) => handleProjectInputChange('endDate', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="projectDescription">Description</Label>
                              <Textarea 
                                id="projectDescription" 
                                rows={3} 
                                placeholder="Brief description of the project"
                                value={newProject.description}
                                onChange={(e) => handleProjectInputChange('description', e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="projectTechnologies">Technologies Used</Label>
                              <Input 
                                id="projectTechnologies" 
                                placeholder="List of technologies used (comma separated)"
                                value={newProject.technologies}
                                onChange={(e) => handleProjectInputChange('technologies', e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="projectOutcome">Outcome/Results</Label>
                              <Textarea 
                                id="projectOutcome" 
                                rows={2} 
                                placeholder="Project outcomes or results"
                                value={newProject.outcome}
                                onChange={(e) => handleProjectInputChange('outcome', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={handleProjectCancel}>Cancel</Button>
                            <Button onClick={handleSaveProject}>
                              {isEditMode ? "Update Project" : "Save Project"}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="awards">
          <Card>
            <CardHeader>
              <CardTitle>Awards & Recognitions</CardTitle>
              <CardDescription>Record your achievements, awards, and honors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Dialog open={isAwardDialogOpen} onOpenChange={setIsAwardDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Award
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{isEditMode ? "Edit Award" : "Add New Award or Recognition"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="awardTitle">Award/Recognition Title</Label>
                          <Input 
                            id="awardTitle" 
                            placeholder="Title of the award or recognition"
                            value={newAward.title}
                            onChange={(e) => handleAwardInputChange('title', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="awardOrg">Awarding Organization</Label>
                          <Input 
                            id="awardOrg" 
                            placeholder="Name of the organization"
                            value={newAward.organization}
                            onChange={(e) => handleAwardInputChange('organization', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="awardDate">Date Received</Label>
                          <Input 
                            id="awardDate" 
                            type="date"
                            value={newAward.date}
                            onChange={(e) => handleAwardInputChange('date', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="awardLevel">Level</Label>
                          <Select 
                            value={newAward.level}
                            onValueChange={(value) => handleAwardInputChange('level', value)}
                          >
                            <SelectTrigger id="awardLevel">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="International">International</SelectItem>
                              <SelectItem value="National">National</SelectItem>
                              <SelectItem value="State">State</SelectItem>
                              <SelectItem value="University">University</SelectItem>
                              <SelectItem value="Institute">Institute</SelectItem>
                              <SelectItem value="Department">Department</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="awardDesc">Description</Label>
                        <Textarea 
                          id="awardDesc" 
                          rows={3} 
                          placeholder="Briefly describe the award and its significance"
                          value={newAward.description}
                          onChange={(e) => handleAwardInputChange('description', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="awardCertificate">Upload Certificate (Optional)</Label>
                        <Input id="awardCertificate" type="file" />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={handleAwardCancel}>Cancel</Button>
                      <Button onClick={handleSaveAward}>
                        {isEditMode ? "Update Award" : "Save Award"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-4">
                {awards.map((award) => (
                  <Card key={award.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <Award className="h-5 w-5 mt-1 text-primary" />
                          <div>
                            <h3 className="font-semibold">{award.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {award.organization}
                            </p>
                            <p className="text-sm mt-1">
                              {new Date(award.date).toLocaleDateString()}
                            </p>
                            <Badge variant="outline" className="mt-1">
                              {award.level}
                            </Badge>
                            <p className="text-sm mt-2">
                              {award.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditAward(award)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the award.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteAward(award.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <p className="font-medium">{selectedProject.title}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Student(s)</Label>
                  <p>{selectedProject.students}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Class</Label>
                  <p>{selectedProject.class}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Type</Label>
                  <p>{selectedProject.type}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Badge variant={selectedProject.status === "Completed" ? "default" : "secondary"}>
                    {selectedProject.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <p>{selectedProject.startDate ? new Date(selectedProject.startDate).toLocaleDateString() : "Not specified"}</p>
                </div>
                
                {selectedProject.endDate && (
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <p>{new Date(selectedProject.endDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              
              {selectedProject.description && (
                <div className="space-y-2">
                  <Label>Description</Label>
                  <p className="text-sm">{selectedProject.description}</p>
                </div>
              )}
              
              {selectedProject.technologies && (
                <div className="space-y-2">
                  <Label>Technologies Used</Label>
                  <p className="text-sm">{selectedProject.technologies}</p>
                </div>
              )}
              
              {selectedProject.outcome && (
                <div className="space-y-2">
                  <Label>Outcome/Results</Label>
                  <p className="text-sm">{selectedProject.outcome}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffProfessionalEndeavors;
