import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { COLUMNS } from '../types';
import type { Task, TaskStatus } from '../types';
import { Column } from './Column';
import { TaskCard } from './TaskCard';

interface BoardProps {
  tasks: Record<string, Task>;
  columnOrder: Record<TaskStatus, string[]>;
  onDragEnd: (activeId: string, overId: string) => void;
  onDelete: (id: string) => void;
}

const COLUMN_STYLES: Record<
  TaskStatus,
  { bgClass: string; borderAccentClass: string }
> = {
  now: { bgClass: 'bg-red-50', borderAccentClass: 'border-red-400' },
  soon: { bgClass: 'bg-amber-50', borderAccentClass: 'border-amber-400' },
  later: { bgClass: 'bg-blue-50', borderAccentClass: 'border-blue-400' },
};

export function Board({
  tasks,
  columnOrder,
  onDragEnd,
  onDelete,
}: BoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const activeTask = activeId ? tasks[activeId] : null;

  const columnTasks = useMemo(
    () => ({
      now: columnOrder.now.map((id) => tasks[id]).filter(Boolean),
      soon: columnOrder.soon.map((id) => tasks[id]).filter(Boolean),
      later: columnOrder.later.map((id) => tasks[id]).filter(Boolean),
    }),
    [tasks, columnOrder],
  );

  function handleStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (over) {
      onDragEnd(active.id as string, over.id as string);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleStart}
      onDragEnd={handleEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            description={col.description}
            tasks={columnTasks[col.id]}
            onDelete={onDelete}
            {...COLUMN_STYLES[col.id]}
          />
        ))}
      </div>

      {createPortal(
        <DragOverlay dropAnimation={null}>
          {activeTask ? (
            <div className="rotate-3 shadow-xl">
              <TaskCard task={activeTask} onDelete={onDelete} isDragOverlay />
            </div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}
