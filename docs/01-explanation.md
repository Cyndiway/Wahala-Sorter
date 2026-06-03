# Wahala Sorter — Explained Like You're Seven

> "Wahala" means "trouble" or "problem" in Nigerian Pidgin English.
> This app helps you sort your troubles into three piles: do it NOW, do it SOON, or do it LATER.

---

## File 1: `index.html` — The Front Door

This is the HTML page that opens in your browser. Think of it like the front door of a house.

```
Line 1:  <!doctype html>          — "Hey browser, this is an HTML page."
Line 2:  <html lang="en">         — "The page is written in English."
Line 4:  <meta charset="UTF-8" /> — "We can use any letters or emojis."
Line 5:  <link rel="icon" .../>   — "Here's the tiny icon for the browser tab."
Line 6:  <meta name="viewport" .../> — "Make the page fit on phones and tablets."
Line 7:  <title>Wahala Sorter</title> — "The name shown on the browser tab."

Lines 9-14: Google Fonts stuff
  We ask Google's font website for a font called "Inter". 
  Inter is the special handwriting style all the text in our app uses.

Line 16: <body>                    — "Everything you see on the page goes here."
Line 17: <div id="root"></div>     — "This empty div is where React will build the app."
Line 18: <script ... src="...main.tsx"> — "Run the React app code."
Line 19: </body>
Line 20: </html>
```

---

## File 2: `tailwind.config.js` — The Style Settings

This file tells the app what colors, fonts, and sizes are allowed. It's like a box of crayons that we share across the whole project.

```
Line 1:  /** @type {import('tailwindcss').Config} */
          — A note for the computer: "This is a Tailwind config file."

Line 2:  export default {          — "Here are my settings, please use them."
Line 3:    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
          — "Look at all these files to find the class names I use."

Line 4:    theme: {                 — "Let me describe my theme."
Line 5:      extend: {              — "Add these extras to the default theme."
Line 6:        fontFamily: {        — "Choose the font family."
Line 7:          sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
              — "Use Inter first, then fall back to the computer's default font."
Line 8:        },
Line 9:      },
Line 10:   },
Line 11:   plugins: [],             — "No extra add-ons needed."
Line 12: }
```

---

## File 3: `src/index.css` — The Global Styles

This file adds special styles that apply to the whole page, like painting the background of the entire house.

```
Line 1:  @tailwind base;           — "Load Tailwind's basic styles (resets margins, etc.)."
Line 2:  @tailwind components;     — "Load Tailwind's component styles."
Line 3:  @tailwind utilities;      — "Load Tailwind's utility classes (padding, colors, etc.)."

Line 5:  body {                    — "Apply to the whole page body."
Line 6:    margin: 0;              — "Remove the default 8px margin around the page."
Line 7:    background-color: #F8FAFC;
              — "Set the page background to a very light greyish-blue (slate-50)."
Line 8:    -webkit-font-smoothing: antialiased;
              — "Make text look smoother on Mac computers."
Line 9:    -moz-osx-font-smoothing: grayscale;
              — "Make text look smoother on Firefox for Mac."
Line 10: }
```

---

## File 4: `src/main.tsx` — The Starting Point

This is where the app wakes up. It's like flipping the "ON" switch on a toy.

```
Line 1:  import { StrictMode } from 'react'
          — "Get the StrictMode helper from React. It helps catch bugs."

Line 2:  import { createRoot } from 'react-dom/client'
          — "Get the function that plants React into the webpage."

Line 3:  import './index.css'
          — "Load our global stylesheet (the background color, etc.)."

Line 4:  import App from './App.tsx'
          — "Get our main App component (the boss of everything)."

Line 6:  createRoot(document.getElementById('root')!).render(
          — "Find the empty <div id='root'> in index.html and plant our app there."
          — The exclamation mark (!) says "trust me, it exists."

Line 7:    <StrictMode>
          — "Wrap the app in StrictMode so React checks for problems."

Line 8:      <App />
          — "Put our App component here."

Line 9:    </StrictMode>,
Line 10: )
```

---

## File 5: `src/types.ts` — The Shape Rules

This file defines the "shapes" of data we use. It's like telling someone: "Every toy car MUST have 4 wheels, a color, and a size."

