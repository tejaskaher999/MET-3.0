
import { useState, useEffect } from 'react';
import { Bell, MessageSquare, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'assignment' | 'company' | 'notice' | 'overdue';
  timestamp: Date;
}

export const ChatNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulated notifications - replace with real data fetching
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'New Assignment',
        message: 'Database Management System assignment due in 2 days',
        type: 'assignment',
        timestamp: new Date()
      },
      {
        id: '2',
        title: 'Company Update',
        message: 'Microsoft scheduled for campus placement next week',
        type: 'company',
        timestamp: new Date()
      }
    ];
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.length);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 shadow-lg animate-in slide-in-from-right">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Notifications</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="mb-4 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                >
                  <h4 className="font-semibold">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <Button
          size="lg"
          className="rounded-full h-14 w-14 bg-[#800000] hover:bg-[#900000] relative"
          onClick={() => setIsOpen(true)}
        >
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#ea384c] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};
