# Wahala Sorter - Setup Instructions

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

```bash
cd wahala-sorter
npm install
```

## Development

```bash
npm run dev
```

Open the URL shown in the terminal (default `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- **React 19** + **Vite 8** + **TypeScript**
- **Tailwind CSS 3** (styling)
- **@dnd-kit** (drag and drop)

## Project Structure

```
src/
  types.ts              # TypeScript interfaces
  components/
    TaskInput.tsx        # Add task form
    Board.tsx            # DnD context + grid layout
    Column.tsx           # Droppable column with SortableContext
    TaskCard.tsx         # Draggable/sortable task card
```