```
Line 1:  export type TaskStatus = 'now' | 'soon' | 'later';
          — "A task's status can ONLY be one of three words: 'now', 'soon', or 'later'."
          — It's like saying a light switch can only be ON or OFF — no in-between.

Line 3:  export interface Task {
          — "A Task is a thing that has these four pieces of information:"

Line 4:    id: string;
          — "A unique name (like 'abc-123') so we can tell tasks apart."

Line 5:    title: string;
          — "The task's name, like 'Do homework' or 'Clean room'."

Line 6:    status: TaskStatus;
          — "Whether it's 'now', 'soon', or 'later'."

Line 7:    createdAt: string;
          — "The exact time the task was made, saved as text (like '2026-06-03T10:42:00Z')."
Line 8:  }

Line 10: export interface Column {
           — "A Column is one of the three boxes on screen."
Line 11:   id: TaskStatus;
           — "Its ID matches its status: 'now', 'soon', or 'later'."
Line 12:   title: string;
           — "The big word at the top: 'Now', 'Soon', or 'Later'."
Line 13:   description: string;
           — "A little hint below the title, like 'Do this immediately'."
Line 14: }

Line 16: export const COLUMNS: Column[] = [
           — "Here is the list of all three columns, stored as a constant (it never changes)."

Line 17:   { id: 'now', title: 'Now', description: 'Do this immediately' },
           — "The 'Now' column: do it right away."

Line 18:   { id: 'soon', title: 'Soon', description: 'Do this next' },
           — "The 'Soon' column: do it after the Now stuff."

Line 19:   { id: 'later', title: 'Later', description: 'Do this sometime' },
           — "The 'Later' column: whenever you feel like it."
Line 20: ];

Line 22: export const STATUS_LABELS: Record<TaskStatus, string> = {
           — "A helper that converts status codes to readable names."

Line 23:   now: 'Now',
           — "If status is 'now', show 'Now'."

Line 24:   soon: 'Soon',
Line 25:   later: 'Later',
Line 26: };
```

---

## File 6: `src/components/TaskInput.tsx` — The "Add a Task" Box

This is the input area at the top where you type a new task and click "Add Task".

```
Line 1:  import { useState } from 'react';
          — "Get the useState hook from React. useState remembers things."

Line 3:  interface TaskInputProps {
          — "Describe what properties this component needs from its parent."

Line 4:    onAdd: (title: string) => void;
          — "A function that takes a title and returns nothing. It's like a phone
             the component uses to call its parent and say 'hey, add this task!'"
Line 5:  }

Line 7:  export function TaskInput({ onAdd }: TaskInputProps) {
          — "Define the TaskInput component. It receives onAdd as a prop."

Line 8:    const [title, setTitle] = useState('');
          — "Remember a piece of text called 'title'. Start with empty string ''.
             'title' is what the user typed.
             'setTitle' is how we change it."
          — "useState('') means: I start with nothing typed."

Line 10:   const handleSubmit = (e: React.FormEvent) => {
           — "A function that runs when the form is submitted (user presses Enter
              or clicks Add Task). 'e' is the event object."

Line 11:     e.preventDefault();
           — "Stop the browser from refreshing the page when a form is submitted.
              Normally submitting a form reloads the page — we don't want that."

Line 12:     const trimmed = title.trim();
           — "Remove any extra spaces from the beginning and end of the title.
              'trim()' is like shaving off the edges."

Line 13:     if (trimmed) {
           — "If there's something left after trimming (it's not empty)..."

Line 14:       onAdd(trimmed);
           — "...call the onAdd function the parent gave us, passing the task title.
              This is like picking up the phone and saying 'Add this task!'"

Line 15:       setTitle('');
           — "Clear the input box so the user can type the next task."
Line 16:     }
Line 17:   };

Line 19:   return (
Line 20:     <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-2xl mx-auto">
           — "A <form> element. When submitted, run handleSubmit.
              The CSS classes make it a flexible row with gaps and a max width."

Line 21:       <input
Line 22:         type="text"
Line 23:         value={title}
           — "Show whatever is stored in 'title' state inside the box."

Line 24:         onChange={(e) => setTitle(e.target.value)}
           — "Whenever the user types something, update 'title' to match."

Line 25:         placeholder="What needs sorting? Add a task..."
           — "Show this grey hint text when the box is empty."

Line 26:         className="..."
           — "Style: flexible width, padding, rounded corners, border, white bg,
              small text, dark grey text, light grey placeholder, focus ring,
              smooth shadow transition."

Line 27:         aria-label="New task title"
           — "For screen readers (used by blind people): 'this is where you type
              a new task's title'."

Line 28:       />
Line 29:       <button
Line 30:         type="submit"
           — "This button submits the form."

Line 31:         className="..."
           — "Style: dark grey background, white text, small bold font, rounded,
              hover effect to lighter grey, focus ring, smooth colors."

Line 32:       >
Line 33:         Add Task
Line 34:       </button>
Line 35:     </form>
Line 36:   );
Line 37: }
```

