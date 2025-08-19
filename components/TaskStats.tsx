import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskStatsProps {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

export function TaskStats({ tasks, filter, onFilterChange }: TaskStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        <div className="text-center">
          <div className="text-2xl font-medium text-primary">{totalTasks}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-medium text-blue-600">{activeTasks}</div>
          <div className="text-sm text-muted-foreground">À faire</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-medium text-green-600">{completedTasks}</div>
          <div className="text-sm text-muted-foreground">Terminées</div>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('all')}
        >
          Toutes
          {totalTasks > 0 && (
            <Badge variant="secondary" className="ml-2">
              {totalTasks}
            </Badge>
          )}
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('active')}
        >
          À faire
          {activeTasks > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeTasks}
            </Badge>
          )}
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange('completed')}
        >
          Terminées
          {completedTasks > 0 && (
            <Badge variant="secondary" className="ml-2">
              {completedTasks}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
}
