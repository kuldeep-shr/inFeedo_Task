type CreateTaskParams = {
  title: string;
  description: string;
  scheduled_at: string;
  created_by?: string;
};

type Task = {
  id: number;
  title?: string;
  description?: string;
  scheduled_at: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  status: string;
  userId: number;
  current_page: number;
  total_item: number;
};

type UpdateTaskParams = {
  id: number;
  title: string;
  description: string;
  status: string;
  scheduled_at: string;
  tasks: Task;
};

type PaginationParams = {
  scheduled_at: string;
  status: string;
  userId: number;
};

type Metrics = {
  [key: string]: number;
};

type Output =
  | {
      date: string;
      metrics: Metrics;
    }
  | {
      open_tasks: number;
      inprogress_tasks: number;
      completed_tasks: number;
    };

export {
  CreateTaskParams,
  UpdateTaskParams,
  Task,
  PaginationParams,
  Output,
  Metrics,
};