---

## File 7: `src/components/TaskCard.tsx` — One Task Card

This is a single task on the board — like a sticky note that you can pick up and move.

```
Line 1:  import { useSortable } from '@dnd-kit/sortable';
          — "Get the useSortable hook. It makes this card draggable and sortable."

Line 2:  import { CSS } from '@dnd-kit/utilities';
          — "Get the CSS helper to convert drag positions into styles."

Line 3:  import type { Task } from '../types';
          — "Import the Task type so TypeScript knows what a task looks like."

Line 5:  interface TaskCardProps {
          — "Describe what properties this component needs."

Line 6:    task: Task;
          — "The task object to display."

Line 7:    onDelete: (id: string) => void;
          — "A function to call when user wants to delete this task."

Line 8:    isDragOverlay?: boolean;
          — "Optional (the ? means it might not be there).
             If true, this card is the ghost copy following the mouse during a drag."
Line 9:  }

Line 11: export function TaskCard({ task, onDelete, isDragOverlay }: TaskCardProps) {

Line 12:   const {
Line 13:     attributes,  — "Extra HTML attributes for accessibility (like tab index)."
Line 14:     listeners,   — "Event handlers for mouse and touch (grab, drag, release)."
Line 15:     setNodeRef,  — "A ref we attach to the div so @dnd-kit knows which element to track."
Line 16:     transform,   — "How much the card has moved (x, y offset from original position)."
Line 17:     transition,  — "The animation style when moving (smooth sliding)."
Line 18:     isDragging,  — "Boolean: is this card currently being dragged?"
Line 19:   } = useSortable({ id: task.id, data: { task } });
           — "Call useSortable with the task's ID and the task data.
              This registers the card as draggable and gives us all these tools."

Line 21:   const style = isDragOverlay
Line 22:     ? undefined
           — "If this is the ghost overlay card, don't use any transform style
              (the DragOverlay component handles positioning it differently)."

Line 23:     : {
Line 24:         transform: CSS.Transform.toString(transform),
           — "Convert the @dnd-kit transform object into a CSS string like
              'translate3d(10px, 20px, 0px)'."

Line 25:         transition,
           — "Apply the smooth transition animation."

Line 26:         opacity: isDragging ? 0.3 : 1,
           — "If card is being dragged, make it semi-transparent (30% visible).
              The ghost overlay at the cursor position will be fully visible."
Line 27:       };

Line 29:   const time = new Date(task.createdAt).toLocaleTimeString([], {
Line 30:     hour: '2-digit',
Line 31:     minute: '2-digit',
Line 32:   });
           — "Convert the task's creation timestamp into a human-readable time.
              new Date(task.createdAt) turns the ISO string into a Date object.
              .toLocaleTimeString() formats it as something like '10:42 AM'."

Line 34:   return (
Line 35:     <div
Line 36:       ref={isDragOverlay ? undefined : setNodeRef}
           — "If this is the ghost overlay, don't attach the drag ref.
              Otherwise, attach setNodeRef so @dnd-kit tracks this div's position."

Line 37:       style={style}
           — "Apply the styles we computed above."

Line 38:       {...attributes}
           — "Spread all the accessibility attributes (like role, tab index)."

Line 39:       {...listeners}
           — "Spread all the mouse/touch event handlers so the card can be grabbed."

Line 40:       className="..."
           — "Style: white card, rounded, padding, small shadow, border,
              grab cursor, hover effects (bigger shadow, darker border),
              smooth transitions, group (for showing delete on hover)."

Line 41:       role="button"
           — "Tell screen readers this acts like a button."

Line 42:       aria-label={`Task: ${task.title}, Status: ${task.status}`}
           — "Screen reader description: 'Task: Clean room, Status: now'."

Line 43:       tabIndex={0}
           — "Make it focusable with the Tab key (keyboard users can reach it)."
Line 44:     >
Line 45:       <div className="flex items-start justify-between gap-2">
           — "A row that puts children side by side, aligned at the top, with space between."

Line 46:         <h3 className="text-sm font-medium text-slate-700 leading-snug">
Line 47:           {task.title}
           — "Show the task's title as a small heading."
Line 48:         </h3>
Line 49:         <button
Line 50:           onClick={(e) => {
Line 51:             e.stopPropagation();
           — "Stop this click from bubbling up to the drag handler.
              Without this, clicking delete would also start a drag."

Line 52:             onDelete(task.id);
           — "Call the onDelete function with this task's ID."
Line 53:           }}
Line 54:           className="..."
           — "Style: light grey default, red on hover, small padding,
              invisible by default (opacity-0), visible when hovering the card (group-hover)
              or when focused by keyboard."

Line 55:           aria-label={`Delete task: ${task.title}`}
           — "Screen reader: 'Delete task: Clean room'."
Line 56:         >
Line 57:           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
Line 58:             <path strokeLinecap="round" strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12" />
               — "An X icon (like a multiplication sign) drawn with SVG lines."
Line 59:           </svg>
Line 60:         </button>
Line 61:       </div>
Line 62:       <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-400">
           — "A smaller row below the title showing metadata."

Line 63:         <span className="capitalize">Status: {task.status}</span>
           — "Shows 'Status: now' (but 'capitalize' makes it 'Status: Now')."

Line 64:         <span aria-hidden="true">·</span>
           — "A small dot separator. aria-hidden='true' means screen readers skip it."

Line 65:         <span>Added: {time}</span>
           — "Shows 'Added: 10:42 AM'."
Line 66:       </div>
Line 67:     </div>
Line 68:   );
Line 69: }
```

