import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Task {
  id: number;
  name: string;
  description: string;
  listId: number;
  status: string;
  deadline?: Date; // Optional deadline field
}

interface TaskCardProps {
  task: Task;
  onMoveList?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TaskCard({ task, onMoveList, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card className="mb-4 relative">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>{task.name}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
          {task.deadline && (
            <CardDescription className="mt-2">
              Deadline: {task.deadline.toLocaleDateString()}
            </CardDescription>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 p-0 flex items-center justify-center rounded-md hover:bg-muted">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onMoveList}>
              Move to List
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onEdit}>
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={onDelete}
            >
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
    </Card>
  );
} 