import { useCallback, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import type { Task, TaskStatus } from './types';
import { TaskInput } from './components/TaskInput';
import { Board } from './components/Board';

export default function App() {
  const [tasks, setTasks] = useState<Record<string, Task>>({});
  const [columnOrder, setColumnOrder] = useState<Record<TaskStatus, string[]>>(
    { now: [], soon: [], later: [] },
  );

  const findContainer = useCallback(
    (id: string): TaskStatus | null => {
      if (id in columnOrder) return id as TaskStatus;
      if (id in tasks) return tasks[id].status;
      return null;
    },
    [tasks, columnOrder],
  );

  const addTask = useCallback((title: string) => {
    const id = crypto.randomUUID();
    const task: Task = {
      id,
      title,
      status: 'now',
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => ({ ...prev, [id]: task }));
    setColumnOrder((prev) => ({
      now: [...prev.now, id],
      soon: prev.soon,
      later: prev.later,
    }));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
    setColumnOrder((prev) => ({
      now: prev.now.filter((tid) => tid !== id),
      soon: prev.soon.filter((tid) => tid !== id),
      later: prev.later.filter((tid) => tid !== id),
    }));
  }, []);

  const handleDragEnd = useCallback(
    (activeId: string, overId: string) => {
      if (activeId === overId) return;

      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId);

      if (!activeContainer || !overContainer) return;

      if (activeContainer === overContainer) {
        if (overId in columnOrder) return;
        const col = columnOrder[activeContainer];
        const oldIndex = col.indexOf(activeId);
        const newIndex = col.indexOf(overId);
        if (oldIndex !== newIndex) {
          setColumnOrder((prev) => ({
            ...prev,
            [activeContainer]: arrayMove(prev[activeContainer], oldIndex, newIndex),
          }));
        }
      } else {
        const dest = [...columnOrder[overContainer]];
        const overIndex = overId in columnOrder
          ? dest.length
          : dest.indexOf(overId);

        dest.splice(overIndex === -1 ? dest.length : overIndex, 0, activeId);

        setColumnOrder((prev) => ({
          ...prev,
          [activeContainer]: prev[activeContainer].filter((id) => id !== activeId),
          [overContainer]: dest,
        }));

        setTasks((prev) => ({
          ...prev,
          [activeId]: { ...prev[activeId], status: overContainer },
        }));
      }
    },
    [findContainer, columnOrder],
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">
            Wahala Sorter
          </h1>
          <p className="text-sm text-slate-500">
            Sort your wahala. Focus on what matters.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-8">
          <TaskInput onAdd={addTask} />
        </div>

        <Board
          tasks={tasks}
          columnOrder={columnOrder}
          onDragEnd={handleDragEnd}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}