---

## File 8: `src/components/Column.tsx` — One Priority Column

This is one of the three big boxes on the screen — Now, Soon, or Later. It holds task cards inside it.

```
Line 1:  import { useDroppable } from '@dnd-kit/core';
          — "Get the useDroppable hook. It makes this column a 'drop target'
             where you can drop task cards."

Line 2:  import {
Line 3:    SortableContext,
Line 4:    verticalListSortingStrategy,
Line 5:  } from '@dnd-kit/sortable';
          — "SortableContext tells @dnd-kit: 'tasks in this column can be sorted.'
             verticalListSortingStrategy means they sort top to bottom."

Line 6:  import type { Task, TaskStatus } from '../types';
Line 7:  import { TaskCard } from './TaskCard';

Line 9:  interface ColumnProps {
           — "Describe what properties this column needs."

Line 10:   id: TaskStatus;
           — "The column's ID: 'now', 'soon', or 'later'."

Line 11:   title: string;
           — "The big title: 'Now', 'Soon', or 'Later'."

Line 12:   description: string;
           — "The subtitle like 'Do this immediately'."

Line 13:   tasks: Task[];
           — "The list of tasks in this column."

Line 14:   onDelete: (id: string) => void;
           — "A function to delete a task, passed down to each TaskCard."

Line 15:   bgClass: string;
           — "A Tailwind class for the column's background color."

Line 16:   borderAccentClass: string;
           — "A Tailwind class for the color of the left border stripe."
Line 17: }

Line 19: export function Column({ ... }: ColumnProps) {
           — "Destructure all the props."

Line 28:   const { setNodeRef, isOver } = useDroppable({ id });
           — "useDroppable makes this column a place where you can drop things.
              setNodeRef: attach this to the column's div so @dnd-kit knows its position.
              isOver: true when the user is dragging something over this column."

Line 30:   const taskIds = tasks.map((t) => t.id);
           — "Extract just the IDs from each task (['task-1', 'task-2', ...]).
              SortableContext needs just IDs, not full task objects."

Line 32:   return (
Line 33:     <section
Line 34:       ref={setNodeRef}
           — "Attach the droppable ref so @dnd-kit can detect when we're hovering over it."

Line 35:       className={`... ${isOver ? 'shadow-lg ring-2 ring-slate-300' : 'shadow-sm'}`}
           — "Style: rounded corners, padding, minimum height, left border, smooth transitions.
              The background color and border color come from the parent via bgClass
              and borderAccentClass.
              If a card is being dragged over this column, add a bigger shadow and a ring."

Line 36:       aria-label={`${title} column`}
           — "Screen reader: 'Now column'."
Line 37:     >
Line 38:       <div className="flex items-center justify-between mb-4">
           — "Header row: title on the left, task count on the right."

Line 39:         <div>
Line 40:           <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
               — "The big column title."
Line 41:           <p className="text-xs text-slate-500 mt-0.5">{description}</p>
               — "The subtitle below."
Line 42:         </div>
Line 43:         <span className="..." aria-label={`${tasks.length} tasks`}>
Line 44:           {tasks.length}
               — "Show the number of tasks in this column (like a badge)."
Line 45:         </span>
Line 46:       </div>

Line 51:       <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
           — "This tells @dnd-kit: the items in this column (by their IDs) can be
              dragged up and down to reorder them."

Line 52:         <div className="space-y-2" role="list">
               — "A container with 8px gaps between each card. role='list' helps
                  screen readers understand this is a list of items."

Line 53:           {tasks.length > 0
Line 54:             ? tasks.map((task) => (
Line 55:                 <TaskCard key={task.id} task={task} onDelete={onDelete} />
                   — "For each task, create a TaskCard. key={task.id} helps React
                      track which card is which."
Line 56:               ))
Line 57:             : null}
               — "If there are no tasks, render nothing here."
Line 58:         </div>
Line 59:       </SortableContext>

Line 61:       {tasks.length === 0 && (
               — "If there are no tasks in this column..."
Line 62:         <div className="text-center py-10 text-sm text-slate-400 italic select-none">
Line 63:           {id === 'now'
Line 64:             ? 'No wahala here. Add a task to get started.'
               — "For the 'Now' column: a friendly empty message."
Line 65:             : 'Drop a task here'}
               — "For 'Soon' and 'Later': tells the user to drag tasks here."
Line 66:         </div>
Line 67:       )}
Line 68:     </section>
Line 69:   );
Line 70: }
```

