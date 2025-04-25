
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const StaffTimetable = () => {
  const [selectedSemester, setSelectedSemester] = useState("current");
  
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["9:00 - 10:30", "10:45 - 12:15", "1:00 - 2:30", "2:45 - 4:15", "4:30 - 6:00"];
  
  const timetableData = {
    "Monday": {
      "9:00 - 10:30": { subject: "Database Management", class: "BCA Semester 4", room: "302" },
      "10:45 - 12:15": { subject: "", class: "", room: "" },
      "1:00 - 2:30": { subject: "Web Development", class: "MCA Semester 2", room: "Lab 1" },
      "2:45 - 4:15": { subject: "Software Engineering", class: "MCA Semester 1", room: "105" },
      "4:30 - 6:00": { subject: "Project Lab", class: "BCA Semester 6", room: "Lab 2" }
    },
    "Tuesday": {
      "9:00 - 10:30": { subject: "Data Structures", class: "BCA Semester 3", room: "201" },
      "10:45 - 12:15": { subject: "Programming Languages", class: "MCA Semester 1", room: "301" },
      "1:00 - 2:30": { subject: "", class: "", room: "" },
      "2:45 - 4:15": { subject: "Database Lab", class: "BCA Semester 4", room: "Lab 1" },
      "4:30 - 6:00": { subject: "Database Lab", class: "BCA Semester 4", room: "Lab 1" }
    },
    "Wednesday": {
      "9:00 - 10:30": { subject: "Software Engineering", class: "MCA Semester 1", room: "105" },
      "10:45 - 12:15": { subject: "Research Methodology", class: "Ph.D. Students", room: "Seminar Hall" },
      "1:00 - 2:30": { subject: "", class: "", room: "" },
      "2:45 - 4:15": { subject: "", class: "", room: "" },
      "4:30 - 6:00": { subject: "Faculty Meeting", class: "", room: "Conference Room" }
    },
    "Thursday": {
      "9:00 - 10:30": { subject: "Database Management", class: "BCA Semester 4", room: "302" },
      "10:45 - 12:15": { subject: "Advanced DBMS", class: "MCA Semester 2", room: "201" },
      "1:00 - 2:30": { subject: "Project Guidance", class: "MCA Semester 4", room: "Lab 3" },
      "2:45 - 4:15": { subject: "Project Guidance", class: "MCA Semester 4", room: "Lab 3" },
      "4:30 - 6:00": { subject: "", class: "", room: "" }
    },
    "Friday": {
      "9:00 - 10:30": { subject: "Data Structures", class: "BCA Semester 3", room: "201" },
      "10:45 - 12:15": { subject: "Web Development", class: "MCA Semester 2", room: "Lab 1" },
      "1:00 - 2:30": { subject: "Web Development", class: "MCA Semester 2", room: "Lab 1" },
      "2:45 - 4:15": { subject: "", class: "", room: "" },
      "4:30 - 6:00": { subject: "Department Meeting", class: "", room: "Department Office" }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Staff Timetable</h1>
      <p className="text-muted-foreground">View your teaching schedule for the current semester.</p>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <Select defaultValue="current" onValueChange={setSelectedSemester}>
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
      
      <Card>
        <CardHeader>
          <CardTitle>Weekly Teaching Schedule</CardTitle>
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
                      const slot = timetableData[day][time];
                      return (
                        <TableCell key={`${day}-${time}`} className="border p-2 text-center">
                          {slot.subject ? (
                            <>
                              <div className="font-medium">{slot.subject}</div>
                              {slot.class && <div className="text-xs text-muted-foreground">{slot.class}</div>}
                              <div className="text-xs text-muted-foreground">Room: {slot.room}</div>
                            </>
                          ) : (
                            <span className="text-muted-foreground">Free Period</span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 bg-primary/10 rounded"></div>
              <span className="text-sm">Teaching Sessions: 15 hours per week</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 bg-secondary/10 rounded"></div>
              <span className="text-sm">Lab Sessions: 8 hours per week</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 bg-muted rounded"></div>
              <span className="text-sm">Meetings: 2 hours per week</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffTimetable;
