import { useState, useEffect } from 'react';
import { TaskItem } from './components/TaskItem';
import { AddTask } from './components/AddTask';
import { TaskStats } from './components/TaskStats';
import { CheckCircle, ListTodo } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Charger les tâches depuis localStorage au démarrage
  useEffect(() => {
    const savedTasks = localStorage.getItem('todo-tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error);
      }
    }
  }, []);

  // Sauvegarder les tâches dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, title: newTitle }
          : task
      )
    );
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-3 justify-center">
            <ListTodo className="w-8 h-8" />
            <h1 className="text-2xl">Mes Tâches</h1>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Formulaire d'ajout */}
        <AddTask onAdd={addTask} />

        {/* Statistiques et filtres */}
        <TaskStats 
          tasks={tasks} 
          filter={filter} 
          onFilterChange={setFilter}
        />

        {/* Liste des tâches */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">
                {filter === 'completed' 
                  ? 'Aucune tâche terminée'
                  : filter === 'active'
                  ? 'Aucune tâche en cours'
                  : 'Aucune tâche'
                }
              </p>
              <p className="text-sm">
                {tasks.length === 0 
                  ? 'Commencez par ajouter votre première tâche !'
                  : 'Changez le filtre pour voir d\'autres tâches'
                }
              </p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