---

## File 9: `src/components/Board.tsx` — The Whole Board

This is the entire middle section of the page that holds all three columns and the drag-and-drop magic.

```
Line 1:  import { useMemo, useState } from 'react';
          — "useMemo remembers a computed value so we don't recalculate every time.
             useState remembers a piece of information."

Line 2:  import { createPortal } from 'react-dom';
          — "createPortal lets us render something outside our component tree,
             usually directly on the page's body. We use it for the drag overlay
             so it floats above everything else."

Lines 4-11: DnD imports
  DndContext        — "The boss of drag-and-drop. Wraps everything that can be dragged or dropped."
  DragOverlay       — "A floating copy of the card that follows the mouse while dragging."
  KeyboardSensor    — "Lets users drag with the keyboard (Arrow keys + Space/Enter)."
  PointerSensor     — "Lets users drag with mouse or touch."
  useSensor         — "Creates a sensor with settings."
  useSensors        — "Creates a list of sensors."

Line 12:  import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
           — "Types for the events that fire when dragging starts and ends."

Line 14:  import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
           — "Tells the keyboard sensor how to move items (top to bottom)."

Line 16:  import { COLUMNS } from '../types';
Line 17:  import type { Task, TaskStatus } from '../types';
Line 18:  import { Column } from './Column';
Line 19:  import { TaskCard } from './TaskCard';

Line 21: interface BoardProps {
           — "Properties the Board receives from App."

Line 22:   tasks: Record<string, Task>;
           — "All tasks, stored as a dictionary (like a phonebook) where the key is the ID."

Line 23:   columnOrder: Record<TaskStatus, string[]>;
           — "The order of task IDs in each column (now: [id1, id2], soon: [id3], ...)."

Line 24:   onDragEnd: (activeId: string, overId: string) => void;
           — "A function App gives us to call when a drag finishes."

Line 25:   onDelete: (id: string) => void;
           — "A function App gives us to call when a task is deleted."

Line 26: }

Lines 28-35: COLUMN_STYLES
  A dictionary that maps each column status to its visual styles.
  now:   red background (bg-red-50)   and red left border (border-red-400)
  soon:  amber background (bg-amber-50) and amber left border (border-amber-400)
  later: blue background (bg-blue-50)   and blue left border (border-blue-400)

Line 37: export function Board({ tasks, columnOrder, onDragEnd, onDelete }: BoardProps) {

Line 43:   const [activeId, setActiveId] = useState<string | null>(null);
           — "Remember which task card is currently being dragged (or null if none)."

Lines 45-50: sensors
  useSensors creates two sensors:
  1. PointerSensor — responds to mouse/touch after 5px of movement
     (so a click without dragging doesn't trigger it).
  2. KeyboardSensor — responds to keyboard arrows, using sortable coordinates
     (up/down moves between items).

Line 52:   const activeTask = activeId ? tasks[activeId] : null;
           — "Look up the actual task object for the card being dragged."

Lines 54-61: columnTasks
  useMemo remembers the result so it only recalculates when tasks or columnOrder changes.
  It takes each column's ID list and maps each ID to the actual task object.
  .filter(Boolean) removes any undefined entries (in case a task was deleted).

Line 63:   function handleStart(event: DragStartEvent) {
Line 64:     setActiveId(event.active.id as string);
           — "When dragging starts, remember which card is being dragged."
Line 65:   }

Line 67:   function handleEnd(event: DragEndEvent) {
Line 68:     const { active, over } = event;
           — "Get the card being dragged (active) and what it's being dropped on (over)."

Line 69:     setActiveId(null);
           — "Clear the active card — dragging is done."

Line 70:     if (over) {
Line 71:       onDragEnd(active.id as string, over.id as string);
           — "If the card was dropped on something, tell App what happened.
              App will figure out where to move the card."
Line 72:     }
Line 73:   }

Line 75:   return (
Line 76:     <DndContext
Line 77:       sensors={sensors}
           — "Use the sensors we set up."

Line 78:       collisionDetection={closestCorners}
           — "When figuring out what the dragged card is hovering over,
              check which item's corner is closest. This helps decide which column
              or card the item should snap to."

Line 79:       onDragStart={handleStart}
Line 80:       onDragEnd={handleEnd}
Line 81:     >
Line 82:       <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
           — "A grid with 1 column on small screens, 3 columns on medium+ screens.
              gap-5 adds spacing between columns."

Lines 83-93: Loop through COLUMNS
  For each column definition, render a Column component.
  Pass it the right tasks from columnTasks, the styles, and the delete handler.

Lines 96-105: DragOverlay via createPortal
  createPortal renders this on document.body so it floats above everything.
  DragOverlay shows a copy of the card following the mouse.
  dropAnimation={null} means no fancy animation on drop (instant).
  Inside, we render a TaskCard for the active task with a slight rotation
  (rotate-3) and a big shadow (shadow-xl) so it looks like you're holding it.
  isDragOverlay={true} tells the card not to attach drag handlers itself.

Line 106:   return (closing)
Line 107: }
```

