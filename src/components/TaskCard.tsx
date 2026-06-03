import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  isDragOverlay?: boolean;
}

export function TaskCard({ task, onDelete, isDragOverlay }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task } });

  const style = isDragOverlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
      };

  const time = new Date(task.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      ref={isDragOverlay ? undefined : setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg p-3.5 shadow-sm border border-slate-100 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-slate-200 transition-all group"
      role="button"
      aria-label={`Task: ${task.title}, Status: ${task.status}`}
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-slate-700 leading-snug">
          {task.title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="text-slate-300 hover:text-red-500 transition-colors p-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label={`Delete task: ${task.title}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-400">
        <span className="capitalize">Status: {task.status}</span>
        <span aria-hidden="true">·</span>
        <span>Added: {time}</span>
      </div>
    </div>
  );
}
