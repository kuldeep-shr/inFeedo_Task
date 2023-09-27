interface CreateTaskApiPayload {
  tasks: Array<{
    title: string;
    description: string;
    scheduled_at: string;
    created_by: number;
  }>;
}
interface UpdateTaskApiPayload {
  id: number;
  title: string;
  description: string;
  status: string;
  scheduled_date: string;
}
export { CreateTaskApiPayload, UpdateTaskApiPayload };
