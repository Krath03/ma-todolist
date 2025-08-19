import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';

interface AddTaskProps {
  onAdd: (title: string) => void;
}

export function AddTask({ onAdd }: AddTaskProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-card rounded-lg border border-border">
      <Input
        placeholder="Ajouter une nouvelle tâche..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" size="sm" className="flex-shrink-0">
        <Plus className="w-4 h-4" />
        <span className="ml-1 hidden sm:inline">Ajouter</span>
      </Button>
    </form>
  );
}
