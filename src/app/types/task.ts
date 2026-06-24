export interface ITask extends Document {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
}