---

## File 10: `src/App.tsx` — The Brain of the Whole App

This is the boss component that owns all the data and makes all the decisions. Everything else just helps display things.

```
Line 1:  import { useCallback, useState } from 'react';
          — "useState remembers data. useCallback remembers functions (so they don't
             get recreated every render)."

Line 2:  import { arrayMove } from '@dnd-kit/sortable';
          — "A tiny helper that moves an item from one position to another in an array.
             Like: 'take item at position 2 and move it to position 5'."

Line 3:  import type { Task, TaskStatus } from './types';
Line 4:  import { TaskInput } from './components/TaskInput';
Line 5:  import { Board } from './components/Board';

Line 7:  export default function App() {

Line 8:    const [tasks, setTasks] = useState<Record<string, Task>>({});
           — "Remember ALL tasks as a dictionary (phonebook) where the key is the task ID
              and the value is the task object. Starts empty: {}."

Line 9:    const [columnOrder, setColumnOrder] = useState<Record<TaskStatus, string[]>>(
Line 10:    { now: [], soon: [], later: [] },
           — "Remember the order of task IDs in each column.
              Each column has an empty array to start."
Line 11:  );

Line 13:   const findContainer = useCallback(
           — "A function that answers: 'Which column does this ID belong to?'
              'useCallback' means React remembers this function so it doesn't
              rebuild it every time the component updates."

Line 14:     (id: string): TaskStatus | null => {

Line 15:       if (id in columnOrder) return id as TaskStatus;
           — "If the ID matches a column name ('now', 'soon', 'later'),
              then the container IS that column."

Line 16:       if (id in tasks) return tasks[id].status;
           — "If the ID matches a task, return whatever status that task has
              ('now', 'soon', or 'later')."

Line 17:       return null;
           — "If it matches nothing, return null (not found)."
Line 18:     },
Line 19:     [tasks, columnOrder],
           — "Rebuild this function whenever tasks or columnOrder changes."
Line 20:   );

Line 22:   const addTask = useCallback((title: string) => {
           — "A function to add a new task."

Line 23:     const id = crypto.randomUUID();
           — "Generate a completely unique ID (like 'a1b2c3d4-e5f6-...').
              crypto.randomUUID() is built into modern browsers."

Line 24:     const task: Task = {
Line 25:       id,                            — "The unique ID we just made."
Line 26:       title,                         — "The task name the user typed."
Line 27:       status: 'now',                 — "New tasks always go to 'Now' column."
Line 28:       createdAt: new Date().toISOString(),
               — "The current time, saved as a standard text format."
Line 29:     };

Line 30:     setTasks((prev) => ({ ...prev, [id]: task }));
           — "Add the new task to the tasks dictionary.
              (...) spread operator copies all existing tasks, then adds the new one."

Line 31:     setColumnOrder((prev) => ({
Line 32:       now: [...prev.now, id],
               — "Add the new task's ID to the end of the 'now' column's order list."
Line 33:       soon: prev.soon,
Line 34:       later: prev.later,
Line 35:     }));
Line 36:   }, []);

Line 38:   const deleteTask = useCallback((id: string) => {
           — "A function to delete a task."

Line 39:     setTasks((prev) => {
Line 40:       const { [id]: _, ...rest } = prev;
               — "Destructuring trick: pull out the task with this ID and throw it away,
                  keep everything else in 'rest'."
Line 41:       return rest;
Line 42:     });

Line 43:     setColumnOrder((prev) => ({
Line 44:       now: prev.now.filter((tid) => tid !== id),
               — "Remove this task's ID from the 'now' column's order list."
Line 45:       soon: prev.soon.filter((tid) => tid !== id),
Line 46:       later: prev.later.filter((tid) => tid !== id),
               — ".filter() creates a new array keeping only items that DON'T match."
Line 47:     }));
Line 48:   }, []);

Line 50:   const handleDragEnd = useCallback(
Line 51:     (activeId: string, overId: string) => {
           — "This runs when the user drops a card. activeId is the card being moved.
              overId is what it landed on (could be a column or another card)."

Line 52:       if (activeId === overId) return;
           — "If the card landed on itself, do nothing."

Line 54:       const activeContainer = findContainer(activeId);
               — "Which column did the dragged card come from?"

Line 55:       const overContainer = findContainer(overId);
               — "Which column did it land in?"

Line 57:       if (!activeContainer || !overContainer) return;
           — "If we can't figure out the columns, stop."

Line 59:       if (activeContainer === overContainer) {
           — "If the card stayed in the same column..."

Line 60:         if (overId in columnOrder) return;
               — "If it landed on the column header itself (not a card), do nothing."

Line 61:         const col = columnOrder[activeContainer];
Line 62:         const oldIndex = col.indexOf(activeId);
               — "Find the old position of the card in the list."

Line 63:         const newIndex = col.indexOf(overId);
               — "Find the new position (where it landed)."

Line 64:         if (oldIndex !== newIndex) {
Line 65:           setColumnOrder((prev) => ({
Line 66:             ...prev,
Line 67:             [activeContainer]: arrayMove(prev[activeContainer], oldIndex, newIndex),
                   — "Use arrayMove to reorder the list: take the card from oldIndex
                      and insert it at newIndex."
Line 68:           }));
Line 69:         }

Line 70:       } else {
           — "If the card moved to a DIFFERENT column..."

Line 71:         const dest = [...columnOrder[overContainer]];
               — "Copy the destination column's order list (we'll modify it)."

Line 72:         const overIndex = overId in columnOrder
Line 73:           ? dest.length
               — "If it landed on the column itself (not a card), put it at the end."

Line 74:           : dest.indexOf(overId);
               — "If it landed on a card, put it at that card's position."

Line 76:         dest.splice(overIndex === -1 ? dest.length : overIndex, 0, activeId);
               — "Insert the task's ID at the chosen position.
                  splice is like: 'at this position, delete 0 items, and add this ID'.
                  If overIndex is -1 (not found), add to the end."

Line 78:         setColumnOrder((prev) => ({
Line 79:           ...prev,
Line 80:           [activeContainer]: prev[activeContainer].filter((id) => id !== activeId),
               — "Remove the task from the OLD column's list."

Line 81:           [overContainer]: dest,
               — "Set the NEW column's list to our modified copy."
Line 82:         }));

Line 84:         setTasks((prev) => ({
Line 85:           ...prev,
Line 86:           [activeId]: { ...prev[activeId], status: overContainer },
               — "Update the task's status to match the new column."
Line 87:         }));
Line 88:       }
Line 89:     },
Line 90:     [findContainer, columnOrder],
           — "Rebuild this function when findContainer or columnOrder changes."
Line 91:   );

Line 93:   return (
           — "Now we render the page."

Line 94:     <div className="min-h-screen bg-slate-50">
           — "A full-height container with a light grey background."

Line 95:       <header className="border-b border-slate-200 bg-white">
           — "The top bar: white background, bottom border."

Line 96:         <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
               — "Centered content, max width, responsive padding."

Line 97:           <h1 className="text-3xl font-bold text-slate-800 mb-1">
Line 98:             Wahala Sorter
                   — "The big title at the top."
Line 99:           </h1>
Line 100:          <p className="text-sm text-slate-500">
Line 101:            Sort your wahala. Focus on what matters.
                   — "The tiny subtitle below the title."
Line 102:          </p>
Line 103:        </div>
Line 104:      </header>

Line 106:      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
Line 107:        <div className="mb-8">
Line 108:          <TaskInput onAdd={addTask} />
                   — "The input box with an 'Add Task' button."
Line 109:        </div>

Line 111:        <Board
Line 112:          tasks={tasks}
Line 113:          columnOrder={columnOrder}
Line 114:          onDragEnd={handleDragEnd}
Line 115:          onDelete={deleteTask}
Line 116:        />
               — "The three-column board with all the drag-and-drop magic."
Line 117:      </main>
Line 118:    </div>
Line 119:  );
Line 120: }
```

