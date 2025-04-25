
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Search } from "lucide-react";

const StaffStudentTimetable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["9:00 - 10:30", "10:45 - 12:15", "1:00 - 2:30", "2:45 - 4:15", "4:30 - 6:00"];
  
  const classSchedule = {
    "BCA Semester 4": {
      "Monday": {
        "9:00 - 10:30": { subject: "Database Management", faculty: "Dr. John Staff", room: "302" },
        "10:45 - 12:15": { subject: "Computer Networks", faculty: "Prof. David Wilson", room: "301" },
        "1:00 - 2:30": { subject: "Mathematics", faculty: "Dr. Priya Sharma", room: "201" },
        "2:45 - 4:15": { subject: "", faculty: "", room: "" },
        "4:30 - 6:00": { subject: "", faculty: "", room: "" }
      },
      "Tuesday": {
        "9:00 - 10:30": { subject: "Operating Systems", faculty: "Dr. Michael Chen", room: "302" },
        "10:45 - 12:15": { subject: "Software Engineering", faculty: "Prof. Emma Thompson", room: "301" },
        "1:00 - 2:30": { subject: "", faculty: "", room: "" },
        "2:45 - 4:15": { subject: "Database Lab", faculty: "Dr. John Staff", room: "Lab 1" },
        "4:30 - 6:00": { subject: "Database Lab", faculty: "Dr. John Staff", room: "Lab 1" }
      },
      "Wednesday": {
        "9:00 - 10:30": { subject: "Computer Networks", faculty: "Prof. David Wilson", room: "301" },
        "10:45 - 12:15": { subject: "Operating Systems", faculty: "Dr. Michael Chen", room: "302" },
        "1:00 - 2:30": { subject: "Soft Skills", faculty: "Ms. Sarah Adams", room: "Seminar Hall" },
        "2:45 - 4:15": { subject: "", faculty: "", room: "" },
        "4:30 - 6:00": { subject: "", faculty: "", room: "" }
      },
      "Thursday": {
        "9:00 - 10:30": { subject: "Database Management", faculty: "Dr. John Staff", room: "302" },
        "10:45 - 12:15": { subject: "Mathematics", faculty: "Dr. Priya Sharma", room: "201" },
        "1:00 - 2:30": { subject: "Software Engineering", faculty: "Prof. Emma Thompson", room: "301" },
        "2:45 - 4:15": { subject: "Network Lab", faculty: "Prof. David Wilson", room: "Lab 2" },
        "4:30 - 6:00": { subject: "Network Lab", faculty: "Prof. David Wilson", room: "Lab 2" }
      },
      "Friday": {
        "9:00 - 10:30": { subject: "Mathematics", faculty: "Dr. Priya Sharma", room: "201" },
        "10:45 - 12:15": { subject: "Database Management", faculty: "Dr. John Staff", room: "302" },
        "1:00 - 2:30": { subject: "Operating Systems", faculty: "Dr. Michael Chen", room: "302" },
        "2:45 - 4:15": { subject: "OS Lab", faculty: "Dr. Michael Chen", room: "Lab 3" },
        "4:30 - 6:00": { subject: "OS Lab", faculty: "Dr. Michael Chen", room: "Lab 3" }
      }
    },
    "MCA Semester 2": {
      "Monday": {
        "9:00 - 10:30": { subject: "Advanced Algorithms", faculty: "Prof. Emma Thompson", room: "401" },
        "10:45 - 12:15": { subject: "Web Development", faculty: "Dr. John Staff", room: "Lab 1" },
        "1:00 - 2:30": { subject: "Advanced DBMS", faculty: "Dr. John Staff", room: "402" },
        "2:45 - 4:15": { subject: "Research Methodology", faculty: "Dr. Alex Johnson", room: "Seminar Hall" },
        "4:30 - 6:00": { subject: "", faculty: "", room: "" }
      },
      "Tuesday": {
        "9:00 - 10:30": { subject: "Data Mining", faculty: "Dr. Priya Sharma", room: "401" },
        "10:45 - 12:15": { subject: "Computer Graphics", faculty: "Prof. David Wilson", room: "402" },
        "1:00 - 2:30": { subject: "Advanced Algorithms", faculty: "Prof. Emma Thompson", room: "401" },
        "2:45 - 4:15": { subject: "Computer Graphics Lab", faculty: "Prof. David Wilson", room: "Lab 4" },
        "4:30 - 6:00": { subject: "Computer Graphics Lab", faculty: "Prof. David Wilson", room: "Lab 4" }
      },
      "Wednesday": {
        "9:00 - 10:30": { subject: "Advanced DBMS", faculty: "Dr. John Staff", room: "402" },
        "10:45 - 12:15": { subject: "Data Mining", faculty: "Dr. Priya Sharma", room: "401" },
        "1:00 - 2:30": { subject: "Computer Graphics", faculty: "Prof. David Wilson", room: "402" },
        "2:45 - 4:15": { subject: "Algorithm Lab", faculty: "Prof. Emma Thompson", room: "Lab 3" },
        "4:30 - 6:00": { subject: "Algorithm Lab", faculty: "Prof. Emma Thompson", room: "Lab 3" }
      },
      "Thursday": {
        "9:00 - 10:30": { subject: "Computer Graphics", faculty: "Prof. David Wilson", room: "402" },
        "10:45 - 12:15": { subject: "Advanced DBMS", faculty: "Dr. John Staff", room: "401" },
        "1:00 - 2:30": { subject: "Data Mining", faculty: "Dr. Priya Sharma", room: "401" },
        "2:45 - 4:15": { subject: "DBMS Lab", faculty: "Dr. John Staff", room: "Lab 1" },
        "4:30 - 6:00": { subject: "DBMS Lab", faculty: "Dr. John Staff", room: "Lab 1" }
      },
      "Friday": {
        "9:00 - 10:30": { subject: "Research Methodology", faculty: "Dr. Alex Johnson", room: "Seminar Hall" },
        "10:45 - 12:15": { subject: "Web Development", faculty: "Dr. John Staff", room: "Lab 1" },
        "1:00 - 2:30": { subject: "Web Development", faculty: "Dr. John Staff", room: "Lab 1" },
        "2:45 - 4:15": { subject: "Advanced Algorithms", faculty: "Prof. Emma Thompson", room: "401" },
        "4:30 - 6:00": { subject: "", faculty: "", room: "" }
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Student Timetable</h1>
      <p className="text-muted-foreground">View class timetables and search for student schedules.</p>
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Search Student Timetable</CardTitle>
            <CardDescription>Search by student name, ID, or class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="searchTerm">Search by Student ID / Name</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="searchTerm"
                      placeholder="e.g., N04112100064 or John Doe"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Or select class</Label>
                  <Select>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bca4">BCA Semester 4</SelectItem>
                      <SelectItem value="bca6">BCA Semester 6</SelectItem>
                      <SelectItem value="mca2">MCA Semester 2</SelectItem>
                      <SelectItem value="mca4">MCA Semester 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Academic Term</Label>
                  <Select defaultValue="current">
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Semester (Spring 2023)</SelectItem>
                      <SelectItem value="previous">Previous Semester (Fall 2022)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="bca4">
          <TabsList>
            <TabsTrigger value="bca4">BCA Semester 4</TabsTrigger>
            <TabsTrigger value="mca2">MCA Semester 2</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bca4">
            <Card>
              <CardHeader>
                <CardTitle>BCA Semester 4 - Timetable</CardTitle>
                <CardDescription>Spring Semester 2023 (January - May)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="border p-2 bg-muted">Time \ Day</TableHead>
                        {weekdays.map(day => (
                          <TableHead key={day} className="border p-2 bg-muted">{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.map(time => (
                        <TableRow key={time}>
                          <TableCell className="border p-2 font-medium bg-muted">{time}</TableCell>
                          {weekdays.map(day => {
                            const schedule = classSchedule["BCA Semester 4"];
                            const slot = schedule[day][time];
                            return (
                              <TableCell key={`${day}-${time}`} className="border p-2 text-center">
                                {slot.subject ? (
                                  <>
                                    <div className="font-medium">{slot.subject}</div>
                                    <div className="text-xs text-muted-foreground">{slot.faculty}</div>
                                    <div className="text-xs text-muted-foreground">Room: {slot.room}</div>
                                  </>
                                ) : (
                                  <span className="text-muted-foreground">No Class</span>
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mca2">
            <Card>
              <CardHeader>
                <CardTitle>MCA Semester 2 - Timetable</CardTitle>
                <CardDescription>Spring Semester 2023 (January - May)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="border p-2 bg-muted">Time \ Day</TableHead>
                        {weekdays.map(day => (
                          <TableHead key={day} className="border p-2 bg-muted">{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.map(time => (
                        <TableRow key={time}>
                          <TableCell className="border p-2 font-medium bg-muted">{time}</TableCell>
                          {weekdays.map(day => {
                            const schedule = classSchedule["MCA Semester 2"];
                            const slot = schedule[day][time];
                            return (
                              <TableCell key={`${day}-${time}`} className="border p-2 text-center">
                                {slot.subject ? (
                                  <>
                                    <div className="font-medium">{slot.subject}</div>
                                    <div className="text-xs text-muted-foreground">{slot.faculty}</div>
                                    <div className="text-xs text-muted-foreground">Room: {slot.room}</div>
                                  </>
                                ) : (
                                  <span className="text-muted-foreground">No Class</span>
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffStudentTimetable;
