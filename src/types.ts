export type TaskStatus = 'now' | 'soon' | 'later';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
}

export interface Column {
  id: TaskStatus;
  title: string;
  description: string;
}

export const COLUMNS: Column[] = [
  { id: 'now', title: 'Now', description: 'Do this immediately' },
  { id: 'soon', title: 'Soon', description: 'Do this next' },
  { id: 'later', title: 'Later', description: 'Do this sometime' },
];

export const STATUS_LABELS: Record<TaskStatus, string> = {
  now: 'Now',
  soon: 'Soon',
  later: 'Later',
};
