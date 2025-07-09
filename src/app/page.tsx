"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskCard } from "@/components/shared/task-card";

// Temporary mock data for development
const mockLists = [
  { id: 1, name: "Personal Tasks" },
  { id: 2, name: "Work Projects" },
];

const mockTasks = [
  { id: 1, name: "Learn Next.js", description: "Complete the tutorial", listId: 1, status: "todo" },
  { id: 2, name: "Build Portfolio", description: "Create personal website", listId: 1, status: "inprogress" },
  { id: 3, name: "Write Blog", description: "Tech article", listId: 1, status: "completed" },
];

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-background text-foreground">
      <Card>
        <CardHeader>
          <CardTitle>TaskBoard</CardTitle>
          <CardDescription>
            <p>
              TaskBoard is a simple task management tool that allows you to create, manage, and track your tasks.
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue={mockLists[0].id.toString()} className="w-full">
        <TabsList className="mb-8">
          {mockLists.map((list) => (
            <TabsTrigger key={list.id} value={list.id.toString()}>
              {list.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {mockLists.map((list) => (
          <TabsContent key={list.id} value={list.id.toString()}>
            <div className="grid grid-cols-3 gap-6">
              {/* Todo Column */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">To Do</h2>
                <ScrollArea className="h-[calc(100vh-250px)]">
                  {mockTasks
                    .filter((task) => task.listId === list.id && task.status === "todo")
                    .map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                </ScrollArea>
              </div>

              {/* In Progress Column */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">In Progress</h2>
                <ScrollArea className="h-[calc(100vh-250px)]">
                  {mockTasks
                    .filter((task) => task.listId === list.id && task.status === "inprogress")
                    .map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                </ScrollArea>
              </div>

              {/* Completed Column */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">Completed</h2>
                <ScrollArea className="h-[calc(100vh-250px)]">
                  {mockTasks
                    .filter((task) => task.listId === list.id && task.status === "completed")
                    .map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