---

## How It All Connects — The Big Picture

Think of the app like a toy train set with different pieces:

```
index.html
  └── The track (the page itself)

main.tsx
  └── The power switch (starts the train)

App.tsx
  └── The train conductor (boss of everything)
       ├── Keeps all tasks in memory (tasks and columnOrder)
       ├── Decides what happens when you add/delete/move tasks
       └── Renders:
            ├── TaskInput — the station where new tasks enter
            └── Board — the main play area

Board.tsx
  └── The train yard with 3 tracks
       ├── Sets up drag-and-drop rules (sensors, collision detection)
       ├── Shows a ghost card while dragging (DragOverlay)
       └── Renders 3 Column components

Column.tsx
  └── One track (Now / Soon / Later)
      ├── Knows when something is dragged over it (useDroppable)
      ├── Tells @dnd-kit which cards are in this track (SortableContext)
      ├── Shows the count badge and empty messages
      └── Renders TaskCard components

TaskCard.tsx
  └── One train car (a single task)
      ├── Can be picked up and moved (useSortable)
      ├── Shows the task name, status, and time
      └── Has a delete button (X)

TaskInput.tsx
  └── The ticket booth
      ├── Remembers what you typed (useState)
      └── Calls onAdd when you press Enter or click Add Task
```

**Data flows like this:**

1. You type "Clean room" and click "Add Task"
2. `TaskInput` calls `onAdd("Clean room")`
3. `App.addTask` runs: creates a task with a unique ID, timestamp, status 'now'
4. React re-renders `Board` with the new task
5. `Board` groups tasks by status and passes them to `Column`
6. `Column` shows the new task card

**When you drag a card:**

1. You grab a `TaskCard` — `useSortable` tells `DndContext` "this one is moving"
2. `Board.handleStart` runs: remembers which card is active
3. `DragOverlay` shows a ghost copy following your cursor
4. The column you hover over lights up (`isOver` becomes true)
5. You drop the card — `Board.handleEnd` runs
6. `App.handleDragEnd` runs: updates the task's status and column order
7. React re-renders everything in its new position
