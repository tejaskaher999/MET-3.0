
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentTimetable = () => {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["9:00 - 10:30", "10:45 - 12:15", "1:00 - 2:30", "2:45 - 4:15", "4:30 - 6:00"];
  
  const timetableData = {
    "Monday": {
      "9:00 - 10:30": { subject: "Database Management", room: "302" },
      "10:45 - 12:15": { subject: "Web Development", room: "Lab 1" },
      "1:00 - 2:30": { subject: "Mathematics", room: "201" },
      "2:45 - 4:15": { subject: "", room: "" },
      "4:30 - 6:00": { subject: "Programming Lab", room: "Lab 2" }
    },
    "Tuesday": {
      "9:00 - 10:30": { subject: "Data Structures", room: "301" },
      "10:45 - 12:15": { subject: "Computer Networks", room: "302" },
      "1:00 - 2:30": { subject: "", room: "" },
      "2:45 - 4:15": { subject: "Project Work", room: "Lab 3" },
      "4:30 - 6:00": { subject: "Project Work", room: "Lab 3" }
    },
    "Wednesday": {
      "9:00 - 10:30": { subject: "Operating Systems", room: "201" },
      "10:45 - 12:15": { subject: "Programming Languages", room: "301" },
      "1:00 - 2:30": { subject: "Database Management Lab", room: "Lab 1" },
      "2:45 - 4:15": { subject: "Database Management Lab", room: "Lab 1" },
      "4:30 - 6:00": { subject: "", room: "" }
    },
    "Thursday": {
      "9:00 - 10:30": { subject: "Software Engineering", room: "302" },
      "10:45 - 12:15": { subject: "Computer Architecture", room: "201" },
      "1:00 - 2:30": { subject: "Mathematics", room: "301" },
      "2:45 - 4:15": { subject: "Communication Skills", room: "202" },
      "4:30 - 6:00": { subject: "", room: "" }
    },
    "Friday": {
      "9:00 - 10:30": { subject: "Computer Networks", room: "302" },
      "10:45 - 12:15": { subject: "Web Development", room: "301" },
      "1:00 - 2:30": { subject: "Network Lab", room: "Lab 2" },
      "2:45 - 4:15": { subject: "Network Lab", room: "Lab 2" },
      "4:30 - 6:00": { subject: "", room: "" }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Timetable</h1>
      <p className="text-muted-foreground">Your weekly class schedule.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Semester V - Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-muted">Time \ Day</th>
                  {weekdays.map(day => (
                    <th key={day} className="border p-2 bg-muted">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(time => (
                  <tr key={time}>
                    <td className="border p-2 font-medium bg-muted">{time}</td>
                    {weekdays.map(day => {
                      const slot = timetableData[day][time];
                      return (
                        <td key={`${day}-${time}`} className="border p-2 text-center">
                          {slot.subject ? (
                            <>
                              <div className="font-medium">{slot.subject}</div>
                              <div className="text-xs text-muted-foreground">Room: {slot.room}</div>
                            </>
                          ) : (
                            <span className="text-muted-foreground">Free Period</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentTimetable;
