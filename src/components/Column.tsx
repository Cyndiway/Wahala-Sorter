import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  id: TaskStatus;
  title: string;
  description: string;
  tasks: Task[];
  onDelete: (id: string) => void;
  bgClass: string;
  borderAccentClass: string;
}

export function Column({
  id,
  title,
  description,
  tasks,
  onDelete,
  bgClass,
  borderAccentClass,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const taskIds = tasks.map((t) => t.id);

  return (
    <section
      ref={setNodeRef}
      className={`rounded-xl p-4 min-h-[200px] border-l-4 transition-all ${bgClass} ${borderAccentClass} ${isOver ? 'shadow-lg ring-2 ring-slate-300' : 'shadow-sm'}`}
      aria-label={`${title} column`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
        <span
          className="text-sm font-medium text-slate-500 bg-white/70 px-2.5 py-1 rounded-full"
          aria-label={`${tasks.length} tasks`}
        >
          {tasks.length}
        </span>
      </div>

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-2" role="list">
          {tasks.length > 0
            ? tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} />
              ))
            : null}
        </div>
      </SortableContext>

      {tasks.length === 0 && (
        <div className="text-center py-10 text-sm text-slate-400 italic select-none">
          {id === 'now'
            ? 'No wahala here. Add a task to get started.'
            : 'Drop a task here'}
        </div>
      )}
    </section>
  );
}
