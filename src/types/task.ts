export interface Task {
  id?: string;
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
}
